import React, { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator, Warehouse, TrendingUp, Cpu, Users, ShoppingBag, Gem, Utensils, Truck, Wrench,
  CalendarClock, Car, Smartphone, Tablet, ChefHat, HeartPulse, Building2, CircleHelp,
  Globe2, UtensilsCrossed, Wheat, House, Handshake, CarFront, Pill, Leaf, Factory
} from 'lucide-react';
import companyLogo from '../../assets/images/logo.webp';
import { SUCCESS_PARTNERS } from '../../data/partners';

const logoTransparentWebp = companyLogo;

const ICONS = {
  Calculator,
  Warehouse,
  TrendingUp,
  Cpu,
  Users,
  ShoppingBag,
  Gem,
  Utensils,
  Truck,
  Wrench,
  CalendarClock,
  Car,
  Smartphone,
  Tablet,
  ChefHat,
  HeartPulse
};

const IconComponent = ({ name, className }) => {
  const SelectedIcon = ICONS[name] || CircleHelp;
  return <SelectedIcon aria-hidden="true" strokeWidth={1.8} className={className || "w-5 h-5"} />;
};

const CATEGORY_ICONS = {
  ksa: Building2,
  import_export: Globe2,
  hospitality: UtensilsCrossed,
  malls_houseware: ShoppingBag,
  mills_feed: Wheat,
  contracting: House,
  jewelry: Gem,
  agencies_wholesale: Handshake,
  car_showrooms: CarFront,
  pharma: Pill,
  herbs_spices: Leaf,
  factories: Factory
};

// Helper to render beautiful category-based customer logos (representing dynamic brands)
const getPartnerLogo = (partner) => {
  if (!partner) return null;
  const categoryKey = (partner && partner.category) ? partner.category : 'ksa';
  const CategoryIcon = CATEGORY_ICONS[categoryKey] || Building2;
  return (
    <CategoryIcon
      aria-hidden="true"
      className="w-7 h-7 sm:w-8 sm:h-8 opacity-80 transition-transform duration-300 group-hover:scale-105"
      strokeWidth={1.8}
    />
  );
};

