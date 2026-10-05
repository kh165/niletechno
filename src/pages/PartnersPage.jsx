import React, { useState, useMemo, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Globe } from 'lucide-react';
import { SUCCESS_PARTNERS } from '../data';
import { PartnerLogo, NileTechnoLogo } from '../components/site/BrandVisuals';
import { ThemeToggle } from '../components/site/ThemeToggle';
import { isEgyptPartner } from '../components/modals/PartnersDirectoryModal';

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem('nt_theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // ignore storage errors
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getInitialLang = () => {
  const l = new URLSearchParams(window.location.search).get('lang');
  return l === 'en' ? 'en' : 'ar';
};

const HIDE_SCROLLBAR = '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden';

export default function PartnersPage() {
  const [lang, setLang] = useState(getInitialLang);
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeTab, setActiveTab] = useState('all');
  const isRtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.title = isRtl
      ? 'دليل شركاء النجاح وسابقة الأعمال | نايل تكنو للبرمجيات'
      : 'Success Partners Directory | Nile Techno Software';
    const params = new URLSearchParams(window.location.search);
    params.set('lang', lang);
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
  }, [lang, isRtl]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    document.body.style.backgroundColor = theme === 'dark' ? '#0b1329' : '#f7f9fc';
  }, [theme]);

  const categories = useMemo(() => [
    { id: 'all', label: isRtl ? 'الكل' : 'All' },
    { id: 'egypt', label: isRtl ? 'مصر' : 'Egypt' },
    { id: 'ksa', label: isRtl ? 'السعودية' : 'Saudi Arabia' },
    { id: 'import_export', label: isRtl ? 'الاستيراد والتصدير' : 'Import & Export' },
    { id: 'hospitality', label: isRtl ? 'الكافيهات والمطاعم' : 'Cafes & Restaurants' },
    { id: 'malls_houseware', label: isRtl ? 'المولات والأدوات المنزلية' : 'Malls & Retail' },
    { id: 'mills_feed', label: isRtl ? 'مصانع الأعلاف والمطاحن' : 'Mills & Feed' },
    { id: 'contracting', label: isRtl ? 'شركات المقاولات' : 'Contracting' },
    { id: 'jewelry', label: isRtl ? 'محلات المجوهرات' : 'Jewelry' },
    { id: 'agencies_wholesale', label: isRtl ? 'التوكيلات والجملة' : 'Agencies & Wholesale' },
    { id: 'car_showrooms', label: isRtl ? 'معارض السيارات' : 'Auto Showrooms' },
    { id: 'pharma', label: isRtl ? 'شركات الأدوية' : 'Pharma & Medical' },
    { id: 'herbs_spices', label: isRtl ? 'شركات العطارة' : 'Spices & Herbs' },
    { id: 'factories', label: isRtl ? 'المصانع والإنتاج الكبرى' : 'Major Factories' }
  ], [isRtl]);

  const filteredPartners = useMemo(() => {
    if (!Array.isArray(SUCCESS_PARTNERS)) return [];
    const seenLogos = new Set();
    return SUCCESS_PARTNERS.filter((partner) => {
      if (!partner) return false;
      if (activeTab === 'all') return true;
      if (activeTab === 'egypt') return isEgyptPartner(partner);
      return partner.category === activeTab;
    }).filter((partner) => {
      const logoKey = partner.logo || partner.logoUrl || partner.image || partner.imageUrl || partner.nameAr || partner.nameEn || partner.id;
      const normalizedKey = String(logoKey || '').trim().toLowerCase();
      if (!normalizedKey || seenLogos.has(normalizedKey)) return false;
      seenLogos.add(normalizedKey);
      return true;
    });
  }, [activeTab]);

  const activeCategory = categories.find((c) => c.id === activeTab) || categories[0];
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative h-screen overflow-hidden bg-[#f7f9fc] font-cairo text-slate-800 transition-colors duration-300 dark:bg-[#0b1329] dark:text-slate-100"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 h-64 w-64 rounded-full bg-[#1a85ea]/[0.045] blur-3xl ltr:-right-20 rtl:-left-20 animate-[pulse_9s_ease-in-out_infinite] dark:bg-cyan-400/[0.04]" />
        <div className="absolute top-[42%] h-44 w-44 rounded-full border border-[#1a85ea]/[0.08] ltr:-left-20 rtl:-right-20 animate-[spin_28s_linear_infinite] dark:border-cyan-300/[0.07]" />
        <div className="absolute bottom-0 h-52 w-52 rounded-full bg-cyan-300/[0.035] blur-3xl ltr:right-[18%] rtl:left-[18%] animate-[pulse_12s_ease-in-out_infinite] dark:bg-blue-400/[0.035]" />
      </div>
      <main className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col overflow-hidden px-4 py-2 sm:px-6 sm:py-3 lg:px-8">
        <section className="mb-4 shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm dark:border-slate-800 dark:bg-[#0f1a33] sm:px-4">
          <div className="flex min-h-9 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <NileTechnoLogo theme={theme} lang={lang} className="h-7 w-auto max-w-[105px] shrink-0 object-contain" />
              <span className="h-5 w-px bg-slate-200 dark:bg-slate-700" />
              <h1 className="truncate text-sm font-extrabold text-slate-900 dark:text-white sm:text-base">
                {isRtl ? 'شركاء النجاح' : 'Success Partners'}
              </h1>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <a href="/" aria-label={isRtl ? 'العودة للموقع' : 'Back to site'} className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 text-[10px] font-bold text-slate-600 transition-colors hover:border-[#1a85ea] hover:text-[#1a85ea] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                <BackIcon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{isRtl ? 'العودة' : 'Back'}</span>
              </a>
              <ThemeToggle theme={theme} setTheme={setTheme} lang={lang} className="h-8 min-h-8 w-8 rounded-lg" />
              <button type="button" onClick={() => setLang(isRtl ? 'en' : 'ar')} className="flex h-8 items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 text-[10px] font-bold text-slate-600 transition-colors hover:border-[#1a85ea] hover:text-[#1a85ea] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                <Globe className="h-3 w-3" />
                <span className="hidden sm:inline">{isRtl ? 'English' : 'العربية'}</span>
              </button>
            </div>
          </div>
        </section>

        <div className={`mb-5 shrink-0 overflow-x-auto lg:hidden ${HIDE_SCROLLBAR}`}>
          <div className="flex min-w-max gap-2" role="tablist">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button key={cat.id} type="button" role="tab" aria-selected={isActive} onClick={() => setActiveTab(cat.id)} className={`rounded-xl border px-4 py-2 text-xs font-bold transition-colors ${isActive ? 'border-[#1a85ea] bg-[#1a85ea] text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-[#1a85ea] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'}`}>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 items-stretch gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden min-h-0 lg:block">
            <div className={`h-full overflow-y-auto rounded-3xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-[#0f1a33] ${HIDE_SCROLLBAR}`}>
              <h2 className="px-2 pb-3 pt-1 text-xs font-extrabold text-slate-500 dark:text-slate-400">{isRtl ? 'تصفح حسب التصنيف' : 'Browse by category'}</h2>
              <nav className="max-h-[calc(100vh-180px)] space-y-1 overflow-y-auto pe-1" role="tablist">
                {categories.map((cat, idx) => {
                  const isActive = activeTab === cat.id;
                  return (
                    <React.Fragment key={cat.id}>
                      {idx === 3 && <div className="my-2 border-t border-slate-100 dark:border-slate-800" />}
                      <button type="button" role="tab" aria-selected={isActive} onClick={() => setActiveTab(cat.id)} className={`w-full rounded-xl px-3 py-2.5 text-start text-xs font-bold transition-colors ${isActive ? 'bg-[#1a85ea] text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-[#1a85ea] dark:text-slate-300 dark:hover:bg-slate-800'}`}>
                        {cat.label}
                      </button>
                    </React.Fragment>
                  );
                })}
              </nav>
            </div>
          </aside>

          <section className="flex min-h-0 min-w-0 flex-col">
            <div className="mb-4 flex shrink-0 items-center gap-2 px-1">
              <span className="h-5 w-1.5 rounded-full bg-[#1a85ea]" />
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white sm:text-lg">{activeCategory.label}</h2>
            </div>
            <div className={`min-h-0 flex-1 overflow-y-auto rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#0f1a33] sm:p-6 ${HIDE_SCROLLBAR}`}>
              {filteredPartners.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6">
                  {filteredPartners.map((partner) => (
                    <div key={partner.id} className="group relative aspect-[1.15] overflow-hidden rounded-xl border border-slate-200 bg-white p-2 transition-colors hover:border-[#1a85ea]/60 dark:border-slate-700/70 dark:bg-slate-50">
                      <div className="flex h-full w-full scale-[0.78] items-center justify-center transition-transform duration-300 group-hover:scale-[0.84]"><PartnerLogo partner={partner} theme={theme} /></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center text-sm font-bold text-slate-500 dark:text-slate-400">{isRtl ? 'لا توجد نتائج في هذا التصنيف' : 'No partners in this category'}</div>
              )}
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}
