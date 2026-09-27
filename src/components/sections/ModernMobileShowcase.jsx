import React, { useState, useRef } from 'react';
import { 
  Smartphone, Wifi, Battery, Receipt, Layers,
  CheckCheck, Sparkles, ExternalLink 
} from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import AppScreenGallery from './AppScreenGallery';
import AppSelectorGrid from './AppSelectorGrid';
import { useAppScreens } from '../../hooks/useAppScreens';
import { REAL_SALES_APP_SCREENS } from '../../data/mobileScreens';
import { APP_WHATSAPP_MESSAGES, getAppWhatsAppLink } from '../../utils/whatsapp';

export { APP_WHATSAPP_MESSAGES, getAppWhatsAppLink };

export function AppleIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.74 1.01.08 2.03-.5 2.64-1.24z"/>
    </svg>
  );
}

export function AndroidIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-1.0003 0-.5511.4482-.9993.9993-.9993.5516 0 .9997.4482.9997.9993 0 .5517-.4481 1.0003-.9997 1.0003m-11.046 0c-.5511 0-.9993-.4486-.9993-1.0003 0-.5511.4482-.9993.9993-.9993.5516 0 .9997.4482.9997.9993 0 .5517-.4481 1.0003-.9997 1.0003m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8.0805 12 8.0805c-1.8533 0-3.5902.3311-5.1328.8692L4.8449 5.4467a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
    </svg>
  );
}

// Coded mock screen data for specialized apps (POS / Restaurant / Medical)
const APP_SCREEN_DETAILS = {
  'mob-pos': {
    screenTitleAr: 'نقطة بيع سريعة (Mobile POS)',
    screenTitleEn: 'Mobile POS Checkout',
    clientAr: 'عميل نقدي - صالة العرض',
    clientSubAr: 'الوردية الأولى · كاشير رقم 02',
    invNum: '#POS-5521',
    totalAr: '380.00 ج.م',
    totalEn: '380.00 EGP',
    vatAr: 'مسدد نقداً بالكامل',
    vatEn: 'Paid Cash in Full',
    statusAr: 'تم السداد بنجاح',
    statusEn: 'Payment Complete',
    items: [
      { nameAr: 'قميص قطن كاجوال مقاس L', qty: '1 قطعة', price: '250.00' },
      { nameAr: 'حزام جلد طبيعي مقاس 110', qty: '1 قطعة', price: '130.00' }
    ],
    paymentAr: 'الخزينة: الصندوق الرئيسي - نقطة بيع POS',
    actionBtnAr: 'إتمام البيع وطباعة الإيصال'
  },
  'mob-restaurant': {
    screenTitleAr: 'طلب صالة - طاولة رقم 06',
    screenTitleEn: 'Dine-In Table 6 Order',
    clientAr: 'صالة العائلات - الطابق الثاني',
    clientSubAr: 'كابتن الطلب: إبراهيم حسن (4 أفراد)',
    invNum: '#ORD-094',
    totalAr: '560.00 ج.م',
    totalEn: '560.00 EGP',
    vatAr: 'مرسل آلياً لشاشة المطبخ',
    vatEn: 'Sent to Kitchen Screen',
    statusAr: 'قيد التحضير في المطبخ',
    statusEn: 'In Kitchen Prep',
    items: [
      { nameAr: 'وجبة مشويات مشكلة عائلية', qty: '1 وجبة', price: '420.00' },
      { nameAr: 'أطباق مقبلات وسلطات فريش', qty: '2 صحن', price: '60.00' },
      { nameAr: 'مشروبات وعصائر طبيعية', qty: '2 كوب', price: '80.00' }
    ],
    paymentAr: 'التحويل المباشر لنظام إدارة الصالة والشيكات',
    actionBtnAr: 'إرسال للمطبخ وطباعة الطلب'
  },
  'mob-medical': {
    screenTitleAr: 'سجل زيارة عيادة طبية',
    screenTitleEn: 'Medical Rep Clinic Visit',
    clientAr: 'د. طارق محمود - استشاري أطفال',
    clientSubAr: 'مجمع النور الطبي التخصصي - عيادة 204',
    invNum: '#VISIT-402',
    totalAr: 'زيارة مبرمجة ومسجلة',
    totalEn: 'Verified Doctor Visit',
    vatAr: 'تم تسجيل العينات المسلمة',
    vatEn: 'Sample Handover Logged',
    statusAr: 'زيارة منتهية ومعتمدة',
    statusEn: 'Completed Visit',
    items: [
      { nameAr: 'عقار مضاد حيوي شراب 250 مل', qty: '3 عينات', price: 'تسليم عينات' },
      { nameAr: 'كتيب إرشادي لدواعي الاستعمال', qty: '1 نسخة', price: 'مطبوعات' }
    ],
    paymentAr: 'ربط مباشر مع مستودع المنتجات والمخزن الرئيسي',
    actionBtnAr: 'حفظ تقرير الزيارة واعتماد السجل'
  }
};