// Comprehensive partner logo manifests matching exact category folders from the official portal
const LOGO_MANIFEST = {
  ksa: [
    { idx: 0, ext: 'jpg' }, { idx: 1, ext: 'jpeg' }, { idx: 2, ext: 'jpeg' }, { idx: 3, ext: 'jpeg' },
    { idx: 4, ext: 'jpeg' }, { idx: 5, ext: 'jpeg' }, { idx: 6, ext: 'png' }, { idx: 7, ext: 'jpeg' },
    { idx: 8, ext: 'jpeg' }, { idx: 9, ext: 'jpg' }, { idx: 10, ext: 'jpg' }, { idx: 11, ext: 'jpeg' },
    { idx: 12, ext: 'jpeg' }, { idx: 13, ext: 'jpg' }, { idx: 14, ext: 'jpeg' }, { idx: 15, ext: 'jpeg' },
    { idx: 16, ext: 'jpeg' }, { idx: 17, ext: 'jpeg' }
  ],
  import_export: [
    { idx: 1, ext: 'jpeg' }, { idx: 2, ext: 'jpg' }, { idx: 3, ext: 'png' }, { idx: 4, ext: 'jpeg' },
    { idx: 5, ext: 'jpg' }, { idx: 6, ext: 'jpeg' }, { idx: 7, ext: 'jpg' }, { idx: 8, ext: 'jpeg' },
    { idx: 9, ext: 'jpeg' }
  ],
  hospitality: [
    { idx: 1, ext: 'jpeg' }, { idx: 2, ext: 'jpeg' }, { idx: 3, ext: 'jpeg' }, { idx: 4, ext: 'jpeg' },
    { idx: 5, ext: 'jpeg' }, { idx: 6, ext: 'jpg' }, { idx: 7, ext: 'jpg' }, { idx: 8, ext: 'jpg' },
    { idx: 9, ext: 'jpg' }, { idx: 10, ext: 'jpeg' }, { idx: 11, ext: 'jpeg' }, { idx: 12, ext: 'jpg' },
    { idx: 13, ext: 'jfif' }, { idx: 14, ext: 'png' }, { idx: 15, ext: 'jpeg' }, { idx: 16, ext: 'jpg' },
    { idx: 17, ext: 'jpg' }, { idx: 18, ext: 'jpeg' }, { idx: 19, ext: 'jpeg' }, { idx: 20, ext: 'jpeg' },
    { idx: 21, ext: 'jpeg' }, { idx: 22, ext: 'jpeg' }, { idx: 23, ext: 'jpeg' }, { idx: 24, ext: 'jpeg' },
    { idx: 25, ext: 'jpeg' }
  ],
  malls_houseware: [
    { idx: 1, ext: 'jpeg' }, { idx: 2, ext: 'jpeg' }, { idx: 3, ext: 'jpg' }, { idx: 4, ext: 'jpeg' },
    { idx: 5, ext: 'png' }, { idx: 6, ext: 'jpg' }, { idx: 7, ext: 'jpeg' }, { idx: 8, ext: 'jpeg' },
    { idx: 9, ext: 'jpg' }, { idx: 10, ext: 'jpg' }, { idx: 11, ext: 'jpeg' }
  ],
  mills_feed: [
    { idx: 1, ext: 'jpg' }, { idx: 2, ext: 'jpeg' }, { idx: 3, ext: 'jpeg' }, { idx: 4, ext: 'jpg' },
    { idx: 5, ext: 'jpg' }, { idx: 6, ext: 'jpg' }, { idx: 7, ext: 'jpg' }, { idx: 8, ext: 'jpeg' },
    { idx: 9, ext: 'jpg' }, { idx: 10, ext: 'jpg' }, { idx: 11, ext: 'jpeg' }, { idx: 12, ext: 'jpg' },
    { idx: 13, ext: 'jpg' }, { idx: 14, ext: 'png' }, { idx: 15, ext: 'png' }, { idx: 16, ext: 'jpeg' },
    { idx: 17, ext: 'JPG' }, { idx: 18, ext: 'jpeg' }, { idx: 19, ext: 'jpeg' }, { idx: 20, ext: 'jpeg' },
    { idx: 21, ext: 'jpeg' }, { idx: 22, ext: 'png' }, { idx: 23, ext: 'jpeg' }, { idx: 24, ext: 'jpeg' }
  ],
  contracting: [
    { idx: 1, ext: 'jpeg' }, { idx: 2, ext: 'jpg' }, { idx: 3, ext: 'jpeg' }, { idx: 4, ext: 'jpeg' },
    { idx: 5, ext: 'jpeg' }, { idx: 6, ext: 'jpeg' }, { idx: 7, ext: 'jpeg' }, { idx: 8, ext: 'jpeg' },
    { idx: 9, ext: 'jpeg' }, { idx: 10, ext: 'jpg' }, { idx: 11, ext: 'jpeg' }, { idx: 12, ext: 'jpeg' }
  ],
  jewelry: [
    { idx: 1, ext: 'jpeg' }, { idx: 2, ext: 'jpeg' }, { idx: 3, ext: 'jpg' }, { idx: 4, ext: 'jpeg' },
    { idx: 5, ext: 'jfif' }, { idx: 6, ext: 'png' }
  ],
  agencies_wholesale: [
    { idx: 1, ext: 'JPG' }, { idx: 2, ext: 'png' }, { idx: 3, ext: 'jpg' }, { idx: 4, ext: 'png' },
    { idx: 5, ext: 'jpg' }, { idx: 6, ext: 'png' }, { idx: 7, ext: 'jpg' }, { idx: 9, ext: 'jpg' },
    { idx: 10, ext: 'jpg' }, { idx: 11, ext: 'jpg' }, { idx: 12, ext: 'jpg' }, { idx: 13, ext: 'jpeg' },
    { idx: 14, ext: 'jpg' }, { idx: 15, ext: 'jpeg' }, { idx: 16, ext: 'jpeg' }, { idx: 17, ext: 'jpeg' },
    { idx: 18, ext: 'png' }, { idx: 19, ext: 'jpeg' }, { idx: 20, ext: 'jpeg' }, { idx: 21, ext: 'jpeg' }
  ],
  car_showrooms: [
    { idx: 1, ext: 'png' }, { idx: 2, ext: 'png' }, { idx: 3, ext: 'jpg' }, { idx: 4, ext: 'jpg' },
    { idx: 5, ext: 'jpeg' }, { idx: 6, ext: 'jpeg' }, { idx: 7, ext: 'jpg' }, { idx: 8, ext: 'png' },
    { idx: 9, ext: 'jpeg' }, { idx: 10, ext: 'jpg' }
  ],
  pharma: [
    { idx: 1, ext: 'jpg' }, { idx: 2, ext: 'jpg' }, { idx: 3, ext: 'jpg' }, { idx: 4, ext: 'jpeg' },
    { idx: 5, ext: 'jpeg' }, { idx: 6, ext: 'PNG' }, { idx: 7, ext: 'png' }, { idx: 8, ext: 'jpg' }
  ],
  herbs_spices: [
    { idx: 0, ext: 'jpg' }, { idx: 1, ext: 'png' }, { idx: 2, ext: 'jpg' }, { idx: 3, ext: 'jpg' },
    { idx: 4, ext: 'jpeg' }, { idx: 5, ext: 'jpg' }, { idx: 6, ext: 'jpg' }, { idx: 7, ext: 'jpg' }
  ],
  factories: [
    { idx: 1, ext: 'png' }, { idx: 2, ext: 'jpeg' }, { idx: 3, ext: 'jpeg' }, { idx: 4, ext: 'jpg' },
    { idx: 5, ext: 'jpg' }, { idx: 6, ext: 'jpg' }, { idx: 7, ext: 'jpg' }, { idx: 8, ext: 'png' },
    { idx: 9, ext: 'png' }, { idx: 10, ext: 'jpg' }, { idx: 11, ext: 'jpg' }, { idx: 12, ext: 'jpg' },
    { idx: 13, ext: 'jpg' }, { idx: 14, ext: 'jpeg' }, { idx: 15, ext: 'png' }, { idx: 16, ext: 'jpeg' },
    { idx: 17, ext: 'jpeg' }, { idx: 19, ext: 'jpeg' }, { idx: 20, ext: 'jpeg' }
  ]
};

