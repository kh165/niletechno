import React, { useState } from 'react';
import { Award, Download, MessageSquare } from 'lucide-react';
import { HOMEPAGE_SLIDER_PARTNERS } from '../../data';
import { PartnerLogo } from '../site/BrandVisuals';
import { COMPANY_CONFIG, createWhatsAppUrl } from '../../constants/config';

function PartnersSection({ lang, theme, setShowPartnersModal }) {
  const [hoveredPartnerId, setHoveredPartnerId] = useState(null);

  const renderPartnerCard = (partner, idx, groupIndex) => {
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
        key={`${groupIndex}-${partner.id}`}
        onMouseEnter={() => setHoveredPartnerId(partner.id)}
        onMouseLeave={() => setHoveredPartnerId(null)}
        title={lang === 'ar' ? `${partner.nameAr} - ${partner.industryAr}` : `${partner.nameEn} - ${partner.industryEn}`}
        className={`w-28 h-28 sm:w-32 sm:h-32 shrink-0 group p-0 rounded-2xl border-t-4 border-r border-b border-l hover:border-cyan-500/60 dark:hover:border-cyan-400/55 transition-all duration-300 flex items-center justify-center relative overflow-hidden ${borderAccent} ${
          hoveredPartnerId && hoveredPartnerId !== partner.id ? 'opacity-50 blur-[1px] scale-[0.97]' : hoveredPartnerId === partner.id ? 'opacity-100 scale-[1.06] z-10 shadow-lg shadow-cyan-500/15' : ''
        } ${
          theme === 'light'
            ? 'bg-gradient-to-br from-white via-slate-50/50 to-cyan-50/20 border-slate-200 shadow-sm hover:shadow-md'
            : 'bg-gradient-to-br from-[#0f172a] to-[#070e1e] border-slate-800 hover:bg-slate-900/50'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <PartnerLogo partner={partner} theme={theme} />
        </div>
      </div>
    );
  };

  const partnerWhatsAppText = lang === 'ar'
    ? 'السلام عليكم ورحمة الله وبركاته، أرغب في الاستفسار عن سابقة أعمال وخدمات شركة نايل تكنو للبرمجيات.'
    : 'Hello, I would like to inquire about Nile Techno software services and portfolio.';

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
            {lang === 'ar' ? 'شركاء نجاحنا في الشرق الأوسط' : 'Enterprise Trust Across Middle East'}
          </span>
          <h2 className={`text-2xl sm:text-3.5xl font-extrabold font-cairo mb-3 leading-tight ${
            theme === 'light' ? 'text-slate-900' : 'text-white'
          }`}>
            {lang === 'ar' ? 'سجل فخرنا وشركاء النجاح مع نايل تكنو' : 'Over 16 Years of Client Partnerships'}
          </h2>
          <p className={`text-xs sm:text-sm font-cairo max-w-2xl mx-auto ${
            theme === 'light' ? 'text-slate-600' : 'text-slate-400'
          }`}>
            {lang === 'ar' 
              ? 'نفتخر بتقديم برمجياتنا المحاسبية والإدارية لمئات الشركات والمصانع الرائدة في مصر والمملكة العربية السعودية.' 
              : 'Empowering enterprise accounting, branch synchronization, and operational workflows for hundreds of prominent companies.'}
          </p>
        </div>
 
        {/* Sliding marquee - Truly infinite seamless loop */}
        <div
          className="relative mb-10 overflow-hidden"
          onMouseLeave={() => setHoveredPartnerId(null)}
        >
          {/* Subtle edge fades for smooth entrance and exit */}
          <div className={`absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r z-10 pointer-events-none ${
            theme === 'light' ? 'from-white via-white/80 to-transparent' : 'from-[#060c18] via-[#060c18]/80 to-transparent'
          }`} />
          <div className={`absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l z-10 pointer-events-none ${
            theme === 'light' ? 'from-white via-white/80 to-transparent' : 'from-[#060c18] via-[#060c18]/80 to-transparent'
          }`} />

          <div className="partners-marquee-viewport" dir="ltr">
            <div className="partners-marquee-track flex">
              {[0, 1, 2, 3].map((groupIndex) => (
                <div key={groupIndex} className="partners-marquee-group flex gap-4 shrink-0 pr-4">
                  {HOMEPAGE_SLIDER_PARTNERS.map((partner, idx) => renderPartnerCard(partner, idx, groupIndex))}
                </div>
              ))}
            </div>
          </div>
        </div>
 
        {/* Buttons with honest labels and real PDF download */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button 
            type="button"
            onClick={() => setShowPartnersModal(true)}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer font-cairo shadow-md ${
              theme === 'light'
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/20'
                : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700'
            }`}
          >
            <Award className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'ar' ? 'تصفح دليل شركاء النجاح وسابقة الأعمال' : 'Open Complete Client Directory'}</span>
          </button>
 
          <a 
            href={createWhatsAppUrl('egy', partnerWhatsAppText)} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`w-full sm:w-auto px-6 py-3.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer font-cairo ${
              theme === 'light'
                ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}</span>
          </a>
          
          <a 
            href={COMPANY_CONFIG.pdfProfileUrl}
            download="NileTechno_Company_Profile.pdf"
            className={`w-full sm:w-auto px-6 py-3.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer font-cairo ${
              theme === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200'
            }`}
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'ar' ? 'تحميل الملف التعريفي للشركة (PDF)' : 'Download Company Profile (PDF)'}</span>
          </a>
        </div>
 
      </div>
    </section>
  );
}

export { PartnersSection };
