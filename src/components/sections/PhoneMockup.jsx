import React from 'react';

/**
 * Modern Clean Showcase Frame for Mobile Applications.
 * Sleek, properly sized display on the website without artificial phone chassis, notches, or speaker cutouts.
 */
export default function PhoneMockup({
  children,
  isHovered,
  setIsHovered,
  className = ''
}) {
  return (
    <div 
      onMouseEnter={() => setIsHovered?.(true)}
      onMouseLeave={() => setIsHovered?.(false)}
      className={`app-showcase-frame relative flex flex-col items-center justify-center select-none transition-all duration-300 group ${className}`.trim()}
    >
      {/* Sleek, sized display container directly on the website */}
      <div className="relative w-auto h-[380px] xs:h-[410px] sm:h-[440px] md:h-[460px] aspect-[1080/2281] max-w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black border-2 border-slate-700/80 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] hover:shadow-[0_24px_50px_-10px_rgba(26,133,234,0.25)] flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
