import React, { useEffect, useState } from 'react';

/**
 * ScrollProgressBar: A thin (3px) fixed gradient bar at the very top of the screen
 * indicating scroll progression across the entire page with smooth 60fps performance.
 */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const currentScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        const currentPercent = Math.min(Math.max((currentScroll / scrollHeight) * 100, 0), 100);
        setProgress(currentPercent);
      } else {
        setProgress(0);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial calculation
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[3px] pointer-events-none select-none z-[100]"
    >
      <div
        className="h-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 transition-all duration-75 ease-out shadow-[0_1px_8px_rgba(6,182,212,0.4)]"
        style={{
          width: `${progress}%`,
          transformOrigin: 'left center'
        }}
      />
    </div>
  );
}

export default ScrollProgressBar;
