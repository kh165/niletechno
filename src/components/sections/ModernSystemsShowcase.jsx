import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, LayoutGrid, Landmark, ShoppingBag, PackageCheck, Factory } from 'lucide-react';
import FlagshipHighlight from './FlagshipHighlight';
import SystemsFilterBar from './SystemsFilterBar';
import SystemCard from './SystemCard';
import { Reveal } from '../site/ScrollExperience';

const CATEGORY_ICONS = {
  all: LayoutGrid,
  erp: Landmark,
  retail: ShoppingBag,
  logistics: PackageCheck,
  specialized: Factory
};

const CATEGORY_STYLE = {
  activeBg: 'bg-[#1a85ea] text-white shadow-md shadow-[#1a85ea]/25',
  activeBadge: 'bg-white/20 text-white',
  activeIcon: 'text-white',
  inactiveIcon: 'text-[#1a85ea] dark:text-[#38bdf8]'
};

const CATEGORY_COLOR_STYLES = {
  all: CATEGORY_STYLE,
  erp: CATEGORY_STYLE,
  retail: CATEGORY_STYLE,
  logistics: CATEGORY_STYLE,
  specialized: CATEGORY_STYLE
};

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

  const gridRef = useRef(null);
  const savedScrollY = useRef(null);
  const isFirstRender = useRef(true);

  // ===== إلغاء Scroll Anchoring طول ما القسم ده ظاهر =====
  // المتصفح بيحاول "يعوّض" أي تغيير في الارتفاع بتحريك السكرول، وده سبب القفزات.
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflowAnchor;
    root.style.overflowAnchor = 'none';
    return () => {
      root.style.overflowAnchor = previous;
    };
  }, []);

  // احفظ مكان السكرول قبل أي تغيير في الفلتر
  const rememberScroll = () => {
    savedScrollY.current = window.scrollY;
  };

  const onTabChange = (tabId) => {
    if (tabId === activeTab) return;
    rememberScroll();
    setActiveTab(tabId);
  };

  const onSearchChange = (value) => {
    rememberScroll();
    setSearchInput(value);
  };

  const handleTabSelect = (e, tabId) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.currentTarget && typeof e.currentTarget.blur === 'function') {
        e.currentTarget.blur();
      }
    }
    onTabChange(tabId);
  };

  // بعد ما الكروت تتبدل: ثبّت السكرول في مكانه بالظبط (بدون أي أنيميشن)
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const target = savedScrollY.current;
    if (target !== null && Math.abs(window.scrollY - target) > 1) {
      window.scrollTo({ top: target, behavior: 'instant' });
    }
    // سكرول الكروت الأفقي (موبايل) يرجع للبداية
    if (gridRef.current) gridRef.current.scrollLeft = 0;

    // مرة كمان في الفريم الجاي لو الصور/الخطوط غيّرت الارتفاع
    const frame = requestAnimationFrame(() => {
      if (target !== null && Math.abs(window.scrollY - target) > 1) {
        window.scrollTo({ top: target, behavior: 'instant' });
      }
      savedScrollY.current = null;
    });
    return () => cancelAnimationFrame(frame);
  }, [activeTab, searchInput]);

  // Category filtering
  const filteredModules = safeModules.filter((m) => {
    if (!m) return false;
    const matchesTab = activeTab === 'all' || m.category === activeTab;
    const term = (searchInput || '').toLowerCase().trim();
    if (!term) return matchesTab;
    const titleAr = (m.titleAr || '').toLowerCase();
    const titleEn = (m.titleEn || '').toLowerCase();
    const descAr = (m.descriptionAr || '').toLowerCase();
    const descEn = (m.descriptionEn || '').toLowerCase();
    const matchSearch =
      titleAr.includes(term) || titleEn.includes(term) || descAr.includes(term) || descEn.includes(term);
    return matchesTab && matchSearch;
  });

  const flagshipModule = safeModules.find((m) => m && m.id === 'accounts') || safeModules[0] || { id: 'accounts' };

  const handleRequestQuote = (e, sysId) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onSelectSystemForQuote) {
      onSelectSystemForQuote(sysId);
    } else {
      setFormData((prev) => ({
        ...prev,
        interestedModules: Array.isArray(prev?.interestedModules)
          ? prev.interestedModules.includes(sysId)
            ? prev.interestedModules
            : [...prev.interestedModules, sysId]
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
    setExpandedSystemId((prev) => (prev === sysId ? null : sysId));
  };

  const isFlagshipInterested =
    flagshipModule?.id && formData?.interestedModules
      ? formData.interestedModules.includes(flagshipModule.id)
      : false;

  // Category stats
  const categoryCounts = {
    all: safeModules.length,
    erp: safeModules.filter((m) => m && m.category === 'erp').length,
    retail: safeModules.filter((m) => m && m.category === 'retail').length,
    logistics: safeModules.filter((m) => m && m.category === 'logistics').length,
    specialized: safeModules.filter((m) => m && m.category === 'specialized').length
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
      <Reveal delay={0.08}>
        <SystemsFilterBar
          lang={lang}
          theme={theme}
          t={t}
          searchInput={searchInput}
          setSearchInput={onSearchChange}
          activeTab={activeTab}
          handleTabSelect={handleTabSelect}
          categoryCounts={categoryCounts}
          categoryIcons={CATEGORY_ICONS}
          categoryColorStyles={CATEGORY_COLOR_STYLES}
        />
      </Reveal>

      {/* 3. Systems Grid */}
      <div className="systems-list-wrap" style={{ overflowAnchor: 'none' }}>
        {filteredModules.length === 0 ? (
          <div className="text-center py-14 rounded-3xl border max-w-lg mx-auto bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-900/40 dark:border-slate-800 dark:text-slate-400">
            <p className="text-sm font-semibold mb-3">
              {lang === 'ar' ? 'لا توجد أنظمة مطابقة لمعايير البحث الحالية' : 'No software systems matched your search query.'}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                rememberScroll();
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
            <div
              className="systems-scroll-hint mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300"
              aria-hidden="true"
            >
              <span>{lang === 'ar' ? 'اسحب لليمين أو اليسار لعرض باقي البرامج' : 'Swipe to browse the other systems'}</span>
              <span className="inline-flex items-center text-[#1a85ea] dark:text-[#38bdf8]" dir="ltr">
                <ArrowLeft className="h-3 w-3" />
                <ArrowRight className="h-3 w-3" />
              </span>
            </div>

            <div
              ref={gridRef}
              className="systems-cards-grid relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch"
              role="region"
              aria-label={lang === 'ar' ? 'برامج الشركة، اسحب أفقياً لاستعراضها' : 'Software systems, swipe horizontally to browse'}
            >
              {filteredModules.map((sys) => (
                // Fade فقط (opacity) في مكانه: بدون layout / scale / إزاحة / خروج بـ absolute
                <motion.div
                  key={sys.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="h-full"
                >
                  <SystemCard
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
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ModernSystemsShowcase;