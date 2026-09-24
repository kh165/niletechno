import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, Check, Wifi, Battery, ChevronLeft, ChevronRight, CheckCircle2,
  Receipt, ArrowUpRight, ShieldCheck, CheckCheck, Layers, ShoppingBag, MessageSquare, ArrowDown
} from 'lucide-react';
import { IconComponent } from '../site/BrandVisuals';

// Tailored, grammatically correct and elegant Arabic WhatsApp messages for each mobile app
export const APP_WHATSAPP_MESSAGES = {
  'mob-sales': {
    ar: `السلام عليكم ورحمة الله وبركاته،

أود الاستفسار وطلب تفاصيل وعرض سعر "تطبيق مندوب المبيعات الميداني الذكي (Android & iOS)" من شركة نايل تكنو للبرمجيات.

المطلوب معرفته:
• تكلفة الترخيص وتفاصيل التفعيل
• آلية الربط والتزامن مع النظام المحاسبي
• دعم طباعة الفواتير المحمولة وتتبع المناديب بالـ GPS

شاكراً لكم حسن تعاونكم ومتابعتكم.`,
    en: `Hello Nile Techno Sales Team,

I would like to inquire about and purchase the "Smart Sales Representative App (Android & iOS)".

Please provide details on:
• Pricing and licensing options
• Accounting ERP integration
• Portable thermal printing & GPS tracking

Thank you.`
  },
  'mob-pos': {
    ar: `السلام عليكم ورحمة الله وبركاته،

أود الاستفسار والتعاقد بخصوص "تطبيق نقطة البيع للموبايل المحمول (Mobile POS)" من شركة نايل تكنو.

المطلوب معرفته:
• تكلفة تفعيل نقاط البيع المحمولة
• آلية العمل دون اتصال بالإنترنت (Offline Mode)
• ربط طابعات البلوتوث المحمولة وقراءة الباركود

شاكراً لكم حسن تعاونكم ومتابعتكم.`,
    en: `Hello Nile Techno Sales Team,

I would like to order the "Mobile POS Terminal App".

Please provide details on:
• Portable POS licensing & setup
• Offline transaction syncing
• Bluetooth printer compatibility

Thank you.`
  },
  'mob-restaurant': {
    ar: `السلام عليكم ورحمة الله وبركاته،

أود الاستفسار والطلب بشأن "تطبيق كابتن الصالة والنادل الذكي ومتابعة المطبخ" للمطاعم والكافيهات.

المطلوب معرفته:
• أسعار التطبيق وتجهيزه على التابلت والموبايل
• آلية الربط المباشر بشاشات وطابعات المطبخ (KDS)
• دعم المنيو الرقمي وإدارة شاشات الطاولات

شاكراً لكم حسن تعاونكم ومتابعتكم.`,
    en: `Hello Nile Techno Sales Team,

I would like to order the "Smart Waiter & Kitchen Display App" for restaurant operations.

Please provide details on:
• Pricing for tablets and mobile devices
• Kitchen display & printer integration (KDS)
• Table management & QR digital menus

Thank you.`
  },
  'mob-medical': {
    ar: `السلام عليكم ورحمة الله وبركاته،

أود الاستفسار وطلب تفاصيل وعرض سعر "تطبيق المندوب الطبي الدوائي (Pharma & Medical Rep)" من شركة نايل تكنو.

المطلوب معرفته:
• آلية تتبع زيارات الأطباء وجدولتها
• إدارة عينات الأدوية والهدايا الترويجية
• عرض الأسعار وطريقة الربط بالإدارة المركزية

شاكراً لكم حسن تعاونكم ومتابعتكم.`,
    en: `Hello Nile Techno Sales Team,

I am interested in purchasing the "Medical & Pharma Rep System App".

Please provide details on:
• Doctor visit scheduling & clinical logs
• Pharmaceutical sample inventory tracking
• Pricing and central ERP integration

Thank you.`
  }
};

