import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, Check, Wifi, Battery, ChevronLeft, ChevronRight, CheckCircle2,
  Receipt, ArrowUpRight, ShieldCheck, CheckCheck, Layers, ShoppingBag, MessageSquare, 
  ArrowDown, Maximize2, X, Sparkles, ExternalLink
} from 'lucide-react';
import { IconComponent } from '../site/BrandVisuals';

// Tailored, grammatically correct and elegant WhatsApp messages for each mobile app
export const APP_WHATSAPP_MESSAGES = {
  'mob-sales': {
    ar: `السلام عليكم ورحمة الله وبركاته،
أود الاستفسار وطلب تفاصيل وعرض سعر تطبيق مندوب المبيعات الميداني (Android & iOS) من شركة نايل تكنو للبرمجيات.
المعلومات المطلوبة:
• تكلفة الترخيص وتفاصيل التفعيل
• آلية الربط والتزامن اللحظي مع النظام المحاسبي المركزي
• دعم طباعة الفواتير المحمولة وتتبع خطوط سير المناديب بالـ GPS
شاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.`,
    en: `Hello Nile Techno Sales Team,
I would like to inquire about and request an official quotation for the "Smart Mobile Sales Representative App (Android & iOS)".
Requested Information:
• Licensing cost and deployment options
• Real-time synchronization with central ERP & accounting
• Mobile thermal receipt printing and GPS route tracking
Thank you for your prompt assistance and cooperation.`
  },
  'mob-pos': {
    ar: `السلام عليكم ورحمة الله وبركاته،
أود الاستفسار وطلب تفاصيل وعرض سعر "تطبيق نقطة البيع للمحمول (Mobile POS)" من شركة نايل تكنو للبرمجيات.
المعلومات المطلوبة:
• تكلفة تفعيل نقاط البيع المحمولة
• آلية العمل دون اتصال بالإنترنت (Offline Mode)
• ربط طابعات البلوتوث المحمولة وقارئ الباركود
شاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.`,
    en: `Hello Nile Techno Sales Team,
I would like to inquire about and request an official quotation for the "Mobile POS Terminal App".
Requested Information:
• Setup and licensing for portable POS devices
• Offline transaction processing and automated syncing
• Bluetooth printer and barcode scanner compatibility
Thank you for your prompt assistance and cooperation.`
  },
  'mob-restaurant': {
    ar: `السلام عليكم ورحمة الله وبركاته،
أود الاستفسار وطلب تفاصيل وعرض سعر تطبيق النادل ومتابعة المطبخ للمطاعم والكافيهات.
المعلومات المطلوبة:
• أسعار التطبيق وتجهيزه على أجهزة التابلت والموبايل
• آلية الربط المباشر بشاشات وطابعات المطبخ (KDS)
• دعم المنيو الرقمي وإدارة شاشات الطاولات والتحويل السريع
شاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.`,
    en: `Hello Nile Techno Sales Team,
I would like to inquire about and request an official quotation for the "Smart Waiter & Kitchen Display App" for restaurants and cafes.
Requested Information:
• Pricing and tablet/mobile deployment setup
• Kitchen Display System (KDS) and direct thermal printer routing
• Digital menus, table assignments, and fast order dispatch
Thank you for your prompt assistance and cooperation.`
  },
  'mob-medical': {
    ar: `السلام عليكم ورحمة الله وبركاته،
أود الاستفسار وطلب تفاصيل وعرض سعر "تطبيق المندوب الطبي والدوائي (Medical & Pharma Rep)" من شركة نايل تكنو للبرمجيات.
المعلومات المطلوبة:
• آلية جدولة وتتبع زيارات الأطباء والصيدليات بالـ GPS
• إدارة عينات الأدوية والهدايا الترويجية ومسح الكود
• عرض الأسعار وطريقة التكامل مع المنظومة المركزية
شاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.`,
    en: `Hello Nile Techno Sales Team,
I would like to inquire about and request an official quotation for the "Medical & Pharmaceutical Representative System App".
Requested Information:
• Clinic & pharmacy visit scheduling with GPS audit logs
• Medical sample tracking and promotional item inventory
• Licensing quotation and central ERP connectivity
Thank you for your prompt assistance and cooperation.`
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

// 100% Authentic, Original Full-Resolution Screenshots from Nile Techno's Official Sales Representative App
export const REAL_SALES_APP_SCREENS = [
  {
    id: 1,
    titleAr: 'الرئيسية ولوحة التحكم',
    titleEn: 'Sales Dashboard',
    shortAr: 'الرئيسية',
    shortEn: 'Dashboard',
    descAr: 'إجمالي المبيعات، التحصيلات، وسرعة الوصول لكافة العمليات اليومية',
    descEn: 'Real-time sales KPIs, instant collection figures, and fast-action shortcuts',
    image: '/images/sales_rep/screen_1.png'
  },
  {
    id: 2,
    titleAr: 'إصدار فواتير المبيعات',
    titleEn: 'Sales Invoice Issuance',
    shortAr: 'فواتير بيع',
    shortEn: 'Invoicing',
    descAr: 'بناء الفواتير الميدانية، إدراج الأصناف والخصومات، والطباعة الحرارية الفورية',
    descEn: 'Field invoices, price tiers, discounts & instant Bluetooth receipt printing',
    image: '/images/sales_rep/screen_2.png'
  },
  {
    id: 3,
    titleAr: 'سندات القبض والتحصيل',
    titleEn: 'Payment Receipts',
    shortAr: 'سند قبض',
    shortEn: 'Receipts',
    descAr: 'تسجيل المقبوضات النقدية والشيكات وتحديث حساب العميل لحظياً مع السيرفر',
    descEn: 'Instant cash & check vouchers with automatic real-time ledger balancing',
    image: '/images/sales_rep/screen_3.png'
  },
  {
    id: 4,
    titleAr: 'دليل وحسابات العملاء',
    titleEn: 'Customer Accounts',
    shortAr: 'العملاء',
    shortEn: 'Customers',
    descAr: 'استعراض كشوفات الحساب، المديونيات المتبقية، وسجل الحركات السابقة',
    descEn: 'Customer statements, age-debt analysis, contact info & transaction history',
    image: '/images/sales_rep/screen_6.png'
  },
  {
    id: 5,
    titleAr: 'متابعة العملاء',
    titleEn: 'Customer Follow-up',
    shortAr: 'متابعة العملاء',
    shortEn: 'Follow-up',
    descAr: 'قائمة العملاء وبيانات التواصل لمراجعة آخر الزيارات ومتابعة كل عميل.',
    descEn: 'Customer list and contact details for reviewing recent visits and follow-ups.',
    image: '/images/sales_rep/screen_5.png'
  },
  {
    id: 6,
    titleAr: 'كتالوج الأصناف والأسعار',
    titleEn: 'Product Catalog & Stock',
    shortAr: 'الأصناف',
    shortEn: 'Products',
    descAr: 'استعراض الأصناف، أسعار الجملة والقطاعي، والرصيد الفعلي بالمخزن الرئيسي',
    descEn: 'Live stock balances, wholesale and retail tiers, and fast barcode search',
    image: '/images/sales_rep/screen_4.png'
  }
];

export function ModernMobileShowcase({
  lang = 'ar',
  theme = 'dark',
  mobileApps = [],
  onSelectAppForQuote,
  formData = { interestedModules: [] }
}) {
  const safeApps = Array.isArray(mobileApps) && mobileApps.length > 0 ? mobileApps : [];
  const [activeAppId, setActiveAppId] = useState(safeApps[0]?.id || 'mob-sales');
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
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
  const currentRealScreen = REAL_SALES_APP_SCREENS[activeScreenIndex] || REAL_SALES_APP_SCREENS[0];

  // Auto-rotate screens for smooth live preview when not hovered
  useEffect(() => {
    if (!isSalesRepActive || isHovered || isFullscreenModalOpen) return;
    const interval = setInterval(() => {
      setActiveScreenIndex(prev => (prev + 1) % REAL_SALES_APP_SCREENS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isSalesRepActive, isHovered, isFullscreenModalOpen]);

  // Navigate screens
  const nextScreen = (e) => {
    if (e) e.stopPropagation();
    setActiveScreenIndex(prev => (prev + 1) % REAL_SALES_APP_SCREENS.length);
  };

  const prevScreen = (e) => {
    if (e) e.stopPropagation();
    setActiveScreenIndex(prev => (prev - 1 + REAL_SALES_APP_SCREENS.length) % REAL_SALES_APP_SCREENS.length);
  };

  // Coded mock screen data for other specialized apps (POS / Restaurant / Medical)
  const appScreenDetails = {
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

  const activeScreen = appScreenDetails[activeAppId] || appScreenDetails['mob-pos'];

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
        
        {/* Left Side: Real Handheld Smartphone Mockup (Pixel-perfect width & height display) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-start order-2 lg:order-1 w-full px-2 sm:px-0">
          
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="mobile-phone-frame feature-block-lift relative w-full max-w-[285px] rounded-[38px] sm:rounded-[44px] p-2 sm:p-2.5 bg-gradient-to-b from-slate-750 via-slate-900 to-slate-950 border-2 border-slate-700/80 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] hover:shadow-[0_28px_60px_-10px_rgba(26,133,234,0.3)] select-none transition-all duration-300 group hover:-translate-y-1.5"
          >
            {/* Top Speaker & Punch-hole Camera */}
            <div className="absolute top-2.5 sm:top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2 pointer-events-none">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-black border border-slate-750 flex items-center justify-center">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#1a85ea]/70"></div>
              </div>
              <div className="w-9 sm:w-11 h-1 bg-slate-800 rounded-full"></div>
            </div>

            {/* Phone Screen Surface: Matches exact 1080x2281 native aspect ratio so image fits 100% edge-to-edge */}
            <div className="relative w-full aspect-[1080/2281] rounded-[28px] sm:rounded-[34px] overflow-hidden bg-black shadow-inner flex flex-col justify-between">
              
              {isSalesRepActive ? (
                /* REAL SALES APP SCREENSHOT DISPLAY - 100% UNTOUCHED ORIGINAL PIXELS */
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

                  {/* Top Floating Glass Badge */}
                  <div className="absolute top-7 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[9px] font-bold text-emerald-400 border border-emerald-500/30 font-cairo flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>{lang === 'ar' ? 'تطبيق حقيقي' : 'Live App'}</span>
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFullscreenModalOpen(true);
                      }}
                      className="pointer-events-auto p-1.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md text-white/90 hover:text-white border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-md"
                      title={lang === 'ar' ? 'معاينة بحجم كامل 100%' : 'View Full Resolution'}
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

                  {/* Bottom Indicator Dots Inside Phone */}
                  <div className="absolute bottom-2.5 left-0 right-0 z-20 flex flex-col items-center gap-1 pointer-events-none">
                    <div className="phone-screen-indicators flex items-center gap-1.5 pointer-events-auto" role="group" aria-label={lang === 'ar' ? 'اختيار شاشة التطبيق' : 'Choose app screenshot'}>
                      {REAL_SALES_APP_SCREENS.map((sc, sIdx) => (
                        <button
                          key={sc.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveScreenIndex(sIdx);
                          }}
                          className={`phone-screen-dot rounded-full transition-all cursor-pointer ${
                            activeScreenIndex === sIdx
                              ? 'bg-[#1a85ea]'
                              : 'bg-white/45 hover:bg-white/80'
                          }`}
                          aria-current={activeScreenIndex === sIdx ? 'true' : undefined}
                          title={lang === 'ar' ? sc.titleAr : sc.titleEn}
                          aria-label={`Go to ${sc.titleAr}`}
                        />
                      ))}
                    </div>
                  </div>

                </div>
              ) : activeAppId === 'mob-medical' ? (
                /* ORIGINAL MEDICAL REP SCREENSHOT — source file is kept byte-for-byte unchanged */
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
                /* OTHER SPECIALIZED APPS (POS / RESTAURANT) INTERACTIVE LIVE DISPLAY */
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

              {/* Bottom Home Indicator Bar */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-0.5 sm:h-1 bg-slate-500/60 rounded-full pointer-events-none"></div>
            </div>
          </div>

          {/* Interactive Screen Selector Pills (for Sales Rep App) */}
          {isSalesRepActive && (
            <div className="w-full max-w-[280px] xs:max-w-[295px] sm:max-w-[310px] mt-3 space-y-2">
              
              {/* Screen Title & Description */}
              <div className={`p-2.5 rounded-xl border text-center transition-all ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-2xs' : 'bg-slate-900/70 border-slate-800'
              }`}>
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#1a85ea] dark:text-[#38bdf8] mb-0.5">
                  <span>{currentRealScreen.id}.</span>
                  <span>{lang === 'ar' ? currentRealScreen.titleAr : currentRealScreen.titleEn}</span>
                </div>
                <p className={`text-[11px] leading-tight line-clamp-2 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
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
                          : (theme === 'light' 
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200' 
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800')
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
        <div className="lg:col-span-8 space-y-3 sm:space-y-4 order-1 lg:order-2">
          
          {/* Header Note with Mobile Controls */}
          <div className="flex items-center justify-between pb-1">
            <div>
              <h3 className={`text-base sm:text-lg font-bold font-cairo ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                {lang === 'ar' ? 'اختر التطبيق لاستعراض شاشته الميدانية:' : 'Select an app to preview its live mobile UI:'}
              </h3>
              <p className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                {lang === 'ar' ? 'صور حقيقية 100% من داخل التطبيقات بدون أي تعديل' : '100% authentic mobile application screenshots'}
              </p>
            </div>

            {/* Mobile Prev / Next Arrows for effortless swiping */}
            <div className="flex sm:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollToAppIndex(currentIdx + 1)}
                disabled={currentIdx >= safeApps.length - 1}
                className="w-7 h-7 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
                aria-label="Next app"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollToAppIndex(currentIdx - 1)}
                disabled={currentIdx <= 0}
                className="w-7 h-7 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
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
                  className={`service-card-lift snap-center shrink-0 w-[82vw] max-w-[290px] sm:w-auto sm:max-w-none p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 hover:scale-[1.015] ${
                    isSelected
                      ? (theme === 'light' 
                          ? 'bg-white border-[#1a85ea] shadow-md ring-2 ring-[#1a85ea]/20 hover:shadow-xl' 
                          : 'bg-slate-900 border-[#1a85ea] shadow-lg ring-1 ring-[#1a85ea]/40 hover:shadow-2xl')
                      : (theme === 'light' 
                          ? 'bg-slate-50/80 border-slate-200 hover:bg-white hover:border-[#1a85ea]/50 hover:shadow-lg' 
                          : 'bg-slate-900/40 border-slate-800 hover:border-[#1a85ea]/50 hover:bg-slate-900/70 hover:shadow-xl')
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className={`p-2 rounded-xl transition-colors ${
                          isSelected
                            ? 'bg-[#1a85ea] text-white shadow-xs'
                            : (theme === 'light' ? 'bg-slate-200/70 text-slate-700' : 'bg-slate-800 text-slate-300')
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
                          : (theme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-slate-800/60 border-slate-700 text-slate-400')
                      }`}>
                        {isSelected ? (lang === 'ar' ? 'معروض بالشاشة' : 'Viewing') : (lang === 'ar' ? 'عرض الشاشة' : 'Select')}
                      </span>
                    </div>

                    <h4 className={`text-sm sm:text-[15px] font-bold font-cairo leading-snug mb-1.5 ${
                      isSelected 
                        ? 'text-[#1a85ea] dark:text-[#38bdf8]' 
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

                    <ArrowUpRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-[#1a85ea] dark:text-[#38bdf8] translate-x-0.5 -translate-y-0.5' : 'text-slate-400'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Swiper Pagination Dots */}
          <div className="mobile-app-pagination flex sm:hidden items-center justify-center gap-0.5 pt-1" role="group" aria-label={lang === 'ar' ? 'التنقل بين التطبيقات' : 'Choose a mobile app'}>
            {safeApps.map((app, idx) => (
              <button
                type="button"
                key={app.id}
                onClick={() => scrollToAppIndex(idx)}
                className="app-carousel-dot rounded-full cursor-pointer"
                aria-current={activeAppId === app.id ? 'true' : undefined}
                aria-label={`Go to ${app.titleAr}`}
              />
            ))}
          </div>

          {/* Detailed Features of the Selected App */}
          <div className={`feature-block-lift p-4 sm:p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
            theme === 'light' ? 'bg-white border-slate-200 shadow-xs hover:border-[#1a85ea]/40' : 'bg-slate-900/60 border-slate-800 hover:border-[#1a85ea]/40'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#1a85ea]"></div>
              <h4 className={`text-xs sm:text-sm font-bold font-cairo ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                {lang === 'ar' ? `المزايا التشغيلية لـ (${currentApp?.titleAr || ''}):` : `Operational Features for ${currentApp?.titleEn || ''}:`}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {((lang === 'ar' ? currentApp?.featuresAr : currentApp?.featuresEn) || []).map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1a85ea] shrink-0 mt-0.5" />
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

              <div className="mobile-app-actions flex flex-col sm:flex-row items-center gap-2.5 w-full lg:w-auto justify-end">
                {/* Primary WhatsApp Order Button with tailored message */}
                <a
                  href={getAppWhatsAppLink(currentApp?.id, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-app-action min-h-[38px] min-w-0 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer w-full sm:w-auto shadow-sm shadow-emerald-500/20 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white active:scale-95 font-cairo text-center leading-tight"
                  title={lang === 'ar' ? 'طلب وشراء هذا التطبيق عبر واتساب' : 'Order via WhatsApp'}
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0 fill-white/20" />
                  <span className="mobile-app-action-label">
                    {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
                  </span>
                  <ArrowUpRight className="w-3 h-3 shrink-0 opacity-80" />
                </a>

                {/* Secondary Button for Adding to Quote & Scrolling down */}
                <button
                  type="button"
                  onClick={(e) => currentApp?.id && handleRequestTrial(e, currentApp.id)}
                  className={`mobile-app-action min-h-[38px] min-w-0 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer w-full sm:w-auto border active:scale-95 font-cairo shadow-xs text-center leading-tight ${
                    justAddedAppId === currentApp?.id || isInterestedInCurrent
                      ? 'bg-[#1a85ea] border-[#1a85ea] text-white shadow-md shadow-[#1a85ea]/25'
                      : (theme === 'light' 
                          ? 'bg-blue-50/80 hover:bg-blue-100 border-[#1a85ea]/30 text-[#1a85ea]' 
                          : 'bg-[#1a85ea]/15 hover:bg-[#1a85ea]/25 border-[#1a85ea]/40 text-[#38bdf8]')
                  }`}
                  title={lang === 'ar' ? 'طلب عرض سعر في النموذج بالأسفل' : 'Request quote in form below'}
                >
                  <ArrowDown className="w-3.5 h-3.5 shrink-0" />
                  <span className="mobile-app-action-label">
                    {lang === 'ar' ? 'السعر' : 'Quote'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL: To inspect screenshots at 100% full original resolution pixel-by-pixel */}
      <AnimatePresence>
        {isFullscreenModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreenModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-full max-h-[95vh] flex flex-col items-center justify-center"
            >
              {/* Top Controls Bar */}
              <div className="w-full flex items-center justify-between text-white pb-3 px-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="text-sm sm:text-base font-bold font-cairo">
                    {lang === 'ar' ? currentRealScreen.titleAr : currentRealScreen.titleEn}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    ({activeScreenIndex + 1} / {REAL_SALES_APP_SCREENS.length})
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFullscreenModalOpen(false)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title={lang === 'ar' ? 'إغلاق' : 'Close'}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Full Image */}
              <div className="relative max-h-[82vh] overflow-hidden rounded-2xl border border-white/15 shadow-2xl bg-black">
                <img
                  src={currentRealScreen.image}
                  alt={lang === 'ar' ? currentRealScreen.titleAr : currentRealScreen.titleEn}
                  className="max-h-[82vh] w-auto object-contain block mx-auto"
                />

                {/* Left / Right Arrows in Lightbox */}
                <button
                  type="button"
                  onClick={prevScreen}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 cursor-pointer shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextScreen}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 cursor-pointer shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Thumbnail Strip */}
              <div className="flex items-center gap-1.5 sm:gap-2 mt-3 overflow-x-auto max-w-full px-2 py-1">
                {REAL_SALES_APP_SCREENS.map((sc, idx) => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setActiveScreenIndex(idx)}
                    className={`relative w-10 sm:w-12 aspect-[1080/2281] rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                      activeScreenIndex === idx
                        ? 'border-[#1a85ea] scale-105 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={sc.image} alt={sc.titleAr} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