const categoryFolders = {
  ksa: 'KSA',
  import_export: 'import',
  hospitality: 'rest',
  malls_houseware: 'home_furntire',
  mills_feed: 'a3laf',
  contracting: 'contracting',
  jewelry: 'jewelry',
  agencies_wholesale: 'tawkilat',
  car_showrooms: 'Cars',
  pharma: 'medical',
  herbs_spices: '3tara',
  factories: 'factory'
};

// Position of every partner inside its own category — computed ONCE at load time.
// (Previously each logo re-filtered the entire partners list on every render.)
const PARTNER_INDEX_IN_CATEGORY = (() => {
  const counters = {};
  const map = {};
  if (Array.isArray(SUCCESS_PARTNERS)) {
    SUCCESS_PARTNERS.forEach((p) => {
      if (!p) return;
      counters[p.category] = (counters[p.category] ?? -1) + 1;
      map[String(p.id)] = counters[p.category];
    });
  }
  return map;
})();

// Intelligent client logo renderer loading official CDN assets with elegant SVG fallback
const PartnerLogo = memo(function PartnerLogo({ partner, theme }) {
  const [hasError, setHasError] = useState(false);
  
  const pCat = partner?.category || 'ksa';
  const folder = categoryFolders[pCat] || 'KSA';
  const manifest = LOGO_MANIFEST[pCat] || LOGO_MANIFEST.ksa;
  
  const catIdx = PARTNER_INDEX_IN_CATEGORY[String(partner?.id || '')] ?? 0;

  // Reset error when partner changes
  useEffect(() => {
    setHasError(false);
  }, [partner?.id, partner?.imageUrl]);
  
  if (!partner) return null;

  // Resolve image URL: Prioritize explicit partner imageUrl (e.g. local 3 new logos), then live CDN URL
  let imageUrl = partner.imageUrl;
  if (!imageUrl && manifest && manifest.length > 0) {
    const mItem = manifest[catIdx % manifest.length] || { idx: 1, ext: 'jpg' };
    imageUrl = `https://www.niletechno.com/Clients/Clients/${folder}/${mItem.idx}.${mItem.ext}`;
  }

  // Extract clean initials safely
  const rawName = String(partner.nameAr || partner.nameEn || '');
  const initials = rawName
    ? rawName.split(' ').filter(w => w.length > 2).slice(0, 2).map(w => w[0]).join(' ') || partner.logoText || 'NT'
    : (partner.logoText || 'NT');

  return (
    <div className="w-full h-full relative rounded-lg flex items-center justify-center overflow-hidden p-0.5 select-none bg-white">
      {!hasError && imageUrl ? (
        <img
          src={imageUrl}
          alt={rawName || "Partner"}
          onError={() => setHasError(true)}
          className="w-full h-full object-contain select-none p-0.5 transition-transform duration-200"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full rounded-md bg-gradient-to-br from-slate-50 to-cyan-50/50 border border-slate-200/60 flex flex-col items-center justify-center p-0.5 text-center">
          <div className="text-[#00a3c4] opacity-85 scale-75">
            {getPartnerLogo(partner)}
          </div>
          <span className="text-[9px] font-black text-slate-700 tracking-tight leading-none font-cairo select-none truncate max-w-full px-0.5">
            {initials}
          </span>
        </div>
      )}
    </div>
  );
});

