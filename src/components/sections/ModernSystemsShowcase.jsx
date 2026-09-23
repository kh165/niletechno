import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Play, Check, CheckCircle2, ChevronDown, ChevronUp, 
  Layers, Server, Cloud, ShieldCheck, X, FileText, ArrowLeft, ArrowRight,
  Sparkles, Monitor, Store, Truck, Cpu, Database
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

  // Category stats
  const categoryCounts = {
    all: modules.length,
    erp: modules.filter(m => m.category === 'erp').length,
    retail: modules.filter(m => m.category === 'retail').length,
    logistics: modules.filter(m => m.category === 'logistics').length,
    specialized: modules.filter(m => m.category === 'specialized').length
  };

  const categoryIcons = {
    all: Layers,
    erp: Database,
    retail: Store,
    logistics: Truck,
    specialized: Cpu
  };

  return (
    <div className="w-full font-cairo">
      
      {/* 1. Flagship Core ERP Suite Showcase - Premium Executive Presentation */}
      <div className={`relative rounded-3xl border p-6 sm:p-8 md:p-9 mb-10 transition-all duration-300 overflow-hidden hover:border-[#0b72c9]/50 group ${
        theme === 'light'
          ? 'bg-gradient-to-br from-white via-slate-50 to-[#0b72c9]/5 border-slate-200/90 shadow-lg shadow-slate-200/60 hover:shadow-xl hover:shadow-[#0b72c9]/10'
          : 'bg-gradient-to-br from-[#070e22] via-[#09132e] to-[#0a1838] border-slate-800 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-[#0b72c9]/20'
      }`}>
        {/* Subtle decorative accent glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0b72c9]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            
            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>{lang === 'ar' ? 'معتمد رسمياً للفاتورة الإلكترونية ZATCA & ETA' : 'Certified E-Invoicing (ZATCA & ETA)'}</span>
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0b72c9]/10 text-[#0b72c9] dark:text-[#299df7] font-bold">
                <Database className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'المنظومة المركزية الشاملة' : 'Flagship Central ERP'}</span>
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
              <span className="text-slate-500 dark:text-slate-400">
                {lang === 'ar' ? 'سحابي عبر السيرفر أو محلي LAN' : 'Cloud Server & On-Premise LAN'}
              </span>
            </div>

            {/* Main Headline */}
            <h3 className={`text-2xl sm:text-3xl md:text-3.5xl font-black tracking-tight leading-snug ${
              theme === 'light' ? 'text-slate-950 font-cairo' : 'text-white font-cairo'
            }`}>
              {lang === 'ar' ? 'منظومة الحسابات العامة وإدارة المخازن المتكاملة' : 'General Ledger & Integrated Inventory ERP Suite'}
            </h3>

            {/* Value Proposition Description */}
            <p className={`text-xs sm:text-sm leading-relaxed max-w-3xl ${
              theme === 'light' ? 'text-slate-600 font-medium' : 'text-slate-300'
            }`}>
              {lang === 'ar' 
                ? 'الحل المحاسبي الشامل لكافة الأنشطة التجارية والصناعية؛ شجرة حسابات مرنة متعددة المستويات، مراكز تكلفة دقيقة، تسوية مخزنية آلية، وإصدار الفواتير الإلكترونية المشفرة لحظياً بدون وسيط.'
                : 'The comprehensive accounting foundation for commercial and industrial businesses; multi-level chart of accounts, cost centers, automated inventory reconciliation, and direct certified e-invoicing.'}
            </p>

            {/* Architecture capability highlights */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 pt-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-[#0b72c9]" />
                <span>{lang === 'ar' ? 'سحابي مع تشفير كامل' : 'Cloud Hosted with Encryption'}</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-[#0b72c9]" />
                <span>{lang === 'ar' ? 'قواعد بيانات SQL Server المعتمدة' : 'Enterprise SQL Server DB'}</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0b72c9]" />
                <span>{lang === 'ar' ? 'ربط متعدد الفروع والمخازن' : 'Multi-Branch & Warehouses'}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleOpenVideo(flagshipModule.youtubeUrl, lang === 'ar' ? flagshipModule.titleAr : flagshipModule.titleEn);
              }}
              className="min-h-[46px] px-6 py-3 rounded-xl bg-gradient-to-r from-[#0b72c9] to-blue-700 hover:from-[#0a66b4] hover:to-blue-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-[#0b72c9]/25 hover:shadow-lg active:scale-98"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{lang === 'ar' ? 'مشاهدة فيديو المنظومة' : 'Watch System Demo'}</span>
            </button>

            <button
              type="button"
              onClick={(e) => handleToggleInterest(e, flagshipModule.id)}
              className={`min-h-[46px] px-6 py-3 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 ${
                isFlagshipInterested
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : (theme === 'light' 
                      ? 'bg-white border-slate-300 text-slate-800 hover:border-[#0b72c9] hover:bg-slate-50' 
                      : 'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-[#0b72c9] hover:bg-slate-800')
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
                  <span>{lang === 'ar' ? 'طلب عرض سعر للمنظومة' : 'Request Official Quote'}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 2. Search & Refined Category Navigation */}
      <div className="max-w-4xl mx-auto mb-9 space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder={lang === 'ar' ? 'ابحث باسم النظام أو النشاط (حسابات، نقاط بيع، كاشير، تصنيع، مجوهرات، عيادات...)' : 'Search by software system or industry...'}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={`w-full min-h-[48px] pl-12 pr-12 py-3 rounded-2xl border text-xs sm:text-sm transition-all focus:outline-none focus:border-[#0b72c9] focus:ring-2 focus:ring-[#0b72c9]/20 font-cairo ${
              theme === 'light'
                ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 shadow-xs'
                : 'bg-slate-900/80 border-slate-800 placeholder:text-slate-500 text-white shadow-inner'
            }`}
          />
          <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-4 w-4 h-4 text-slate-400`} />
          {searchInput && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setSearchInput('');
              }}
              className={`absolute ${lang === 'ar' ? 'left-4' : 'right-4'} top-4 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1`}
              aria-label="مسح البحث"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Clean Pill Segmented Tabs with Category Icons & Counts */}
        <div className={`p-1.5 rounded-2xl border flex flex-wrap items-center justify-center gap-1.5 ${
          theme === 'light' ? 'bg-slate-100/80 border-slate-200/90' : 'bg-slate-900/90 border-slate-800'
        }`}>
          {[
            { id: 'all', label: t.filterAll },
            { id: 'erp', label: t.filterErp },
            { id: 'retail', label: t.filterRetail },
            { id: 'logistics', label: t.filterLogistics },
            { id: 'specialized', label: t.filterSpecialized }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const CatIcon = categoryIcons[tab.id] || Layers;
            const count = categoryCounts[tab.id] || 0;

            return (
              <button
                type="button"
                key={tab.id}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab.id);
                }}
                className={`min-h-[40px] px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-cairo flex items-center gap-2 ${
                  isActive
                    ? (theme === 'light' 
                        ? 'bg-white text-[#0b72c9] shadow-md border border-slate-200/60' 
                        : 'bg-slate-800 text-[#299df7] shadow-md border border-slate-700/80')
                    : (theme === 'light' 
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50')
                }`}
              >
                <CatIcon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0b72c9] dark:text-[#299df7]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  isActive 
                    ? 'bg-[#0b72c9]/10 text-[#0b72c9] dark:text-[#299df7] font-bold' 
                    : 'bg-slate-200/60 dark:bg-slate-800 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* 3. Systems Grid - Refined Card Elevation & Smooth Drawer */}
      <div className="min-h-[380px]">
        {filteredModules.length === 0 ? (
          <div className={`text-center py-14 rounded-3xl border max-w-lg mx-auto ${
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
              className="text-xs text-[#0b72c9] dark:text-[#299df7] font-bold hover:underline cursor-pointer"
            >
              {lang === 'ar' ? 'إعادة عرض كافة الأنظمة' : 'Reset filters and view all'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch">
            {filteredModules.map((sys) => {
              const isInterested = formData.interestedModules.includes(sys.id);
              const isExpanded = expandedSystemId === sys.id;

              return (
                <motion.div 
                  key={sys.id}
                  whileHover={{ y: -7, transition: { duration: 0.22, ease: 'easeOut' } }}
                  whileTap={{ scale: 0.99 }}
                  className={`group rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden cursor-default ${
                    theme === 'light'
                      ? 'bg-gradient-to-b from-white via-white to-slate-50/80 border-slate-200/90 hover:border-[#0b72c9]/50 shadow-sm hover:shadow-xl hover:shadow-[#0b72c9]/10'
                      : 'bg-gradient-to-b from-[#091124] via-[#091124] to-[#070d1d] border-slate-800 hover:border-[#0b72c9]/60 shadow-md hover:shadow-2xl hover:shadow-[#0b72c9]/20'
                  }`}
                >
                  {/* Subtle top animated neon glow line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0b72c9] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Gentle hover ambient illumination */}
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#0b72c9]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Top Row: Icon Container & Category Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2.5 rounded-xl transition-all duration-300 transform group-hover:scale-110 group-hover:-rotate-3 ${
                        theme === 'light' 
                          ? 'bg-[#0b72c9]/10 text-[#0b72c9] group-hover:bg-[#0b72c9] group-hover:text-white group-hover:shadow-md group-hover:shadow-[#0b72c9]/30' 
                          : 'bg-slate-800/80 text-[#299df7] group-hover:bg-[#0b72c9] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#0b72c9]/40'
                      }`}>
                        <IconComponent name={sys.iconName} className="w-5 h-5 transition-transform duration-300" />
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border font-mono tracking-wider transition-colors duration-300 ${
                        theme === 'light'
                          ? 'bg-slate-100 border-slate-200 text-slate-600 group-hover:border-[#0b72c9]/30 group-hover:text-[#0b72c9]'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400 group-hover:border-[#0b72c9]/40 group-hover:text-[#299df7]'
                      }`}>
                        {sys.category.toUpperCase()}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className={`text-[15px] sm:text-base font-bold font-cairo mb-2 leading-snug group-hover:text-[#0b72c9] dark:group-hover:text-[#299df7] transition-colors duration-200 ${
                      theme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      {lang === 'ar' ? sys.titleAr : sys.titleEn}
                    </h4>

                    {/* Description */}
                    <p className={`text-xs leading-relaxed mb-4 line-clamp-2 transition-colors ${
                      theme === 'light' ? 'text-slate-600 group-hover:text-slate-700' : 'text-slate-400 group-hover:text-slate-300'
                    }`}>
                      {lang === 'ar' ? sys.descriptionAr : sys.descriptionEn}
                    </p>

                    {/* Features Preview */}
                    <div className="space-y-1.5 mb-4">
                      {(lang === 'ar' ? sys.featuresAr : sys.featuresEn).slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs transition-transform duration-200 group-hover:translate-x-0.5">
                          <Check className="w-3.5 h-3.5 text-[#0b72c9] shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110" />
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
                              <span className="text-[#0b72c9] font-bold">·</span>
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
                      className="text-[11px] font-bold text-[#0b72c9] dark:text-[#299df7] hover:underline flex items-center gap-1 mb-4 cursor-pointer transition-transform duration-150 hover:translate-x-0.5"
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
                  <div className={`pt-3.5 border-t flex flex-col gap-2 mt-auto relative z-10 ${
                    theme === 'light' ? 'border-slate-100' : 'border-slate-800'
                  }`}>
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleOpenVideo(sys.youtubeUrl, lang === 'ar' ? sys.titleAr : sys.titleEn);
                        }}
                        className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#0b72c9] dark:hover:text-[#299df7] flex items-center gap-1.5 transition-all duration-200 cursor-pointer py-1 group/btn hover:scale-105"
                      >
                        <Play className="w-3.5 h-3.5 text-[#0b72c9] fill-current group-hover/btn:scale-110 transition-transform" />
                        <span>{t.showDemo}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleToggleInterest(e, sys.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
                          isInterested
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-xs'
                            : (theme === 'light' 
                                ? 'bg-slate-50 hover:bg-[#0b72c9] hover:text-white hover:border-[#0b72c9] border-slate-300 text-slate-800 shadow-2xs hover:shadow-md hover:shadow-[#0b72c9]/20' 
                                : 'bg-slate-900 hover:bg-[#0b72c9] hover:text-white hover:border-[#0b72c9] border-slate-700 text-slate-200 hover:shadow-lg hover:shadow-[#0b72c9]/30')
                        }`}
                      >
                        {isInterested 
                          ? (lang === 'ar' ? 'تمت الإضافة' : 'Added') 
                          : (lang === 'ar' ? 'طلب تسعيرة' : 'Get Quote')}
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
