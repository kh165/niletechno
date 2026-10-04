import React, { useEffect, useRef, useState, useMemo } from 'react';

/**
 * Parses numeric strings with prefixes (+), suffixes (%), thousands commas (,), and decimals.
 * Returns null if the value is non-numeric, a year (e.g. 2010), or complex like "24/7".
 */
function parseCountableValue(raw) {
  if (typeof raw === 'number') {
    // If it's a fixed founding year like 2010, don't animate from 0
    if (raw >= 1990 && raw <= 2030) {
      return null;
    }
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

  // If it's the established year (2010) or date string, keep static
  if (str === '2010' || str.includes('2010') || str.includes('/') || (str.includes('-') && !str.startsWith('-'))) {
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

// Digits keep a fixed width while counting so nothing around the number shifts.
const TABULAR_STYLE = { fontVariantNumeric: 'tabular-nums' };

/**
 * AnimatedCounter: counts up to the target value only when the number is
 * actually on screen (at least `startRatio` of it visible), and only after the
 * page + fonts have finished loading — so it never runs while the page boots.
 * Honors prefers-reduced-motion and gracefully falls back for non-numeric content.
 */
export function AnimatedCounter({ value, to, duration = 1200, className = '', startRatio = 0.6 }) {
  const targetValue = to !== undefined ? to : value;
  const ref = useRef(null);

  const parsed = useMemo(() => parseCountableValue(targetValue), [targetValue]);

  const [displayValue, setDisplayValue] = useState(() => {
    if (!parsed) return targetValue;
    return formatCurrent(0, parsed);
  });

  useEffect(() => {
    if (!parsed) {
      setDisplayValue(targetValue);
      return undefined;
    }

    setDisplayValue(formatCurrent(0, parsed));

    // Reduced motion: show the final value immediately
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(targetValue);
      return undefined;
    }

    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setDisplayValue(targetValue);
      return undefined;
    }

    let cancelled = false;
    let observer = null;
    let frame = 0;

    const startCount = () => {
      const startTime = performance.now();
      const tick = (now) => {
        if (cancelled) return;
        const progress = Math.min((now - startTime) / duration, 1);
        if (progress < 1) {
          // Ease out expo: fast start, soft landing
          const eased = 1 - Math.pow(2, -10 * progress);
          setDisplayValue(formatCurrent(parsed.target * eased, parsed));
          frame = requestAnimationFrame(tick);
        } else {
          setDisplayValue(targetValue); // guarantee exact final string
        }
      };
      frame = requestAnimationFrame(tick);
    };

    const observe = () => {
      if (cancelled) return;
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            startCount();
          }
        },
        // Needs to be clearly inside the screen (not just peeking in at the edge)
        { threshold: startRatio, rootMargin: '0px 0px -8% 0px' }
      );
      observer.observe(element);
    };

    const whenPageReady = () => {
      const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
      fontsReady.then(() => {
        if (cancelled) return;
        if (document.readyState === 'complete') {
          observe();
        } else {
          window.addEventListener('load', observe, { once: true });
        }
      });
    };

    whenPageReady();

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('load', observe);
    };
  }, [parsed, targetValue, duration, startRatio]);

  // If not countable, render as-is without breaking hook order
  if (!parsed) {
    return <span className={className}>{targetValue}</span>;
  }

  return (
    <span ref={ref} className={className} style={TABULAR_STYLE}>
      {displayValue}
    </span>
  );
}

export default AnimatedCounter;