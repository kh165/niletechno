import React from 'react';
import { ShieldCheck, Database, Cloud, Server, Layers, Play, ArrowDown } from 'lucide-react';
import { Reveal } from '../site/ScrollExperience';

export default function FlagshipHighlight({
  lang,
  theme,
  flagshipModule,
  handleOpenVideo,
  handleRequestQuote,
  isFlagshipInterested
}) {
  return (
    <Reveal className="service-card-lift relative rounded-3xl border p-5 sm:p-6 md:p-7 mb-8 transition-all duration-300 overflow-hidden hover:border-[#1a85ea]/50 group bg-gradient-to-br from-white via-slate-50 to-[#1a85ea]/5 border-slate-200/90 shadow-lg shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#1a85ea]/15 dark:from-[#070e22] dark:via-[#09132e] dark:to-[#0a1838] dark:border-slate-800 dark:shadow-xl dark:shadow-black/40 dark:hover:shadow-2xl dark:hover:shadow-[#1a85ea]/25">
      {/* Subtle decorative accent glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#1a85ea]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-8 space-y-4">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'ar' ? 'معتمد رسمياً للفاتورة الإلكترونية ZATCA & ETA' : 'Certified E-Invoicing (ZATCA & ETA)'}</span>
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1a85ea]/10 text-[#1a85ea] dark:text-[#38bdf8] font-bold">
              <Database className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'المنظومة المركزية الشاملة' : 'Flagship Central ERP'}</span>
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
            <span className="text-slate-500 dark:text-slate-400">
              {lang === 'ar' ? 'سحابي عبر السيرفر أو محلي LAN' : 'Cloud Server & On-Premise LAN'}
            </span>
          </div>

          {/* Main Headline */}
          <h3 className="text-2xl sm:text-3xl md:text-3.5xl font-black tracking-tight leading-snug text-slate-950 font-cairo dark:text-white">
            {lang === 'ar' ? 'منظومة الحسابات العامة وإدارة المخازن المتكاملة' : 'General Ledger & Integrated Inventory ERP Suite'}
          </h3>

          {/* Value Proposition Description */}
          <p className="text-xs sm:text-sm leading-relaxed max-w-3xl text-slate-600 font-medium dark:text-slate-300">
            {lang === 'ar' 
              ? 'الحل المحاسبي الشامل لكافة الأنشطة التجارية والصناعية؛ شجرة حسابات مرنة متعددة المستويات، مراكز تكلفة دقيقة، تسوية مخزنية آلية، وإصدار الفواتير الإلكترونية المشفرة لحظياً بدون وسيط.'
              : 'The comprehensive accounting foundation for commercial and industrial businesses; multi-level chart of accounts, cost centers, automated inventory reconciliation, and direct certified e-invoicing.'}
          </p>

          {/* Architecture capability highlights */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-5 pt-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-[#1a85ea]" />
              <span>{lang === 'ar' ? 'سحابي مع تشفير كامل' : 'Cloud Hosted with Encryption'}</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-[#1a85ea]" />
              <span>{lang === 'ar' ? 'قواعد بيانات SQL Server المعتمدة' : 'Enterprise SQL Server DB'}</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#1a85ea]" />
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
              handleOpenVideo(flagshipModule?.youtubeUrl, lang === 'ar' ? flagshipModule?.titleAr : flagshipModule?.titleEn);
            }}
            className="min-h-[42px] px-4 sm:px-5 py-2.5 rounded-xl bg-[#1a85ea] hover:bg-[#1470c7] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-[#1a85ea]/25 hover:shadow-lg active:scale-98 flex-1 sm:flex-1 lg:flex-initial text-center"
          >
            <Play className="w-4 h-4 fill-current shrink-0" />
            <span>{lang === 'ar' ? 'مشاهدة فيديو المنظومة' : 'Watch System Demo'}</span>
          </button>

          <button
            type="button"
            onClick={(e) => handleRequestQuote(e, flagshipModule?.id)}
            className={`min-h-[42px] px-4 sm:px-5 py-2.5 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 flex-1 sm:flex-1 lg:flex-initial text-center ${
              isFlagshipInterested
                ? 'bg-blue-50 dark:bg-blue-950/40 border-[#1a85ea] text-[#1a85ea] dark:text-[#38bdf8]'
                : 'bg-white border-slate-300 text-slate-800 hover:border-[#1a85ea] hover:bg-slate-50 dark:bg-slate-900/90 dark:border-slate-700 dark:text-slate-200 dark:hover:border-[#1a85ea] dark:hover:bg-slate-800'
            }`}
          >
            <ArrowDown className="w-4 h-4 text-[#1a85ea] shrink-0" />
            <span>{lang === 'ar' ? 'طلب عرض سعر للمنظومة ⬇️' : 'Request Official Quote ⬇️'}</span>
          </button>
        </div>

      </div>
    </Reveal>
  );
}
