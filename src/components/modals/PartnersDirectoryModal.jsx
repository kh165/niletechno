import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { 
  Award, X, ChevronLeft, ChevronRight, Search, Users, MessageSquare,
  LayoutGrid, Building2, Globe2, UtensilsCrossed, ShoppingBag, Wheat, 
  House, Gem, Handshake, CarFront, Pill, Leaf, Factory, AlertCircle
} from 'lucide-react';
import { SUCCESS_PARTNERS } from '../../data';
import { PartnerLogo } from '../site/BrandVisuals';
import { createWhatsAppUrl } from '../../constants/config';

// Safe Error boundary for the modal content to prevent any overlay crashes
class ModalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ModalErrorBoundary caught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center space-y-4 font-cairo">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h4 className="text-base font-bold text-white">حدث خطأ في تحميل قائمة الشركاء</h4>
          <button 
            type="button" 
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold"
          >
            إعادة المحاولة
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function PartnersDirectoryModal({ isOpen, onClose, lang = 'ar', theme = 'dark' }) {
  const [partnerActiveTab, setPartnerActiveTab] = useState('all');
  const [partnerSearchInput, setPartnerSearchInput] = useState('');
  const [partnerSearchQuery, setPartnerSearchQuery] = useState('');
  const modalTabsContainerRef = useRef(null);

  // Debounce search query for smooth filtering performance
  useEffect(() => {
    const handler = setTimeout(() => {
      setPartnerSearchQuery(partnerSearchInput);
    }, 150);
    return () => clearTimeout(handler);
  }, [partnerSearchInput]);

  // Handle keyboard shortcuts (Escape to close)
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

  // Categories dictionary with Lucide icons
  const categories = useMemo(() => [
    { id: 'all', ar: 'جميع القطاعات', en: 'All Sectors', icon: LayoutGrid },
    { id: 'ksa', ar: 'المملكة العربية السعودية', en: 'Saudi Arabia', icon: Building2 },
    { id: 'import_export', ar: 'الاستيراد والتصدير', en: 'Import & Export', icon: Globe2 },
    { id: 'hospitality', ar: 'الكافيهات والمطاعم', en: 'Cafes & Hospitality', icon: UtensilsCrossed },
    { id: 'malls_houseware', ar: 'المولات والأدوات المنزلية', en: 'Malls & Retail', icon: ShoppingBag },
    { id: 'mills_feed', ar: 'المطاحن والأعلاف', en: 'Mills & Agriculture', icon: Wheat },
    { id: 'contracting', ar: 'المقاولات والتشييد', en: 'Contracting', icon: House },
    { id: 'jewelry', ar: 'المجوهرات والذهب', en: 'Jewelry & Gold', icon: Gem },
    { id: 'agencies_wholesale', ar: 'التوكيلات وتجارة الجملة', en: 'Wholesale & Agencies', icon: Handshake },
    { id: 'car_showrooms', ar: 'معارض السيارات', en: 'Car Showrooms', icon: CarFront },
    { id: 'pharma', ar: 'شركات الأدوية', en: 'Pharmaceuticals', icon: Pill },
    { id: 'herbs_spices', ar: 'العطارة والأغذية', en: 'Herbs & Food', icon: Leaf },
    { id: 'factories', ar: 'المصانع والإنتاج', en: 'Factories & Industry', icon: Factory },
  ], []);

  // Filter partners by category & search term safely
  const filteredPartners = useMemo(() => {
    if (!Array.isArray(SUCCESS_PARTNERS)) return [];
    return SUCCESS_PARTNERS.filter((partner) => {
      if (!partner) return false;
      const categoryMatch = partnerActiveTab === 'all' || partner.category === partnerActiveTab;
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

  // Tab scroll helper that works across both RTL and LTR
  const scrollTabs = useCallback((direction) => {
    if (!modalTabsContainerRef.current) return;
    const isRtl = lang === 'ar';
    const amount = 160;
    // In RTL, moving forward means scrolling leftwards (negative or positive depending on browser)
    const factor = direction === 'next' ? (isRtl ? -1 : 1) : (isRtl ? 1 : -1);
    modalTabsContainerRef.current.scrollBy({ left: factor * amount, behavior: 'smooth' });
  }, [lang]);

  if (!isOpen) return null;

  const isRtl = lang === 'ar';
  const waGeneralText = lang === 'ar'
    ? 'السلام عليكم ورحمة الله، أرغب في الاستفسار عن سابقة أعمال وحلول شركة نايل تكنو للبرمجيات.'
    : 'Hello, I would like to inquire about Nile Techno clients portfolio and software solutions.';

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div 
        className={`relative w-full max-w-5xl rounded-t-3xl sm:rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[88vh] transition-colors duration-300 ${
          theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#0a0f1d] border-slate-800 text-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between gap-3 shrink-0 transition-colors ${
          theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
        }`}>
          <div className="flex items-center gap-2.5 text-cyan-500 min-w-0">
            <div className="p-2 rounded-xl bg-cyan-500/10 shrink-0">
              <Award className="w-5 h-5 text-cyan-500" />
            </div>
            <div className="min-w-0">
              <h3 className={`text-sm sm:text-base font-extrabold font-cairo truncate ${
                theme === 'light' ? 'text-slate-900' : 'text-white'
              }`}>
                {lang === 'ar' ? 'دليل شركاء النجاح وسابقة الأعمال' : 'Nile Techno Certified Partners Directory'}
              </h3>
              <p className={`text-[11px] font-cairo hidden sm:block ${
                theme === 'light' ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {lang === 'ar' 
                  ? 'تصفح نخبة من عملائنا البالغ عددهم 1,500+ في مختلف القطاعات التجارية والمؤسسية' 
                  : 'Interactive showcase for 1,500+ commercial and industrial clients.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-full cursor-pointer transition-colors shrink-0 ${
              theme === 'light' ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-slate-800 text-slate-400'
            }`}
            aria-label={lang === 'ar' ? 'إغلاق الدليل' : 'Close Directory'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Search and Filter Directory */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 overscroll-contain">
          
          <ModalErrorBoundary>
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              {[
                { val: '1,500+', labelAr: 'مؤسسة مفعلة', labelEn: 'Active Clients' },
                { val: '16 +', labelAr: 'عاماً من الابتكار', labelEn: 'Years in Business' },
                { val: '12 +', labelAr: 'قطاعاً تجارياً تخصصياً', labelEn: 'Industry Sectors' },
                { val: '99.4%', labelAr: 'نسبة الرضا والدعم', labelEn: 'Satisfaction Rate' }
              ].map((item, idx) => (
                <div key={idx} className={`p-2 sm:p-2.5 rounded-xl border transition-colors ${
                  theme === 'light' ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-900/40 border-slate-800/80'
                }`}>
                  <div className="text-sm sm:text-base font-black text-cyan-500 font-mono">{item.val}</div>
                  <div className={`text-[10px] font-bold font-cairo ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                    {lang === 'ar' ? item.labelAr : item.labelEn}
                  </div>
                </div>
              ))}
            </div>

            {/* Filtering Segment */}
            <div className={`rounded-2xl p-2 sm:p-2.5 border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 transition-colors ${
              theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0d1424] border-slate-800'
            }`}>
              
              {/* Category tabs container with scroll controls */}
              <div className="relative flex-1 min-w-0 flex items-center">
                <button
                  type="button"
                  onClick={() => scrollTabs('prev')}
                  className={`shrink-0 min-w-[44px] min-h-[44px] p-2 rounded-xl border shadow-xs cursor-pointer transition-all hover:scale-105 flex items-center justify-center me-1.5 ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100' 
                      : 'bg-slate-900 border-slate-700 text-cyan-400 hover:bg-slate-800'
                  }`}
                  aria-label="Previous categories"
                >
                  {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                <div 
                  ref={modalTabsContainerRef}
                  className="flex-1 flex items-center gap-1.5 overflow-x-auto pb-0.5 max-w-full scrollbar-none scroll-smooth py-1" 
                >
                  {categories.map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = partnerActiveTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setPartnerActiveTab(tab.id)}
                        className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all font-cairo flex items-center justify-center gap-1.5 shrink-0 ${
                          isActive
                            ? 'bg-cyan-500 text-white shadow-xs font-black'
                            : (theme === 'light' 
                                ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100' 
                                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white')
                        }`}
                      >
                        <TabIcon className="w-3.5 h-3.5 shrink-0" />
                        <span>{lang === 'ar' ? tab.ar : tab.en}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => scrollTabs('next')}
                  className={`shrink-0 min-w-[44px] min-h-[44px] p-2 rounded-xl border shadow-xs cursor-pointer transition-all hover:scale-105 flex items-center justify-center ms-1.5 ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100' 
                      : 'bg-slate-900 border-slate-700 text-cyan-400 hover:bg-slate-800'
                  }`}
                  aria-label="Next categories"
                >
                  {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>

              {/* Quick Search */}
              <div className="relative w-full md:w-56 shrink-0">
                <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${
                  isRtl ? 'right-3' : 'left-3'
                }`} />
                <input
                  type="text"
                  value={partnerSearchInput}
                  onChange={(e) => setPartnerSearchInput(e.target.value)}
                  placeholder={lang === 'ar' ? 'بحث بالاسم أو النشاط...' : 'Search partners...'}
                  className={`w-full min-h-[44px] py-2 rounded-xl border text-xs font-cairo outline-none focus:border-cyan-500 transition-colors ${
                    isRtl ? 'pr-9 pl-9' : 'pl-9 pr-9'
                  } ${
                    theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-white'
                  }`}
                />
                {partnerSearchInput && (
                  <button
                    type="button"
                    onClick={() => setPartnerSearchInput('')}
                    className={`absolute top-1/2 -translate-y-1/2 min-w-[40px] min-h-[40px] flex items-center justify-center p-1 text-slate-400 hover:text-slate-200 rounded-full cursor-pointer ${
                      isRtl ? 'left-1' : 'right-1'
                    }`}
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Partners Grid - Responsive across all device widths */}
            {filteredPartners.length > 0 ? (
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2.5 sm:gap-3.5 pt-2">
                {filteredPartners.map((partner) => {
                  const partnerWaText = lang === 'ar'
                    ? `السلام عليكم، أرغب في الاستفسار عن حلول نايل تكنو المطبقة لدى عميلكم: (${partner.nameAr})`
                    : `Hello, I would like to inquire about Nile Techno solutions used by client: (${partner.nameEn || partner.nameAr})`;

                  return (
                    <div 
                      key={partner.id} 
                      title={`${partner.nameAr} - ${partner.industryAr || ''}`}
                      className={`min-h-[105px] sm:min-h-[115px] rounded-2xl border transition-all flex flex-col items-center justify-between p-2.5 relative overflow-hidden group ${
                        theme === 'light' 
                          ? 'bg-white border-slate-200 shadow-xs hover:shadow-md hover:border-cyan-400 hover:-translate-y-0.5' 
                          : 'bg-slate-900/40 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
                        <PartnerLogo partner={partner} theme={theme} />
                      </div>

                      <div className="w-full text-center mt-1.5 flex flex-col items-center">
                        <span className={`text-[10px] font-bold font-cairo line-clamp-1 max-w-full text-center leading-tight ${
                          theme === 'light' ? 'text-slate-800' : 'text-slate-200'
                        }`}>
                          {lang === 'ar' ? partner.nameAr : (partner.nameEn || partner.nameAr)}
                        </span>
                        
                        <a
                          href={createWhatsAppUrl('egy', partnerWaText)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-0 group-hover:opacity-100 transition-opacity mt-1 inline-flex items-center gap-1 text-[9px] text-emerald-500 hover:underline font-cairo"
                          title="استفسار سريع عن هذا العميل"
                        >
                          <MessageSquare className="w-2.5 h-2.5" />
                          <span>استفسار</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
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
          </ModalErrorBoundary>

        </div>

        {/* Modal Footer CTA */}
        <div className={`p-3.5 sm:p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 transition-colors ${
          theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
        }`}>
          <span className="text-[10px] text-slate-500 font-cairo text-center sm:text-start">
            {lang === 'ar' 
              ? '* لإرسال دراسة حالة مفصلة ومطابقة لقطاع نشاطك، تواصل مباشرة مع فريق المبيعات والاستشارات.' 
              : '* Contact our sales desk to receive dedicated industry-specific case studies.'}
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a 
              href={createWhatsAppUrl('egy', waGeneralText)}
              target="_blank" 
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all w-full sm:w-auto shadow-md shadow-emerald-500/20 cursor-pointer font-cairo"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>{lang === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp Support'}</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className={`min-h-[44px] px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors w-full sm:w-auto flex items-center justify-center font-cairo ${
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
