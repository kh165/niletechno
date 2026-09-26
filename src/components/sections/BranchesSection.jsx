import React, { useState } from 'react';
import { BRANCHES_DATA } from '../../data';
import { COMPANY_CONFIG } from '../../constants/config';
import { 
  Building2, 
  MapPin, 
  PhoneCall, 
  MessageSquare, 
  ExternalLink,
  Navigation
} from 'lucide-react';

function BranchesSection({ lang, theme, selectedBranchId, setSelectedBranchId }) {
  const selectedBranch = BRANCHES_DATA.find((b) => b.id === selectedBranchId) || BRANCHES_DATA[0];

  return (
    <section 
      id="branches" 
      className={`py-16 sm:py-20 relative transition-colors duration-500 border-t border-b ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-blue-50/30 via-sky-50/40 to-slate-50 border-slate-200/50' 
          : 'bg-gradient-to-b from-[#091226] via-[#0d1a39] to-[#0a1329] border-cyan-500/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-wider font-cairo ${
            theme === 'light' ? 'bg-cyan-50 text-cyan-700' : 'bg-cyan-950/80 text-cyan-400'
          }`}>
            {lang === 'ar' ? 'تواجدنا الميداني' : 'Our Physical Presence'}
          </span>
          <h2 className={`text-2xl sm:text-3.5xl font-extrabold font-cairo mb-3 leading-tight ${
            theme === 'light' ? 'text-slate-900' : 'text-white'
          }`}>
            {lang === 'ar' ? 'فروع شركة نايل تكنو للبرمجيات' : 'Regional Offices & Headquarters'}
          </h2>
          <p className={`text-xs sm:text-sm font-cairo max-w-2xl mx-auto ${
            theme === 'light' ? 'text-slate-600' : 'text-slate-400'
          }`}>
            {lang === 'ar'
              ? 'فروع متكاملة لتقديم خدمات الدعم الفني، التدريب، والاستشارات البرمجية في مصر والسعودية.'
              : 'Dedicated local branches delivering deployment, staff training, and on-site support across Egypt and KSA.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Branch Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {BRANCHES_DATA.map((branch) => {
              const isSelected = branch.id === selectedBranch.id;
              return (
                <button
                  key={branch.id}
                  type="button"
                  onClick={() => setSelectedBranchId(branch.id)}
                  className={`service-card-lift w-full text-right p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 cursor-pointer hover:-translate-y-1.5 hover:scale-[1.01] ${
                    isSelected
                      ? theme === 'light'
                        ? 'bg-white border-[#1a85ea] shadow-md ring-1 ring-[#1a85ea]/20 hover:shadow-xl'
                        : 'bg-slate-900 border-[#1a85ea] shadow-lg shadow-[#1a85ea]/10 hover:shadow-2xl'
                      : theme === 'light'
                        ? 'bg-white/80 border-slate-200 hover:bg-white text-slate-700 hover:border-[#1a85ea]/50 hover:shadow-lg'
                        : 'bg-slate-900/50 border-slate-800 hover:bg-slate-900 text-slate-300 hover:border-[#1a85ea]/50 hover:shadow-xl'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                    isSelected 
                      ? 'bg-[#1a85ea] text-white' 
                      : theme === 'light' ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Building2 className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-bold font-cairo mb-1 ${
                      isSelected 
                        ? 'text-[#1a85ea] dark:text-[#38bdf8]' 
                        : theme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      {lang === 'ar' ? branch.cityAr : branch.cityEn}
                    </h3>
                    <p className={`text-xs font-cairo leading-relaxed line-clamp-2 ${
                      theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      {lang === 'ar' ? branch.addressAr : branch.addressEn}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Branch Details & Embedded Map */}
          <div className={`feature-block-lift lg:col-span-7 rounded-2xl border p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl ${
            theme === 'light' ? 'bg-white border-slate-200 shadow-sm hover:border-cyan-300' : 'bg-[#131d35] border-slate-700/60 hover:border-slate-600'
          }`}>
            {/* Top Branch Header - Clean without misplaced buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 border-b pb-4 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#1a85ea]/10 text-[#1a85ea] dark:text-[#38bdf8]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base sm:text-lg font-extrabold font-cairo ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    {lang === 'ar' ? selectedBranch.cityAr : selectedBranch.cityEn}
                  </h3>
                  <span className="text-xs text-slate-500 font-cairo">
                    {lang === 'ar' ? selectedBranch.areaAr : selectedBranch.areaEn}
                  </span>
                </div>
              </div>

              {/* Direct Call Link */}
              <a
                href={`tel:${selectedBranch.id === 'riyadh' ? COMPANY_CONFIG.contact.ksa.phoneRaw : COMPANY_CONFIG.contact.egypt.phoneRaw}`}
                className={`inline-flex items-center justify-center min-h-[40px] gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold font-cairo transition-colors shadow-sm w-full sm:w-auto ${theme === 'light' ? 'bg-blue-50/80 hover:bg-blue-100 text-[#1470c7] border-[#1a85ea]/25' : 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'}`}
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#1a85ea] shrink-0" />
                <span dir="ltr">{selectedBranch.id === 'riyadh' ? COMPANY_CONFIG.contact.ksa.phoneDisplay : COMPANY_CONFIG.contact.egypt.phoneDisplay}</span>
              </a>
            </div>

            {/* Google Map Container with lazy iframe */}
            <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 relative shadow-inner">
              <iframe
                title={`Map of ${selectedBranch.cityEn}`}
                src={selectedBranch.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Bottom Address & Action Buttons Bar (Exact match to image.png) */}
            <div className="pt-4 mt-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Right side: Detailed Accurate Address */}
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-extrabold text-[#1a85ea] dark:text-[#38bdf8] uppercase tracking-wider mb-1 font-cairo flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#1a85ea] dark:text-[#38bdf8] shrink-0" />
                  <span>{lang === 'ar' ? 'العنوان الدقيق الحالي للفروع' : 'Current active branch location'}</span>
                </div>
                <p className={`text-xs sm:text-sm font-bold font-cairo leading-relaxed ${
                  theme === 'light' ? 'text-slate-850' : 'text-slate-100'
                }`}>
                  {lang === 'ar' ? selectedBranch.addressAr : selectedBranch.addressEn}
                </p>
              </div>

              {/* Left side: Maps Button & WhatsApp Branch Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full md:w-auto">
                <a
                  href={selectedBranch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`min-h-[40px] px-4 py-2 rounded-xl border text-xs font-bold font-cairo flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 flex-1 sm:flex-initial ${
                    theme === 'light'
                      ? 'bg-blue-50/80 hover:bg-blue-100 border-[#1a85ea]/30 text-[#1a85ea]'
                      : 'bg-[#1a85ea]/10 hover:bg-[#1a85ea]/20 border-[#1a85ea]/40 text-[#38bdf8]'
                  }`}
                >
                  <Navigation className="w-4 h-4 text-[#1a85ea] dark:text-[#38bdf8]" />
                  <span>{lang === 'ar' ? 'خرائط Google 🗺️' : 'Google Maps 🗺️'}</span>
                </a>

                {(() => {
                  const branchMsg = lang === 'ar'
                    ? `السلام عليكم ورحمة الله وبركاته،\n\nأود التواصل مع إدارة مبيعات شركة نايل تكنو للبرمجيات (فرع ${selectedBranch.cityAr}) للاستفسار عن الأنظمة والحلول التقنية المتاحة لنشاطنا.\n\nشاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.`
                    : `Hello Nile Techno Sales Team (${selectedBranch.cityEn} Branch),\n\nI would like to inquire about your enterprise software systems and solutions for our business.\n\nThank you for your prompt assistance.`;
                  return (
                    <a
                      href={`https://wa.me/${selectedBranch.whatsapp}?text=${encodeURIComponent(branchMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[40px] px-4 py-2 rounded-xl text-xs font-bold font-cairo flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:scale-95 bg-gradient-to-r from-[#128c7e] via-[#25d366] to-[#34af23] text-white hover:brightness-110 flex-1 sm:flex-initial"
                    >
                      <span className="relative flex h-2.5 w-2.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                      </span>
                      <MessageSquare className="w-4 h-4 shrink-0" />
                      <span>{lang === 'ar' ? 'تحدث مع الفرع' : 'Chat with Branch'}</span>
                    </a>
                  );
                })()}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export { BranchesSection };