export function ModernMobileShowcase({
  lang = 'ar',
  theme = 'dark',
  mobileApps = [],
  onSelectAppForQuote,
  formData = { interestedModules: [] }
}) {
  const safeApps = Array.isArray(mobileApps) && mobileApps.length > 0 ? mobileApps : [];
  const [activeAppId, setActiveAppId] = useState(safeApps[0]?.id || 'mob-sales');
  const [justAddedAppId, setJustAddedAppId] = useState(null);
  const swiperRef = useRef(null);

  const fallbackApp = {
    id: 'mob-sales',
    titleAr: 'تطبيق مندوب المبيعات',
    titleEn: 'Van Sales Rep App',
    featuresAr: ['فواتير بيع وسندات قبض', 'تحديد مسار المندوب بالـ GPS'],
    featuresEn: ['Sales invoices and payment receipts', 'GPS rep route tracking']
  };

  const currentApp = safeApps.find(a => a.id === activeAppId) || safeApps[0] || fallbackApp;
  const isSalesRepActive = activeAppId === 'mob-sales';

  // Custom hook managing screen rotation and gallery state
  const {
    activeScreenIndex,
    setActiveScreenIndex,
    currentRealScreen,
    isHovered,
    setIsHovered,
    isFullscreenModalOpen,
    setIsFullscreenModalOpen,
    nextScreen,
    prevScreen,
    screens
  } = useAppScreens(isSalesRepActive);

  const activeScreen = APP_SCREEN_DETAILS[activeAppId] || APP_SCREEN_DETAILS['mob-pos'];

  const headerBadge = activeAppId === 'mob-pos'
    ? (lang === 'ar' ? 'نظام POS' : 'POS System')
    : activeAppId === 'mob-restaurant'
    ? (lang === 'ar' ? 'نظام المطاعم' : 'Restaurant RMS')
    : activeAppId === 'mob-medical'
    ? (lang === 'ar' ? 'المندوب الطبي' : 'Medical CRM')
    : (lang === 'ar' ? 'مندوب المبيعات' : 'Van Sales');

  const headerStatus = activeAppId === 'mob-pos'
    ? (lang === 'ar' ? 'متصل بسيرفر POS ونقاط البيع' : 'Connected to POS Server')
    : activeAppId === 'mob-restaurant'
    ? (lang === 'ar' ? 'متصل بنظام شاشات المطبخ' : 'Connected to Kitchen KDS')
    : activeAppId === 'mob-medical'
    ? (lang === 'ar' ? 'متصل بمنظومة المندوبين' : 'Connected to Medical CRM')
    : (lang === 'ar' ? 'متصل بقاعدة البيانات الرئيسية' : 'Connected to Server');

  const headerTitle = activeAppId === 'mob-pos'
    ? (lang === 'ar' ? 'نايل تكنو POS' : 'Nile Techno POS')
    : (lang === 'ar' ? 'نايل تكنو موبايل' : 'Nile Techno Mobile');

  const handleRequestTrial = (e, appId) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onSelectAppForQuote) {
      onSelectAppForQuote(appId);
    }
    setJustAddedAppId(appId);
    const quoteEl = document.getElementById('quote-selection-group') || document.getElementById('contact');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      setJustAddedAppId(null);
    }, 4000);
  };

  const isInterestedInCurrent = (currentApp?.id && formData?.interestedModules) 
    ? formData.interestedModules.includes(currentApp.id) 
    : false;

  const scrollToAppIndex = (index) => {
    if (index >= 0 && index < safeApps.length) {
      const targetApp = safeApps[index];
      if (targetApp) {
        setActiveAppId(targetApp.id);
        if (swiperRef.current) {
          const children = swiperRef.current.children;
          if (children && children[index]) {
            children[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          }
        }
      }
    }
  };

  const currentIdx = safeApps.findIndex(a => a.id === activeAppId);

  return (
    <div className="w-full font-cairo">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Side: Real Handheld Smartphone Mockup */}
        <div className="lg:col-span-4 flex flex-col items-center justify-start order-2 lg:order-1 w-full px-2 sm:px-0">
          <PhoneMockup isHovered={isHovered} setIsHovered={setIsHovered}>
            {isSalesRepActive ? (
              <AppScreenGallery
                lang={lang}
                theme={theme}
                screens={screens}
                activeScreenIndex={activeScreenIndex}
                setActiveScreenIndex={setActiveScreenIndex}
                currentRealScreen={currentRealScreen}
                nextScreen={nextScreen}
                prevScreen={prevScreen}
                isFullscreenModalOpen={isFullscreenModalOpen}
                setIsFullscreenModalOpen={setIsFullscreenModalOpen}
              />
            ) : activeAppId === 'mob-medical' ? (
              <div className="relative w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center">
                <img
                  src={currentApp.imageUrl}
                  alt={lang === 'ar' ? currentApp.titleAr : currentApp.titleEn}
                  className="w-full h-full object-contain block select-none"
                  loading="eager"
                  decoding="async"
                />
                <span className="absolute top-7 left-3 right-3 z-20 inline-flex items-center justify-center gap-1.5 w-fit px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[9px] font-bold text-emerald-400 border border-emerald-500/30 font-cairo shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{lang === 'ar' ? 'صورة التطبيق الأصلية' : 'Original App Image'}</span>
                </span>
              </div>
            ) : (
              <div className="w-full h-full bg-[#070b14] text-white p-2.5 sm:p-3 pt-5 text-right flex flex-col justify-between">
                {/* Status Bar */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-slate-800/80 mb-2">
                  <span className="font-mono font-bold text-slate-200">09:41</span>
                  <div className="flex items-center gap-1.5 font-mono text-[9px]">
                    <span className="text-emerald-400 font-bold text-[8px] px-1 py-0.2 rounded bg-emerald-950/60 border border-emerald-800/40">5G</span>
                    <Wifi className="w-3 h-3 text-[#38bdf8]" />
                    <Battery className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                </div>

                {/* In-App Enterprise System Header */}
                <div className="flex items-center justify-between gap-1.5 p-1.5 sm:p-2 rounded-xl bg-slate-900/90 border border-slate-800/80 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-[#1a85ea] to-sky-400 flex items-center justify-center shrink-0 shadow-xs text-white">
                      <Smartphone className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-right min-w-0">
                      <div className="text-[10px] sm:text-[11px] font-bold text-white leading-tight truncate">
                        {headerTitle}
                      </div>
                      <div className="text-[8px] sm:text-[9px] text-emerald-400 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>{headerStatus}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#38bdf8] bg-[#1a85ea]/15 px-1.5 py-0.5 rounded-md border border-[#1a85ea]/40 font-mono shrink-0">
                    {headerBadge}
                  </span>
                </div>

                {/* App Screen Details */}
                <div className="space-y-2">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 space-y-0.5">
                    <div className="flex justify-between items-center text-[9px] sm:text-[10px]">
                      <span className="text-[#299df7] font-bold">
                        {activeScreen.screenTitleAr}
                      </span>
                      <span className="text-slate-400 font-mono text-[8px] sm:text-[9px]">
                        {activeScreen.invNum}
                      </span>
                    </div>
                    <div className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">
                      {activeScreen.clientAr}
                    </div>
                    <div className="text-[9px] text-slate-400 truncate">
                      {activeScreen.clientSubAr}
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-slate-300 pt-1 border-t border-slate-800/60">
                      <span className="text-slate-400 text-[8px]">{activeScreen.paymentAr}</span>
                      <span className="inline-flex items-center gap-1 text-[8px] text-emerald-400 font-bold">
                        <CheckCheck className="w-2.5 h-2.5" />
                        <span>{activeScreen.statusAr}</span>
                      </span>
                    </div>
                  </div>

                  {/* Line Items */}
                  <div className="bg-slate-900/80 rounded-xl p-1.5 sm:p-2 border border-slate-800/80 space-y-1 text-xs">
                    <div className="text-[9px] text-slate-400 font-bold border-b border-slate-800 pb-0.5 flex justify-between">
                      <span>البند / البيان</span>
                      <span>القيمة</span>
                    </div>
                    {activeScreen.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start text-[10px] py-0.5">
                        <div className="leading-snug pr-1 truncate">
                          <span className="text-slate-200 font-medium block truncate">{item.nameAr}</span>
                          <span className="text-[8px] text-slate-400">الكمية: {item.qty}</span>
                        </div>
                        <span className="font-mono text-[#74c1fb] font-bold shrink-0">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Total Summary */}
                  <div className="bg-slate-900/90 rounded-xl p-1.5 border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-slate-300 font-bold text-[10px] block">الإجمالي:</span>
                      <span className="text-[8px] text-slate-400">{activeScreen.vatAr}</span>
                    </div>
                    <span className="font-mono text-xs sm:text-sm font-extrabold text-emerald-400">{activeScreen.totalAr}</span>
                  </div>

                  {/* Back to real sales app quick link */}
                  <button
                    type="button"
                    onClick={() => setActiveAppId('mob-sales')}
                    className="w-full py-1.5 px-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-[10px] font-bold text-center flex items-center justify-center gap-1 cursor-pointer transition-transform active:scale-95"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{lang === 'ar' ? 'عرض صور تطبيق المندوب الحقيقي 📸' : 'View Real Sales Rep Screenshots'}</span>
                  </button>
                </div>

                {/* Bottom Navigation Bar */}
                <div className="flex items-center justify-around pt-2 border-t border-slate-800/80 text-slate-400">
                  <div className="flex flex-col items-center gap-0.5 text-[#299df7]">
                    <Smartphone className="w-3 h-3" />
                    <span className="text-[7px]">الرئيسية</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <Receipt className="w-3 h-3" />
                    <span className="text-[7px]">العمليات</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <Layers className="w-3 h-3" />
                    <span className="text-[7px]">التقارير</span>
                  </div>
                </div>
              </div>
            )}
          </PhoneMockup>

          {/* Interactive Screen Selector Pills (for Sales Rep App) */}
          {isSalesRepActive && (
            <div className="w-full max-w-[290px] xs:max-w-[310px] sm:max-w-[330px] md:max-w-[270px] lg:max-w-[290px] xl:max-w-[310px] mt-3 space-y-2">
              {/* Screen Title & Description */}
              <div className="p-2.5 rounded-xl border text-center transition-all bg-white border-slate-200 shadow-2xs dark:bg-slate-900/70 dark:border-slate-800">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#1a85ea] dark:text-[#38bdf8] mb-0.5">
                  <span>{currentRealScreen.id}.</span>
                  <span>{lang === 'ar' ? currentRealScreen.titleAr : currentRealScreen.titleEn}</span>
                </div>
                <p className="text-[11px] leading-tight line-clamp-2 text-slate-600 dark:text-slate-400">
                  {lang === 'ar' ? currentRealScreen.descAr : currentRealScreen.descEn}
                </p>
              </div>

              {/* Screen Quick Tabs */}
              <div className="grid grid-cols-3 gap-1.5">
                {REAL_SALES_APP_SCREENS.map((sc, sIdx) => {
                  const isCur = activeScreenIndex === sIdx;
                  return (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => setActiveScreenIndex(sIdx)}
                      className={`px-2 py-1.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer text-center flex items-center justify-center ${
                        isCur
                          ? 'bg-[#1a85ea] text-white border-[#1a85ea] shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:border-slate-800'
                      }`}
                      title={lang === 'ar' ? sc.titleAr : sc.titleEn}
                    >
                      <span className="truncate">{lang === 'ar' ? sc.shortAr : sc.shortEn}</span>
                    </button>
                  );
                })}
              </div>

              {/* Official Google Play Store Download Action */}
              <div className="pt-1.5 flex items-center justify-between text-xs">
                <a
                  href="https://play.google.com/store/apps/details?id=com.niletechno.salesperson_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[42px] py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-95 cursor-pointer font-cairo text-xs text-center"
                >
                  <AndroidIcon className="w-4 h-4 fill-current shrink-0" />
                  <span>{lang === 'ar' ? 'تطبيق المندوب على Google Play' : 'Get App on Google Play'}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80 shrink-0" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Dynamic Horizontal Swiper on Mobile & CSS Grid on Desktop */}
        <AppSelectorGrid
          lang={lang}
          safeApps={safeApps}
          activeAppId={activeAppId}
          setActiveAppId={setActiveAppId}
          currentApp={currentApp}
          currentIdx={currentIdx}
          swiperRef={swiperRef}
          scrollToAppIndex={scrollToAppIndex}
          handleRequestTrial={handleRequestTrial}
          justAddedAppId={justAddedAppId}
          isInterestedInCurrent={isInterestedInCurrent}
        />

      </div>
    </div>
  );
}

export default ModernMobileShowcase;
