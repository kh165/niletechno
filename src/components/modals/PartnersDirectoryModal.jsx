import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Award, X, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { SUCCESS_PARTNERS } from '../../data';
import { PartnerLogo } from '../site/BrandVisuals';
import { COMPANY_CONFIG, createWhatsAppUrl } from '../../constants/config';
import { AnimatedCounter } from '../site/AnimatedCounter';
import companyLogo from '../../assets/images/logo.webp';
import WhatsAppButton from '../site/WhatsAppButton';
import Modal from '../common/Modal';
import { 
  getPartnerInquiryMessage, 
  getDirectorySalesMessage
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

  const scrollTabs = useCallback((direction) => {
    if (tabsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      tabsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  const handlePartnerClick = (partner) => {
    const isKsa = partner.category === 'ksa';
    const partnerName = isRtl ? partner.nameAr : partner.nameEn;
    const partnerInd = isRtl ? partner.industryAr : partner.industryEn;
    const waText = getPartnerInquiryMessage(partnerName, partnerInd, isRtl);
    const country = isKsa ? 'ksa' : 'egy';
    window.open(createWhatsAppUrl(country, waText), '_blank', 'noopener,noreferrer');
  };

  const waSalesText = getDirectorySalesMessage(isRtl);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledBy="partners-modal-title"
      maxWidth="max-w-5xl"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh]">
        {/* 1. Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between gap-3 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-cyan-50 border border-cyan-100 p-1.5 flex items-center justify-center shrink-0">
              <img 
                src={companyLogo} 
                alt="Nile Techno" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="partners-modal-title" className="text-sm sm:text-base md:text-lg font-black font-cairo text-slate-900 leading-tight">
                  {isRtl ? 'دليل شركاء النجاح' : 'Success Partners Directory'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1a85ea]/10 text-[#1a85ea] border border-[#1a85ea]/20">
                  <AnimatedCounter value={Array.isArray(SUCCESS_PARTNERS) ? SUCCESS_PARTNERS.length : 100} duration={1200} />+ {isRtl ? 'شريك' : 'Partners'}
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
          
          {/* Controls: Search & Category Tabs */}
          <div className="space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 pointer-events-none" />
              <input
                type="text"
                value={partnerSearchInput}
                onChange={(e) => setPartnerSearchInput(e.target.value)}
                placeholder={isRtl ? 'ابحث باسم الشركة أو الشريك أو قطاع النشاط...' : 'Search company name or industry sector...'}
                className="w-full text-xs font-cairo py-2.5 ltr:pl-9 ltr:pr-4 rtl:pr-9 rtl:pl-4 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1a85ea] transition-all shadow-2xs"
              />
              {partnerSearchInput && (
                <button
                  type="button"
                  onClick={() => setPartnerSearchInput('')}
                  className="absolute top-1/2 -translate-y-1/2 ltr:right-3 rtl:left-3 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Navigation Tabs */}
            <div className="relative flex items-center gap-1.5" role="tablist">
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
                className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 scroll-smooth flex-1"
              >
                {categories.map((cat) => {
                  const isActive = partnerActiveTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setPartnerActiveTab(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold font-cairo whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-[#1a85ea] text-white shadow-sm shadow-[#1a85ea]/30 scale-102'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
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
                    <button 
                      key={partner.id}
                      type="button"
                      onClick={() => handlePartnerClick(partner)}
                      aria-label={isRtl ? partner.nameAr : partner.nameEn}
                      className="service-card-lift w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-slate-200 hover:border-[#1a85ea]/70 bg-white shadow-xs hover:shadow-lg hover:-translate-y-1.5 hover:scale-105 transition-all duration-300 flex items-center justify-center p-2 sm:p-2.5 relative overflow-hidden group cursor-pointer"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <PartnerLogo partner={partner} theme={theme} />
                      </div>
                    </button>
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
          <span className="text-[10px] sm:text-xs text-slate-600 font-cairo text-center sm:text-start">
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
    </Modal>
  );
}
