import React from 'react';
import { Award, Download, MessageSquare } from 'lucide-react';
import { HOMEPAGE_SLIDER_PARTNERS } from '../../data';
import { PartnerLogo } from '../site/BrandVisuals';
import { COMPANY_CONFIG, createWhatsAppUrl } from '../../constants/config';
import { Reveal } from '../site/ScrollExperience';

function PartnersSection({ lang = 'ar', theme = 'dark', setShowPartnersModal }) {
  const isRtl = lang === 'ar';

  const renderPartnerCard = (partner, idx, groupIndex) => {
    if (!partner) return null;

    return (
      <div
        key={`${groupIndex}-${partner.id || idx}`}
        className={`service-card-lift partner-marquee-card w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 group p-0 rounded-2xl border transition-all duration-300 flex items-center justify-center relative overflow-hidden hover:-translate-y-1.5 hover:scale-105 ${
          theme === 'light'
            ? 'bg-white border-slate-200 shadow-xs hover:shadow-xl hover:border-cyan-300'
            : 'bg-[#131d35] border-slate-700/60 hover:border-cyan-500/50 hover:bg-[#162340] hover:shadow-xl'
        }`}
        onClick={() => setShowPartnersModal?.(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setShowPartnersModal?.(true);
          }
        }}
        tabIndex={0}
        role="button"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <PartnerLogo partner={partner} theme={theme} />
        </div>
      </div>
    );
  };

  const partnerWhatsAppText = isRtl
    ? `السلام عليكم ورحمة الله وبركاته،\n\nأود الاستفسار والاطلاع على سابقة أعمال شركة نايل تكنو للبرمجيات والأنظمة المنفذة لشركاء النجاح والتوكيلات التجارية.\n\nشاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.`
    : `Hello Nile Techno Sales Team,\n\nI would like to inquire about your software solutions, enterprise portfolio, and success partners.\n\nThank you for your assistance.`;

  return (
    <section 
      id="customers" 
      className={`py-12 sm:py-16 relative overflow-hidden transition-colors duration-500 border-t border-b ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-sky-50/30 via-white to-blue-50/30 border-slate-200/50' 
          : 'bg-gradient-to-b from-[#0a1329] via-[#0c1735] to-[#091226] border-cyan-500/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <Reveal className="text-center max-w-3xl mx-auto mb-10">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-wider font-cairo ${
            theme === 'light' ? 'bg-cyan-50 text-cyan-700' : 'bg-cyan-950/80 text-cyan-400'
          }`}>
            {isRtl ? 'شركاء نجاحنا في الشرق الأوسط' : 'Enterprise Trust Across Middle East'}
          </span>
          <h2 className={`text-2xl sm:text-3.5xl font-extrabold font-cairo mb-3 leading-tight ${
            theme === 'light' ? 'text-slate-900' : 'text-white'
          }`}>
            {isRtl ? 'سجل فخرنا وشركاء النجاح مع نايل تكنو' : 'Over 16 Years of Client Partnerships'}
          </h2>
          <p className={`text-xs sm:text-sm font-cairo max-w-2xl mx-auto ${
            theme === 'light' ? 'text-slate-600' : 'text-slate-400'
          }`}>
            {isRtl 
              ? 'نفتخر بتقديم برمجياتنا المحاسبية والإدارية لمئات الشركات والمصانع الرائدة في مصر والمملكة العربية السعودية.' 
              : 'Empowering enterprise accounting, branch synchronization, and operational workflows for hundreds of prominent companies.'}
          </p>
        </Reveal>
 
        {/* Sliding marquee - Truly infinite seamless loop */}
        <div className="relative mb-10 overflow-hidden">
          {/* Subtle edge fades for smooth entrance and exit */}
          <div className={`absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r z-10 pointer-events-none ${
            theme === 'light' ? 'from-white via-white/80 to-transparent' : 'from-[#0b1329] via-[#0b1329]/80 to-transparent'
          }`} />
          <div className={`absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l z-10 pointer-events-none ${
            theme === 'light' ? 'from-white via-white/80 to-transparent' : 'from-[#0b1329] via-[#0b1329]/80 to-transparent'
          }`} />

          <div className="partners-marquee-viewport" dir="ltr">
            <div className="partners-marquee-track flex">
              {[0, 1].map((groupIndex) => (
                <div key={groupIndex} className="partners-marquee-group flex gap-3 sm:gap-4 shrink-0 pr-3 sm:pr-4">
                  {Array.isArray(HOMEPAGE_SLIDER_PARTNERS) && HOMEPAGE_SLIDER_PARTNERS.map((partner, idx) => 
                    renderPartnerCard(partner, idx, groupIndex)
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
 
        {/* Action Buttons with real actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button 
            type="button"
            onClick={() => setShowPartnersModal?.(true)}
            className="w-full sm:w-auto min-h-[42px] px-6 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer font-cairo shadow-lg shadow-[#1a85ea]/25 hover:shadow-[#1a85ea]/40 hover:-translate-y-0.5 active:scale-95 bg-[#1a85ea] hover:bg-[#1470c7] text-white"
          >
            <span>{isRtl ? 'تصفح دليل شركاء النجاح وسابقة الأعمال' : 'Open Complete Client Directory'}</span>
            <Award className="w-4 h-4 text-white shrink-0" />
          </button>
 
          <a 
            href={createWhatsAppUrl('egy', partnerWhatsAppText)} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`w-full sm:w-auto min-h-[40px] px-5 py-2.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer font-cairo shadow-2xs ${
              theme === 'light'
                ? 'border-emerald-700/20 bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100/80 hover:border-emerald-700/35 hover:text-emerald-900'
                : 'border-emerald-500/25 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/50 hover:border-emerald-500/40 hover:text-emerald-200'
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-emerald-600 dark:text-emerald-400 shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>{isRtl ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}</span>
          </a>
          
          <a 
            href={COMPANY_CONFIG.pdfProfileUrl}
            download="NileTechno_Company_Profile.pdf"
            className={`w-full sm:w-auto min-h-[40px] px-5 py-2.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer font-cairo ${
              theme === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200'
            }`}
          >
            <Download className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{isRtl ? 'تحميل الملف التعريفي للشركة (PDF)' : 'Download Company Profile (PDF)'}</span>
          </a>
        </div>
 
      </div>
    </section>
  );
}

export { PartnersSection };
export default PartnersSection;
