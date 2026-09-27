import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Award, X, ChevronLeft, ChevronRight, Search, MessageSquare } from 'lucide-react';
import { SUCCESS_PARTNERS } from '../../data';
import { PartnerLogo } from '../site/BrandVisuals';
import { createWhatsAppUrl } from '../../constants/config';
import { AnimatedCounter } from '../site/AnimatedCounter';
import companyLogo from '../../assets/images/logo.png';

export default function PartnersDirectoryModal({ isOpen, onClose, lang = 'ar', theme = 'dark' }) {
  const isRtl = lang === 'ar';
  const [partnerActiveTab, setPartnerActiveTab] = useState('all');
  const [partnerSearchInput, setPartnerSearchInput] = useState('');
  const [partnerSearchQuery, setPartnerSearchQuery] = useState('');
  const tabsScrollRef = useRef(null);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setPartnerSearchQuery(partnerSearchInput);
    }, 100);
    return () => clearTimeout(handler);
  }, [partnerSearchInput]);

  // Handle Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Categories matching the official Nile Techno portal
  const categories = useMemo(() => [
    { id: 'all', label: lang === 'ar' ? '📌 الكل' : '📌 All' },
    { id: 'egypt', label: lang === 'ar' ? '🇪🇬 مصر' : '🇪🇬 Egypt' },
    { id: 'ksa', label: lang === 'ar' ? '🇸🇦 السعودية' : '🇸🇦 Saudi Arabia' },
    { id: 'import_export', label: lang === 'ar' ? '📦 الاستيراد والتصدير' : '📦 Import & Export' },
    { id: 'hospitality', label: lang === 'ar' ? '☕ الكافيهات والمطاعم' : '☕ Cafes & Restaurants' },
    { id: 'malls_houseware', label: lang === 'ar' ? '🛍️ المولات والأدوات المنزلية' : '🛍️ Malls & Retail' },
    { id: 'mills_feed', label: lang === 'ar' ? '🌾 مصانع الأعلاف والمطاحن' : '🌾 Mills & Feed' },
    { id: 'contracting', label: lang === 'ar' ? '🏗️ شركات المقاولات' : '🏗️ Contracting' },
    { id: 'jewelry', label: lang === 'ar' ? '💎 محلات المجوهرات' : '💎 Jewelry' },
    { id: 'agencies_wholesale', label: lang === 'ar' ? '🤝 التوكيلات والجملة' : '🤝 Agencies & Wholesale' },
    { id: 'car_showrooms', label: lang === 'ar' ? '🚗 معارض السيارات' : '🚗 Auto Showrooms' },
    { id: 'pharma', label: lang === 'ar' ? '💊 شركات الأدوية' : '💊 Pharma & Medical' },
    { id: 'herbs_spices', label: lang === 'ar' ? '🌿 شركات العطارة' : '🌿 Spices & Herbs' },
    { id: 'factories', label: lang === 'ar' ? '🏭 المصانع والإنتاج الكبرى' : '🏭 Major Factories' }
  ], [lang]);

  // Filter partners by category & search term
  const filteredPartners = useMemo(() => {
    if (!Array.isArray(SUCCESS_PARTNERS)) return [];
    return SUCCESS_PARTNERS.filter((partner) => {
      if (!partner) return false;
      const categoryMatch = partnerActiveTab === 'all' 
        ? true 
        : partnerActiveTab === 'egypt' 
        ? partner.category !== 'ksa' 
        : partner.category === partnerActiveTab;
      if (!categoryMatch) return false;

      if (!partnerSearchQuery.trim()) return true;
      const q = partnerSearchQuery.toLowerCase().trim();
      const nameAr = String(partner.nameAr || '').toLowerCase();
      const nameEn = String(partner.nameEn || '').toLowerCase();
      const indAr = String(partner.industryAr || '').toLowerCase();
      const indEn = String(partner.industryEn || '').toLowerCase();

      return nameAr.includes(q) || nameEn.includes(q) || indAr.includes(q) || indEn.includes(q);
    });
  }, [partnerActiveTab, partnerSearchQuery]);

  // Scroll tabs horizontally
  const scrollTabs = useCallback((direction) => {
    const el = tabsScrollRef.current;
    if (!el) return;
    const step = 260;
    // In RTL, leftward scrolling is negative scrollLeft in modern browsers
    if (isRtl) {
      const delta = direction === 'left' ? -step : step;
      el.scrollBy({ left: delta, behavior: 'smooth' });
    } else {
      const delta = direction === 'right' ? step : -step;
      el.scrollBy({ left: delta, behavior: 'smooth' });
    }
  }, [isRtl]);

  const handlePartnerClick = (partner) => {
    if (!partner) return;
    const partnerName = lang === 'ar' ? partner.nameAr : (partner.nameEn || partner.nameAr);
    const partnerInd = lang === 'ar' ? (partner.industryAr || '') : (partner.industryEn || partner.industryAr || '');
    const msg = lang === 'ar'
      ? `السلام عليكم ورحمة الله وبركاته،\n\nأود الاستفسار والاطلاع على سابقة أعمال وحلول شركة نايل تكنو للبرمجيات المنفذة لدى (${partnerName})${partnerInd ? ` في قطاع (${partnerInd})` : ''}.\n\nأرجو تزويدنا بالمزيد من التفاصيل والأنظمة المقترحة لنشاطنا المشابه.\n\nشاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.`
      : `Hello Nile Techno Sales Team,\n\nI would like to inquire about your software solutions and case studies implemented for (${partnerName})${partnerInd ? ` in the (${partnerInd}) sector` : ''}.\n\nPlease provide more details on suitable ERP and mobile systems for our similar business.\n\nThank you for your assistance.`;
    window.open(`https://wa.me/201000082722?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (!isOpen) return null;

  const waSalesText = isRtl
    ? `السلام عليكم ورحمة الله وبركاته،\n\nأود الاستفسار والاطلاع على سابقة أعمال شركة نايل تكنو للبرمجيات والمشاريع المنفذة في مجال نشاطنا والتوكيلات التجارية.\n\nشاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.`
    : `Hello Nile Techno Sales Team,\n\nI would like to inquire about Nile Techno software implementations, client case studies, and enterprise agency portfolio.\n\nThank you for your assistance.`;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div 
        className="relative w-full max-w-6xl bg-white text-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col max-h-[94dvh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* 1. Modal Header (Compact & sleek) */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-white">
          {/* Brand & Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="h-9 sm:h-10 px-2 py-1 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-center shrink-0 shadow-2xs">
              <img 
                src={companyLogo} 
                alt="Nile Techno" 
                className="h-6 sm:h-7 w-auto object-contain select-none" 
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm md:text-base font-black font-cairo text-slate-900 leading-tight truncate">
                {isRtl ? 'دليل شركاء النجاح وسابقة الأعمال الكاملة' : 'Success Partners & Client Portfolio Directory'}
              </h3>
              <p className="text-[10px] sm:text-xs font-bold text-[#1a85ea] font-cairo line-clamp-1">
                {isRtl 
                  ? 'تصفح تفاعلي لقائمة عملائنا البالغ عددهم 1,500+ في مختلف القطاعات التجارية والمؤسسية'
                  : 'Interactive showcase of 1,500+ corporate clients across commercial and industrial sectors'}
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label={isRtl ? 'إغلاق' : 'Close'}
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* 2. Modal Body */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-5 py-2.5 sm:py-3 space-y-2.5 sm:space-y-3 overscroll-contain">
          
          {/* Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 sm:p-2 bg-slate-50/90 rounded-xl border border-slate-200/80 text-center shrink-0 shadow-2xs">
            <div className="flex items-center justify-center gap-1.5 py-0.5">
              <span className="text-sm sm:text-base font-black text-[#1a85ea] font-mono">
                <AnimatedCounter value="+1,500" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-700 font-cairo">
                {isRtl ? 'مؤسسة مفعلة' : 'Active Enterprises'}
              </span>
            </div>
            <div className={`flex items-center justify-center gap-1.5 py-0.5 sm:border-slate-200 ${isRtl ? 'sm:border-r' : 'sm:border-l'}`}>
              <span className="text-sm sm:text-base font-black text-[#1a85ea] font-mono">
                <AnimatedCounter value="+15" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-700 font-cairo">
                {isRtl ? 'عام من النجاح' : 'Years of Trust'}
              </span>
            </div>
            <div className={`flex items-center justify-center gap-1.5 py-0.5 border-t sm:border-t-0 border-slate-200 ${isRtl ? 'sm:border-r' : 'sm:border-l'}`}>
              <span className="text-sm sm:text-base font-black text-[#1a85ea] font-mono">
                <AnimatedCounter value="+36" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-700 font-cairo">
                {isRtl ? 'عميل معتمد' : 'Enterprise Certified'}
              </span>
            </div>
            <div className={`flex items-center justify-center gap-1.5 py-0.5 border-t sm:border-t-0 border-slate-200 ${isRtl ? 'sm:border-r' : 'sm:border-l'}`}>
              <span className="text-sm sm:text-base font-black text-[#1a85ea] font-mono">
                <AnimatedCounter value="99.4%" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-700 font-cairo">
                {isRtl ? 'نسبة الرضا' : 'Satisfaction Rate'}
              </span>
            </div>
          </div>

          {/* 3. Filter Tabs & Search Bar */}
          <div className="rounded-xl border border-slate-200/80 p-1.5 sm:p-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 bg-white shadow-2xs">
            
            {/* Search Input */}
            <div className="relative w-full md:w-56 shrink-0">
              <input
                type="text"
                value={partnerSearchInput}
                onChange={(e) => setPartnerSearchInput(e.target.value)}
                placeholder={isRtl ? '...البحث السريع' : 'Search clients...'}
                className={`w-full py-1.5 text-xs font-cairo text-slate-800 placeholder-slate-400 outline-none focus:border-[#1a85ea] transition-colors rounded-lg border border-slate-200 ${
                  isRtl ? 'px-3 pr-3.5 pl-8' : 'px-3 pl-8 pr-3.5'
                }`}
              />
              <Search className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none ${isRtl ? 'left-2.5' : 'left-2.5'}`} />
              {partnerSearchInput && (
                <button
                  type="button"
                  onClick={() => setPartnerSearchInput('')}
                  className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 hover:text-slate-600 rounded-full flex items-center justify-center cursor-pointer ${isRtl ? 'left-6' : 'right-2.5'}`}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Categories Carousel */}
            <div className="flex-1 min-w-0 flex items-center gap-1.5" dir={isRtl ? 'rtl' : 'ltr'}>
              <button
                type="button"
                onClick={() => scrollTabs(isRtl ? 'right' : 'left')}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-700 hover:bg-[#1a85ea] hover:text-white hover:border-[#1a85ea] active:bg-[#1470c7] hover:scale-110 active:scale-90 transition-all duration-200 shadow-xs shrink-0 cursor-pointer"
                aria-label={isRtl ? 'السابق' : 'Previous'}
              >
                {isRtl ? <ChevronRight className="w-4 h-4 stroke-[2.5]" /> : <ChevronLeft className="w-4 h-4 stroke-[2.5]" />}
              </button>

              <div 
                ref={tabsScrollRef}
                className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 scroll-smooth"
              >
                {categories.map((cat) => {
                  const isActive = partnerActiveTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setPartnerActiveTab(cat.id)}
                      className={`min-h-[32px] sm:min-h-[34px] px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all font-cairo flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-[#1a85ea] text-white shadow-xs font-black'
                          : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => scrollTabs(isRtl ? 'left' : 'right')}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-700 hover:bg-[#1a85ea] hover:text-white hover:border-[#1a85ea] active:bg-[#1470c7] hover:scale-110 active:scale-90 transition-all duration-200 shadow-xs shrink-0 cursor-pointer"
                aria-label={isRtl ? 'التالي' : 'Next'}
              >
                {isRtl ? <ChevronLeft className="w-4 h-4 stroke-[2.5]" /> : <ChevronRight className="w-4 h-4 stroke-[2.5]" />}
              </button>
            </div>

          </div>

          {/* 4. The Partner Logo Grid */}
          <div className="pt-2">
            {filteredPartners.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 justify-items-center">
                {filteredPartners.map((partner) => {
                  return (
                    <div 
                      key={partner.id}
                      onClick={() => handlePartnerClick(partner)}
                      className="service-card-lift w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-slate-200 hover:border-[#1a85ea]/70 bg-white shadow-xs hover:shadow-lg hover:-translate-y-1.5 hover:scale-105 transition-all duration-300 flex items-center justify-center p-2 sm:p-2.5 relative overflow-hidden group cursor-pointer"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <PartnerLogo partner={partner} theme={theme} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center space-y-2 font-cairo">
                <p className="text-xs font-bold text-slate-600">
                  {isRtl ? 'لم يتم العثور على نتائج تطابق بحثك' : 'No results found matching your search'}
                </p>
                <button
                  type="button"
                  onClick={() => { setPartnerSearchInput(''); setPartnerActiveTab('all'); }}
                  className="px-3 py-1.5 rounded-lg bg-[#1a85ea] text-white text-xs font-bold cursor-pointer hover:bg-[#1470c7] transition-colors"
                >
                  {isRtl ? 'إعادة ضبط البحث' : 'Reset Search'}
                </button>
              </div>
            )}
          </div>

        </div>

        {/* 5. Modal Footer */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0 bg-white">
          <span className="text-[10px] sm:text-xs text-slate-600 font-cairo text-center sm:text-right">
            {isRtl 
              ? '* اضغط على أي شريك للاستفسار المباشر عن حلولنا المنفذة لديه، أو تواصل مع المبيعات'
              : '* Click any partner to inquire about deployed software systems, or contact sales'}
          </span>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
            {/* WhatsApp Button */}
            <a
              href={createWhatsAppUrl('egy', waSalesText)}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[40px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/20 cursor-pointer font-cairo transition-all active:scale-95 w-full sm:w-auto"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>{isRtl ? 'واتساب مبيعات' : 'Sales WhatsApp'}</span>
            </a>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="min-h-[40px] px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs cursor-pointer font-cairo transition-colors w-full sm:w-auto"
            >
              {isRtl ? 'إغلاق الدليل' : 'Close'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