export function getAppWhatsAppLink(appId, lang = 'ar') {
  const defaultApp = 'mob-sales';
  const msgObj = APP_WHATSAPP_MESSAGES[appId] || APP_WHATSAPP_MESSAGES[defaultApp];
  const message = lang === 'en' ? msgObj.en : msgObj.ar;
  return `https://wa.me/201000082722?text=${encodeURIComponent(message)}`;
}

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

    // Smoothly scroll down directly to quote selection group & form
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

  // Swiper controls for mobile space-efficiency
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
        
        {/* Left Side: Smartphone Handheld Device Mockup (Sleek, compact & balanced on large screens) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-start order-2 lg:order-1 w-full px-2 sm:px-0">
          <div className="relative w-full max-w-[215px] xs:max-w-[230px] sm:max-w-[245px] lg:max-w-[250px] xl:max-w-[260px] rounded-[32px] sm:rounded-[38px] p-2 sm:p-2.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/80 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] select-none transition-all duration-300">
            
            {/* Speaker & Punch-hole Camera */}
            <div className="absolute top-3 sm:top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-950 border border-slate-800/80 flex items-center justify-center">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#0b72c9]/60"></div>
              </div>
              <div className="w-8 sm:w-10 h-1 bg-slate-800 rounded-full"></div>
            </div>

            {/* OLED Screen Surface */}
            <div className="w-full rounded-[26px] sm:rounded-[32px] bg-[#070b14] text-white overflow-hidden flex flex-col justify-between p-2.5 sm:p-3 pt-4 sm:pt-5 text-right border border-slate-800/50 shadow-inner">
              
              {/* Screen Top Status Bar */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-slate-800/80 mb-2">
                <span className="font-mono font-bold text-slate-200">09:41</span>
                <div className="flex items-center gap-1.5 font-mono text-[9px]">
                  <span className="text-emerald-400 font-bold text-[8px] px-1 py-0.2 rounded bg-emerald-950/60 border border-emerald-800/40">5G</span>
                  <Wifi className="w-3 h-3 text-[#299df7]" />
                  <Battery className="w-3.5 h-3.5 text-slate-300" />
                </div>
              </div>

              {/* In-App Enterprise System Header */}
              <div className="flex items-center justify-between gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl bg-slate-900/90 border border-slate-800/80 mb-2 sm:mb-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-lg bg-gradient-to-tr from-[#0b72c9] to-cyan-500 flex items-center justify-center shrink-0 shadow-xs text-white">
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
                <span className="text-[9px] sm:text-[10px] font-bold text-[#299df7] bg-[#0b72c9]/15 px-1.5 sm:px-2 py-0.5 rounded-md border border-[#0b72c9]/40 font-mono shrink-0">
                  {headerBadge}
                </span>
              </div>

              {/* Dynamic Screen Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAppId}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-1.5 sm:space-y-2.5"
                >
                  {/* App Title & Customer Banner */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 space-y-0.5 sm:space-y-1">
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
                    <div className="text-[9px] sm:text-[10px] text-slate-400 truncate">
                      {activeScreen.clientSubAr}
                    </div>
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-300 pt-1 border-t border-slate-800/60">
                      <span className="text-slate-400 text-[8px] sm:text-[9px]">{activeScreen.paymentAr}</span>
                      <span className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] text-emerald-400 font-bold">
                        <CheckCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span>{activeScreen.statusAr}</span>
                      </span>
                    </div>
                  </div>

                  {/* Line Items Table */}
                  <div className="bg-slate-900/80 rounded-xl p-1.5 sm:p-2 border border-slate-800/80 space-y-1 text-xs">
                    <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold border-b border-slate-800 pb-0.5 flex justify-between">
                      <span>البند / البيان</span>
                      <span>القيمة</span>
                    </div>
                    {activeScreen.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start text-[10px] sm:text-[11px] py-0.5">
                        <div className="leading-snug pr-1 truncate">
                          <span className="text-slate-200 font-medium block text-[10px] sm:text-[11px] truncate">{item.nameAr}</span>
                          <span className="text-[8px] sm:text-[9px] text-slate-400">الكمية: {item.qty}</span>
                        </div>
                        <span className="font-mono text-[#74c1fb] font-bold shrink-0">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Total Summary */}
                  <div className="bg-slate-900/90 rounded-xl p-1.5 sm:p-2 border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-slate-300 font-bold text-[10px] sm:text-[11px] block">الإجمالي:</span>
                      <span className="text-[8px] sm:text-[9px] text-slate-400">{activeScreen.vatAr}</span>
                    </div>
                    <span className="font-mono text-xs sm:text-sm font-extrabold text-emerald-400">{activeScreen.totalAr}</span>
                  </div>

                  {/* Action Buttons inside mobile UI */}
                  <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                    <button
                      type="button"
                      onClick={(e) => handleRequestTrial(e, activeAppId)}
                      className="py-1.5 px-2 rounded-xl bg-[#0b72c9] hover:bg-blue-600 text-white text-[10px] sm:text-[10.5px] font-bold text-center shadow-xs flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
                      title={lang === 'ar' ? 'طلب عرض سعر في النموذج بالأسفل' : 'Request quote below'}
                    >
                      <ArrowDown className="w-3 h-3 shrink-0" />
                      <span>{lang === 'ar' ? 'طلب عرض سعر' : 'Get Quote'}</span>
                    </button>
                    <a
                      href={getAppWhatsAppLink(activeAppId, lang)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[10px] sm:text-[10.5px] font-bold text-center flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
                      title={lang === 'ar' ? 'طلب عبر واتساب' : 'Order via WhatsApp'}
                    >
                      <MessageSquare className="w-3 h-3 shrink-0 text-emerald-400" />
                      <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                    </a>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* In-App Bottom Navigation Bar */}
              <div className="flex items-center justify-around pt-2 sm:pt-2.5 mt-2 sm:mt-2.5 border-t border-slate-800/80 text-slate-400">
                <div className="flex flex-col items-center gap-0.5 text-[#299df7]">
                  <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="text-[7px] sm:text-[8px]">الرئيسية</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <Receipt className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="text-[7px] sm:text-[8px]">العمليات</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="text-[7px] sm:text-[8px]">التقارير</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="text-[7px] sm:text-[8px]">المزامنة</span>
                </div>
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-slate-600 rounded-full mx-auto mt-1.5"></div>
            </div>

          </div>
        </div>

        {/* Right Side: Dynamic Horizontal Swiper on Mobile & CSS Grid on Desktop */}
        <div className="lg:col-span-8 space-y-3 sm:space-y-4 order-1 lg:order-2">
          
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
            {safeApps.map((app, idx) => {
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
                    {isSelected ? (
                      <a
                        href={getAppWhatsAppLink(app.id, lang)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] border border-emerald-500/20 transition-colors cursor-pointer"
                        title={lang === 'ar' ? 'طلب وشراء عبر واتساب مباشرة' : 'Order on WhatsApp'}
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>{lang === 'ar' ? 'طلب عبر واتساب 💬' : 'Order via WhatsApp'}</span>
                      </a>
                    ) : (
                      <span className={`text-[10px] ${theme === 'light' ? 'text-slate-500' : 'text-slate-500'}`}>
                        {lang === 'ar' ? 'انقر للمعاينة' : 'Click to preview'}
                      </span>
                    )}
                    <ArrowUpRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-[#0b72c9] dark:text-[#299df7] translate-x-0.5 -translate-y-0.5' : 'text-slate-400'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Swiper Pagination Dots */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 pt-1">
            {safeApps.map((app, idx) => (
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
                {lang === 'ar' ? `المزايا التشغيلية لـ (${currentApp?.titleAr || ''}):` : `Operational Features for ${currentApp?.titleEn || ''}:`}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {((lang === 'ar' ? currentApp?.featuresAr : currentApp?.featuresEn) || []).map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0b72c9] shrink-0 mt-0.5" />
                  <span className={`text-xs leading-relaxed font-cairo ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col lg:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className={`text-xs font-cairo ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  {lang === 'ar' 
                    ? `تواصل فوري لطلب وتفعيل ${currentApp?.titleAr || 'التطبيق'} عبر رسالة واتساب مجهزة:` 
                    : `Instant contact to order ${currentApp?.titleEn || 'this app'} via prepared WhatsApp message:`}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
                {/* Primary WhatsApp Order Button with tailored message */}
                <a
                  href={getAppWhatsAppLink(currentApp?.id, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[42px] px-5 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer w-full sm:w-auto shadow-md shadow-emerald-500/25 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white hover:scale-[1.02] active:scale-95 font-cairo"
                  title={lang === 'ar' ? 'طلب وشراء هذا التطبيق عبر واتساب' : 'Order via WhatsApp'}
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>
                    {lang === 'ar' 
                      ? `طلب شراء (${currentApp?.titleAr || ''}) عبر واتساب` 
                      : `Order (${currentApp?.titleEn || ''}) via WhatsApp`}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                </a>

                {/* Secondary Button for Adding to Quote & Scrolling down */}
                <button
                  type="button"
                  onClick={(e) => currentApp?.id && handleRequestTrial(e, currentApp.id)}
                  className={`min-h-[42px] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer w-full sm:w-auto border active:scale-95 font-cairo shadow-xs ${
                    justAddedAppId === currentApp?.id || isInterestedInCurrent
                      ? 'bg-[#0b72c9] border-[#0b72c9] text-white shadow-md shadow-[#0b72c9]/30'
                      : (theme === 'light' 
                          ? 'bg-blue-50/80 hover:bg-blue-100 border-[#0b72c9]/30 text-[#0b72c9]' 
                          : 'bg-[#0b72c9]/15 hover:bg-[#0b72c9]/25 border-[#0b72c9]/40 text-[#299df7]')
                  }`}
                  title={lang === 'ar' ? 'طلب عرض سعر في النموذج بالأسفل' : 'Request quote in form below'}
                >
                  <ArrowDown className="w-4 h-4 shrink-0" />
                  <span>
                    {lang === 'ar' 
                      ? 'طلب عرض السعر في النموذج بالأسفل ⬇️' 
                      : 'Request Quote in Form Below ⬇️'}
                  </span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
