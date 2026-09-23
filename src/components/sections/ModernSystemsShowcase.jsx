import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Play, Check, CheckCircle2, ChevronDown, ChevronUp, 
  Layers, Server, Cloud, ShieldCheck, X, FileText, ArrowLeft, ArrowRight
} from 'lucide-react';
import { IconComponent } from '../site/BrandVisuals';

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
  setFormData 
}) {
  const [expandedSystemId, setExpandedSystemId] = useState(null);

  // Category filtering
  const filteredModules = modules.filter(m => {
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

  const flagshipModule = modules.find(m => m.id === 'accounts') || modules[0];

  const handleToggleInterest = (e, sysId) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setFormData(prev => ({
      ...prev,
      interestedModules: prev.interestedModules.includes(sysId)
        ? prev.interestedModules.filter(id => id !== sysId)
        : [...prev.interestedModules, sysId]
    }));
  };

  const toggleExpand = (e, sysId) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setExpandedSystemId(prev => (prev === sysId ? null : sysId));
  };

  const isFlagshipInterested = formData.interestedModules.includes(flagshipModule.id);

  return (
    <div className="w-full font-cairo">
      {/* 1. Flagship Core ERP Suite Showcase - Architectural & High-Contrast */}
      <div className={`rounded-2xl border p-6 sm:p-8 mb-10 transition-colors ${
        theme === 'light'
          ? 'bg-slate-50/70 border-slate-200/90 shadow-sm'
          : 'bg-[#070e20] border-slate-800 shadow-md'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            {/* Zero-Pill Typography Metadata */}
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>{lang === 'ar' ? 'معتمد رسمياً للفاتورة الإلكترونية ZATCA & ETA' : 'Certified E-Invoicing (ZATCA & ETA)'}</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
              <span>{lang === 'ar' ? 'منظومة ERP مركزية' : 'Central Enterprise ERP'}</span>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
              <span>{lang === 'ar' ? 'سحابي أو محلي' : 'Cloud & LAN'}</span>
            </div>

            <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              {lang === 'ar' ? 'منظومة الحسابات العامة وإدارة المخازن المتكاملة' : 'General Ledger & Integrated Inventory ERP Suite'}
            </h3>

            <p className={`text-xs sm:text-sm leading-relaxed max-w-3xl ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
              {lang === 'ar' 
                ? 'الحل المحاسبي الشامل لكافة الأنشطة التجارية والصناعية؛ شجرة حسابات مرنة متعددة المستويات، مراكز تكلفة دقيقة، تسوية مخزنية آلية، وإصدار الفواتير الإلكترونية المشفرة لحظياً بدون وسيط.'
                : 'The comprehensive accounting foundation for commercial and industrial businesses; multi-level chart of accounts, cost centers, automated inventory reconciliation, and direct certified e-invoicing.'}
            </p>

            {/* Quiet architectural capability labels - No generic candy badges */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-1 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Cloud className="w-4 h-4 text-cyan-500" />
                <span>{lang === 'ar' ? 'سحابي عبر خوادم آمنة' : 'Cloud Hosted'}</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Server className="w-4 h-4 text-cyan-500" />
                <span>{lang === 'ar' ? 'محلي بقواعد بيانات SQL Server' : 'On-Premise LAN'}</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-500" />
                <span>{lang === 'ar' ? 'ربط متعدد الفروع والمخازن' : 'Multi-Branch & Warehouses'}</span>
              </div>
            </div>
          </div>

          {/* Direct Flagship Actions */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleOpenVideo(flagshipModule.youtubeUrl, lang === 'ar' ? flagshipModule.titleAr : flagshipModule.titleEn);
              }}
              className="min-h-[44px] px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{lang === 'ar' ? 'مشاهدة العرض التوضيحي' : 'Watch System Demo'}</span>
            </button>

            <button
              type="button"
              onClick={(e) => handleToggleInterest(e, flagshipModule.id)}
              className={`min-h-[44px] px-5 py-3 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                isFlagshipInterested
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : (theme === 'light' ? 'bg-white border-slate-300 text-slate-800 hover:border-slate-400' : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-600')
              }`}
            >
              {isFlagshipInterested ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{lang === 'ar' ? 'مضاف إلى قائمة التسعير' : 'Added to Quote List'}</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>{lang === 'ar' ? 'إضافة إلى طلب التسعير' : 'Add to Quote Request'}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 2. Search & Segmented Filter Bar - Restrained & Clean */}
      <div className="max-w-4xl mx-auto mb-8 space-y-4">
        
        {/* Search Field */}
        <div className="relative">
          <input
            type="text"
            placeholder={lang === 'ar' ? 'ابحث باسم النظام أو النشاط (حسابات، نقاط بيع، كاشير، تصنيع، مجوهرات...)' : 'Search by software system or sector...'}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={`w-full min-h-[46px] pl-11 pr-11 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none focus:border-cyan-500 font-cairo ${
              theme === 'light'
                ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                : 'bg-slate-900 border-slate-800 placeholder:text-slate-500 text-white'
            }`}
          />
          <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-3.5 w-4 h-4 text-slate-400`} />
          {searchInput && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setSearchInput('');
              }}
              className={`absolute ${lang === 'ar' ? 'left-4' : 'right-4'} top-3.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1`}
              aria-label="مسح البحث"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Clean Segmented Tab Control */}
        <div className={`p-1 rounded-xl border flex flex-wrap items-center justify-center gap-1 ${
          theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          {[
            { id: 'all', label: t.filterAll },
            { id: 'erp', label: t.filterErp },
            { id: 'retail', label: t.filterRetail },
            { id: 'logistics', label: t.filterLogistics },
            { id: 'specialized', label: t.filterSpecialized }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab.id);
                }}
                className={`min-h-[40px] px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer font-cairo ${
                  isActive
                    ? (theme === 'light' ? 'bg-white text-slate-900 shadow-sm' : 'bg-slate-800 text-white shadow-sm')
                    : (theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white')
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* 3. Systems Grid - Anti-Jumping In-Place Expansion */}
      <div className="min-h-[380px]">
        {filteredModules.length === 0 ? (
          <div className={`text-center py-14 rounded-2xl border max-w-lg mx-auto ${
            theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900/40 border-slate-800 text-slate-400'
          }`}>
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
              className="text-xs text-cyan-600 dark:text-cyan-400 font-bold hover:underline cursor-pointer"
            >
              {lang === 'ar' ? 'إعادة عرض كافة الأنظمة' : 'Reset filters and view all'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-start">
            {filteredModules.map((sys) => {
              const isInterested = formData.interestedModules.includes(sys.id);
              const isExpanded = expandedSystemId === sys.id;

              return (
                <div 
                  key={sys.id}
                  className={`rounded-2xl border p-5 flex flex-col justify-between transition-colors ${
                    theme === 'light'
                      ? 'bg-white border-slate-200/90 hover:border-slate-300 shadow-sm'
                      : 'bg-[#080e1e] border-slate-800/90 hover:border-slate-700 shadow-md'
                  }`}
                >
                  <div>
                    {/* Top Row: System Icon & Unboxed Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2.5 rounded-xl ${
                        theme === 'light' ? 'bg-slate-100 text-slate-900' : 'bg-slate-800 text-cyan-400'
                      }`}>
                        <IconComponent name={sys.iconName} className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                        {sys.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className={`text-base font-bold font-cairo mb-2 leading-snug ${
                      theme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      {lang === 'ar' ? sys.titleAr : sys.titleEn}
                    </h4>

                    {/* Description */}
                    <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${
                      theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      {lang === 'ar' ? sys.descriptionAr : sys.descriptionEn}
                    </p>

                    {/* Features Preview */}
                    <div className="space-y-1.5 mb-4">
                      {(lang === 'ar' ? sys.featuresAr : sys.featuresEn).slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs">
                          <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                          <span className={`line-clamp-1 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* In-Place Expandable Technical Specs Drawer (Zero-jump!) */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key="specs"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden border-t border-slate-100 dark:border-slate-800 pt-3 mb-4 space-y-2 text-xs"
                        >
                          <div className="font-bold text-slate-900 dark:text-slate-200">
                            {lang === 'ar' ? 'المزايا الفنية والتقارير:' : 'Technical Specs & Capabilities:'}
                          </div>
                          {(lang === 'ar' ? sys.featuresAr : sys.featuresEn).map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                              <span className="text-cyan-500 font-bold">·</span>
                              <span>{feat}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Toggle Specs Accordion Link */}
                    <button
                      type="button"
                      onClick={(e) => toggleExpand(e, sys.id)}
                      className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 mb-4 cursor-pointer"
                    >
                      <span>
                        {isExpanded 
                          ? (lang === 'ar' ? 'إخفاء التفاصيل' : 'Hide details')
                          : (lang === 'ar' ? 'عرض المواصفات الكاملة' : 'View full specs')}
                      </span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Actions Footer */}
                  <div className={`pt-3 border-t flex flex-col gap-2 ${
                    theme === 'light' ? 'border-slate-100' : 'border-slate-800'
                  }`}>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleOpenVideo(sys.youtubeUrl, lang === 'ar' ? sys.titleAr : sys.titleEn);
                        }}
                        className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 text-cyan-500 fill-current" />
                        <span>{t.showDemo}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleToggleInterest(e, sys.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                          isInterested
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                            : (theme === 'light' 
                                ? 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800' 
                                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200')
                        }`}
                      >
                        {isInterested 
                          ? (lang === 'ar' ? 'تمت الإضافة' : 'Added') 
                          : (lang === 'ar' ? 'طلب تسعيرة' : 'Get Quote')}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
