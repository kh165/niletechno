import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, Check, Wifi, Battery, ChevronLeft, ChevronRight, CheckCircle2,
  Receipt, ArrowUpRight, ShieldCheck, CheckCheck, Layers, ShoppingBag
} from 'lucide-react';
import { IconComponent } from '../site/BrandVisuals';
import companyLogo from '../../assets/images/logo.webp';

export function ModernMobileShowcase({
  lang,
  theme,
  mobileApps,
  onSelectAppForQuote,
  formData
}) {
  const [activeAppId, setActiveAppId] = useState(mobileApps[0]?.id || 'mob-sales');
  const [justAddedAppId, setJustAddedAppId] = useState(null);
  const swiperRef = useRef(null);

  const currentApp = mobileApps.find(a => a.id === activeAppId) || mobileApps[0];

  // Authentic enterprise application screen data
  const appScreenDetails = {
    'mob-sales': {
      screenTitleAr: 'فاتورة مبيعات رقمية',
      screenTitleEn: 'Van Sales Invoice',
      clientAr: 'شركة النور للتجارة والتوزيع',
      clientSubAr: 'عميل جملة · رقم الحساب #8491',
      invNum: '#INV-2026-884',
      totalAr: '1,450.00 ج.م',
      totalEn: '1,450.00 EGP',
      vatAr: 'شامل ضريبة القيمة المضافة',
      vatEn: 'Incl. VAT',
      statusAr: 'فاتورة معتمدة',
      statusEn: 'Approved Invoice',
      items: [
        { nameAr: 'زيت ذرة ممتاز عبوة 1 لتر', qty: '5 كرتونة', price: '750.00' },
        { nameAr: 'أرز فاخر درجة أولى 25 كجم', qty: '2 شيكارة', price: '700.00' }
      ],
      paymentAr: 'طريقة السداد: آجل - دفعة نقدية مسددة',
      actionBtnAr: 'إصدار الفاتورة وتأكيد السداد'
    },
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

  const activeScreen = appScreenDetails[activeAppId] || appScreenDetails['mob-sales'];

  // Dynamic header branding based on active app (specifically POS connected for mob-pos)
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
    setTimeout(() => {
      setJustAddedAppId(null);
    }, 4000);
  };

  const isInterestedInCurrent = formData?.interestedModules?.includes(currentApp.id);

  // Swiper controls for mobile space-efficiency
  const scrollToAppIndex = (index) => {
    if (index >= 0 && index < mobileApps.length) {
      const targetApp = mobileApps[index];
      setActiveAppId(targetApp.id);
      if (swiperRef.current) {
        const children = swiperRef.current.children;
        if (children[index]) {
          children[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }
    }
  };

  const currentIdx = mobileApps.findIndex(a => a.id === activeAppId);

  return (
    <div className="w-full font-cairo">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Smartphone Handheld Device Mockup with Nile Techno Logo inside */}
        <div className="lg:col-span-5 flex justify-center order-2 lg:order-1 w-full">
          <div className="relative w-full max-w-[300px] sm:max-w-[325px] rounded-[40px] sm:rounded-[44px] p-2.5 sm:p-3 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] select-none">
            
            {/* Speaker & Punch-hole Camera */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-800/80 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0b72c9]/50"></div>
              </div>
              <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
            </div>

            {/* OLED Screen Surface */}
            <div className="w-full rounded-[36px] bg-[#070b14] text-white overflow-hidden flex flex-col justify-between p-4 pt-7 text-right border border-slate-800/50 shadow-inner">
              
              {/* Screen Top Status Bar */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800/80 mb-2">
                <span className="font-mono font-bold text-slate-200">09:41</span>
                <div className="flex items-center gap-2 font-mono text-[10px]">
                  <span className="text-emerald-400 font-bold text-[9px] px-1 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">5G</span>
                  <Wifi className="w-3.5 h-3.5 text-[#299df7]" />
                  <Battery className="w-4 h-4 text-slate-300" />
                </div>
              </div>

              {/* In-App Nile Techno Header with Real Logo */}
              <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-900/90 border border-slate-800/80 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-white/95 p-1 flex items-center justify-center shrink-0 shadow-xs">
                    <img 
                      src={companyLogo} 
                      alt="Nile Techno Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] font-bold text-white leading-tight">
                      {headerTitle}
                    </div>
                    <div className="text-[9px] text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>{headerStatus}</span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#299df7] bg-[#0b72c9]/15 px-2 py-0.5 rounded-md border border-[#0b72c9]/40 font-mono">
                  {headerBadge}
                </span>
              </div>

              {/* Dynamic Screen Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAppId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {/* App Title & Customer Banner */}
                  <div className="p-3 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-[#299df7] font-bold">
                        {activeScreen.screenTitleAr}
                      </span>
                      <span className="text-slate-400 font-mono text-[9px]">
                        {activeScreen.invNum}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white leading-tight">
                      {activeScreen.clientAr}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {activeScreen.clientSubAr}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1.5 border-t border-slate-800/60">
                      <span className="text-slate-400 text-[9px]">{activeScreen.paymentAr}</span>
                      <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 font-bold">
                        <CheckCheck className="w-3 h-3" />
                        <span>{activeScreen.statusAr}</span>
                      </span>
                    </div>
                  </div>

                  {/* Line Items Table */}
                  <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800/80 space-y-2 text-xs">
                    <div className="text-[10px] text-slate-400 font-bold border-b border-slate-800 pb-1 flex justify-between">
                      <span>البند / البيان</span>
                      <span>القيمة</span>
                    </div>
                    {activeScreen.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start text-[11px] py-0.5">
                        <div className="leading-snug pr-1">
                          <span className="text-slate-200 font-medium block text-[11px]">{item.nameAr}</span>
                          <span className="text-[10px] text-slate-400">الكمية: {item.qty}</span>
                        </div>
                        <span className="font-mono text-[#74c1fb] font-bold shrink-0">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Total Summary */}
                  <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-slate-300 font-bold text-[11px] block">الإجمالي:</span>
                      <span className="text-[9px] text-slate-400">{activeScreen.vatAr}</span>
                    </div>
                    <span className="font-mono text-sm font-extrabold text-emerald-400">{activeScreen.totalAr}</span>
                  </div>

                  {/* Action Button inside mobile UI */}
                  <div className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#0b72c9] to-blue-700 text-white text-[11px] font-bold text-center shadow-md shadow-[#0b72c9]/25 flex items-center justify-center gap-1.5">
                    {activeAppId === 'mob-pos' ? <ShoppingBag className="w-3.5 h-3.5" /> : <Receipt className="w-3.5 h-3.5" />}
                    <span>{activeScreen.actionBtnAr}</span>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* In-App Bottom Navigation Bar */}
              <div className="flex items-center justify-around pt-3 mt-3 border-t border-slate-800/80 text-[10px] text-slate-400">
                <div className="flex flex-col items-center gap-0.5 text-[#299df7]">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="text-[8px]">الرئيسية</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <Receipt className="w-3.5 h-3.5" />
                  <span className="text-[8px]">العمليات</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span className="text-[8px]">التقارير</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-[8px]">المزامنة</span>
                </div>
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="w-24 h-1 bg-slate-600 rounded-full mx-auto mt-2"></div>
            </div>

          </div>
        </div>

        {/* Right Side: Dynamic Horizontal Swiper on Mobile & CSS Grid on Desktop */}
        <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
          
          {/* Header Note with Mobile Controls */}
          <div className="flex items-center justify-between pb-1">
            <h3 className={`text-base sm:text-lg font-bold font-cairo ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              {lang === 'ar' ? 'اختر التطبيق لاستعراض شاشته الميدانية:' : 'Select an app to preview its live mobile UI:'}
            </h3>

            {/* Mobile Prev / Next Arrows for effortless swiping */}
            <div className="flex sm:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollToAppIndex(currentIdx - 1)}
                disabled={currentIdx === 0}
                className="w-7 h-7 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
                aria-label="Previous app"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollToAppIndex(currentIdx + 1)}
                disabled={currentIdx === mobileApps.length - 1}
                className="w-7 h-7 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
                aria-label="Next app"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            <span className="hidden sm:inline-block text-xs text-[#0b72c9] dark:text-[#299df7] font-bold">
              {mobileApps.length} {lang === 'ar' ? 'تطبيقات متخصصة' : 'Specialized Apps'}
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
            {mobileApps.map((app, idx) => {
              const isSelected = activeAppId === app.id;
              
              return (
                <div
                  key={app.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveAppId(app.id);
                  }}
                  className={`snap-center shrink-0 w-[82vw] max-w-[290px] sm:w-auto sm:max-w-none p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? (theme === 'light' 
                          ? 'bg-white border-[#0b72c9] shadow-md ring-2 ring-[#0b72c9]/20' 
                          : 'bg-slate-900 border-[#0b72c9] shadow-lg ring-1 ring-[#0b72c9]/40')
                      : (theme === 'light' 
                          ? 'bg-slate-50/80 border-slate-200 hover:bg-white hover:border-slate-300' 
                          : 'bg-slate-900/40 border-slate-800 hover:border-slate-700/80 hover:bg-slate-900/70')
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className={`p-2 rounded-xl transition-colors ${
                        isSelected 
                          ? 'bg-gradient-to-tr from-[#0b72c9] to-blue-700 text-white shadow-xs' 
                          : (theme === 'light' ? 'bg-slate-200 text-slate-700' : 'bg-slate-800 text-slate-300')
                      }`}>
                        <IconComponent name={app.iconName} className="w-5 h-5" />
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all ${
                        isSelected
                          ? 'bg-[#0b72c9]/10 border-[#0b72c9]/30 text-[#0b72c9] dark:text-[#299df7] font-extrabold'
                          : (theme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-slate-800/60 border-slate-700 text-slate-400')
                      }`}>
                        {isSelected ? (lang === 'ar' ? 'معروض بالشاشة' : 'Viewing') : (lang === 'ar' ? 'عرض الشاشة' : 'Select')}
                      </span>
                    </div>

                    <h4 className={`text-sm sm:text-[15px] font-bold font-cairo leading-snug mb-1.5 ${
                      isSelected 
                        ? 'text-[#0b72c9] dark:text-[#299df7]' 
                        : (theme === 'light' ? 'text-slate-900' : 'text-white')
                    }`}>
                      {lang === 'ar' ? app.titleAr : app.titleEn}
                    </h4>

                    <p className={`text-xs leading-relaxed line-clamp-2 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                      {lang === 'ar' ? app.descriptionAr : app.descriptionEn}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className={`text-[10px] ${isSelected ? 'text-[#0b72c9] dark:text-[#299df7] font-bold' : (theme === 'light' ? 'text-slate-500' : 'text-slate-500')}`}>
                      {lang === 'ar' ? 'انقر للتبديل الفوري' : 'Click to preview'}
                    </span>
                    <ArrowUpRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-[#0b72c9] dark:text-[#299df7] translate-x-0.5 -translate-y-0.5' : 'text-slate-400'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Swiper Pagination Dots */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 pt-1">
            {mobileApps.map((app, idx) => (
              <button
                type="button"
                key={app.id}
                onClick={() => scrollToAppIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeAppId === app.id
                    ? 'w-6 bg-[#0b72c9]'
                    : 'w-1.5 bg-slate-300 dark:bg-slate-700'
                }`}
                aria-label={`Go to ${app.titleAr}`}
              />
            ))}
          </div>

          {/* Detailed Features of the Selected App */}
          <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
            theme === 'light' ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/60 border-slate-800'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#0b72c9]"></div>
              <h4 className={`text-xs sm:text-sm font-bold font-cairo ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                {lang === 'ar' ? `المزايا التشغيلية لـ (${currentApp.titleAr}):` : `Operational Features for ${currentApp.titleEn}:`}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(lang === 'ar' ? currentApp.featuresAr : currentApp.featuresEn).map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0b72c9] shrink-0 mt-0.5" />
                  <span className={`text-xs leading-relaxed font-cairo ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Action Button */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className={`text-xs font-cairo ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                {lang === 'ar' 
                  ? 'يمكنك تجربة هذا التطبيق وربطه بقاعدة بيانات تجريبية فوراً.' 
                  : 'You can test this app connected to our demo database.'}
              </span>

              <button
                type="button"
                onClick={(e) => handleRequestTrial(e, currentApp.id)}
                className={`min-h-[42px] px-5 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 w-full sm:w-auto shadow-sm active:scale-95 ${
                  justAddedAppId === currentApp.id || isInterestedInCurrent
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-gradient-to-r from-[#0b72c9] to-blue-700 hover:from-[#0a66b4] hover:to-blue-800 text-white shadow-[#0b72c9]/25'
                }`}
              >
                {justAddedAppId === currentApp.id || isInterestedInCurrent ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'تمت الإضافة لطلب العرض' : 'Added to Quote Request'}</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-4 h-4" />
                    <span>{lang === 'ar' ? `طلب تجربة ${currentApp.titleAr}` : `Request Trial for ${currentApp.titleEn}`}</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
