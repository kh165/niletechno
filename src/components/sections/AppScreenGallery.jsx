import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

export function AndroidIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-1.0003 0-.5511.4482-.9993.9993-.9993.5516 0 .9997.4482.9997.9993 0 .5517-.4481 1.0003-.9997 1.0003m-11.046 0c-.5511 0-.9993-.4486-.9993-1.0003 0-.5511.4482-.9993.9993-.9993.5516 0 .9997.4482.9997.9993 0 .5517-.4481 1.0003-.9997 1.0003m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8.0805 12 8.0805c-1.8533 0-3.5902.3311-5.1328.8692L4.8449 5.4467a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
    </svg>
  );
}

export default function AppScreenGallery({
  lang,
  theme,
  screens = [],
  activeScreenIndex,
  setActiveScreenIndex,
  currentRealScreen,
  nextScreen,
  prevScreen,
  isFullscreenModalOpen,
  setIsFullscreenModalOpen
}) {
  return (
    <>
      {/* 1. In-Phone Screenshot Viewport */}
      <div className="relative w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center">
        {/* The Real Application Screenshot */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRealScreen.id}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="w-full h-full flex items-center justify-center cursor-pointer"
            onClick={() => setIsFullscreenModalOpen(true)}
            title={lang === 'ar' ? 'انقر لتكبير الشاشة الأصلية بالكامل' : 'Click to expand original screenshot'}
          >
            <img
              src={currentRealScreen.image}
              alt={lang === 'ar' ? currentRealScreen.titleAr : currentRealScreen.titleEn}
              className="w-full h-full object-cover block select-none pointer-events-none"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </AnimatePresence>

        {/* Top Badges & Expand Trigger */}
        <div className="absolute top-7 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-[9px] font-bold text-white border border-white/15 font-cairo shadow-sm">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
            <span>{currentRealScreen.id}/6</span>
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreenModalOpen(true);
            }}
            className="w-6 h-6 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-transform active:scale-90 pointer-events-auto cursor-pointer"
            title={lang === 'ar' ? 'عرض ملء الشاشة' : 'Fullscreen'}
            aria-label="Expand image"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation Arrows on Screen */}
        <button
          type="button"
          onClick={prevScreen}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg opacity-80 hover:opacity-100"
          aria-label="Previous screenshot"
          title={lang === 'ar' ? 'الشاشة السابقة' : 'Previous screen'}
        >
          <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        <button
          type="button"
          onClick={nextScreen}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg opacity-80 hover:opacity-100"
          aria-label="Next screenshot"
          title={lang === 'ar' ? 'الشاشة التالية' : 'Next screen'}
        >
          <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {/* Bottom Clean Dots Indicator (نقط نظيفة وخفيفة بدون كبسولة ضخمة) */}
        <div className="absolute bottom-2.5 left-0 right-0 z-20 flex justify-center items-center pointer-events-none">
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-xs pointer-events-auto"
            role="group" 
            aria-label={lang === 'ar' ? 'اختيار شاشة التطبيق' : 'Choose app screenshot'}
          >
            {screens.map((sc, sIdx) => {
              const isCur = activeScreenIndex === sIdx;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveScreenIndex(sIdx);
                  }}
                  className={`transition-all duration-200 cursor-pointer rounded-full p-0 border-0 ${
                    isCur
                      ? 'w-2 h-2 bg-[#1a85ea] ring-1 ring-white/70 shadow-xs'
                      : 'w-1.5 h-1.5 bg-white/45 hover:bg-white/80'
                  }`}
                  aria-current={isCur ? 'true' : undefined}
                  title={lang === 'ar' ? sc.titleAr : sc.titleEn}
                  aria-label={`Go to ${sc.titleAr}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Lightbox Modal */}
      <AnimatePresence>
        {isFullscreenModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreenModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          >
            <div 
              className="relative max-w-sm sm:max-w-md w-full max-h-[92vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsFullscreenModalOpen(false)}
                className="absolute -top-11 right-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black">
                <img
                  src={currentRealScreen.image}
                  alt={lang === 'ar' ? currentRealScreen.titleAr : currentRealScreen.titleEn}
                  className="w-full max-h-[80vh] object-contain block"
                />
              </div>

              <div className="mt-3 text-center text-white space-y-1">
                <div className="text-sm font-bold font-cairo">
                  {currentRealScreen.id}. {lang === 'ar' ? currentRealScreen.titleAr : currentRealScreen.titleEn}
                </div>
                <div className="text-xs text-slate-300 font-cairo">
                  {lang === 'ar' ? currentRealScreen.descAr : currentRealScreen.descEn}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
