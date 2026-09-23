import React, { useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { BRANCHES_DATA } from '../../data';

function BranchesSection({ lang, theme, t, selectedBranchId, setSelectedBranchId }) {
  const currentBranch = useMemo(() => {
    return BRANCHES_DATA.find(b => b.id === selectedBranchId) || BRANCHES_DATA[0];
  }, [selectedBranchId]);

  return (
    <section className={`py-10 sm:py-12 border-t transition-all duration-500 ${
      theme === 'light' 
        ? 'bg-gradient-to-b from-white via-slate-100/30 to-white border-slate-150' 
        : 'bg-gradient-to-b from-[#091020] to-[#050916] border-slate-900'
    }`}>
      <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className={`text-2xl sm:text-3.5xl font-extrabold font-cairo mb-4 uppercase tracking-wide ${
            theme === 'light' ? 'text-slate-950' : 'text-white'
          }`}>
            {t.branchesHeadline}
          </h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive regional switch choice */}
          <div className="lg:col-span-4 flex flex-col justify-start space-y-4">
            {BRANCHES_DATA.map((branch) => (
              <button
                key={branch.id}
                type="button"
                onClick={() => setSelectedBranchId(branch.id)}
                className={`p-5 rounded-2xl border text-right transition-all duration-300 cursor-pointer font-cairo flex flex-col gap-1 select-none ${
                  selectedBranchId === branch.id
                    ? (theme === 'light' ? 'bg-cyan-50/60 border-cyan-500 text-cyan-900 shadow-sm' : 'bg-gradient-to-r from-cyan-950/60 to-slate-900 border-cyan-500 text-white shadow-md')
                    : (theme === 'light' ? 'bg-slate-50 border-slate-100 text-slate-605 hover:bg-slate-105 hover:text-slate-950' : 'bg-[#0f172a] border-slate-800 text-slate-400 hover:bg-slate-900/75 hover:text-white')
                }`}
              >
                <div className="flex items-center gap-2 mb-1 justify-start">
                  <MapPin className={`w-5 h-5 ${selectedBranchId === branch.id ? 'text-cyan-400' : 'text-slate-505'}`} />
                  <h4 className={`text-sm font-bold ${
                    theme === 'light' ? 'text-slate-900' : 'text-white'
                  }`}>
                    {lang === 'ar' ? branch.cityAr : branch.cityEn}
                  </h4>
                </div>
                <span className="text-xs text-slate-450 pr-7">
                  {lang === 'ar' ? branch.areaAr : branch.areaEn}
                </span>
                <span className="text-[10px] text-slate-550 pr-7 font-mono">
                  {branch.phone}
                </span>
              </button>
            ))}

            <div className={`p-5 rounded-2xl border flex flex-col space-y-2 mt-4 transition-colors ${
              theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border border-slate-800'
            }`}>
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider font-cairo">
                {lang === 'ar' ? 'العنوان المالي والمراسلات' : 'General Office'}
              </span>
              <p className={`text-xs leading-relaxed font-cairo ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}>
                {lang === 'ar' 
                  ? 'البريد الإلكتروني الأساسي للمراسلات والمندوبيات:' 
                  : 'Official primary corporation channel:'}
              </p>
              <div className={`flex flex-col space-y-1 text-xs font-mono ${
                theme === 'light' ? 'text-slate-800 font-semibold' : 'text-slate-100'
              }`}>
                <span>info@niletechno.com</span>
                <span>ntnile@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Right: Embedded Google Maps inside card */}
          <div className={`lg:col-span-8 rounded-3xl p-4 shadow-xl flex flex-col justify-between items-stretch border transition-colors ${
            theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className={`w-full h-[320px] rounded-xl overflow-hidden mb-4 relative border ${
              theme === 'light' ? 'border-slate-202' : 'border-slate-800'
            }`}>
              {/* Fallback info when iframe doesn't render due to sandbox/cookie blocks inside the dev environment */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-100/50 dark:bg-slate-950/40 z-0">
                <MapPin className="w-10 h-10 text-cyan-500 mb-2 animate-bounce" />
                <span className="text-xs font-bold font-cairo text-slate-500 dark:text-slate-400 mb-1">
                  {lang === 'ar' ? 'جارٍ تحميل خريطة وموقع نايل تكنو...' : 'Loading Nile Techno Branch Map...'}
                </span>
                <a 
                  href={currentBranch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 underline font-extrabold font-cairo mt-1 hover:text-cyan-300"
                >
                  {lang === 'ar' ? 'انقر هنا لفتح الموقع مباشرة على خرائط Google' : 'Click here to load directly on Google Maps'}
                </a>
              </div>

              <iframe
                title={`${lang === 'ar' ? 'مواقع فرع نايل تكنو' : 'Nile Techno office location map'} - ${currentBranch.cityEn}`}
                src={currentBranch.mapEmbedUrl}
                className="absolute inset-0 w-full h-full border-0 z-10"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
              <div>
                <h4 className="text-xs font-bold text-cyan-500 uppercase tracking-wider mb-1 font-cairo">
                  {lang === 'ar' ? 'العنوان الدقيق الحالي للفروع' : 'Current active branch location address'}
                </h4>
                <p className={`text-xs sm:text-sm font-semibold font-cairo leading-relaxed ${
                  theme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  {lang === 'ar' ? currentBranch.addressAr : currentBranch.addressEn}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <a
                  href={currentBranch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`border font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-2 transition-all font-cairo cursor-pointer ${
                    theme === 'light'
                      ? 'bg-cyan-50 hover:bg-cyan-100 border-cyan-300 text-cyan-700 shadow-sm'
                      : 'bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{lang === 'ar' ? 'خرائط Google 🗺️' : 'Google Maps 🗺️'}</span>
                </a>

                <a
                  href={`https://wa.me/${currentBranch.whatsapp}?text=${encodeURIComponent('رسالة واردة من صفحة الفروع في الموقع الرسمي لشركة نايل تكنو للبرمجيات.\n\nالسلام عليكم ورحمة الله وبركاته، أرغب في الاستفسار عن خدمات الشركة والحلول المناسبة لنشاطي.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden font-bold text-xs py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-cairo cursor-pointer shadow-lg hover:shadow-emerald-500/20 active:scale-95 bg-gradient-to-r from-[#128c7e] via-[#25d366] to-[#34af23] text-white hover:brightness-110 hover:-translate-y-0.5"
                >
                  {/* Glowing active pulse */}
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-100"></span>
                  </span>

                  {/* Real Official High-Quality Certified WhatsApp Vector Glyph */}
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0 animate-pulse" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>{lang === 'ar' ? 'تحدث مع الفرع' : 'Contact Branch'}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export { BranchesSection };
