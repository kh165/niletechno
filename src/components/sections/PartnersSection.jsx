import React, { useState } from 'react';
import { Award, Download, Eye } from 'lucide-react';
import { HOMEPAGE_SLIDER_PARTNERS } from '../../data';
import { PartnerLogo } from '../site/BrandVisuals';

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
        className={`w-28 h-28 sm:w-32 sm:h-32 shrink-0 group p-0 rounded-2xl border-t-4 border-r border-b border-l hover:border-cyan-500/60 dark:hover:border-cyan-400/55 transition-all duration-500 flex items-center justify-center relative overflow-hidden ${borderAccent} ${
          hoveredPartnerId && hoveredPartnerId !== partner.id ? 'opacity-45 blur-[1.5px] scale-[0.96]' : hoveredPartnerId === partner.id ? 'opacity-100 scale-[1.08] z-10 shadow-xl shadow-cyan-500/15' : ''
        } ${
          theme === 'light'
            ? 'bg-gradient-to-br from-white via-slate-50/40 to-cyan-50/15 border-slate-200/70 shadow-sm hover:shadow-md hover:-translate-y-1'
            : 'bg-gradient-to-br from-[#0f172a] to-[#070e1e] border-slate-800/80 hover:bg-slate-900/50 hover:-translate-y-1'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <PartnerLogo partner={partner} theme={theme} />
        </div>
      </div>
    );
  };

  return (
    <section 
      id="customers" 
      className={`py-10 sm:py-12 relative overflow-hidden transition-all duration-500 border-t border-b ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-white via-slate-50/60 to-white border-slate-150' 
          : 'bg-gradient-to-b from-[#060c18] to-[#091020] border-slate-900'
      }`}
    >
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
 
      <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider font-cairo ${
            theme === 'light' ? 'bg-cyan-50 text-cyan-700' : 'bg-cyan-950/80 text-cyan-400'
          }`}>
            {lang === 'ar' ? 'شركاء نجاحنا في الشرق الأوسط' : 'Elite Arab Enterprise Trust'}
          </span>
          <h2 className={`text-2xl sm:text-3.5xl font-extrabold font-cairo mb-4 leading-tight ${
            theme === 'light' ? 'text-slate-950' : 'text-white'
          }`}>
            {lang === 'ar' ? 'سجل فخرنا وشركاء النجاح مع نايل تكنو' : 'Over 15 Years of Strategic Client Value'}
          </h2>
          <p className={`text-xs sm:text-sm font-cairo max-w-2xl mx-auto ${
            theme === 'light' ? 'text-slate-600' : 'text-slate-400'
          }`}>
            {lang === 'ar' 
              ? 'فهم عالمي للشركات والتكامل الضريبي لزيادة الكفاءة التشغيلية والمالية. نفتخر بتقديم أرقى الأنظمة الذكية لمئات العلامات الرائدة.' 
              : 'Pioneering custom business software pipelines. We support digital billing, multi-store layouts, and fleet audits with peak performance.'}
          </p>
        </div>
 
        {/* Curated sliding container / Grid representing partners */}
          <div
            className="relative mb-12 group/slider"
            onMouseLeave={() => setHoveredPartnerId(null)}
          >
          
          <div className={`absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-r ${
            theme === 'light' ? 'from-white to-transparent' : 'from-[#060c18] to-transparent'
          } hidden sm:block`}></div>
          <div className={`absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-l ${
            theme === 'light' ? 'from-white to-transparent' : 'from-[#060c18] to-transparent'
          } hidden sm:block`}></div>

          <div className="partners-marquee-viewport">
            <div className="partners-marquee-track flex">
              {[0, 1].map((groupIndex) => (
                <div key={groupIndex} className="partners-marquee-group flex gap-4 shrink-0">
                  {HOMEPAGE_SLIDER_PARTNERS.map((partner, idx) => renderPartnerCard(partner, idx, groupIndex))}
                </div>
              ))}
            </div>
          </div>
 
        </div>
 
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button 
            type="button"
            onClick={() => setShowPartnersModal(true)}
            className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all text-center cursor-pointer font-cairo shadow-md hover:shadow-cyan-400/10 hover:-translate-y-0.5 ${
              theme === 'light'
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white border border-cyan-700/10 shadow-cyan-600/20'
                : 'bg-[#0f172a] hover:bg-slate-900 border border-slate-800 text-cyan-300'
            }`}
          >
            <Award className="w-4 h-4 text-cyan-400 animate-bounce" />
            <span>{lang === 'ar' ? 'تصفح الدليل الشامل وسابقة أعمال مئات العملاء' : 'Open Complete Multi-Sector Client Catalog'}</span>
          </button>
 
          <a 
            href={`https://wa.me/201000082722?text=${encodeURIComponent('رسالة واردة من قسم شركاء النجاح في الموقع الرسمي لشركة نايل تكنو للبرمجيات.\n\nالسلام عليكم ورحمة الله وبركاته، أرغب في الاستفسار عن خدمات الشركة وحلول إدارة الأعمال.')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`w-full sm:w-auto px-7 py-3.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer font-cairo shadow-sm ${
              theme === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-slate-950 border-slate-200'
                : 'bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-slate-205 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'ar' ? 'تواصل مع فريق المبيعات والدعم' : 'Contact Sales & Support'}</span>
          </a>
          
          <a 
            href="mailto:info@niletechno.com?subject=طلب استفسار عن الملف التعريفي للشركة"
            className={`w-full sm:w-auto px-7 py-3.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer font-cairo shadow-sm ${
              theme === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-202 text-slate-808 hover:text-slate-950'
                : 'bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-slate-205 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'ar' ? 'تحميل سابقة الأعمال وملف الشركة (PDF)' : 'Corporate Portfolio Brief (PDF)'}</span>
          </a>
        </div>
 
      </div>
    </section>
  );
}

export { PartnersSection };
