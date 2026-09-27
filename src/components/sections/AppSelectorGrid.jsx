import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDown 
} from 'lucide-react';
import { IconComponent } from '../site/BrandVisuals';
import { getAppWhatsAppLink } from '../../utils/whatsapp';
import WhatsAppIcon from '../site/WhatsAppIcon';
import { Reveal } from '../site/ScrollExperience';

export default function AppSelectorGrid({
  lang = 'ar',
  safeApps = [],
  activeAppId,
  setActiveAppId,
  currentApp,
  currentIdx,
  swiperRef,
  scrollToAppIndex,
  handleRequestTrial,
  justAddedAppId,
  isInterestedInCurrent
}) {
  return (
    <Reveal className="lg:col-span-8 space-y-3 sm:space-y-4 order-1 lg:order-2" delay={0.1}>
      {/* Header Note with Mobile Controls */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <h3 className="text-base sm:text-lg font-bold font-cairo text-slate-900 dark:text-white">
            {lang === 'ar' ? 'اختر التطبيق لاستعراض شاشته الميدانية:' : 'Select an app to preview its live mobile UI:'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'ar' ? 'صور حقيقية 100% من داخل التطبيقات بدون أي تعديل' : '100% authentic mobile application screenshots'}
          </p>
        </div>

        {/* Mobile Prev / Next Arrows for effortless swiping */}
        <div className="flex sm:hidden items-center gap-1.5">
          <button
            type="button"
            onClick={() => scrollToAppIndex(currentIdx + 1)}
            disabled={currentIdx >= safeApps.length - 1}
            className="icon-btn !w-7 !h-7 !min-h-0 !p-0 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
            aria-label="Next app"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollToAppIndex(currentIdx - 1)}
            disabled={currentIdx <= 0}
            className="icon-btn !w-7 !h-7 !min-h-0 !p-0 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
            aria-label="Previous app"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <span className="hidden sm:inline-block text-xs text-[#1a85ea] dark:text-[#38bdf8] font-bold">
          {safeApps.length} {lang === 'ar' ? 'تطبيقات متخصصة' : 'Specialized Apps'}
        </span>
      </div>

      {/* Dynamic Responsive Container:
          On Mobile (<640px): Smooth Horizontal Swiper with CSS Snap
          On Desktop (>=640px): 2x2 CSS Grid
      */}
      <div 
        ref={swiperRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-3.5 pb-2 sm:pb-0 sm:grid sm:grid-cols-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {safeApps.map((app) => {
          const isSelected = activeAppId === app.id;
          const isAppSales = app.id === 'mob-sales';
          
          return (
            <div
              key={app.id}
              onClick={(e) => {
                e.preventDefault();
                setActiveAppId(app.id);
              }}
              className={`service-card-lift snap-center shrink-0 w-[82vw] max-w-[290px] sm:w-auto sm:max-w-none p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#1a85ea] shadow-md ring-2 ring-[#1a85ea]/20 hover:shadow-xl dark:bg-slate-900 dark:border-[#1a85ea] dark:shadow-lg dark:ring-1 dark:ring-[#1a85ea]/40 dark:hover:shadow-2xl'
                  : 'bg-slate-50/80 border-slate-200 hover:bg-white hover:border-[#1a85ea]/50 hover:shadow-lg dark:bg-slate-900/40 dark:border-slate-800 dark:hover:border-[#1a85ea]/50 dark:hover:bg-slate-900/70 dark:hover:shadow-xl'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className={`p-2 rounded-xl transition-colors ${
                      isSelected
                        ? 'bg-[#1a85ea] text-white shadow-xs'
                        : 'bg-slate-200/70 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      <IconComponent name={app.iconName || 'Smartphone'} className="w-4 h-4" />
                    </div>
                    {isAppSales && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold font-cairo">
                        {lang === 'ar' ? 'صور حقيقية 📸' : 'Live Photos'}
                      </span>
                    )}
                  </div>
                  
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border transition-all ${
                    isSelected
                      ? 'bg-[#1a85ea]/10 border-[#1a85ea]/30 text-[#1a85ea] dark:text-[#38bdf8] font-extrabold'
                      : 'bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-800/60 dark:border-slate-700 dark:text-slate-400'
                  }`}>
                    {isSelected ? (lang === 'ar' ? 'معروض بالشاشة' : 'Viewing') : (lang === 'ar' ? 'عرض الشاشة' : 'Select')}
                  </span>
                </div>

                <h4 className={`text-sm sm:text-[15px] font-bold font-cairo leading-snug mb-1.5 ${
                  isSelected 
                    ? 'text-[#1a85ea] dark:text-[#38bdf8]' 
                    : 'text-slate-900 dark:text-white'
                }`}>
                  {lang === 'ar' ? app.titleAr : app.titleEn}
                </h4>

                <p className="text-xs leading-relaxed line-clamp-2 text-slate-600 dark:text-slate-400">
                  {lang === 'ar' ? app.descriptionAr : app.descriptionEn}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                {isSelected ? (
                  <a
                    href={getAppWhatsAppLink(app.id, lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 min-h-[32px] px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold text-[11px] border border-emerald-500/25 transition-colors cursor-pointer"
                    title={lang === 'ar' ? 'طلب وشراء عبر واتساب مباشرة' : 'Order on WhatsApp'}
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-current shrink-0" />
                    <span>{lang === 'ar' ? 'طلب عبر واتساب 💬' : 'Order via WhatsApp'}</span>
                  </a>
                ) : (
                  <span className="text-[10px] text-slate-500">
                    {lang === 'ar' ? 'انقر للمعاينة' : 'Click to preview'}
                  </span>
                )}

                <ArrowUpRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-[#1a85ea] dark:text-[#38bdf8] translate-x-0.5 -translate-y-0.5' : 'text-slate-400'}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Swiper Pagination Dots */}
      <div className="flex sm:hidden items-center justify-center pt-1.5" role="group" aria-label={lang === 'ar' ? 'التنقل بين التطبيقات' : 'Choose a mobile app'}>
        <div className="screen-dots-container">
          {safeApps.map((app, idx) => (
            <button
              type="button"
              key={app.id}
              data-dot="true"
              onClick={() => scrollToAppIndex(idx)}
              className={`screen-dot ${activeAppId === app.id ? 'active' : ''}`}
              aria-current={activeAppId === app.id ? 'true' : undefined}
              aria-label={`Go to ${app.titleAr}`}
            />
          ))}
        </div>
      </div>

      {/* Detailed Features of the Selected App */}
      <div className="feature-block-lift p-4 sm:p-5 rounded-2xl border transition-all duration-300 bg-white border-slate-200 shadow-xs hover:border-[#1a85ea]/40 dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-[#1a85ea]/40">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-[#1a85ea]"></div>
          <h4 className="text-xs sm:text-sm font-bold font-cairo text-slate-900 dark:text-white">
            {lang === 'ar' ? `المزايا التشغيلية لـ (${currentApp?.titleAr || ''}):` : `Operational Features for ${currentApp?.titleEn || ''}:`}
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {((lang === 'ar' ? currentApp?.featuresAr : currentApp?.featuresEn) || []).map((feat, fIdx) => (
            <div key={fIdx} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1a85ea] shrink-0 mt-0.5" />
              <span className="text-xs leading-relaxed font-cairo text-slate-700 dark:text-slate-300">
                {feat}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-cairo text-slate-600 dark:text-slate-400">
              {lang === 'ar' 
                ? `تواصل فوري لطلب وتفعيل ${currentApp?.titleAr || 'التطبيق'} عبر رسالة واتساب مجهزة:` 
                : `Instant contact to order ${currentApp?.titleEn || 'this app'} via prepared WhatsApp message:`}
            </span>
          </div>

          <div className="mobile-app-actions grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:items-center sm:gap-2.5 w-full lg:w-auto justify-end">
            {/* Primary WhatsApp Order Button with tailored message */}
            <a
              href={getAppWhatsAppLink(currentApp?.id, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-app-action min-h-[36px] min-w-0 px-2.5 sm:px-3 py-1.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-emerald-600/20 bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95 font-cairo text-center leading-tight"
              title={lang === 'ar' ? 'طلب وشراء هذا التطبيق عبر واتساب' : 'Order via WhatsApp'}
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current shrink-0" />
              <span className="mobile-app-action-label truncate">
                {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
              </span>
              <ArrowUpRight className="w-3 h-3 shrink-0 opacity-80" />
            </a>

            {/* Secondary Button for Adding to Quote & Scrolling down */}
            <button
              type="button"
              onClick={(e) => currentApp?.id && handleRequestTrial(e, currentApp.id)}
              className={`mobile-app-action min-h-[36px] min-w-0 px-2.5 sm:px-3 py-1.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border active:scale-95 font-cairo shadow-xs text-center leading-tight ${
                justAddedAppId === currentApp?.id || isInterestedInCurrent
                  ? 'bg-[#1a85ea] border-[#1a85ea] text-white shadow-md shadow-[#1a85ea]/25'
                  : 'bg-blue-50/80 hover:bg-blue-100 border-[#1a85ea]/30 text-[#1a85ea] dark:bg-[#1a85ea]/15 dark:hover:bg-[#1a85ea]/25 dark:border-[#1a85ea]/40 dark:text-[#38bdf8]'
              }`}
              title={lang === 'ar' ? 'طلب عرض سعر في النموذج بالأسفل' : 'Request quote in form below'}
            >
              <ArrowDown className="w-3.5 h-3.5 shrink-0" />
              <span className="mobile-app-action-label truncate">
                {lang === 'ar' ? 'طلب السعر' : 'Get Quote'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
