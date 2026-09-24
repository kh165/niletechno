import React from 'react';
import { Award, Download, MessageSquare } from 'lucide-react';
import { HOMEPAGE_SLIDER_PARTNERS } from '../../data';
import { PartnerLogo } from '../site/BrandVisuals';
import { COMPANY_CONFIG, createWhatsAppUrl } from '../../constants/config';

function PartnersSection({ lang = 'ar', theme = 'dark', setShowPartnersModal }) {
  const isRtl = lang === 'ar';

  const renderPartnerCard = (partner, idx, groupIndex) => {
    if (!partner) return null;

    const borderColors = [
      'border-t-cyan-500',
      'border-t-blue-500',
      'border-t-indigo-500',
      'border-t-emerald-500',
      'border-t-teal-500'
    ];
    const borderAccent = borderColors[idx % borderColors.length];

    return (
      <div
        key={`${groupIndex}-${partner.id || idx}`}
        title={isRtl ? `${partner.nameAr} - ${partner.industryAr || ''}` : `${partner.nameEn || partner.nameAr} - ${partner.industryEn || ''}`}
        className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 group p-0 rounded-2xl border-t-4 border-r border-b border-l hover:border-cyan-500/60 dark:hover:border-cyan-400/55 transition-all duration-300 flex items-center justify-center relative overflow-hidden ${borderAccent} ${
          theme === 'light'
            ? 'bg-gradient-to-br from-white via-slate-50/50 to-cyan-50/20 border-slate-200 shadow-xs hover:shadow-md'
            : 'bg-gradient-to-br from-[#0f172a] to-[#070e1e] border-slate-800 hover:bg-slate-900/60'
        }`}
        onClick={() => setShowPartnersModal?.(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <PartnerLogo partner={partner} theme={theme} />
        </div>
      </div>
    );
  };

  const partnerWhatsAppText = isRtl
    ? `السلام عليكم ورحمة الله وبركاته،\n\nأود الاستفسار والاطلاع على سابقة أعمال وحلول شركة نايل تكنو للبرمجيات وشركاء النجاح.\n\nشاكراً لكم حسن تعاونكم.`
    : `Hello Nile Techno Team,\n\nI would like to inquire about your software solutions, enterprise portfolio, and success partners.\n\nThank you.`;

  return (
    <section 
      id="customers" 
      className={`py-12 sm:py-16 relative overflow-hidden transition-colors duration-300 border-t border-b ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-white via-slate-50/60 to-white border-slate-200' 
          : 'bg-gradient-to-b from-[#060c18] to-[#091020] border-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
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
        </div>
 
        {/* Sliding marquee - Truly infinite seamless loop */}
        <div className="relative mb-10 overflow-hidden">
          {/* Subtle edge fades for smooth entrance and exit */}
          <div className={`absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r z-10 pointer-events-none ${
            theme === 'light' ? 'from-white via-white/80 to-transparent' : 'from-[#060c18] via-[#060c18]/80 to-transparent'
          }`} />
          <div className={`absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l z-10 pointer-events-none ${
            theme === 'light' ? 'from-white via-white/80 to-transparent' : 'from-[#060c18] via-[#060c18]/80 to-transparent'
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
            className="w-full sm:w-auto min-h-[46px] px-7 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer font-cairo shadow-lg shadow-[#0b72c9]/25 hover:shadow-[#0b72c9]/40 hover:-translate-y-0.5 active:scale-95 bg-[#0b72c9] hover:bg-[#095ea8] text-white"
          >
            <span>{isRtl ? 'تصفح دليل شركاء النجاح وسابقة الأعمال' : 'Open Complete Client Directory'}</span>
            <Award className="w-4 h-4 text-white shrink-0" />
          </button>
 
          <a 
            href={createWhatsAppUrl('egy', partnerWhatsAppText)} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer font-cairo ${
              theme === 'light'
                ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{isRtl ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}</span>
          </a>
          
          <a 
            href={COMPANY_CONFIG.pdfProfileUrl}
            download="NileTechno_Company_Profile.pdf"
            className={`w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer font-cairo ${
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
