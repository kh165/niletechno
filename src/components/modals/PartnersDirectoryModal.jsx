import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Award, X, ChevronLeft, ChevronRight, Search, Users, MessageSquare } from 'lucide-react';
import { SUCCESS_PARTNERS } from '../../data';
import { PartnerLogo } from '../site/BrandVisuals';
import { COMPANY_CONFIG, createWhatsAppUrl } from '../../constants/config';

export default function PartnersDirectoryModal({ isOpen, onClose, lang, theme }) {
  const [partnerActiveTab, setPartnerActiveTab] = useState('all');
  const [partnerSearchInput, setPartnerSearchInput] = useState('');
  const [partnerSearchQuery, setPartnerSearchQuery] = useState('');
  const modalTabsContainerRef = useRef(null);

  // Debounce search query for smooth filtering performance
  useEffect(() => {
    const handler = setTimeout(() => {
      setPartnerSearchQuery(partnerSearchInput);
    }, 200);
    return () => clearTimeout(handler);
  }, [partnerSearchInput]);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter partners by category & search term
  const filteredPartners = useMemo(() => {
    return SUCCESS_PARTNERS.filter((partner) => {
      const categoryMatch = partnerActiveTab === 'all' || partner.category === partnerActiveTab;
      if (!categoryMatch) return false;

      if (!partnerSearchQuery.trim()) return true;
      const q = partnerSearchQuery.toLowerCase().trim();
      const nameAr = (partner.nameAr || '').toLowerCase();
      const nameEn = (partner.nameEn || '').toLowerCase();
      const indAr = (partner.industryAr || '').toLowerCase();
      const indEn = (partner.industryEn || '').toLowerCase();

      return nameAr.includes(q) || nameEn.includes(q) || indAr.includes(q) || indEn.includes(q);
    });
  }, [partnerActiveTab, partnerSearchQuery]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', ar: '📌 الكل', en: '📌 All' },
    { id: 'ksa', ar: '🇸🇦 السعودية', en: '🇸🇦 KSA' },
    { id: 'import_export', ar: '📦 الاستيراد والتصدير', en: '📦 Import & Export' },
    { id: 'hospitality', ar: '☕ الكافيهات والمطاعم', en: '☕ Cafes & Restaurants' },
    { id: 'malls_houseware', ar: '🛍️ المولات والأدوات', en: '🛍️ Malls & Homewares' },
    { id: 'mills_feed', ar: '🌾 الأعلاف والمطاحن', en: '🌾 Feed Mills' },
    { id: 'contracting', ar: '🏗️ شركات المقاولات', en: '🏗️ Contracting' },
    { id: 'jewelry', ar: '💎 المجوهرات والذهب', en: '💎 Jewelry & Gold' },
    { id: 'agencies_wholesale', ar: '🤝 التوكيلات والجملة', en: '🤝 Wholesale' },
    { id: 'car_showrooms', ar: '🚗 معارض السيارات', en: '🚗 Car Showrooms' },
    { id: 'pharma', ar: '💊 شركات الأدوية', en: '💊 Pharmaceuticals' },
    { id: 'herbs_spices', ar: '🌿 شركات العطارة', en: '🌿 Herbs & Spices' },
    { id: 'factories', ar: '🏭 المصانع الكبرى', en: '🏭 Factories' },
  ];

  const waText = lang === 'ar'
    ? 'السلام عليكم ورحمة الله، أرغب في الاستفسار عن سابقة أعمال وحلول شركة نايل تكنو للبرمجيات.'
    : 'Hello, I would like to inquire about Nile Techno clients portfolio and software solutions.';

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-300 ${
          theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0a0f1d] border-slate-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between gap-4 shrink-0 transition-colors ${
          theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
        }`}>
          <div className="flex items-center gap-2.5 text-cyan-500 min-w-0">
            <div className="p-2 rounded-xl bg-cyan-500/10 shrink-0">
              <Award className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <h3 className={`text-sm sm:text-base font-extrabold font-cairo truncate ${
                theme === 'light' ? 'text-slate-900' : 'text-white'
              }`}>
                {lang === 'ar' ? 'دليل شركاء النجاح وسابقة الأعمال' : 'Nile Techno Certified Partners Directory'}
              </h3>
              <p className={`text-[10px] font-cairo hidden sm:block ${
                theme === 'light' ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {lang === 'ar' 
                  ? 'تصفح نخبة من عملائنا البالغ عددهم 1,500+ في مختلف القطاعات التجارية والمؤسسية' 
                  : 'Interactive showcase for 1,500+ commercial and industrial clients.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 sm:p-2 rounded-full cursor-pointer transition-colors ${
              theme === 'light' ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-slate-800 text-slate-400'
            }`}
            aria-label={lang === 'ar' ? 'إغلاق الدليل' : 'Close Directory'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Search and Filter Directory */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 overscroll-y-contain">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            {[
              { val: '1,500+', labelAr: 'مؤسسة مفعلة', labelEn: 'Active Clients' },
              { val: '16 +', labelAr: 'عاماً من الابتكار', labelEn: 'Years in Business' },
              { val: '12 +', labelAr: 'قطاعاً تجارياً تخصصياً', labelEn: 'Industry Sectors' },
              { val: '99.4%', labelAr: 'نسبة الرضا والدعم', labelEn: 'Satisfaction Rate' }
            ].map((item, idx) => (
              <div key={idx} className={`p-2.5 rounded-xl border transition-colors ${
                theme === 'light' ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-900/40 border-slate-800/80'
              }`}>
                <div className="text-base sm:text-lg font-black text-cyan-500 font-mono">{item.val}</div>
                <div className={`text-[10px] font-bold font-cairo ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                  {lang === 'ar' ? item.labelAr : item.labelEn}
                </div>
              </div>
            ))}
          </div>

          {/* Filtering Segment */}
          <div className={`rounded-2xl p-2 sm:p-2.5 border flex flex-col sm:flex-row items-center justify-between gap-2.5 transition-colors ${
            theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0d1424] border-slate-800'
          }`}>
            {/* Scrollable Selector Tabs with navigation slider */}
            <div className="relative w-full sm:flex-1 min-w-0 flex items-center px-6">
              <button
                type="button"
                onClick={() => {
                  if (modalTabsContainerRef.current) {
                    modalTabsContainerRef.current.scrollBy({ left: -180, behavior: 'smooth' });
                  }
                }}
                className={`absolute left-0 z-10 p-1 rounded-full border shadow-sm cursor-pointer transition-all hover:scale-110 flex items-center justify-center ${
                  theme === 'light' 
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100' 
                    : 'bg-slate-900 border-slate-700 text-cyan-400 hover:bg-slate-800'
                }`}
                aria-label="Previous categories"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div 
                ref={modalTabsContainerRef}
                className="flex-1 flex items-center gap-1.5 overflow-x-auto pb-0.5 max-w-full scrollbar-none scroll-smooth" 
              >
                {categories.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setPartnerActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap cursor-pointer transition-all font-cairo ${
                      partnerActiveTab === tab.id
                        ? 'bg-cyan-500 text-white shadow-sm font-black'
                        : (theme === 'light' 
                            ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100' 
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white')
                    }`}
                  >
                    {lang === 'ar' ? tab.ar : tab.en}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (modalTabsContainerRef.current) {
                    modalTabsContainerRef.current.scrollBy({ left: 180, behavior: 'smooth' });
                  }
                }}
                className={`absolute right-0 z-10 p-1 rounded-full border shadow-sm cursor-pointer transition-all hover:scale-110 flex items-center justify-center ${
                  theme === 'light' 
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100' 
                    : 'bg-slate-900 border-slate-700 text-cyan-400 hover:bg-slate-800'
                }`}
                aria-label="Next categories"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-44 shrink-0">
              <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={partnerSearchInput}
                onChange={(e) => setPartnerSearchInput(e.target.value)}
                placeholder={lang === 'ar' ? 'بحث بالاسم أو النشاط...' : 'Search partners...'}
                className={`w-full pl-2 pr-8 py-1.5 rounded-xl border text-[11px] font-cairo outline-none focus:border-cyan-500 transition-colors ${
                  theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-white'
                }`}
              />
              {partnerSearchInput && (
                <button
                  type="button"
                  onClick={() => setPartnerSearchInput('')}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-200 rounded-full"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Partners Grid */}
          {filteredPartners.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 justify-items-center pt-2">
              {filteredPartners.map((partner) => (
                <div 
                  key={partner.id} 
                  title={`${partner.nameAr} - ${partner.industryAr}`}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border transition-all flex flex-col items-center justify-center p-2 relative overflow-hidden group ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-cyan-400 hover:-translate-y-0.5' 
                      : 'bg-slate-900/40 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <PartnerLogo partner={partner} theme={theme} />
                  </div>
                  <span className={`text-[9px] font-bold font-cairo truncate max-w-full text-center mt-1 leading-tight ${
                    theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                  }`}>
                    {partner.nameAr}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center space-y-3">
              <Users className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-xs font-bold text-slate-400 font-cairo">
                {lang === 'ar' ? 'لم يتم العثور على شركاء يطابقون تصفيتك' : 'No clients match your filter criteria'}
              </p>
              <button
                type="button"
                onClick={() => { setPartnerSearchInput(''); setPartnerActiveTab('all'); }}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold cursor-pointer font-cairo transition-colors"
              >
                {lang === 'ar' ? 'إعادة ضبط عوامل التصفية' : 'Reset Search Filters'}
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer CTA */}
        <div className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 transition-colors ${
          theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
        }`}>
          <span className="text-[10px] text-slate-500 font-cairo text-center sm:text-right">
            {lang === 'ar' 
              ? '* لإرسال دراسة حالة مفصلة ومطابقة لقطاع نشاطك، تواصل مباشرة مع فريق المبيعات والاستشارات.' 
              : '* Contact our sales desk to receive dedicated industry-specific case studies.'}
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a 
              href={createWhatsAppUrl('egy', waText)}
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all w-full sm:w-auto shadow-md shadow-emerald-500/20 cursor-pointer font-cairo"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{lang === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp Support'}</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors w-full sm:w-auto text-center font-cairo ${
                theme === 'light' ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
            >
              {lang === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
