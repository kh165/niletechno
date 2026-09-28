import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BRANCHES_DATA } from '../../data';
import { COMPANY_CONFIG } from '../../constants/config';
import { 
  Building2, 
  MapPin, 
  PhoneCall, 
  Navigation
} from 'lucide-react';
import { Reveal } from '../site/ScrollExperience';
import WhatsAppButton from '../site/WhatsAppButton';
import { getBranchMessage } from '../../utils/whatsapp';

function BranchesSection({ lang, theme, selectedBranchId, setSelectedBranchId }) {
  const selectedBranch = BRANCHES_DATA.find((b) => b.id === selectedBranchId) || BRANCHES_DATA[0];

  return (
    <section 
      id="branches" 
      className="py-16 sm:py-20 relative transition-colors duration-500 border-t border-b bg-gradient-to-b from-blue-50/30 via-sky-50/40 to-slate-50 border-slate-200/50 dark:from-[#091226] dark:via-[#0d1a39] dark:to-[#0a1329] dark:border-cyan-500/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-wider font-cairo bg-cyan-50 text-cyan-700 dark:bg-cyan-950/80 dark:text-cyan-400">
            {lang === 'ar' ? 'تواجدنا الميداني' : 'Our Physical Presence'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-cairo mb-3 leading-tight text-slate-900 dark:text-white">
            {lang === 'ar' ? 'فروع شركة نايل تكنو للبرمجيات' : 'Regional Offices & Headquarters'}
          </h2>
          <p className="text-xs sm:text-sm font-cairo max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
            {lang === 'ar'
              ? 'فروع متكاملة لتقديم خدمات الدعم الفني، التدريب، والاستشارات البرمجية في مصر والسعودية.'
              : 'Dedicated local branches delivering deployment, staff training, and on-site support across Egypt and KSA.'}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Branch Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {BRANCHES_DATA.map((branch, index) => {
              const isSelected = branch.id === selectedBranch.id;
              return (
                <Reveal key={branch.id} delay={index * 0.08}>
                  <button
                    type="button"
                    onClick={() => setSelectedBranchId(branch.id)}
                    className={`service-card-lift w-full text-right p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#1a85ea] shadow-md ring-1 ring-[#1a85ea]/20 hover:shadow-xl dark:bg-slate-900 dark:border-[#1a85ea] dark:shadow-lg dark:shadow-[#1a85ea]/10 dark:hover:shadow-2xl'
                        : 'bg-white/80 border-slate-200 hover:bg-white text-slate-700 hover:border-[#1a85ea]/50 hover:shadow-lg dark:bg-slate-900/50 dark:border-slate-800 dark:hover:bg-slate-900 dark:text-slate-300 dark:hover:border-[#1a85ea]/50 dark:hover:shadow-xl'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                      isSelected 
                        ? 'bg-[#1a85ea] text-white' 
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-bold font-cairo mb-1 ${
                        isSelected 
                          ? 'text-[#1a85ea] dark:text-[#38bdf8]' 
                          : 'text-slate-900 dark:text-white'
                      }`}>
                        {lang === 'ar' ? branch.cityAr : branch.cityEn}
                      </h3>
                      <p className="text-xs text-slate-500 font-cairo mb-1.5">
                        {lang === 'ar' ? branch.areaAr : branch.areaEn}
                      </p>
                      <p className={`text-[11px] font-cairo line-clamp-1 ${
                        isSelected 
                          ? 'text-slate-700 dark:text-slate-300 font-semibold' 
                          : 'text-slate-500 dark:text-slate-500'
                      }`}>
                        {lang === 'ar' ? branch.addressAr : branch.addressEn}
                      </p>
                    </div>
                    <div className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${
                      isSelected 
                        ? 'bg-[#1a85ea] ring-4 ring-[#1a85ea]/20 animate-pulse' 
                        : 'bg-slate-300 dark:bg-slate-700'
                    }`} />
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Branch Details & Embedded Map with Smooth Sliding Transition */}
          <Reveal className="lg:col-span-7" delay={0.15}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedBranch.id}
                initial={{ opacity: 0, x: lang === 'ar' ? -22 : 22, y: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: lang === 'ar' ? 22 : -22, y: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="feature-block-lift w-full rounded-2xl border p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl bg-white border-slate-200 shadow-sm hover:border-cyan-300 dark:bg-[#131d35] dark:border-slate-700/60 dark:hover:border-slate-600"
              >
                {/* Top Branch Header - Clean without misplaced buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 border-b pb-4 border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#1a85ea]/10 text-[#1a85ea] dark:text-[#38bdf8]">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold font-cairo text-slate-900 dark:text-white">
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
                    className="inline-flex items-center justify-center min-h-[40px] gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold font-cairo transition-colors shadow-sm w-full sm:w-auto bg-blue-50/80 hover:bg-blue-100 text-[#1470c7] border-[#1a85ea]/25 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-sky-300 dark:border-slate-700 hover:scale-105 active:scale-95"
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

                {/* Bottom Address & Action Buttons Bar */}
                <div className="pt-4 mt-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  {/* Right side: Detailed Accurate Address */}
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-extrabold text-[#1a85ea] dark:text-[#38bdf8] uppercase tracking-wider mb-1 font-cairo flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#1a85ea] dark:text-[#38bdf8] shrink-0" />
                      <span>{lang === 'ar' ? 'العنوان الدقيق الحالي للفروع' : 'Current active branch location'}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold font-cairo leading-relaxed text-slate-800 dark:text-slate-100">
                      {lang === 'ar' ? selectedBranch.addressAr : selectedBranch.addressEn}
                    </p>
                  </div>

                  {/* Left side: Maps Button & WhatsApp Branch Button */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full md:w-auto">
                    <a
                      href={selectedBranch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[40px] px-4 py-2 rounded-xl border text-xs font-bold font-cairo flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 flex-1 sm:flex-initial bg-blue-50/80 hover:bg-blue-100 border-[#1a85ea]/30 text-[#1a85ea] dark:bg-[#1a85ea]/10 dark:hover:bg-[#1a85ea]/20 dark:border-[#1a85ea]/40 dark:text-[#38bdf8]"
                    >
                      <Navigation className="w-4 h-4 text-[#1a85ea] dark:text-[#38bdf8]" />
                      <span>{lang === 'ar' ? 'خرائط Google 🗺️' : 'Google Maps 🗺️'}</span>
                    </a>

                    <WhatsAppButton
                      phone={selectedBranch.whatsapp}
                      message={getBranchMessage(selectedBranch, lang)}
                      label={lang === 'ar' ? 'تحدث مع الفرع' : 'Chat with Branch'}
                      className="flex-1 sm:flex-initial"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>

        </div>

      </div>
    </section>
  );
}

export { BranchesSection };
export default BranchesSection;
