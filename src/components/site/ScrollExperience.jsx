import React, { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal: Lightweight, performant hook for single-trigger viewport reveal.
 * Progressive enhancement: Returns true immediately if reduced motion is preferred
 * or if IntersectionObserver is unavailable.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Respect reduced motion
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true);
      return;
    }

    const threshold = options.threshold ?? 0.15;
    const rootMargin = options.rootMargin ?? '0px 0px -40px 0px';

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isRevealed];
}

/**
 * Reveal: Smooth, non-intrusive container wrapper.
 * Initial state (opacity: 1) is preserved before hydration / mounting for SEO & JS-disabled environments.
 * Once mounted, if not yet revealed, smoothly animates into view once.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 20,
  as: Component = 'div',
  style: userStyle = {},
  ...props
}) {
  const [ref, isRevealed] = useScrollReveal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Progressive enhancement:
  // If not mounted yet, render with default styles (opacity 1).
  // Once mounted, apply the animation state.
  const animatedStyle = mounted
    ? {
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'translate3d(0, 0, 0)' : `translate3d(0, ${y}px, 0)`,
        transition: `opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: isRevealed ? 'auto' : 'opacity, transform',
        ...userStyle
      }
    : userStyle;

  return (
    <Component ref={ref} className={className} style={animatedStyle} {...props}>
      {children}
    </Component>
  );
}

// Preserve existing exports for backwards compatibility
export function DeferredSection({ children }) {
  return <>{children}</>;
}

export function ScrollExperience() {
  return null;
}

export default Reveal;
