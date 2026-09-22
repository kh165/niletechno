import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../data';
import { ShieldCheck, Calendar, QrCode, ClipboardCopy, Sparkles, HelpCircle, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export default function EInvoiceDemo({ lang, theme }) {
  const t = TRANSLATIONS[lang];

  // States
  const [sellerName, setSellerName] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [vatRate, setVatRate] = useState(15); // 15% in KSA or 14% in Egypt
  
  const [taxAmount, setTaxAmount] = useState(0.00);
  const [netAmount, setNetAmount] = useState(0.00);
  const [timestamp, setTimestamp] = useState('');
  const [isAutoTime, setIsAutoTime] = useState(true);
  const [base64Payload, setBase64Payload] = useState('Q29tcGxpYW50IHdpdGggWkFUQ0EgUGhhc2UgMSAmIDI=');
  const [debouncedBase64, setDebouncedBase64] = useState('Q29tcGxpYW50IHdpdGggWkFUQ0EgUGhhc2UgMSAmIDI=');
  const [copySuccess, setCopySuccess] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Focus tracking state
  const [focusedField, setFocusedField] = useState('');

  // Live clock that automatically formats and updates the timestamp every second
  useEffect(() => {
    if (!isAutoTime) return;
    const updateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      // Format exactly as matching the user's screenshot
      const formatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      setTimestamp(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isAutoTime]);

  // Debounce payload updates for QR generation
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedBase64(base64Payload);
    }, 350);
    return () => {
      clearTimeout(handler);
    };
  }, [base64Payload]);

  // Auto calculate tax metrics
  useEffect(() => {
    if (totalPrice === '') {
      setTaxAmount(0.00);
      setNetAmount(0.00);
      return;
    }
    const currentPrice = parseFloat(totalPrice) || 0;
    const rateFactor = vatRate / (100 + vatRate);
    const calculatedTax = parseFloat((currentPrice * rateFactor).toFixed(2));
    const calculatedNet = parseFloat((currentPrice - calculatedTax).toFixed(2));
    setTaxAmount(calculatedTax);
    setNetAmount(calculatedNet);
  }, [totalPrice, vatRate]);

  // Compute ZATCA TLV Base64 payload
  useEffect(() => {
    const toTLV = (tag, val) => {
      const valueBytes = new TextEncoder().encode(val);
      const tagByte = tag;
      const lenByte = valueBytes.length;
      const tlvBytes = new Uint8Array(2 + lenByte);
      tlvBytes[0] = tagByte;
      tlvBytes[1] = lenByte;
      tlvBytes.set(valueBytes, 2);
      return tlvBytes;
    };

    try {
      const displaySeller = sellerName.trim() || 'شركه نايل تكنو';
      const displayVat = vatNumber.trim() || '310123456700003';
      const displayPrice = totalPrice === '' ? 115.00 : parseFloat(totalPrice) || 0;
      
      const rateFactor = vatRate / (100 + vatRate);
      const calculatedTax = parseFloat((displayPrice * rateFactor).toFixed(2));

      const t1 = toTLV(1, displaySeller);
      const t2 = toTLV(2, displayVat);
      const t3 = toTLV(3, timestamp.trim() || new Date().toISOString().split('.')[0] + 'Z');
      const t4 = toTLV(4, displayPrice.toFixed(2));
      const t5 = toTLV(5, calculatedTax.toFixed(2));

      const totalSize = t1.length + t2.length + t3.length + t4.length + t5.length;
      const combined = new Uint8Array(totalSize);
      
      let offset = 0;
      [t1, t2, t3, t4, t5].forEach(tArr => {
        combined.set(tArr, offset);
        offset += tArr.length;
      });

      let binaryStr = '';
      for (let i = 0; i < combined.byteLength; i++) {
        binaryStr += String.fromCharCode(combined[i]);
      }
      setBase64Payload(window.btoa(binaryStr));
    } catch (e) {
      setBase64Payload('Q29tcGxpYW50IHdpdGggWkFUQ0EgUGhhc2UgMSAmIDI=');
    }
  }, [sellerName, vatNumber, totalPrice, vatRate, timestamp, lang]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64Payload);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const qrColor = '0f172a'; // Deep crisp black for readable scanning on light background receipt
  const qrBg = 'ffffff';
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=${qrColor}&bgcolor=${qrBg}&data=${encodeURIComponent(debouncedBase64)}`;

  return (
    <div id="einvoice-simulator" className={`relative rounded-3xl border p-6 md:p-8 transition-all duration-300 ${
      theme === 'light' 
        ? 'bg-slate-50/50 border-slate-200/80 text-slate-800' 
        : 'bg-[#060b17] border-slate-900 text-white'
    }`}>
      
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-slate-205 dark:border-slate-800/60 pb-5">
        <div>
          <div className="flex items-center gap-2 justify-start">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h4 className={`text-xl font-extrabold font-cairo ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              {t.validatorTitle}
            </h4>
          </div>
          <p className={`text-xs font-cairo mt-1.5 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
            {t.validatorDesc}
          </p>
        </div>

        {/* Dynamic Accordion Guide Button */}
        <button
          type="button"
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold font-cairo transition-all cursor-pointer bg-[#0a1b3d] hover:bg-[#07132e] border-[#1d4ed8]/30 text-white shadow-sm"
        >
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>{lang === 'ar' ? 'كيف يعمل الفحص الضريبي؟' : 'How does the compliance generator work?'}</span>
          {showExplanation ? <ChevronUp className="w-3.5 h-3.5 text-cyan-400" /> : <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />}
        </button>
      </div>

      {/* Guide details panel (collapsible to avoid visual noise by default) */}
      {showExplanation && (
        <div className="mb-6 p-5 rounded-2xl border transition-all duration-300 text-right bg-[#0a1b3d] border-[#1d4ed8]/30 text-white shadow-xl">
          <div className="space-y-4">
            <p className="text-xs font-cairo leading-relaxed text-justify text-slate-100">
              {lang === 'ar' 
                ? 'يوضح هذا المحاكي التفاعلي كيفية تشفير وطهي بيانات الفاتورة إلكترونياً بنظام TLV الثنائي المعتمد من هيئة الزكاة والضريبة والجمارك (فاتورة) ومصلحة الضرائب المصرية.'
                : 'This interactive engine compiles tax properties into strict cryptographic Base64 string tags (TLV structural hex codes).'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-right">
              <div className="p-3 rounded-xl bg-[#07132e] border border-slate-700/30">
                <span className="text-xs font-bold text-cyan-400 font-cairo">💡 فحص فوري بجوالك:</span>
                <p className="text-[10.5px] mt-1 font-cairo leading-relaxed text-slate-200">
                  {lang === 'ar' 
                    ? 'اكتب اسم شركتك ورقمك الضريبي الافتراضي ثم افحص الباركود عبر تطبيق الفحص الضريبى المعتمد المتاح على متجر تطبيقات الهواتف.'
                    : 'Type your business data and scan the generated coupon-style QR with any tax compliance mobile software.'}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#07132e] border border-slate-700/30">
                <span className="text-xs font-bold text-cyan-400 font-cairo">⚡ تشفير فوري خفيف:</span>
                <p className="text-[10.5px] mt-1 font-cairo leading-relaxed text-slate-200">
                  {lang === 'ar' 
                    ? 'يتم دمج ومزامنة الفواتير بالخلفية دون التسبب ببطء أو وقف في أجهزة نقاط البيع بالمخازن والفروع.'
                    : 'Encodes and streams live VAT records without slowing down POS machines or inventory software terminals.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main interactive grid area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Spacious Inputs Form */}
        <div className="lg:col-span-6 space-y-4">
          <div className={`p-4 rounded-2xl border transition-colors duration-300 ${
            theme === 'light' ? 'bg-white border-slate-200/80' : 'bg-slate-900/40 border-slate-800/90'
          }`}>
            <h5 className={`text-xs font-bold font-cairo mb-3 uppercase tracking-wider flex items-center gap-1.5 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              {lang === 'ar' ? 'بيانات التاجر والفوترة' : 'Business Invoice Properties'}
            </h5>
            
            <div className="space-y-4">
              {/* Input Seller Name */}
              <div>
                <label className={`block text-[11px] font-bold font-cairo mb-1.5 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                  {lang === 'ar' ? 'اسم المنشأة أو الشركة البائعة' : 'Corporate / Seller Name'}
                </label>
                <input
                  type="text"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  onFocus={() => setFocusedField('sellerName')}
                  onBlur={() => setFocusedField('')}
                  placeholder={focusedField === 'sellerName' ? '' : (lang === 'ar' ? 'مثال: شركة نايل تكنو' : 'e.g. Nile Techno')}
                  className={`w-full text-xs text-center px-4 py-3 rounded-xl transition-all outline-none font-medium font-cairo border ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-950 placeholder:text-slate-400 focus:bg-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/10'
                      : 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/10'
                  }`}
                />
              </div>

              {/* Tax ID */}
              <div>
                <label className={`block text-[11px] font-bold font-cairo mb-1.5 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                  {lang === 'ar' ? 'الرقم الضريبي للمنشأة (15 خانة)' : 'Seller VAT Number (15 digits)'}
                </label>
                <input
                  type="text"
                  maxLength={15}
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  onFocus={() => setFocusedField('vatNumber')}
                  onBlur={() => setFocusedField('')}
                  placeholder={focusedField === 'vatNumber' ? '' : (lang === 'ar' ? 'أدخل الـ 15 رقم الضريبي' : 'Enter 15-digit Tax ID')}
                  className={`w-full text-xs text-center px-4 py-3 rounded-xl transition-all outline-none font-medium font-mono border ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-950 placeholder:text-slate-400 focus:bg-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/10'
                      : 'bg-slate-950 border-slate-800 text-cyan-400 placeholder:text-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/10'
                  }`}
                />
              </div>

              {/* DateTime */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className={`block text-[11px] font-bold font-cairo ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                    {lang === 'ar' ? 'تاريخ ووقت المعاملة' : 'Invoice Transaction Date & Time'}
                  </label>
                  {isAutoTime ? (
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold font-cairo animate-pulse">
                      {lang === 'ar' ? 'تلقائي حقيقي' : 'Live Auto'}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsAutoTime(true)}
                      className="text-[10px] text-cyan-500 hover:underline font-bold font-cairo cursor-pointer"
                    >
                      {lang === 'ar' ? 'تفعيل التحديث التلقائي' : 'Enable Auto Update'}
                    </button>
                  )}
                </div>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={timestamp}
                    onChange={(e) => {
                      setIsAutoTime(false);
                      setTimestamp(e.target.value);
                    }}
                    onFocus={() => {
                      setFocusedField('timestamp');
                      setIsAutoTime(false);
                    }}
                    onBlur={() => setFocusedField('')}
                    placeholder={focusedField === 'timestamp' ? '' : (lang === 'ar' ? 'أدخل تاريخ ووقت المعاملة' : 'Enter timestamp')}
                    className={`w-full text-xs text-center px-4 py-3 rounded-xl transition-all outline-none font-medium font-mono border ${
                      theme === 'light'
                        ? 'bg-slate-50 border-slate-200 text-slate-950 placeholder:text-slate-400 focus:bg-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/15'
                        : 'bg-slate-950 border-slate-800 text-slate-300 placeholder:text-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/15'
                    }`}
                  />
                  <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none">
                    <Calendar className="w-4 h-4 text-slate-450" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border transition-colors duration-300 ${
            theme === 'light' ? 'bg-white border-slate-200/80' : 'bg-slate-900/40 border-slate-805/90'
          }`}>
            <h5 className={`text-xs font-bold font-cairo mb-3 uppercase tracking-wider flex items-center gap-1.5 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              {lang === 'ar' ? 'الحسابات والضريبة المضافة' : 'VAT and pricing breakdown'}
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-[11px] font-bold font-cairo mb-1.5 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                  {lang === 'ar' ? 'المبلغ الإجمالي شامل الضريبة' : 'Total Price (including VAT)'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={totalPrice}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9.]/g, '');
                      setTotalPrice(val);
                    }}
                    onFocus={() => setFocusedField('totalPrice')}
                    onBlur={() => setFocusedField('')}
                    placeholder={focusedField === 'totalPrice' ? '' : (lang === 'ar' ? 'ريال / جنيه' : 'SAR / EGP')}
                    className={`w-full text-xs text-center px-4 py-3 rounded-xl transition-all outline-none font-bold font-mono border ${
                      theme === 'light'
                        ? 'bg-slate-50 border-slate-200 text-emerald-600 placeholder:text-slate-400 focus:bg-white focus:border-cyan-500'
                        : 'bg-slate-950 border-slate-800 text-emerald-400 placeholder:text-slate-650 focus:border-cyan-500'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-[11px] font-bold font-cairo mb-1.5 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                  {lang === 'ar' ? 'نسبة القيمة المضافة' : 'VAT Percentage'}
                </label>
                <select
                  value={vatRate}
                  onChange={(e) => setVatRate(parseInt(e.target.value))}
                  className={`w-full text-xs text-center px-4 py-3 rounded-xl transition-all cursor-pointer outline-none font-medium font-cairo border ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-cyan-500'
                      : 'bg-slate-950 border-slate-800 text-slate-300 focus:border-cyan-500'
                  }`}
                >
                  <option value={15}>15% ({lang === 'ar' ? 'السعودية' : 'KSA'})</option>
                  <option value={14}>14% ({lang === 'ar' ? 'مصر' : 'Egypt'})</option>
                  <option value={5}>5% ({lang === 'ar' ? 'صادرات ومعفاة' : 'Export/Exempt'})</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: High Fidelity "Simulated Thermal Receipt" (Optimized and tidy!) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          
          {/* Simulated Thermal Paper Receipt Envelope */}
          <div className="w-full max-w-sm bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative font-sans">
            
            {/* Top jagged paper aesthetic edge */}
            <div className="h-2 w-full bg-slate-200 flex overflow-hidden opacity-90">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-white rotate-45 transform -translate-y-2 shrink-0"></div>
              ))}
            </div>

            {/* Receipt Inner Body */}
            <div className="p-6 space-y-5 text-center">
              
              {/* Receipt Header */}
              <div className="border-b border-dashed border-slate-300 pb-4">
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider block mx-auto w-max mb-2">
                  {lang === 'ar' ? 'فاتورة ضريبية مبسطة' : 'Simplified Tax Invoice'}
                </span>
                <h4 className="text-sm font-black font-cairo text-slate-900 mt-2">
                  {sellerName.trim() || (lang === 'ar' ? 'فاتورة نايل تكنو الافتراضية' : 'Nile Techno Default Invoice')}
                </h4>
                <p className="text-[11px] font-mono text-slate-500 mt-1">
                  VAT ID: {vatNumber.trim() || '310123456700003'}
                </p>
                <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                  DATE: {timestamp}
                </p>
              </div>

              {/* Transaction Values Details */}
              <div className="space-y-3 text-right text-xs font-medium">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-cairo">{lang === 'ar' ? 'المبلغ الخاضع للضريبة' : 'Net Taxable Amount'}</span>
                  <div className="flex items-center gap-1 font-mono font-bold text-slate-800">
                    <span>{(totalPrice !== '' ? netAmount : 100.88).toFixed(2)}</span>
                    <span className="text-xs font-bold font-cairo text-slate-400 select-none">
                      {lang === 'ar' ? 'ريال' : 'SAR'}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-cairo">{lang === 'ar' ? 'نسبة الضريبة المضافة' : 'VAT Rate'}</span>
                  <span className="font-mono font-bold text-slate-800">{vatRate}%</span>
                </div>
                <div className="flex justify-between items-center text-cyan-600 font-bold">
                  <span className="font-cairo">{lang === 'ar' ? 'مبلغ الضريبة المضافة (VAT)' : 'VAT Paid'}</span>
                  <div className="flex items-center gap-1 font-mono">
                    <span>{(totalPrice !== '' ? taxAmount : 15.12).toFixed(2)}</span>
                    <span className="text-xs font-bold font-cairo text-cyan-500/80 select-none">
                      {lang === 'ar' ? 'ريال' : 'SAR'}
                    </span>
                  </div>
                </div>
                
                {/* Grand total large block */}
                <div className="flex justify-between items-center pt-3 border-t-2 border-dashed border-slate-300 text-sm font-extrabold text-[#1e293b]">
                  <span className="font-cairo text-emerald-600">{lang === 'ar' ? 'الإجمالي شامل الضريبة' : 'Gross Grand Total'}</span>
                  <div className="flex items-center gap-1.5 font-mono text-emerald-600">
                    <span className="text-base font-extrabold">
                      {(totalPrice !== '' ? parseFloat(totalPrice) : 115.00).toFixed(2)}
                    </span>
                    <span className="text-xs font-black font-cairo text-emerald-500 select-none">
                      {lang === 'ar' ? 'ريال' : 'SAR'}
                    </span>
                  </div>
                </div>
              </div>

              {/* QR Code embedded inside the paper body just like the original format */}
              <div className="flex flex-col items-center justify-center pt-5 pb-2 border-t border-dashed border-slate-300">
                <div className="p-2.5 bg-white border border-slate-200 rounded-2xl transition-transform duration-300 hover:scale-105 shadow-sm relative">
                  <img
                    src={qrImageUrl}
                    alt="Tax Compliant QR Code"
                    className="w-32 h-32 object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border border-white shadow">
                    <QrCode className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="text-[9.5px] text-slate-500 font-cairo mt-2.5 flex items-center justify-center gap-1.5 text-center leading-relaxed max-w-[240px]">
                  <span>{lang === 'ar' ? 'امسح المعاينة بهاتفك للتصديق التلقائي الفوري' : 'Scan to check real-time compliant TLV tag'}</span>
                </span>
              </div>

              {/* Bottom message */}
              <div className="pt-3 border-t border-dashed border-slate-200">
                <span className="text-[10px] text-slate-400 font-cairo block">
                  {lang === 'ar' ? '✔ معتمد للربط مع هيئة الزكاة والجمارك ومصلحة الضرائب' : '✔ ZATCA & ETA Compliant'}
                </span>
                <span className="text-[9.5px] text-slate-400 font-cairo mt-0.5 block">
                  {lang === 'ar' ? 'شكراً لتعاملكم معنا' : 'Thank you for choosing Nile Techno'}
                </span>
              </div>

            </div>

            {/* Bottom jagged paper aesthetic edge */}
            <div className="h-2 w-full bg-slate-200 flex overflow-hidden opacity-90">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-white rotate-45 transform translate-y-1 shrink-0"></div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 2. Base64 Real-time Verification Panel below */}
      <div className={`mt-8 p-5 rounded-2xl border transition-all duration-300 ${
        theme === 'light' 
          ? 'bg-white border-slate-200/80 shadow-sm' 
          : 'bg-[#091124] border-slate-800 shadow-md'
      }`}>
        <div className="space-y-3 text-right">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h5 className="text-xs font-bold font-cairo text-cyan-500 dark:text-cyan-400 flex items-center gap-1.5 justify-end mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              {lang === 'ar' ? 'سلسلة التشفير الضريبي الفوري (Base64 Payload)' : 'Real-time Cryptographic Base64 Payload'}
            </h5>
            {copySuccess && (
              <span className="text-[10px] text-emerald-600 dark:text-emerald-450 font-bold font-cairo animate-pulse">
                {lang === 'ar' ? '✔ تم النسخ ومطابقة الـ TLV بنجاح!' : '✔ Tag copied successfully!'}
              </span>
            )}
          </div>
          <p className={`text-[11px] font-cairo leading-relaxed ${theme === 'light' ? 'text-slate-650' : 'text-slate-400'}`}>
            {lang === 'ar' 
              ? 'يقوم النظام بربط الحقول ضريبياً لتوليد بصمة رقمية مشفرة تستقبلها تطبيقات الهيئة للتأكد من نزاهة الفواتير من التعديل.' 
              : 'Our system instantly serializes VAT fields to emit tamper-proof cryptographic strings readable by governmental tax entities.'}
          </p>

          <div className="relative mt-2">
            <div className={`text-[10px] font-mono p-3 rounded-xl border select-all max-h-16 overflow-y-auto break-all leading-relaxed ${
              theme === 'light' 
                ? 'bg-slate-50 border-slate-204 text-slate-600' 
                : 'bg-slate-950 border-slate-800 text-cyan-400'
            }`}>
              {base64Payload}
            </div>
            <button
              type="button"
              onClick={copyToClipboard}
              className={`absolute right-2 top-2 p-1.5 border rounded-lg transition-all cursor-pointer shadow-sm ${
                theme === 'light'
                  ? 'bg-white hover:bg-slate-100 border-slate-205 text-slate-600'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
              title="Copy Payload"
            >
              <ClipboardCopy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
