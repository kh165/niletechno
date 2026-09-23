import React, { useState } from 'react';
import { SERVICE_MODULES, TRANSLATIONS } from '../data';
import { Calculator, CheckCircle2, MessageSquare, Award } from 'lucide-react';

/* صور القطاعات — Unsplash (لا تحتاج ملفات محلية) */
/* صور السكشنات — تتغير بالضغط على أي زر قطاع */ 
import retailImg from '../assets/images/photo3.webp';
import erpImg from '../assets/images/photo2.webp'; 
import logisticsImg from '../assets/images/photo.webp'; 
import specializedImg from '../assets/images/photo1.webp';
 const SECTOR_IMAGES = { 
  retail: retailImg, 
  erp: erpImg, 
  logistics: logisticsImg, 
  specialized: specializedImg, };

export default function LeadCalculator({ lang, theme }) {
  const t = TRANSLATIONS[lang];

  const [sector, setSector] = useState('retail');
  const [scale, setScale] = useState('medium');
  const [country, setCountry] = useState('ksa');
  const [needMobile, setNeedMobile] = useState(true);
  const [needEInvoicing, setNeedEInvoicing] = useState(true);
  const [imgVisible, setImgVisible] = useState(true);

  const getSuggestions = () => {
    const list = SERVICE_MODULES.filter(m => m.category === sector);
    return list.length ? list : [SERVICE_MODULES[0]];
  };
  const suggestions = getSuggestions();

  /* تغيير السكشن مع fade للصورة */
  const handleSectorChange = (id) => {
    setImgVisible(false);
    setTimeout(() => { setSector(id); setImgVisible(true); }, 200);
  };

  const handleWhatsAppInquiry = () => {
    const selectedSystems = suggestions.map(s => lang === 'ar' ? s.titleAr : s.titleEn).join(', ');
    const sectorLabel = lang === 'ar'
      ? { retail: 'التجزئة والمطاعم', erp: 'الحسابات والتصنيع والـ HR', logistics: 'المخازن والتوزيع والنقل', specialized: 'الفلاتر والسيارات والحجوزات' }[sector]
      : { retail: 'Retail & POS', erp: 'ERP & Corporate Accounting', logistics: 'Logistics & Supply Chain', specialized: 'Specialized Custom Services' }[sector];
    const scaleLabel = lang === 'ar'
      ? { small: 'منشأة صغيرة (موقع واحد)', medium: 'متوسطة (2-5 فروع)', large: 'شركة كبرى / مصنع' }[scale]
      : { small: 'Small Business (1 Location)', medium: 'Medium Sized (2-5 branches)', large: 'Enterprise level' }[scale];
    const messageText = `رسالة واردة من حاسبة الأسعار في الموقع الرسمي لشركة نايل تكنو للبرمجيات.

السلام عليكم ورحمة الله وبركاته،

أرغب في الحصول على استشارة بشأن النظام البرمجي المناسب لنشاطي.

الأنظمة المقترحة: ${selectedSystems}
نوع النشاط: ${sectorLabel}
حجم المنشأة: ${scaleLabel}
تطبيقات الهاتف: ${needMobile ? 'مطلوبة' : 'غير مطلوبة'}
دعم الفاتورة الإلكترونية: ${needEInvoicing ? 'مطلوب' : 'غير مطلوب'}`;
    window.open(`https://wa.me/${country === 'ksa' ? '9660511351059' : '201000082722'}?text=${encodeURIComponent(messageText)}`, '_blank');
  };

  return (
    <div id="calculator-section" className={`relative rounded-3xl border p-6 md:p-10 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 ${
      theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900/60 border-slate-800 text-white'
    }`}>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* ══ عمود الفورم (الكبير) ══ */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">

          {/* Header: عنوان فوق + صورة السكشن تحته */}
          <div className="flex flex-col gap-4 flex-1">

            {/* العنوان والوصف — كامل العرض */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 shrink-0">
                  <Calculator className="w-6 h-6 animate-pulse" />
                </span>
                <h3 className={`text-xl md:text-2xl font-bold font-cairo ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                  {t.calculatorHeadline}
                </h3>
              </div>
              <p className={`text-sm font-cairo text-justify leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                {t.calculatorSub}
              </p>
            </div>

            {/* صورة السكشن — تحت الكلام، تاخد الباقي */}
            <div className="calc-sector-img-wrap flex-1">
              <div className={`calc-sector-img-box w-full h-full rounded-2xl overflow-hidden border transition-all duration-500 ${
                theme === 'light' ? 'border-slate-200 shadow-sm' : 'border-slate-800 bg-slate-900/50'
              }`}>
                <img
                  src={SECTOR_IMAGES[sector]}
                  alt={sector}
                  loading="lazy"
                  decoding="async"
                  style={{ opacity: imgVisible ? 1 : 0, transition: 'opacity 200ms ease' }}
                  className="calc-sector-img w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* الحقول */}
          <div className="space-y-4">

            {/* البلد */}
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 font-cairo ${theme === 'light' ? 'text-slate-700' : 'text-slate-400'}`}>
                {lang === 'ar' ? 'بلد المنشأة المستهدف' : 'Target Business Country'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'ksa', flag: 'sa', ar: 'المملكة العربية السعودية', en: 'Saudi Arabia (ZATCA)' },
                  { id: 'egy', flag: 'eg', ar: 'جمهورية مصر العربية', en: 'Egypt (ETA)' },
                ].map(c => (
                  <button key={c.id} type="button" onClick={() => setCountry(c.id)}
                    className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 font-cairo cursor-pointer ${
                      country === c.id
                        ? 'bg-gradient-to-r from-emerald-600/20 to-teal-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-300 shadow-md ring-1 ring-emerald-500/25'
                        : theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80 hover:text-white'
                    }`}>
                    <img loading="lazy" decoding="async" src={`https://flagcdn.com/w40/${c.flag}.png`} alt={c.id} className="w-5 h-3.5 object-cover rounded-sm" referrerPolicy="no-referrer" />
                    {lang === 'ar' ? c.ar : c.en}
                  </button>
                ))}
              </div>
            </div>

            {/* القطاع — الأزرار الأربعة، كل ضغطة تغيّر الصورة أعلاه */}
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 font-cairo ${theme === 'light' ? 'text-slate-700' : 'text-slate-400'}`}>
                {t.calcTypeSelection}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'retail', ar: 'تجزئة ومطاعم', en: 'Retail & Food' },
                  { id: 'erp', ar: 'مالية وصناعة', en: 'Corporate ERP' },
                  { id: 'logistics', ar: 'مستودعات ونقل', en: 'Logistics' },
                  { id: 'specialized', ar: 'حلول تخصصية', en: 'Special Tech' },
                ].map(sec => (
                  <button key={sec.id} type="button" onClick={() => handleSectorChange(sec.id)}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all duration-300 font-cairo cursor-pointer ${
                      sector === sec.id
                        ? theme === 'light' ? 'bg-cyan-50 border-cyan-400 text-cyan-700 shadow-sm' : 'bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-sm'
                        : theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100' : 'bg-slate-800/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}>
                    {lang === 'ar' ? sec.ar : sec.en}
                  </button>
                ))}
              </div>
            </div>

            {/* الحجم */}
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 font-cairo ${theme === 'light' ? 'text-slate-700' : 'text-slate-400'}`}>
                {t.calcSizeSelection}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'small', ar: '1-3 مستخدمين', en: 'Small (1-3 users)' },
                  { id: 'medium', ar: 'فروع متعددة', en: 'Medium Multi-branch' },
                  { id: 'large', ar: 'مجمعات ومصانع', en: 'Large Enterprise' },
                ].map(scl => (
                  <button key={scl.id} type="button" onClick={() => setScale(scl.id)}
                    className={`py-2.5 px-2 rounded-xl border text-[11px] sm:text-xs font-bold text-center transition-all duration-300 font-cairo cursor-pointer ${
                      scale === scl.id
                        ? theme === 'light' ? 'bg-white border-cyan-500 text-cyan-600 shadow-sm ring-1 ring-cyan-500/25' : 'bg-slate-800 border-cyan-500 text-cyan-400'
                        : theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100' : 'bg-slate-800/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}>
                    {lang === 'ar' ? scl.ar : scl.en}
                  </button>
                ))}
              </div>
            </div>

            {/* الخيارات الإضافية */}
            <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { state: needMobile, setState: setNeedMobile, ar: 'تضمين تطبيقات الموبايل للمناديب', en: 'Mobile Sales Representative App', subAr: 'توصيل النظام بأندرويد و iOS', subEn: 'Connect to Android/iOS tablets' },
                { state: needEInvoicing, setState: setNeedEInvoicing, ar: 'تفعيل مديول الفاتورة الإلكترونية', en: 'ZATCA / ETA E-Invoicing module', subAr: 'تشفير QR والربط المرفق الفوري', subEn: 'Automated QR codes & secure compliance' },
              ].map((item, i) => (
                <label key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors duration-200 select-none cursor-pointer ${
                  theme === 'light' ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/60'
                }`}>
                  <input
                    type="checkbox"
                    checked={item.state}
                    onChange={e => item.setState(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-cyan-500 accent-cyan-500 focus:ring-cyan-500 cursor-pointer shrink-0"
                  />
                  <div className="flex flex-col text-right">
                    <span className={`text-xs font-bold font-cairo ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>
                      {lang === 'ar' ? item.ar : item.en}
                    </span>
                    <span className={`text-[10px] font-cairo ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                      {lang === 'ar' ? item.subAr : item.subEn}
                    </span>
                  </div>
                </label>
              ))}
            </div>

          </div>
        </div>

        {/* ══ عمود الأنظمة المقترحة ══ */}
        <div className={`lg:col-span-5 rounded-2xl border p-6 flex flex-col justify-start gap-6 transition-all duration-300 ${
          theme === 'light' ? 'bg-slate-50 border-slate-200/90 shadow-sm' : 'bg-slate-950/60 border-slate-800/80'
        }`}>
          <div className="h-full flex flex-col">
            <div className="flex items-center gap-1.5 text-xs text-cyan-600 dark:text-cyan-400 font-bold tracking-wider mb-4 font-cairo">
              <Award className="w-4 h-4 animate-bounce" />
              <span>{lang === 'ar' ? 'الحل المقترح من مستشاري نايل تكنو' : 'Nile Techno Recommended Solution'}</span>
            </div>

            <div className="space-y-4">
              {suggestions.map(sys => (
                <div key={sys.id} className={`p-3 rounded-xl border transition-all duration-300 ${
                  theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800/80'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`text-sm font-bold font-cairo ${theme === 'light' ? 'text-slate-900' : 'text-slate-100'}`}>
                      {lang === 'ar' ? sys.titleAr : sys.titleEn}
                    </h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase font-mono ${
                      theme === 'light' ? 'bg-cyan-50 border border-cyan-200 text-cyan-700' : 'bg-cyan-950 text-cyan-400'
                    }`}>
                      {lang === 'ar' ? 'معتمد' : 'Verified'}
                    </span>
                  </div>
                  <p className={`text-[11px] line-clamp-2 mb-2 font-cairo ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    {lang === 'ar' ? sys.descriptionAr : sys.descriptionEn}
                  </p>
                  <div className="grid grid-cols-1 gap-1 text-[10px]">
                    {(lang === 'ar' ? sys.featuresAr : sys.featuresEn).slice(0, 3).map((feat, idx) => (
                      <div key={idx} className={`flex items-center gap-1.5 font-cairo ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* مؤشرات الخدمة */}
              <div className={`p-3 rounded-xl border flex flex-col gap-1.5 transition-colors ${
                theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900/40 border-slate-800'
              }`}>
                {[
                  { ar: 'التثبيت والتدريب', en: 'Installation & Training', val: { ar: 'شامل', en: 'Included' }, color: 'text-emerald-500' },
                  { ar: 'الدعم الفني ما بعد البيع', en: 'After-sales tech support', val: { ar: 'دعم متكامل', en: 'Continuous' }, color: 'text-emerald-500' },
                  {
                    ar: 'جدول التجهيز والمزامنة', en: 'Deployment Timeline',
                    val: {
                      ar: scale === 'small' ? 'خلال 4-7 أيام' : 'خلال 10-15 يوماً',
                      en: scale === 'small' ? '4-7 Business Days' : '10-15 Business Days'
                    },
                    color: 'text-cyan-500'
                  },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className={`font-cairo ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                      {lang === 'ar' ? row.ar : row.en}
                    </span>
                    <span className={`font-bold font-cairo ${row.color}`}>
                      {lang === 'ar' ? row.val.ar : row.val.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
                              {/* قسم خطوات التنفيذ لملء المساحة بشكل احترافي */}
              <div className="mt-6 space-y-4">
                <h5 className={`text-xs font-bold font-cairo px-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                  {lang === 'ar' ? 'رحلة تشغيل نظامك مع نايل تكنو:' : 'Your Implementation Journey:'}
                </h5>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { step: '01', ar: 'تحليل المتطلبات', en: 'Needs Analysis', descAr: 'دراسة دقيقة لحجم نشاطك وتحديد المديولات المطلوبة.', descEn: 'Studying your business scale and required modules.' },
                    { step: '02', ar: 'التجهيز والربط', en: 'Setup & Integration', descAr: 'إعداد السيرفرات السحابية والربط مع هيئة الزكاة/الضرائب.', descEn: 'Cloud server setup and tax authority integration.' },
                    { step: '03', ar: 'التدريب والدعم', en: 'Training & Support', descAr: 'تدريب فريقك على النظام مع دعم فني متواصل 24/7.', descEn: 'Staff training with 24/7 continuous technical support.' },
                  ].map((item, idx) => (
                    <div key={idx} className={`flex items-start gap-3 p-3 rounded-xl border transition-all hover:scale-[1.02] duration-300 ${
                      theme === 'light' ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-900/40 border-slate-800/50'
                    }`}>
                      <span className="text-lg font-black text-cyan-500/20 font-mono leading-none">{item.step}</span>
                      <div className="flex flex-col text-right">
                        <span className={`text-[11px] font-bold font-cairo ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}>
                          {lang === 'ar' ? item.ar : item.en}
                        </span>
                        <span className="text-[10px] font-cairo text-slate-500 dark:text-slate-400 leading-relaxed">
                          {lang === 'ar' ? item.descAr : item.descEn}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

          <div className={`mt-6 pt-4 border-t space-y-3 ${theme === 'light' ? 'border-slate-200' : 'border-slate-800'}`}>
            <p className="text-[10px] text-slate-500 font-cairo text-center leading-normal">
              {lang === 'ar'
                ? '* هذا التقدير تقريبي، يتم صياغة السعر التفصيلي النهائي بناءً على عدد التراخيص وأجهزة الكاشير المستخدمة.'
                : '* This estimate is advisory. Final pricing depends on license count and hardware required.'}
            </p>
            <button onClick={handleWhatsAppInquiry}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-95 cursor-pointer font-cairo">
              <MessageSquare className="w-5 h-5 shrink-0" />
              <span>{t.whatsappSend}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
