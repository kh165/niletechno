import React, { useState, useEffect, useRef } from 'react';
import { generateQRCodeDataUrl } from '../utils/qrGenerator';
import { TRANSLATIONS } from '../data';
import { 
  FileCode, 
  Calendar, 
  QrCode, 
  ClipboardCopy, 
  ShieldCheck,
  FileText,
  Code2,
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw,
  Check
} from 'lucide-react';

export default function EInvoiceDemo({ lang, theme }) {
  const t = TRANSLATIONS[lang];

  // Invoice Data inputs
  const [sellerName, setSellerName] = useState('شركة نايل تكنو للبرمجيات');
  const [vatNumber, setVatNumber] = useState('310123456700003');
  const [totalPrice, setTotalPrice] = useState('114.00');
  const [vatRate, setVatRate] = useState(14);
  
  // Format fixed invoice timestamp at creation time (Does not tick continuously)
  const getFormattedNow = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const [invoiceTimestamp, setInvoiceTimestamp] = useState(getFormattedNow);

  // Automatically update invoice timestamp in real-time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setInvoiceTimestamp(getFormattedNow());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [base64Payload, setBase64Payload] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Auto calculate tax amounts
  const grossTotal = parseFloat(totalPrice) || 0;
  const rateFactor = vatRate / (100 + vatRate);
  const taxAmount = parseFloat((grossTotal * rateFactor).toFixed(2));
  const netAmount = parseFloat((grossTotal - taxAmount).toFixed(2));

  // Compute ZATCA/ETA compliant TLV Base64 payload (Simulator logic)
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
      const displaySeller = sellerName.trim() || 'شركة نايل تكنو للبرمجيات';
      const displayVat = vatNumber.trim() || '310123456700003';
      const displayPrice = grossTotal.toFixed(2);
      const displayTax = taxAmount.toFixed(2);
      const displayTime = invoiceTimestamp.trim() || getFormattedNow();

      const t1 = toTLV(1, displaySeller);
      const t2 = toTLV(2, displayVat);
      const t3 = toTLV(3, displayTime);
      const t4 = toTLV(4, displayPrice);
      const t5 = toTLV(5, displayTax);

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
      const b64 = window.btoa(binaryStr);
      setBase64Payload(b64);

      // Generate local QR Code as a data URL (zero external npm dependencies, 100% offline client-side)
      const url = generateQRCodeDataUrl(b64, {
        size: 220,
        margin: 1,
        darkColor: '#0f172a',
        lightColor: '#ffffff',
      });
      setQrDataUrl(url);

    } catch (e) {
      console.error('TLV compilation error:', e);
    }
  }, [sellerName, vatNumber, totalPrice, vatRate, invoiceTimestamp]);

  const copyToClipboard = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(base64Payload);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div id="einvoice-simulator" className={`relative rounded-3xl border p-6 md:p-8 transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-slate-50/70 border-slate-200 text-slate-800 shadow-sm' 
        : 'bg-[#060b17] border-slate-800 text-white'
    }`}>
      
      {/* Title & Simulator Disclaimer */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 justify-start">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500 shrink-0">
              <FileCode className="w-5 h-5" />
            </span>
            <h3 className={`text-xl font-extrabold font-cairo ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              {lang === 'ar' ? 'محاكي تكوين هيكل الفاتورة الإلكترونية (TLV Simulator)' : 'E-Invoice Payload Simulator & TLV Decoder'}
            </h3>
          </div>
          <p className={`text-xs font-cairo mt-1.5 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
            {lang === 'ar'
              ? 'محاكاة تفاعلية لتكوين وتركيب حقول الفاتورة ونظام الـ TLV المشفر محلياً دون إرسال بياناتك لخوادم خارجية.'
              : 'Interactive tool demonstrating how TLV binary tags and Base64 payloads are formatted in accordance with digital invoice standards.'}
          </p>
        </div>

        {/* Explain toggle */}
        <button
          type="button"
          onClick={() => setShowExplanation(!showExplanation)}
          aria-expanded={showExplanation}
          className="min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#1a85ea]/20 text-xs font-bold font-cairo transition-colors cursor-pointer bg-[#1a85ea] hover:bg-[#1470c7] text-white shadow-md shadow-[#1a85ea]/25 w-full sm:w-auto shrink-0"
        >
          <HelpCircle className="w-4 h-4 text-white shrink-0" />
          <span>{lang === 'ar' ? 'عن هذا المحاكي التعليمي' : 'About This Simulator'}</span>
          {showExplanation ? <ChevronUp className="w-3.5 h-3.5 text-white shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-white shrink-0" />}
        </button>
      </div>

      {/* Guide details panel */}
      {showExplanation && (
        <div className={`mb-6 p-5 rounded-2xl border transition-all text-right ${theme === 'light' ? 'bg-white border-slate-200 text-slate-800 shadow-md shadow-slate-200/60' : 'bg-slate-900/90 border-slate-700 text-white shadow-xl'}`}>
          <div className="space-y-3">
            <p className="text-xs font-cairo leading-relaxed text-justify text-slate-600">
              {lang === 'ar' 
                ? 'ملاحظة توضيحية: هذا المكون محاكي تفاعلي محلي يُظهر كيفية ترميز الحقول الخمسة الأساسية (اسم التاجر، الرقم الضريبي، الطابع الزمني، المبلغ، والضريبة) بنظام Tag-Length-Value وتحويلها إلى Base64. يتم توليد رمز الـ QR محلياً داخل المتصفح بالكامل بدون أي طلبات لخدمات خارجية.'
                : 'Note: This component is a local interactive simulator illustrating the 5 standardized TLV tags encoded into Base64 format. The QR is generated 100% client-side without external dependencies.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-right">
              <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100">
                <span className="text-xs font-bold text-[#1a85ea] font-cairo flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1a85ea]" />
                  <span>{lang === 'ar' ? 'خصوصية وأمان تام:' : 'Complete Security & Privacy:'}</span>
                </span>
                <p className="text-[11px] mt-1 font-cairo leading-relaxed text-slate-600">
                  {lang === 'ar' ? 'البيانات تُعالج محلياً في المتصفح ولا يتم حفظها أو نقلها لخوادم خارجية.' : 'All data is computed in-memory locally in your browser.'}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-xs font-bold text-[#1a85ea] font-cairo flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === 'ar' ? 'طابع زمني تلقائي فوري:' : 'Automatic Live Timestamp:'}</span>
                </span>
                <p className="text-[11px] mt-1 font-cairo leading-relaxed text-slate-600">
                  {lang === 'ar' ? 'يتم ضبط وتحديث وقت وتاريخ الفاتورة تلقائياً لحظة بلحظة دون أي تدخل يدوي.' : 'Timestamp is automatically synchronized live in real-time.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form and Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div className={`p-4 rounded-2xl border transition-colors ${
            theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900/50 border-slate-800'
          }`}>
            <h4 className={`text-xs font-bold font-cairo mb-3 uppercase tracking-wider flex items-center gap-1.5 ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              <FileText className="w-3.5 h-3.5 text-cyan-500" />
              {lang === 'ar' ? 'بيانات الفاتورة الافتراضية' : 'Invoice Simulation Data'}
            </h4>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="sim-seller-name" className={`block text-[11px] font-bold font-cairo mb-1.5 ${
                  theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  {lang === 'ar' ? 'اسم المنشأة البائعة' : 'Seller Name'}
                </label>
                <input
                  id="sim-seller-name"
                  type="text"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className={`w-full min-h-[44px] text-xs px-4 py-2.5 rounded-xl transition-all outline-none font-medium font-cairo border ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-cyan-500'
                      : 'bg-slate-950 border-slate-800 text-white focus:border-cyan-500'
                  }`}
                />
              </div>

              <div>
                <label htmlFor="sim-vat-number" className={`block text-[11px] font-bold font-cairo mb-1.5 ${
                  theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  {lang === 'ar' ? 'الرقم الضريبي (15 رقم)' : 'VAT Registration Number'}
                </label>
                <input
                  id="sim-vat-number"
                  type="text"
                  maxLength={15}
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  className={`w-full min-h-[44px] text-xs px-4 py-2.5 rounded-xl transition-all outline-none font-medium font-mono border ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-cyan-500'
                      : 'bg-slate-950 border-slate-800 text-cyan-400 focus:border-cyan-500'
                  }`}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="sim-timestamp" className={`block text-[11px] font-bold font-cairo ${
                    theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                  }`}>
                    {lang === 'ar' ? 'تاريخ ووقت إصدار الفاتورة' : 'Invoice Timestamp'}
                  </label>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-bold font-cairo select-none">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>{lang === 'ar' ? 'مزامنة تلقائية حية' : 'Live Auto-Sync'}</span>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <input
                    id="sim-timestamp"
                    type="text"
                    value={invoiceTimestamp}
                    readOnly
                    dir="ltr"
                    className={`w-full min-h-[44px] text-xs pl-4 pr-12 py-2.5 rounded-xl transition-all outline-none font-medium font-mono border text-left ${
                      theme === 'light'
                        ? 'bg-slate-50 border-slate-200 text-slate-900'
                        : 'bg-slate-950 border-slate-800 text-emerald-400'
                    }`}
                  />
                  <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border transition-colors ${
            theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900/50 border-slate-800'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="sim-total-price" className={`block text-[11px] font-bold font-cairo mb-1.5 ${
                  theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  {lang === 'ar' ? 'إجمالي المبلغ شامل الضريبة' : 'Total Price (incl. VAT)'}
                </label>
                <input
                  id="sim-total-price"
                  type="text"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value.replace(/[^0-9.]/g, ''))}
                  className={`w-full min-h-[44px] text-xs px-4 py-2.5 rounded-xl transition-all outline-none font-bold font-mono border ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-emerald-600 focus:bg-white focus:border-cyan-500'
                      : 'bg-slate-950 border-slate-800 text-emerald-400 focus:border-cyan-500'
                  }`}
                />
              </div>

              <div>
                <label htmlFor="sim-vat-rate" className={`block text-[11px] font-bold font-cairo mb-1.5 ${
                  theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  {lang === 'ar' ? 'نسبة الضريبة (%)' : 'VAT Percentage (%)'}
                </label>
                <select
                  id="sim-vat-rate"
                  value={vatRate}
                  onChange={(e) => setVatRate(parseInt(e.target.value, 10))}
                  className={`w-full min-h-[44px] text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer outline-none font-medium font-cairo border ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-cyan-500'
                      : 'bg-slate-950 border-slate-800 text-slate-200 focus:border-cyan-500'
                  }`}
                >
                  <option value={14}>14% ({lang === 'ar' ? 'جمهورية مصر العربية' : 'Egypt'})</option>
                  <option value={15}>15% ({lang === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'})</option>
                  <option value={5}>5% ({lang === 'ar' ? 'فئات خاصة / معفاة' : 'Special / Exempt'})</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Simulated Thermal Receipt */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative font-sans">
            
            {/* Top edge */}
            <div className="h-2 w-full bg-slate-200 flex overflow-hidden opacity-90">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-white rotate-45 transform -translate-y-2 shrink-0"></div>
              ))}
            </div>

            <div className="p-6 space-y-4 text-center">
              <div className="border-b border-dashed border-slate-300 pb-3">
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider block mx-auto w-max mb-1.5">
                  {lang === 'ar' ? 'نموذج محاكاة فاتورة مبسطة' : 'Simplified Invoice Simulator'}
                </span>
                <p className="text-sm font-black font-cairo text-slate-900 mt-1">
                  {sellerName.trim() || 'شركة نايل تكنو للبرمجيات'}
                </p>
                <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                  VAT ID: {vatNumber.trim() || '310123456700003'}
                </p>
                <p className="text-[10px] font-mono text-slate-400">
                  DATE: {invoiceTimestamp}
                </p>
              </div>

              <div className="space-y-2.5 text-right text-xs font-medium">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-cairo">{lang === 'ar' ? 'المبلغ الخاضع للضريبة' : 'Net Taxable'}</span>
                  <span className="font-mono font-bold text-slate-800">{netAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-cairo">{lang === 'ar' ? 'نسبة الضريبة المضافة' : 'VAT Rate'}</span>
                  <span className="font-mono font-bold text-slate-800">{vatRate}%</span>
                </div>
                <div className="flex justify-between items-center text-cyan-700 font-bold">
                  <span className="font-cairo">{lang === 'ar' ? 'مبلغ الضريبة' : 'Tax Amount'}</span>
                  <span className="font-mono">{taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-2.5 border-t-2 border-dashed border-slate-300 text-sm font-extrabold text-slate-900">
                  <span className="font-cairo text-emerald-600">{lang === 'ar' ? 'الإجمالي شامل الضريبة' : 'Grand Total'}</span>
                  <span className="font-mono text-emerald-600">{grossTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Local QR Code Output */}
              <div className="flex flex-col items-center justify-center pt-4 pb-2 border-t border-dashed border-slate-300">
                <div className="p-2 bg-white border border-slate-200 rounded-xl shadow-sm relative w-36 h-36 flex items-center justify-center">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="TLV Encoded QR Code"
                      width={130}
                      height={130}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-cairo">
                      {lang === 'ar' ? 'جارٍ التوليد محلياً...' : 'Generating locally...'}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 bg-cyan-600 text-white rounded-full p-1 border border-white shadow">
                    <QrCode className="w-3 h-3" />
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-cairo mt-2">
                  {lang === 'ar' ? 'تم التوليد محلياً في المتصفح' : 'Rendered 100% locally'}
                </span>
              </div>
            </div>

            {/* Bottom edge */}
            <div className="h-2 w-full bg-slate-200 flex overflow-hidden opacity-90">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-white rotate-45 transform translate-y-1 shrink-0"></div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Base64 Payload inspection box */}
      <div className={`mt-5 p-3.5 sm:p-4 rounded-2xl border transition-colors ${theme === 'light' ? 'border-slate-200 bg-white shadow-sm' : 'border-slate-800 bg-slate-900/60 shadow-sm'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2.5">
          <h4 className="text-[11px] sm:text-xs md:text-sm font-extrabold font-cairo text-[#1470c7] flex items-center gap-1.5 min-w-0">
            <Code2 className="w-3.5 h-3.5 shrink-0" />
            <span>{lang === 'ar' ? 'سلسلة الترميز الناتجة (Base64 Payload):' : 'Generated Base64 Payload String:'}</span>
          </h4>
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            {copySuccess && (
              <span className="text-[10px] text-emerald-600 font-bold font-cairo flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
              </span>
            )}
            <button
                type="button"
                onClick={copyToClipboard}
                className="min-h-[34px] px-3 py-1.5 rounded-xl border border-sky-200 bg-sky-50 hover:bg-sky-100 text-[#1470c7] transition-colors cursor-pointer flex items-center justify-center gap-1.5 font-bold font-cairo shadow-sm text-[11px]"
                title="Copy payload"
                aria-label="Copy payload"
              >
                <span>{lang === 'ar' ? 'نسخ السلسلة' : 'Copy String'}</span>
                <ClipboardCopy className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className={`text-[9px] md:text-[10px] font-mono p-3 rounded-xl border select-all max-h-16 overflow-y-auto break-all leading-relaxed text-left ${theme === 'light' ? 'border-slate-200 bg-slate-50 text-slate-700' : 'border-slate-800 bg-slate-950 text-cyan-300'}`} dir="ltr">
            {base64Payload}
        </div>
      </div>

    </div>
  );
}
