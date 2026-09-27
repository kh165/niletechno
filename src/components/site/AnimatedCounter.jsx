import React, { useEffect, useRef, useState } from 'react';

/**
 * Parses numeric strings with prefixes (+), suffixes (%), thousands commas (,), and decimals.
 * Returns null if the value is non-numeric or complex like "24/7".
 */
function parseCountableValue(raw) {
  if (typeof raw === 'number') {
    return {
      target: raw,
      prefix: '',
      suffix: '',
      hasComma: false,
      decimals: 0
    };
  }

  if (typeof raw !== 'string') {
    return null;
  }

  const str = raw.trim();

  // If it contains a slash, date dash, or multiple non-standard separators (e.g., "24/7"), keep static
  if (str.includes('/') || (str.includes('-') && !str.startsWith('-'))) {
    return null;
  }

  // Regex to match optional leading prefix (like +), numeric body (digits, commas, dots), and suffix (like %)
  const match = str.match(/^([^\d.-]*)([\d,.]+)([^\d.]*)$/);
  if (!match) return null;

  const prefix = match[1] || '';
  const numStr = match[2];
  const suffix = match[3] || '';

  // Clean comma for parsing
  const cleanNumStr = numStr.replace(/,/g, '');
  const target = parseFloat(cleanNumStr);
  if (isNaN(target)) return null;

  const hasComma = numStr.includes(',');
  const dotIndex = cleanNumStr.indexOf('.');
  const decimals = dotIndex !== -1 ? cleanNumStr.length - dotIndex - 1 : 0;

  return {
    target,
    prefix,
    suffix,
    hasComma,
    decimals
  };
}

function formatCurrent(val, { prefix, suffix, hasComma, decimals }) {
  const fixed = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
  let [intPart, decPart] = fixed.split('.');

  if (hasComma) {
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const formattedNum = decPart !== undefined ? `${intPart}.${decPart}` : intPart;
  return `${prefix}${formattedNum}${suffix}`;
}

/**
 * AnimatedCounter: Counts up to the target value when visible in the viewport.
 * Honors prefers-reduced-motion and gracefully falls back for non-numeric content.
 */
export function AnimatedCounter({ value, duration = 1200, className = '' }) {
  const ref = useRef(null);
  const parsed = parseCountableValue(value);

  // If not countable, render as-is
  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  const [displayValue, setDisplayValue] = useState(() =>
    formatCurrent(0, parsed)
  );
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Check reduced motion
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      setHasAnimated(true);
      return;
    }

    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setDisplayValue(value);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.unobserve(element);

          const startTime = performance.now();
          const startVal = 0;
          const endVal = parsed.target;

          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out expo: fast start, soft landing
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = startVal + (endVal - startVal) * easeProgress;

            setDisplayValue(formatCurrent(current, parsed));

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setDisplayValue(value); // guarantee exact final string representation
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [value, duration, hasAnimated, parsed]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}

export default AnimatedCounter;
