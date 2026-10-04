import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

// useLayoutEffect runs before the browser paints, which is what lets us decide
// "visible or hidden" without ever flashing the wrong state on screen.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * useScrollReveal: Lightweight, performant hook for single-trigger viewport reveal.
 * - Elements already on screen at mount are revealed before the first paint (no flash).
 * - Elements below the fold start hidden and fade in once when they enter the viewport.
 * - Returns true immediately if reduced motion is preferred or IntersectionObserver is unavailable.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const threshold = options.threshold ?? 0.15;
  const rootMargin = options.rootMargin ?? '0px 0px -40px 0px';

  useIsomorphicLayoutEffect(() => {
    // Respect reduced motion
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return undefined;
    }

    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true);
      return undefined;
    }

    // Already inside the viewport at mount: show right away, before the first paint.
    const rect = element.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight - 40) {
      setIsRevealed(true);
      return undefined;
    }

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
  }, [threshold, rootMargin]);

  return [ref, isRevealed];
}

/**
 * Reveal: Smooth, non-intrusive container wrapper.
 * Fades in once, without vertical translation, to preserve stable scroll geometry.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 20, // kept for backwards compatibility (intentionally unused)
  as: Component = 'div',
  style: userStyle = {},
  ...props
}) {
  const [ref, isRevealed] = useScrollReveal();

  const animatedStyle = {
    opacity: isRevealed ? 1 : 0,
    transition: `opacity 0.4s ease-out ${delay}s`,
    ...userStyle
  };

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