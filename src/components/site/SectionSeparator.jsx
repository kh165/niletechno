import React from 'react';

export function SectionSeparator({ theme = 'dark', className = '' }) {
  const isLight = theme === 'light';

  return (
    <div 
      className={`relative w-full py-4 sm:py-6 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10 ${className}`} 
      aria-hidden="true"
    >
      {/* 1. Ultra-soft horizontal color transition aura (gradient fade) */}
      <div 
        className={`absolute inset-x-0 h-10 sm:h-12 w-full max-w-4xl mx-auto rounded-full blur-2xl pointer-events-none transition-all duration-500 ${
          isLight 
            ? 'bg-gradient-to-r from-transparent via-cyan-500/[0.08] via-blue-500/[0.06] to-transparent' 
            : 'bg-gradient-to-r from-transparent via-cyan-500/[0.12] via-blue-600/[0.09] to-transparent'
        }`} 
      />

      {/* 2. Soft horizontal hairline with subtle cyan-to-blue gradient transition */}
      <div 
        className={`w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl h-[1.5px] bg-gradient-to-r transition-all duration-500 ${
          isLight
            ? 'from-transparent via-slate-200/90 via-cyan-500/35 via-blue-400/25 via-slate-200/90 to-transparent'
            : 'from-transparent via-slate-800/80 via-cyan-400/40 via-blue-500/35 via-slate-800/80 to-transparent'
        }`} 
      />

      {/* 3. Center subtle micro jewel */}
      <div 
        className={`absolute px-3.5 py-0.5 flex items-center gap-1.5 rounded-full transition-colors duration-300 ${
          isLight ? 'bg-white/90 shadow-2xs' : 'bg-[#0f172a]/95'
        }`}
      >
        <span className={`w-1 h-1 rounded-full ${isLight ? 'bg-cyan-500/40' : 'bg-cyan-400/40'}`} />
        <span 
          className={`w-1.5 h-1.5 rotate-45 border transition-colors ${
            isLight 
              ? 'border-cyan-500/50 bg-cyan-50' 
              : 'border-cyan-400/60 bg-[#131d35]'
          }`} 
        />
        <span className={`w-1 h-1 rounded-full ${isLight ? 'bg-cyan-500/40' : 'bg-cyan-400/40'}`} />
      </div>
    </div>
  );
}

export default SectionSeparator;
