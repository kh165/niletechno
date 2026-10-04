import React from 'react';
import { Search, X, LayoutGrid } from 'lucide-react';

export default function SystemsFilterBar({
  lang,
  theme,
  t,
  searchInput,
  setSearchInput,
  activeTab,
  handleTabSelect,
  categoryCounts,
  categoryIcons,
  categoryColorStyles
}) {
  const tabs = [
    { id: 'all', label: t.filterAll },
    { id: 'erp', label: t.filterErp },
    { id: 'retail', label: t.filterRetail },
    { id: 'logistics', label: t.filterLogistics },
    { id: 'specialized', label: t.filterSpecialized }
  ];

  return (
    <div className="max-w-4xl mx-auto mb-9 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder={lang === 'ar' ? 'ابحث باسم النظام أو النشاط (حسابات، نقاط بيع، كاشير، تصنيع، مجوهرات، عيادات...)' : 'Search by software system or industry...'}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full min-h-[44px] pl-12 pr-12 py-2.5 rounded-2xl border text-xs sm:text-sm transition-all focus:outline-none focus:border-[#1a85ea] focus:ring-2 focus:ring-[#1a85ea]/20 font-cairo bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 shadow-xs dark:bg-slate-900/80 dark:border-slate-800 dark:placeholder:text-slate-500 dark:text-white dark:shadow-inner"
        />
        <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-4 w-4 h-4 text-slate-400`} />
        {searchInput && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setSearchInput('');
            }}
            className={`absolute ${lang === 'ar' ? 'left-4' : 'right-4'} top-4 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer`}
            aria-label={lang === 'ar' ? 'مسح البحث' : 'Clear search'}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Tabs Navigation */}
      <div className="p-1.5 sm:p-2 rounded-2xl border flex flex-wrap items-center justify-center gap-2 bg-slate-50/95 border-slate-200/90 shadow-sm dark:bg-slate-900/95 dark:border-slate-800 dark:shadow-inner">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const CatIcon = categoryIcons[tab.id] || LayoutGrid;
          const count = categoryCounts[tab.id] || 0;
          const colorStyle = categoryColorStyles[tab.id] || categoryColorStyles.all;

          return (
            <button
              type="button"
              key={tab.id}
              onClick={(e) => handleTabSelect(e, tab.id)}
              aria-pressed={isActive}
              // نفس الـ font-weight ونفس الـ border في الحالتين عشان عرض الزرار ميتغيرش وقت الضغط
              className={`min-h-[40px] px-3 sm:px-3.5 py-1.5 rounded-xl border text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer font-cairo flex items-center gap-2.5 ${
                isActive
                  ? `${colorStyle.activeBg} border-transparent`
                  : 'text-slate-700 hover:text-slate-950 hover:bg-white/80 border-transparent hover:border-slate-200 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/70 dark:hover:border-slate-700/60'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-white/15' : 'bg-cyan-50'}`}>
                <CatIcon className={`w-4 h-4 ${isActive ? colorStyle.activeIcon : colorStyle.inactiveIcon}`} />
              </div>
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-normal shrink-0 ${
                isActive 
                  ? colorStyle.activeBadge 
                  : 'bg-cyan-50 text-[#1470c7] border border-cyan-100 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}