// Premium image-based logo for Nile Techno with dynamic fallback sequence
const NileTechnoLogo = ({ theme, lang, className }) => {
  return (
    <div className="flex items-center shrink-0 select-none hover:opacity-95 transition-opacity max-h-16 overflow-hidden">
      <img
        src={companyLogo}
        alt="Nile Techno Logo"
        decoding="async"
        className={className || "h-10 sm:h-12 md:h-13 w-auto max-w-[200px] object-contain transition-all duration-300 hover:scale-[1.02]"}
        onError={(e) => {
          e.target.src = logoTransparentWebp;
        }}
      />
    </div>
  );
};

// Static content (created once instead of on every render)
const SUBTITLES = [
  {
    icon: Calculator,
    ar: 'برنامج الحسابات العامة المتكامل وحلول الـ ERP الفعالة',
    en: 'Complete Integrated ERP Software & Financial Ecosystems',
    color: 'text-cyan-500'
  },
  {
    icon: Building2,
    ar: 'متوافق مع متطلبات هيئة الزكاة والضريبة والجمارك (ZATCA) ومصلحة الضرائب المصرية (ETA)',
    en: 'Compliant with ZATCA & ETA Digital Invoicing & Instant POS Standards',
    color: 'text-emerald-500'
  },
  {
    icon: Warehouse,
    ar: 'إدارة المستودعات والمخازن بالباركود متعدد الفروع',
    en: 'Intelligent Warehouse Tracking & Multi-Store Barcode Management',
    color: 'text-blue-500'
  },
  {
    icon: Smartphone,
    ar: 'تطبيقات الهاتف لمناديب المبيعات والطباعة الحرارية',
    en: 'Advanced Mobile Companion Apps for Salesmen & Thermal Printing',
    color: 'text-indigo-500'
  },
  {
    icon: Cpu,
    ar: 'أسرع استجابة دعم فني ميداني وسحابي مع تحديثات دورية',
    en: 'High-Speed SLA Technical Support with Automated Updates',
    color: 'text-amber-500'
  }
];

// Subtitle Rotator for the Hero Header Section (Enterprise Feature)
const SubtitleRotator = ({ lang, theme }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((p) => (p + 1) % SUBTITLES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const current = SUBTITLES[index];
  const CurrentIcon = current.icon;

  return (
    <div className="min-h-[40px] flex items-center justify-center lg:justify-start font-cairo select-none py-1">
      <AnimatePresence mode="wait">
        <motion.div 
          key={index} 
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`text-xs font-bold tracking-wide flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-sm select-none transition-all duration-300 max-w-full ${
            theme === 'light'
              ? 'text-slate-800 bg-white border-slate-200 shadow-sm'
              : 'text-slate-200 bg-slate-900/80 border-slate-800'
          }`}
        >
          <CurrentIcon className={`w-3.5 h-3.5 shrink-0 ${current.color}`} />
          <span className="whitespace-normal leading-tight">{lang === 'ar' ? current.ar : current.en}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export { IconComponent, PartnerLogo, NileTechnoLogo, SubtitleRotator };