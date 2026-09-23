import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Award, X, ChevronLeft, ChevronRight, Search, MessageSquare } from 'lucide-react';
import { SUCCESS_PARTNERS } from '../../data';
import { PartnerLogo } from '../site/BrandVisuals';
import { createWhatsAppUrl } from '../../constants/config';

export default function PartnersDirectoryModal({ isOpen, onClose, lang = 'ar' }) {
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

  // Categories matching the official Nile Techno portal and image.png
  const categories = useMemo(() => [
    { id: 'all', label: '📌 الكل' },
    { id: 'ksa', label: 'SA السعودية' },
    { id: 'import_export', label: '📦 الاستيراد والتصدير' },
    { id: 'hospitality', label: '☕ الكافيهات والمطاعم' },
    { id: 'malls_houseware', label: '🛍️ المولات والأدوات المنزلية' },
    { id: 'mills_feed', label: '🌾 مصانع الأعلاف والمطاحن' },
    { id: 'contracting', label: '🏗️ شركات المقاولات' },
    { id: 'jewelry', label: '💎 محلات المجوهرات' },
    { id: 'agencies_wholesale', label: '🤝 التوكيلات والجملة' },
    { id: 'car_showrooms', label: '🚗 معارض السيارات' },
    { id: 'pharma', label: '💊 شركات الأدوية' },
    { id: 'herbs_spices', label: '🌿 شركات العطارة' },
    { id: 'factories', label: '🏭 المصانع والإنتاج الكبرى' }
  ], []);

  // Filter partners by category & search term
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

  // Scroll tabs horizontally
  const scrollTabs = useCallback((direction) => {
    if (!tabsScrollRef.current) return;
    const amount = 200;
    const factor = direction === 'next' ? -1 : 1;
    tabsScrollRef.current.scrollBy({ left: factor * amount, behavior: 'smooth' });
  }, []);

  if (!isOpen) return null;

  const waSalesText = 'السلام عليكم ورحمة الله، أرغب في الاستفسار عن سابقة أعمال وحلول شركة نايل تكنو للبرمجيات.';

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      dir="rtl"
    >
      <div 
        className="relative w-full max-w-6xl bg-white text-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col max-h-[94dvh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* 1. Modal Header (Compact & sleek) */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-white">
          {/* Right side: Icon + Titles */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0">
              <Award className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#00a3c4]" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm md:text-base font-black font-cairo text-slate-900 leading-tight truncate">
                دليل شركاء النجاح وسابقة الأعمال الكاملة
              </h3>
              <p className="text-[10px] sm:text-xs font-bold text-[#00a3c4] font-cairo line-clamp-1">
                تصفح تفاعلي لقائمة عملائنا البالغ عددهم 1,500+ في مختلف القطاعات التجارية والمؤسسية
              </p>
            </div>
          </div>

          {/* Left side: Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="إغلاق"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* 2. Modal Body (Scrollable container, logos visible right away) */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-5 py-2.5 sm:py-3 space-y-2.5 sm:space-y-3 overscroll-contain">
          
          {/* Compact Slim Metrics Strip (Takes minimal height so logos are prominent) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 sm:p-2 bg-slate-50/90 rounded-xl border border-slate-200/80 text-center shrink-0 shadow-2xs">
            <div className="flex items-center justify-center gap-1.5 py-0.5">
              <span className="text-sm sm:text-base font-black text-[#00a3c4] font-mono">+1,500</span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-700 font-cairo">مؤسسة مفعلة</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 py-0.5 sm:border-r sm:border-slate-200">
              <span className="text-sm sm:text-base font-black text-[#00a3c4] font-mono">+15</span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-700 font-cairo">عام من النجاح</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 py-0.5 border-t sm:border-t-0 sm:border-r border-slate-200">
              <span className="text-sm sm:text-base font-black text-[#00a3c4] font-mono">+36</span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-700 font-cairo">عميل معتمد</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 py-0.5 border-t sm:border-t-0 sm:border-r border-slate-200">
              <span className="text-sm sm:text-base font-black text-[#00a3c4] font-mono">99.4%</span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-700 font-cairo">نسبة الرضا</span>
            </div>
          </div>

          {/* 3. Filter Tabs & Search Bar Container (Compact) */}
          <div className="rounded-xl border border-slate-200/80 p-1.5 sm:p-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 bg-white shadow-2xs">
            
            {/* Search Input (Left in RTL layout) */}
            <div className="relative w-full md:w-52 shrink-0 order-2 md:order-1">
              <input
                type="text"
                value={partnerSearchInput}
                onChange={(e) => setPartnerSearchInput(e.target.value)}
                placeholder="...البحث السريع"
                className="w-full py-1.5 px-3 pr-3.5 pl-8 rounded-lg border border-slate-200 text-xs font-cairo text-slate-800 placeholder-slate-400 outline-none focus:border-[#00a3c4] transition-colors"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              {partnerSearchInput && (
                <button
                  type="button"
                  onClick={() => setPartnerSearchInput('')}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 hover:text-slate-600 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Categories Carousel (Right in RTL layout) */}
            <div className="flex-1 min-w-0 flex items-center gap-1 order-1 md:order-2">
              <button
                type="button"
                onClick={() => scrollTabs('next')}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                aria-label="Next categories"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <div 
                ref={tabsScrollRef}
                className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 scroll-smooth"
              >
                {categories.map((cat) => {
                  const isActive = partnerActiveTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setPartnerActiveTab(cat.id)}
                      className={`min-h-[32px] sm:min-h-[34px] px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all font-cairo flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-[#00a3c4] text-white shadow-xs font-black'
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
                onClick={() => scrollTabs('prev')}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                aria-label="Previous categories"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* 4. The Partner Logo Grid (Denser, compact size to show more logos at once) */}
          <div className="pt-0.5">
            {filteredPartners.length > 0 ? (
              <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1.5 sm:gap-2 justify-items-center">
                {filteredPartners.map((partner) => {
                  const title = `${partner.nameAr} - ${partner.industryAr || ''}`;
                  return (
                    <div 
                      key={partner.id}
                      title={title}
                      className="w-full max-w-[58px] xs:max-w-[66px] sm:max-w-[74px] md:max-w-[80px] aspect-square rounded-lg sm:rounded-xl border border-slate-200/80 bg-white shadow-2xs hover:shadow-md hover:border-[#00a3c4] transition-all duration-150 flex items-center justify-center p-1 group cursor-pointer hover:-translate-y-0.5"
                    >
                      <div className="w-full h-full flex items-center justify-center transition-transform duration-150 group-hover:scale-105">
                        <PartnerLogo partner={partner} theme="light" />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center space-y-2 font-cairo">
                <p className="text-xs font-bold text-slate-400">
                  لم يتم العثور على نتائج تطابق بحثك
                </p>
                <button
                  type="button"
                  onClick={() => { setPartnerSearchInput(''); setPartnerActiveTab('all'); }}
                  className="px-3 py-1.5 rounded-lg bg-[#00a3c4] text-white text-xs font-bold cursor-pointer"
                >
                  إعادة ضبط البحث
                </button>
              </div>
            )}
          </div>

        </div>

        {/* 5. Modal Footer (Compact and fluid) */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0 bg-white">
          {/* Note on right */}
          <span className="text-[10px] sm:text-xs text-slate-500 font-cairo text-center sm:text-right">
            * لمزيد من دراسات الحالة المفصلة، تواصل بشكل مباشر مع شريك الدعم الفني والمبيعات
          </span>

          {/* Action buttons on left */}
          <div className="flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
            {/* WhatsApp Button */}
            <a
              href={createWhatsAppUrl('egy', waSalesText)}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[38px] px-4 py-2 rounded-xl bg-gradient-to-r from-[#1eb854] to-[#25d366] hover:brightness-105 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer font-cairo transition-all active:scale-95 flex-1 sm:flex-initial"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span>واتساب مبيعات</span>
            </a>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="min-h-[38px] px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs cursor-pointer font-cairo transition-colors flex-1 sm:flex-initial"
            >
              إغلاق الدليل
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
