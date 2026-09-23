import React from 'react';

export function SectionSeparator({ theme = 'dark' }) {
  const isLight = theme === 'light';

  return (
    <div 
      className="relative w-full py-3 sm:py-5 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10" 
      aria-hidden="true"
    >
      {/* Soft ambient center glow */}
      <div 
        className={`absolute w-44 sm:w-64 h-3 rounded-full blur-xl pointer-events-none transition-colors duration-300 ${
          isLight ? 'bg-cyan-500/10' : 'bg-cyan-500/15'
        }`} 
      />

      {/* Hairline gradient line fading seamlessly to transparent at both ends */}
      <div 
        className={`w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl h-[1px] bg-gradient-to-r transition-colors duration-300 ${
          isLight
            ? 'from-transparent via-slate-300/80 to-transparent'
            : 'from-transparent via-cyan-500/30 to-transparent'
        }`} 
      />

      {/* Center micro decorative jewel */}
      <div 
        className={`absolute px-3 py-0.5 flex items-center gap-1.5 transition-colors duration-300 ${
          isLight ? 'bg-slate-50' : 'bg-[#060c1a]'
        }`}
      >
        <span className={`w-1 h-1 rounded-full ${isLight ? 'bg-slate-300' : 'bg-cyan-500/50'}`} />
        <span 
          className={`w-1.5 h-1.5 rotate-45 border ${
            isLight 
              ? 'border-cyan-500/60 bg-cyan-50' 
              : 'border-cyan-400/70 bg-[#081226] shadow-[0_0_8px_rgba(6,182,212,0.35)]'
          }`} 
        />
        <span className={`w-1 h-1 rounded-full ${isLight ? 'bg-slate-300' : 'bg-cyan-500/50'}`} />
      </div>
    </div>
  );
}

export default SectionSeparator;
