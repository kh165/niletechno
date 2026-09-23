import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, Check, Wifi, Battery, MapPin, Printer, 
  QrCode, Utensils, Stethoscope, ChevronLeft, ChevronRight, CheckCircle2
} from 'lucide-react';
import { IconComponent } from '../site/BrandVisuals';

export function ModernMobileShowcase({
  lang,
  theme,
  mobileApps,
  onSelectAppForQuote,
  formData
}) {
  const [activeAppId, setActiveAppId] = useState(mobileApps[0]?.id || 'mob-sales');
  const [justAddedAppId, setJustAddedAppId] = useState(null);

  const currentApp = mobileApps.find(a => a.id === activeAppId) || mobileApps[0];

  // Tailored enterprise mockup data for each app screen
  const appScreenDetails = {
    'mob-sales': {
      screenTitleAr: 'فاتورة مبيعات ميدانية',
      screenTitleEn: 'Van Sales Invoice',
      clientAr: 'شركة النور للمواد الغذائية',
      invNum: '#INV-2026-884',
      totalAr: '1,450.00 ج.م',
      totalEn: '1,450.00 EGP',
      vatAr: 'شامل الضريبة 14%',
      vatEn: 'Incl. 14% VAT',
      items: [
        { nameAr: 'كرتونة زيت ذرة نقي 1 لتر (12 عبوة)', qty: '5', price: '750.00' },
        { nameAr: 'شيكارة أرز فاخر مصري 25 كجم', qty: '2', price: '700.00' }
      ],
      hardwareNoteAr: 'طابعة البلوتوث المحمولة متصلة · تم إصدار رمز QR المشفر',
      hardwareNoteEn: 'Bluetooth Thermal Printer Online · Cryptographic QR Ready'
    },
    'mob-pos': {
      screenTitleAr: 'نقطة بيع سريعة (Mobile POS)',
      screenTitleEn: 'Mobile POS Checkout',
      clientAr: 'عميل نقدي صالة',
      invNum: '#POS-5521',
      totalAr: '380.00 ج.م',
      totalEn: '380.00 EGP',
      vatAr: 'مسدد نقداً بالكامل',
      vatEn: 'Paid Cash',
      items: [
        { nameAr: 'قميص قطن رجالي مقاس L كحلي', qty: '1', price: '250.00' },
        { nameAr: 'حزام جلد طبيعي بني', qty: '1', price: '130.00' }
      ],
      hardwareNoteAr: 'ماسح الباركود بالكاميرا نشط · تسوية الدرج المالي فورية',
      hardwareNoteEn: 'Camera Barcode Scanner Active · Instant Drawer Balancing'
    },
    'mob-captain': {
      screenTitleAr: 'طلب صالة - طاولة رقم 6',
      screenTitleEn: 'Dine-In Table 6 Order',
      clientAr: 'صالة عائلات - قسم A',
      invNum: '#KDS-094',
      totalAr: '560.00 ج.م',
      totalEn: '560.00 EGP',
      vatAr: 'مرسل إلى شاشة المطبخ KDS',
      vatEn: 'Dispatched to Kitchen Display',
      items: [
        { nameAr: 'وجبة ميكس جريل عائلي (بدون بصل)', qty: '1', price: '420.00' },
        { nameAr: 'سلطة خضراء ومتبل شامي', qty: '2', price: '60.00' },
        { nameAr: 'عصير برتقال فريش كبير', qty: '2', price: '80.00' }
      ],
      hardwareNoteAr: 'طباعة بون المطبخ آلياً · تنبيه الصالة فور جاهزية الطلب',
      hardwareNoteEn: 'Automated Kitchen Ticket · Waiter Alert on Ready'
    },
    'mob-med': {
      screenTitleAr: 'سجل زيارة عيادة طبية',
      screenTitleEn: 'Medical Rep Clinic Visit',
      clientAr: 'د. طارق محمود - استشاري أطفال',
      invNum: '#VISIT-402',
      totalAr: 'زيارة مبرمجة معتمدة',
      totalEn: 'Verified Scheduled Visit',
      vatAr: 'تم تسجيل العينات الطبية المسلمة',
      vatEn: 'Samples Logged',
      items: [
        { nameAr: 'عقار مضاد حيوي للأطفال 250 مل', qty: '3 عينات', price: 'مجاني' },
        { nameAr: 'كتيب إرشادي لدواعي الاستعمال', qty: '1 نسخة', price: 'إرشادي' }
      ],
      hardwareNoteAr: 'إحداثيات GPS مسجلة بموقع العيادة بدقة 4 أمتار',
      hardwareNoteEn: 'GPS Geofence Verified within 4m of Medical Center'
    }
  };

  const activeScreen = appScreenDetails[activeAppId] || appScreenDetails['mob-sales'];

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

  return (
    <div className="w-full font-cairo">
      {/* Editorial context header without candy badges */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-bold text-slate-900 dark:text-slate-200">{lang === 'ar' ? 'تطبيقات الميدان الذكية' : 'Field Enterprise Apps'}</span>
          <span aria-hidden="true">·</span>
          <span>Android & iOS</span>
          <span aria-hidden="true">·</span>
          <span>{lang === 'ar' ? 'مزامنة أوفلاين تامة عند انقطاع الإنترنت' : 'Offline Engine Storage'}</span>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          NILE TECHNO HANDHELD ENGINE v4.2
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: High-Craft Smartphone Handheld Device Mockup */}
        <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
          <div className="relative w-[280px] sm:w-[310px] h-[580px] sm:h-[620px] rounded-[48px] p-3.5 bg-slate-900 border-[6px] border-slate-800 shadow-2xl shadow-slate-950/40 select-none">
            
            {/* Dynamic Island Notch */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-500/80"></div>
            </div>

            {/* Simulated Side Buttons */}
            <div className="absolute -left-[9px] top-28 w-[3px] h-10 bg-slate-700 rounded-l-sm"></div>
            <div className="absolute -left-[9px] top-42 w-[3px] h-12 bg-slate-700 rounded-l-sm"></div>
            <div className="absolute -right-[9px] top-32 w-[3px] h-14 bg-slate-700 rounded-r-sm"></div>

            {/* OLED Screen Surface */}
            <div className="w-full h-full rounded-[38px] bg-[#060b17] text-white overflow-hidden flex flex-col justify-between p-4 pt-10 text-right">
              
              {/* Screen Top Status Bar */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800/80">
                <span className="font-mono font-bold text-slate-200">10:45</span>
                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                  <span className="text-emerald-400 font-bold">5G</span>
                  <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                  <Battery className="w-4 h-4 text-slate-300" />
                </div>
              </div>

              {/* Dynamic Screen Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAppId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col justify-between py-2 overflow-hidden"
                >
                  <div className="space-y-3">
                    
                    {/* App Title & Document header */}
                    <div>
                      <div className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-wider">
                        {activeScreen.screenTitleAr}
                      </div>
                      <div className="text-sm font-bold text-white leading-tight">
                        {activeScreen.clientAr}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {activeScreen.invNum} · {activeScreen.vatAr}
                      </div>
                    </div>

                    {/* Line Items Table */}
                    <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 space-y-2 text-xs">
                      <div className="text-[10px] text-slate-400 font-bold border-b border-slate-800 pb-1 flex justify-between">
                        <span>الصنف والكمية</span>
                        <span>السعر</span>
                      </div>
                      {activeScreen.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-start text-[11px] py-0.5">
                          <div className="leading-snug pr-1">
                            <span className="text-slate-200 font-medium block">{item.nameAr}</span>
                            <span className="text-[10px] text-slate-400">الكمية: {item.qty}</span>
                          </div>
                          <span className="font-mono text-cyan-300 font-bold shrink-0">{item.price}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total Summary */}
                    <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800 flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-bold">الإجمالي النهائي:</span>
                      <span className="font-mono text-sm font-extrabold text-emerald-400">{activeScreen.totalAr}</span>
                    </div>

                  </div>

                  {/* Hardware / Sensor Live Note */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="text-[10px] text-slate-400 flex items-center gap-1.5 leading-snug">
                      <Printer className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{activeScreen.hardwareNoteAr}</span>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Bottom Home Indicator Bar */}
              <div className="w-24 h-1 bg-slate-600 rounded-full mx-auto mt-2"></div>
            </div>

          </div>
        </div>

        {/* Right Side: Clean App Selection & Architectural Features */}
        <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
          
          <div className="space-y-3">
            {mobileApps.map((app) => {
              const isSelected = activeAppId === app.id;
              
              return (
                <div
                  key={app.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveAppId(app.id);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? (theme === 'light' 
                          ? 'bg-white border-cyan-500 shadow-sm' 
                          : 'bg-slate-900 border-cyan-500/80 shadow-md')
                      : (theme === 'light' 
                          ? 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300' 
                          : 'bg-[#070d1c] border-slate-800 hover:border-slate-700')
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg shrink-0 ${
                        isSelected 
                          ? 'bg-cyan-500 text-slate-950 font-bold' 
                          : (theme === 'light' ? 'bg-slate-200 text-slate-800' : 'bg-slate-800 text-slate-300')
                      }`}>
                        <IconComponent name={app.iconName} className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className={`text-base font-bold font-cairo leading-snug ${
                          isSelected 
                            ? 'text-cyan-600 dark:text-cyan-400' 
                            : (theme === 'light' ? 'text-slate-900' : 'text-white')
                        }`}>
                          {lang === 'ar' ? app.titleAr : app.titleEn}
                        </h4>
                        <p className={`text-xs leading-relaxed mt-0.5 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                          {lang === 'ar' ? app.descriptionAr : app.descriptionEn}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono text-slate-400 shrink-0 pt-0.5">
                      {isSelected ? (lang === 'ar' ? 'معروض بالشاشة' : 'Viewing') : (lang === 'ar' ? 'عرض الشاشة' : 'Select')}
                    </span>
                  </div>

                  {/* Bullet points without loud pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                    {(lang === 'ar' ? app.featuresAr : app.featuresEn).slice(0, 2).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span className={`text-[11px] ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Trial Action Panel without jumping page scroll */}
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
            theme === 'light' ? 'bg-slate-100/70 border-slate-200' : 'bg-slate-900/60 border-slate-800'
          }`}>
            <div className="text-xs text-slate-700 dark:text-slate-300 text-center sm:text-right">
              <span className="font-bold block text-slate-900 dark:text-white">
                {lang === 'ar' ? `تجربة تطبيق ${currentApp.titleAr} على أجهزتكم` : `Trial APK for ${currentApp.titleEn}`}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {lang === 'ar' ? 'نوفر تنصيب تجريبي مباشر مع ربط طابعات البلوتوث المحمولة.' : 'Direct setup with thermal Bluetooth printer pairing.'}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => handleRequestTrial(e, currentApp.id)}
              className={`min-h-[44px] px-5 py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 w-full sm:w-auto ${
                justAddedAppId === currentApp.id || isInterestedInCurrent
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950'
              }`}
            >
              {justAddedAppId === currentApp.id || isInterestedInCurrent ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'مضاف لقائمتك' : 'Added to List'}</span>
                </>
              ) : (
                <span>{lang === 'ar' ? 'طلب نسخة تجريبية للتطبيق' : 'Request Trial APK'}</span>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
