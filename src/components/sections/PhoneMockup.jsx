import React from 'react';

/**
 * Handheld Smartphone Chassis & Bezel.
 * Proportionate and balanced across mobile, medium (tablet), and large desktop screens.
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
      className={`mobile-phone-frame feature-block-lift relative w-full max-w-[290px] xs:max-w-[310px] sm:max-w-[330px] md:max-w-[270px] lg:max-w-[290px] xl:max-w-[310px] rounded-[36px] sm:rounded-[42px] p-1.5 sm:p-2.5 bg-gradient-to-b from-slate-750 via-slate-900 to-slate-950 border-2 border-slate-700/80 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] hover:shadow-[0_28px_60px_-10px_rgba(26,133,234,0.3)] select-none transition-all duration-300 group ${className}`.trim()}
    >
      {/* Top Speaker & Punch-hole Camera */}
      <div className="absolute top-2.5 sm:top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2 pointer-events-none">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-black border border-slate-750 flex items-center justify-center">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#1a85ea]/70"></div>
        </div>
        <div className="w-9 sm:w-11 h-1 bg-slate-800 rounded-full"></div>
      </div>

      {/* Phone Screen Surface */}
      <div className="relative w-full aspect-[1080/2281] rounded-[26px] sm:rounded-[32px] overflow-hidden bg-black shadow-inner flex flex-col justify-between">
        {children}
        
        {/* Bottom Home Indicator Bar */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-0.5 sm:h-1 bg-slate-500/60 rounded-full pointer-events-none z-30"></div>
      </div>
    </div>
  );
}
