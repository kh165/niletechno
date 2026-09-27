import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Award, X, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { SUCCESS_PARTNERS } from '../../data';
import { PartnerLogo } from '../site/BrandVisuals';
import { COMPANY_CONFIG, createWhatsAppUrl } from '../../constants/config';
import { AnimatedCounter } from '../site/AnimatedCounter';
import companyLogo from '../../assets/images/logo.png';
import WhatsAppButton from '../site/WhatsAppButton';
import { 
  getPartnerInquiryMessage, 
  getDirectorySalesMessage, 
  buildWhatsAppUrl 
} from '../../utils/whatsapp';

/**
 * Explicit definition of Egyptian partner categories vs KSA.
 * Any business category other than 'ksa' belongs to the Egyptian branch/market portfolio.
 */
export const EGYPT_PARTNER_CATEGORIES = [
  'import_export',
  'hospitality',
  'malls_houseware',
  'mills_feed',
  'contracting',
  'jewelry',
  'agencies_wholesale',
  'car_showrooms',
  'pharma',
  'herbs_spices',
  'factories'
];

export const isEgyptPartner = (partner) => {
  if (!partner) return false;
  // Explicitly check partner category: if not 'ksa', it is categorized as Egypt
  return partner.category !== 'ksa' || EGYPT_PARTNER_CATEGORIES.includes(partner.category);
};

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
        ? isEgyptPartner(partner) 
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
    const msg = getPartnerInquiryMessage(partnerName, partnerInd, isRtl);
    window.open(buildWhatsAppUrl(COMPANY_CONFIG.whatsappEgypt || '201000082722', msg), '_blank');
  };

  if (!isOpen) return null;

  const waSalesText = getDirectorySalesMessage(isRtl);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div 
        className="w-full max-w-5xl max-h-[92vh] sm:max-h-[88vh] rounded-3xl bg-white border border-slate-200/80 shadow-2xl flex flex-col overflow-hidden text-slate-900 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between gap-3 bg-gradient-to-r from-slate-50 via-white to-sky-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
              <img 
                src={companyLogo} 
                alt="Nile Techno" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base md:text-lg font-black font-cairo text-slate-900 leading-tight">
                  {isRtl ? 'دليل شركاء النجاح المعتمدين' : 'Certified Success Partners Directory'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1a85ea]/10 text-[#1a85ea] border border-[#1a85ea]/20">
                  <AnimatedCounter to={Array.isArray(SUCCESS_PARTNERS) ? SUCCESS_PARTNERS.length : 100} duration={1.2} />+ {isRtl ? 'شريك' : 'Partners'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-cairo mt-0.5">
                {isRtl 
                  ? 'سجل سابقة أعمال نايل تكنو للبرمجيات في مصر والمملكة العربية السعودية' 
                  : 'Nile Techno Enterprise ERP implementations across Egypt & KSA'}
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-500 transition-colors cursor-pointer shrink-0"
            aria-label={isRtl ? 'إغلاق' : 'Close'}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* 2. Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          
          {/* Controls: Search + Categories Carousel */}
          <div className="space-y-3">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={partnerSearchInput}
                onChange={(e) => setPartnerSearchInput(e.target.value)}
                placeholder={isRtl ? 'ابحث باسم الشريك أو مجال النشاط أو الدولة...' : 'Search by partner name, activity, or region...'}
                className="w-full h-11 px-4 ps-10 rounded-2xl bg-white border border-slate-200/90 text-xs sm:text-sm font-cairo text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a85ea]/20 focus:border-[#1a85ea] transition-all shadow-xs"
              />
              <Search className={`w-4 h-4 text-slate-400 absolute top-3.5 ${isRtl ? 'right-3.5' : 'left-3.5'} pointer-events-none`} />
              {partnerSearchInput && (
                <button
                  type="button"
                  onClick={() => setPartnerSearchInput('')}
                  className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'} text-xs text-slate-400 hover:text-slate-600 font-cairo`}
                >
                  {isRtl ? 'مسح' : 'Clear'}
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

          {/* Partner Logo Grid */}
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

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0 bg-white">
          <span className="text-[10px] sm:text-xs text-slate-600 font-cairo text-center sm:text-right">
            {isRtl 
              ? '* اضغط على أي شريك للاستفسار المباشر عن حلولنا المنفذة لديه، أو تواصل مع المبيعات'
              : '* Click any partner to inquire about deployed software systems, or contact sales'}
          </span>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
            <WhatsAppButton
              href={createWhatsAppUrl('egy', waSalesText)}
              label={isRtl ? 'واتساب مبيعات' : 'Sales WhatsApp'}
              className="w-full sm:w-auto"
            />
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
