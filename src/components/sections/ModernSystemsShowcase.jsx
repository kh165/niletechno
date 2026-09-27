import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, LayoutGrid, Landmark, ShoppingBag, PackageCheck, Factory } from 'lucide-react';
import FlagshipHighlight from './FlagshipHighlight';
import SystemsFilterBar from './SystemsFilterBar';
import SystemCard from './SystemCard';
import useScrollLockedTabs from '../../hooks/useScrollLockedTabs';

export function ModernSystemsShowcase({ 
  lang, 
  theme, 
  t, 
  modules, 
  activeTab, 
  setActiveTab, 
  searchInput, 
  setSearchInput, 
  handleOpenVideo, 
  formData, 
  setFormData,
  onSelectSystemForQuote
}) {
  const [expandedSystemId, setExpandedSystemId] = useState(null);
  const safeModules = Array.isArray(modules) ? modules : [];

  const { handleTabSelect } = useScrollLockedTabs(setActiveTab);

  // Category filtering
  const filteredModules = safeModules.filter(m => {
    if (!m) return false;
    const matchesTab = activeTab === 'all' || m.category === activeTab;
    const term = (searchInput || '').toLowerCase().trim();
    if (!term) return matchesTab;
    const titleAr = (m.titleAr || '').toLowerCase();
    const titleEn = (m.titleEn || '').toLowerCase();
    const descAr = (m.descriptionAr || '').toLowerCase();
    const descEn = (m.descriptionEn || '').toLowerCase();
    const matchSearch = titleAr.includes(term) || titleEn.includes(term) || descAr.includes(term) || descEn.includes(term);
    return matchesTab && matchSearch;
  });

  const flagshipModule = safeModules.find(m => m && m.id === 'accounts') || safeModules[0] || { id: 'accounts' };

  const handleRequestQuote = (e, sysId) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onSelectSystemForQuote) {
      onSelectSystemForQuote(sysId);
    } else {
      setFormData(prev => ({
        ...prev,
        interestedModules: Array.isArray(prev?.interestedModules)
          ? (prev.interestedModules.includes(sysId)
            ? prev.interestedModules
            : [...prev.interestedModules, sysId])
          : [sysId]
      }));

      const quoteEl = document.getElementById('quote-selection-group') || document.getElementById('contact');
      if (quoteEl) {
        quoteEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const toggleExpand = (e, sysId) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setExpandedSystemId(prev => (prev === sysId ? null : sysId));
  };

  const isFlagshipInterested = (flagshipModule?.id && formData?.interestedModules) 
    ? formData.interestedModules.includes(flagshipModule.id) 
    : false;

  // Category stats
  const categoryCounts = {
    all: safeModules.length,
    erp: safeModules.filter(m => m && m.category === 'erp').length,
    retail: safeModules.filter(m => m && m.category === 'retail').length,
    logistics: safeModules.filter(m => m && m.category === 'logistics').length,
    specialized: safeModules.filter(m => m && m.category === 'specialized').length
  };

  const categoryIcons = {
    all: LayoutGrid,
    erp: Landmark,
    retail: ShoppingBag,
    logistics: PackageCheck,
    specialized: Factory
  };

  const categoryColorStyles = {
    all: {
      activeBg: 'bg-[#1a85ea] text-white shadow-md shadow-[#1a85ea]/25',
      activeBadge: 'bg-white/20 text-white',
      activeIcon: 'text-white',
      inactiveIcon: 'text-[#1a85ea] dark:text-[#38bdf8]'
    },
    erp: {
      activeBg: 'bg-[#1a85ea] text-white shadow-md shadow-[#1a85ea]/25',
      activeBadge: 'bg-white/20 text-white',
      activeIcon: 'text-white',
      inactiveIcon: 'text-[#1a85ea] dark:text-[#38bdf8]'
    },
    retail: {
      activeBg: 'bg-[#1a85ea] text-white shadow-md shadow-[#1a85ea]/25',
      activeBadge: 'bg-white/20 text-white',
      activeIcon: 'text-white',
      inactiveIcon: 'text-[#1a85ea] dark:text-[#38bdf8]'
    },
    logistics: {
      activeBg: 'bg-[#1a85ea] text-white shadow-md shadow-[#1a85ea]/25',
      activeBadge: 'bg-white/20 text-white',
      activeIcon: 'text-white',
      inactiveIcon: 'text-[#1a85ea] dark:text-[#38bdf8]'
    },
    specialized: {
      activeBg: 'bg-[#1a85ea] text-white shadow-md shadow-[#1a85ea]/25',
      activeBadge: 'bg-white/20 text-white',
      activeIcon: 'text-white',
      inactiveIcon: 'text-[#1a85ea] dark:text-[#38bdf8]'
    }
  };

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div className="w-full font-cairo">
      {/* 1. Flagship Core ERP Suite Showcase */}
      <FlagshipHighlight
        lang={lang}
        theme={theme}
        flagshipModule={flagshipModule}
        handleOpenVideo={handleOpenVideo}
        handleRequestQuote={handleRequestQuote}
        isFlagshipInterested={isFlagshipInterested}
      />

      {/* 2. Search & Category Navigation */}
      <SystemsFilterBar
        lang={lang}
        theme={theme}
        t={t}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        activeTab={activeTab}
        handleTabSelect={handleTabSelect}
        categoryCounts={categoryCounts}
        categoryIcons={categoryIcons}
        categoryColorStyles={categoryColorStyles}
      />

      {/* 3. Systems Grid */}
      <div className="systems-list-wrap min-h-[580px]" style={{ overflowAnchor: 'none' }}>
        {filteredModules.length === 0 ? (
          <div className="text-center py-14 rounded-3xl border max-w-lg mx-auto bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-900/40 dark:border-slate-800 dark:text-slate-400">
            <p className="text-sm font-semibold mb-3">
              {lang === 'ar' ? 'لا توجد أنظمة مطابقة لمعايير البحث الحالية' : 'No software systems matched your search query.'}
            </p>
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setSearchInput('');
                setActiveTab('all');
              }}
              className="text-xs text-[#1a85ea] dark:text-[#38bdf8] font-bold hover:underline cursor-pointer"
            >
              {lang === 'ar' ? 'إعادة عرض كافة الأنظمة' : 'Reset filters and view all'}
            </button>
          </div>
        ) : (
          <>
            <div className="systems-scroll-hint mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300" aria-hidden="true">
              <span>{lang === 'ar' ? 'اسحب لليمين أو اليسار لعرض باقي البرامج' : 'Swipe to browse the other systems'}</span>
              <span className="inline-flex items-center text-[#1a85ea] dark:text-[#38bdf8]" dir="ltr">
                <ArrowLeft className="h-3 w-3" />
                <ArrowRight className="h-3 w-3" />
              </span>
            </div>

            <div 
              className="systems-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch" 
              role="region" 
              aria-label={lang === 'ar' ? 'برامج الشركة، اسحب أفقياً لاستعراضها' : 'Software systems, swipe horizontally to browse'}
            >
              {filteredModules.map((sys) => (
                <SystemCard
                  key={sys.id}
                  sys={sys}
                  lang={lang}
                  theme={theme}
                  t={t}
                  isInterested={formData?.interestedModules?.includes(sys.id)}
                  isExpanded={expandedSystemId === sys.id}
                  toggleExpand={toggleExpand}
                  handleOpenVideo={handleOpenVideo}
                  handleRequestQuote={handleRequestQuote}
                  handleCardMouseMove={handleCardMouseMove}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ModernSystemsShowcase;
