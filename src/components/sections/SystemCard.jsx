import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Check, ChevronDown, ChevronUp, Play, ArrowDown } from 'lucide-react';
import { IconComponent } from '../site/BrandVisuals';

export default function SystemCard({
  sys,
  lang,
  theme,
  t,
  isInterested,
  isExpanded,
  toggleExpand,
  handleOpenVideo,
  handleRequestQuote,
  handleCardMouseMove
}) {
  const features = (lang === 'ar' ? sys.featuresAr : sys.featuresEn) || [];
  const visibleFeatures = isExpanded ? features : features.slice(0, 3);
  const featuresRef = useRef(null);

  // When the card collapses, jump the inner scroll back to the top
  useEffect(() => {
    if (!isExpanded && featuresRef.current) {
      featuresRef.current.scrollTop = 0;
    }
  }, [isExpanded]);

  return (
    <motion.div
      key={sys.id}
      whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] } }}
      whileTap={{ scale: 0.99 }}
      onMouseMove={handleCardMouseMove}
      className="service-card-spotlight group h-full rounded-2xl border p-4 flex flex-col justify-between transition-all duration-300 relative overflow-hidden cursor-default bg-gradient-to-b from-white via-white to-slate-50/80 border-slate-200/90 hover:border-[#1a85ea]/50 shadow-sm hover:shadow-xl hover:shadow-[#1a85ea]/15 dark:from-[#091124] dark:via-[#091124] dark:to-[#070d1d] dark:border-slate-800 dark:hover:border-[#1a85ea]/60 dark:shadow-md dark:hover:shadow-2xl dark:hover:shadow-[#1a85ea]/25"
    >
      {/* Subtle top glow line on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#1a85ea] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      {/* Mouse-following spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: 'radial-gradient(360px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(26, 133, 234, 0.16), rgba(56, 189, 248, 0.08) 45%, transparent 75%)'
        }}
      />

      {/* Ambient glow */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#1a85ea]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10">
        {/* Icon + Title on one row (fixed 2-line title slot so every card lines up) */}
        <div className="flex items-start gap-3 mb-2.5">
          <div
            className="p-2.5 rounded-xl shrink-0 transition-all duration-300 transform group-hover:scale-110 group-hover:-rotate-3 bg-[#1a85ea]/10 text-[#1a85ea] group-hover:bg-[#1a85ea] group-hover:text-white group-hover:shadow-md group-hover:shadow-[#1a85ea]/30 dark:bg-slate-800/80 dark:text-[#38bdf8] dark:group-hover:bg-[#1a85ea] dark:group-hover:text-white dark:group-hover:shadow-lg dark:group-hover:shadow-[#1a85ea]/40"
          >
            <IconComponent name={sys.iconName} className="w-5 h-5 transition-transform duration-300" />
          </div>

          <h4 className="min-h-[2.6rem] flex items-center text-[15px] sm:text-base font-bold font-cairo leading-snug group-hover:text-[#1a85ea] dark:group-hover:text-[#38bdf8] transition-colors duration-200 text-slate-900 dark:text-white">
            {lang === 'ar' ? sys.titleAr : sys.titleEn}
          </h4>
        </div>

        {/* Description (fixed 2-line slot) */}
        <p className="min-h-[2.5rem] text-xs leading-relaxed mb-3 line-clamp-2 transition-colors text-slate-600 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300">
          {lang === 'ar' ? sys.descriptionAr : sys.descriptionEn}
        </p>

        {/* Features: one short fixed-height box so every card keeps the same size.
            Collapsed = first features with a soft fade at the bottom.
            Expanded  = ALL features, scrolling inside the same box with a slim styled scrollbar. */}
        <div
          ref={featuresRef}
          className={`h-[6.25rem] space-y-1.5 mb-2 ${
            isExpanded
              ? 'overflow-y-auto overscroll-contain nt-scroll'
              : 'overflow-hidden [mask-image:linear-gradient(to_bottom,#000_68%,transparent)]'
          }`}
        >
          {visibleFeatures.map((feat, fIdx) => (
            <div key={fIdx} className="flex items-start gap-2 text-xs">
              <Check className="w-3.5 h-3.5 text-[#1a85ea] shrink-0 mt-0.5" />
              <span className="leading-relaxed text-slate-700 dark:text-slate-300">
                {feat}
              </span>
            </div>
          ))}
        </div>

        {/* Toggle */}
        <button
          type="button"
          onClick={(e) => toggleExpand(e, sys.id)}
          aria-expanded={isExpanded}
          className="text-[11px] font-bold text-[#1a85ea] dark:text-[#38bdf8] hover:underline flex items-center gap-1 mb-3 cursor-pointer"
        >
          <span>
            {isExpanded
              ? (lang === 'ar' ? 'عرض الأقل' : 'Show less')
              : (lang === 'ar' ? `عرض كل المزايا (${features.length})` : `View all features (${features.length})`)}
          </span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Actions Footer */}
      <div className="pt-3 border-t flex flex-col gap-2 mt-auto relative z-10 border-slate-100 dark:border-slate-800">
        <div className="system-card-actions grid grid-cols-2 gap-2 w-full sm:flex sm:flex-row sm:items-center sm:justify-between sm:w-auto">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleOpenVideo(sys.youtubeUrl, lang === 'ar' ? sys.titleAr : sys.titleEn);
            }}
            className="system-card-video-button min-h-[36px] min-w-0 px-2 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-[#0f5aa3] dark:text-[#7dd3fc] hover:text-[#0f5aa3] dark:hover:text-[#7dd3fc] bg-blue-50/90 dark:bg-[#0c263e] hover:bg-blue-100 dark:hover:bg-[#0c3557] border border-blue-200/80 dark:border-blue-700/50 flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer text-center leading-tight"
          >
            <Play className="w-3.5 h-3.5 text-[#1a85ea] fill-current shrink-0" />
            <span className="system-card-video-label truncate">{t.showDemo}</span>
          </button>

          <button
            type="button"
            onClick={(e) => handleRequestQuote(e, sys.id)}
            className={`min-h-[36px] min-w-0 px-2 sm:px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 text-center leading-tight ${
              isInterested
                ? 'bg-blue-50 dark:bg-blue-950/40 border-[#1a85ea] text-[#1a85ea] dark:text-[#38bdf8] shadow-xs'
                : 'bg-slate-50 hover:bg-[#1a85ea] hover:text-white hover:border-[#1a85ea] border-slate-300 text-slate-800 shadow-2xs hover:shadow-md hover:shadow-[#1a85ea]/20 dark:bg-slate-900 dark:hover:bg-[#1a85ea] dark:hover:text-white dark:hover:border-[#1a85ea] dark:border-slate-700 dark:text-slate-200 dark:hover:shadow-lg dark:hover:shadow-[#1a85ea]/30'
            }`}
          >
            <ArrowDown className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{lang === 'ar' ? 'طلب السعر' : 'Get Quote'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}