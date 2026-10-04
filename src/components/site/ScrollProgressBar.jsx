import React, { useEffect, useRef } from 'react';

/**
 * ScrollProgressBar: A thin (3px) fixed gradient bar at the very top of the screen
 * indicating scroll progression across the entire page.
 * Uses a transform (scaleX) written straight to the DOM — no React state, no re-renders,
 * no layout work on scroll — so it stays smooth at 60fps.
 */
export function ScrollProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      ticking = false;
      const bar = barRef.current;
      if (!bar) return;

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const ratio = scrollHeight > 0 ? Math.min(Math.max(currentScroll / scrollHeight, 0), 1) : 0;

      // The bar grows from the reading-start side (right in Arabic, left in English)
      bar.style.transformOrigin = document.documentElement.dir === 'rtl' ? 'right center' : 'left center';
      bar.style.transform = `scaleX(${ratio})`;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Re-evaluate when the page direction changes (language switch)
    const dirObserver = new MutationObserver(handleScroll);
    dirObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });

    // Initial calculation
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      dirObserver.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[3px] pointer-events-none select-none z-[100]"
    >
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 shadow-[0_1px_8px_rgba(6,182,212,0.4)]"
        style={{ transform: 'scaleX(0)', willChange: 'transform' }}
      />
    </div>
  );
}

export default ScrollProgressBar;