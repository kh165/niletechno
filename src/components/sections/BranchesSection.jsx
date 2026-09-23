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
      className={`py-16 sm:py-20 relative transition-colors duration-300 ${
        theme === 'light' 
          ? 'bg-slate-50 border-t border-b border-slate-200' 
          : 'bg-[#09101f] border-t border-b border-slate-850'
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
                  className={`w-full text-right p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 cursor-pointer ${
                    isSelected
                      ? theme === 'light'
                        ? 'bg-white border-cyan-500 shadow-md ring-1 ring-cyan-500/20'
                        : 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10'
                      : theme === 'light'
                        ? 'bg-white/80 border-slate-200 hover:bg-white text-slate-700'
                        : 'bg-slate-900/50 border-slate-800 hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                    isSelected 
                      ? 'bg-cyan-500 text-white' 
                      : theme === 'light' ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Building2 className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-bold font-cairo mb-1 ${
                      isSelected 
                        ? 'text-cyan-600 dark:text-cyan-400' 
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
          <div className={`lg:col-span-7 rounded-2xl border p-5 sm:p-6 transition-colors duration-300 ${
            theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/60 border-slate-800'
          }`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 border-b pb-4 border-slate-200 dark:border-slate-800">
              <div>
                <h3 className={`text-base font-extrabold font-cairo ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                  {lang === 'ar' ? selectedBranch.cityAr : selectedBranch.cityEn}
                </h3>
                <span className="text-xs text-slate-500 font-cairo">
                  {lang === 'ar' ? selectedBranch.areaAr : selectedBranch.areaEn}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedBranch.id === 'riyadh' ? COMPANY_CONFIG.contact.ksa.phoneRaw : COMPANY_CONFIG.contact.egypt.phoneRaw}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold font-cairo transition-colors bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span dir="ltr">{selectedBranch.id === 'riyadh' ? COMPANY_CONFIG.contact.ksa.phoneDisplay : COMPANY_CONFIG.contact.egypt.phoneDisplay}</span>
                </a>

                <a
                  href={selectedBranch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold font-cairo transition-colors bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-cyan-500"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'الاتجاهات' : 'Directions'}</span>
                </a>
              </div>
            </div>

            {/* Google Map Container with lazy iframe */}
            <div className="w-full h-72 sm:h-80 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 relative">
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
          </div>

        </div>

      </div>
    </section>
  );
}

export { BranchesSection };
