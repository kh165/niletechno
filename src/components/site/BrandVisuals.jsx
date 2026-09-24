import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator, Warehouse, TrendingUp, Cpu, Users, ShoppingBag, Gem, Utensils, Truck, Wrench,
  CalendarClock, Car, Smartphone, Tablet, ChefHat, HeartPulse, Building2, CircleHelp,
  Globe2, UtensilsCrossed, Wheat, House, Handshake, CarFront, Pill, Leaf, Factory
} from 'lucide-react';
import { SUCCESS_PARTNERS } from '../../data';
import companyLogo from '../../assets/images/logo.webp';

const logoTransparentWebp = companyLogo;

const IconComponent = ({ name, className }) => {
  const icons = {
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
  const SelectedIcon = icons[name] || CircleHelp;
  return <SelectedIcon aria-hidden="true" strokeWidth={1.8} className={className || "w-5 h-5"} />;
};

// Helper to render beautiful category-based customer logos (representing dynamic brands)
const getPartnerLogo = (partner) => {
  if (!partner) return null;
  const categoryIcons = {
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
  const categoryKey = (partner && partner.category) ? partner.category : 'ksa';
  const CategoryIcon = categoryIcons[categoryKey] || Building2;
  return (
    <CategoryIcon
      aria-hidden="true"
      className="w-7 h-7 sm:w-8 sm:h-8 opacity-80 transition-transform duration-300 group-hover:scale-105"
      strokeWidth={1.8}
    />
  );
};

const LOGO_MANIFEST = {
  ksa: [
    { idx: 0, ext: "jpg" }, { idx: 1, ext: "jpeg" }, { idx: 2, ext: "jpeg" }, { idx: 3, ext: "jpeg" },
    { idx: 4, ext: "jpeg" }, { idx: 5, ext: "jpeg" }, { idx: 6, ext: "png" }, { idx: 7, ext: "jpeg" },
    { idx: 8, ext: "jpeg" }, { idx: 9, ext: "jpg" }, { idx: 10, ext: "jpg" }, { idx: 11, ext: "jpeg" },
    { idx: 12, ext: "jpeg" }, { idx: 13, ext: "jpg" }, { idx: 14, ext: "jpeg" }, { idx: 15, ext: "jpeg" },
    { idx: 16, ext: "jpeg" }, { idx: 17, ext: "jpeg" }, { idx: 18, ext: "jpg" }, { idx: 19, ext: "jpg" }
  ],
  import_export: [
    { idx: 1, ext: "jpeg" }, { idx: 2, ext: "jpg" }, { idx: 3, ext: "png" }, { idx: 4, ext: "jpeg" },
    { idx: 5, ext: "jpg" }, { idx: 6, ext: "jpeg" }, { idx: 7, ext: "jpg" }, { idx: 8, ext: "jpeg" },
    { idx: 9, ext: "jpeg" }
  ],
  hospitality: [
    { idx: 1, ext: "jpeg" }, { idx: 2, ext: "jpeg" }, { idx: 3, ext: "jpeg" }, { idx: 4, ext: "jpeg" },
    { idx: 5, ext: "jpeg" }, { idx: 6, ext: "jpg" }, { idx: 7, ext: "jpg" }, { idx: 8, ext: "jpg" },
    { idx: 9, ext: "jpg" }, { idx: 10, ext: "jpeg" }, { idx: 11, ext: "jpeg" }, { idx: 12, ext: "jpg" },
    { idx: 13, ext: "jfif" }, { idx: 14, ext: "png" }, { idx: 15, ext: "jpeg" }, { idx: 16, ext: "jpg" },
    { idx: 17, ext: "jpg" }, { idx: 18, ext: "jpeg" }, { idx: 19, ext: "jpeg" }, { idx: 20, ext: "jpeg" },
    { idx: 21, ext: "jpeg" }, { idx: 22, ext: "jpeg" }, { idx: 23, ext: "jpeg" }, { idx: 24, ext: "jpeg" },
    { idx: 25, ext: "jpeg" }
  ],
  malls_houseware: [
    { idx: 1, ext: "jpeg" }, { idx: 2, ext: "jpeg" }, { idx: 3, ext: "jpg" }, { idx: 4, ext: "jpeg" },
    { idx: 5, ext: "png" }, { idx: 6, ext: "jpg" }, { idx: 7, ext: "jpeg" }, { idx: 8, ext: "jpeg" },
    { idx: 9, ext: "jpg" }, { idx: 10, ext: "jpg" }, { idx: 11, ext: "jpeg" }, { idx: 12, ext: "jpg" }
  ],
  mills_feed: [
    { idx: 1, ext: "jpg" }, { idx: 2, ext: "jpeg" }, { idx: 3, ext: "jpeg" }, { idx: 4, ext: "jpg" },
    { idx: 5, ext: "jpg" }, { idx: 6, ext: "jpg" }, { idx: 7, ext: "jpg" }, { idx: 8, ext: "jpeg" },
    { idx: 9, ext: "jpg" }, { idx: 10, ext: "jpg" }, { idx: 11, ext: "jpeg" }, { idx: 12, ext: "jpg" },
    { idx: 13, ext: "jpg" }, { idx: 14, ext: "png" }, { idx: 15, ext: "png" }, { idx: 16, ext: "jpeg" },
    { idx: 17, ext: "JPG" }, { idx: 18, ext: "jpeg" }, { idx: 19, ext: "jpeg" }, { idx: 20, ext: "jpeg" },
    { idx: 21, ext: "jpeg" }, { idx: 22, ext: "png" }, { idx: 23, ext: "jpeg" }, { idx: 24, ext: "jpeg" },
    { idx: 25, ext: "jpg" }
  ],
  contracting: [
    { idx: 1, ext: "jpeg" }, { idx: 2, ext: "jpg" }, { idx: 3, ext: "jpeg" }, { idx: 4, ext: "jpeg" },
    { idx: 5, ext: "jpeg" }, { idx: 6, ext: "jpeg" }, { idx: 7, ext: "jpeg" }, { idx: 8, ext: "jpeg" },
    { idx: 9, ext: "jpeg" }, { idx: 10, ext: "jpg" }, { idx: 11, ext: "jpeg" }, { idx: 12, ext: "jpeg" },
    { idx: 13, ext: "jpg" }, { idx: 14, ext: "jpg" }
  ],
  jewelry: [
    { idx: 1, ext: "jpeg" }, { idx: 2, ext: "jpeg" }, { idx: 3, ext: "jpg" }, { idx: 4, ext: "jpeg" },
    { idx: 5, ext: "jfif" }, { idx: 6, ext: "png" }, { idx: 7, ext: "jpg" }
  ],
  agencies_wholesale: [
    { idx: 1, ext: "JPG" }, { idx: 2, ext: "png" }, { idx: 3, ext: "jpg" }, { idx: 4, ext: "png" },
    { idx: 5, ext: "jpg" }, { idx: 6, ext: "png" }, { idx: 7, ext: "jpg" }, { idx: 9, ext: "jpg" },
    { idx: 10, ext: "jpg" }, { idx: 11, ext: "jpg" }, { idx: 12, ext: "jpg" }, { idx: 13, ext: "jpeg" },
    { idx: 14, ext: "jpg" }, { idx: 15, ext: "jpeg" }, { idx: 16, ext: "jpeg" }, { idx: 17, ext: "jpeg" },
    { idx: 18, ext: "png" }, { idx: 19, ext: "jpeg" }, { idx: 20, ext: "jpeg" }, { idx: 21, ext: "jpeg" }
  ],
  car_showrooms: [
    { idx: 1, ext: "png" }, { idx: 2, ext: "png" }, { idx: 3, ext: "jpg" }, { idx: 4, ext: "jpg" },
    { idx: 5, ext: "jpeg" }, { idx: 6, ext: "jpeg" }, { idx: 7, ext: "jpg" }, { idx: 8, ext: "png" },
    { idx: 9, ext: "jpeg" }, { idx: 10, ext: "jpg" }
  ],
  pharma: [
    { idx: 1, ext: "jpg" }, { idx: 2, ext: "jpg" }, { idx: 3, ext: "jpg" }, { idx: 4, ext: "jpeg" },
    { idx: 5, ext: "jpeg" }, { idx: 6, ext: "PNG" }, { idx: 7, ext: "png" }, { idx: 8, ext: "jpg" }
  ],
  herbs_spices: [
    { idx: 0, ext: "jpg" }, { idx: 1, ext: "png" }, { idx: 2, ext: "jpg" }, { idx: 3, ext: "jpg" },
    { idx: 4, ext: "jpeg" }, { idx: 5, ext: "jpg" }, { idx: 6, ext: "jpg" }, { idx: 7, ext: "jpg" }
  ],
  factories: [
    { idx: 1, ext: "png" }, { idx: 2, ext: "jpeg" }, { idx: 3, ext: "jpeg" }, { idx: 4, ext: "jpg" },
    { idx: 5, ext: "jpg" }, { idx: 6, ext: "jpg" }, { idx: 7, ext: "jpg" }, { idx: 8, ext: "png" },
    { idx: 9, ext: "png" }, { idx: 10, ext: "jpg" }, { idx: 11, ext: "jpg" }, { idx: 12, ext: "jpg" },
    { idx: 13, ext: "jpg" }, { idx: 14, ext: "jpeg" }, { idx: 15, ext: "png" }, { idx: 16, ext: "jpeg" },
    { idx: 17, ext: "jpeg" }, { idx: 19, ext: "jpeg" }, { idx: 20, ext: "jpeg" }, { idx: 21, ext: "jpg" }
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

// Intelligent, non-lagging client logo renderer with exact manifest matching and safe fallbacks
const PartnerLogo = ({ partner, theme }) => {
  if (!partner) return null;

  const pCat = partner.category || 'ksa';
  const folder = categoryFolders[pCat] || 'KSA';
  const manifest = LOGO_MANIFEST[pCat] || LOGO_MANIFEST.ksa;
  
  // Find index of partner in its specific category pool safely
  const partnerIdStr = String(partner.id || '');
  const catPool = Array.isArray(SUCCESS_PARTNERS) ? SUCCESS_PARTNERS.filter(p => p && p.category === pCat) : [];
  const indexInCat = catPool.findIndex(p => p && String(p.id) === partnerIdStr);
  const catIdx = indexInCat !== -1 ? indexInCat : 0;
  
  // Resolve using exact scanned indices or direct image url
  let imageUrl = '';
  if (partner.imageUrl) {
    imageUrl = partner.imageUrl;
  } else if (manifest && manifest.length > 0) {
    const mItem = manifest[catIdx % manifest.length] || { idx: 1, ext: 'jpg' };
    const fileIdx = mItem.idx;
    const ext = mItem.ext;
    imageUrl = `https://www.niletechno.com/Clients/Clients/${folder}/${fileIdx}.${ext}`;
  }

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generate gorgeous, high-contrast local decorative gradient cards safely
  const gradients = [
    'from-cyan-500/20 to-blue-600/10 text-cyan-600 dark:text-cyan-400',
    'from-blue-600/20 to-indigo-600/10 text-blue-600 dark:text-blue-400',
    'from-emerald-500/20 to-teal-600/10 text-emerald-600 dark:text-emerald-400',
    'from-purple-600/20 to-pink-500/10 text-purple-600 dark:text-purple-400',
    'from-slate-700/20 to-slate-900/10 text-slate-700 dark:text-slate-400',
    'from-amber-500/20 to-orange-600/10 text-amber-600 dark:text-amber-400'
  ];
  const hash = partnerIdStr ? partnerIdStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
  const selectedGrad = gradients[Math.abs(hash) % gradients.length];
  
  // Extract clean initials safely
  const rawName = String(partner.nameAr || partner.nameEn || '');
  const initials = rawName
    ? rawName.split(' ').filter(w => w.length > 2).slice(0, 2).map(w => w[0]).join(' ') || partner.logoText || 'NT'
    : (partner.logoText || 'NT');

  return (
    <div className="w-full h-full relative rounded-xl flex items-center justify-center overflow-hidden p-1 select-none">
      
      {/* 1. Instant Premium Placeholder Layer - Loads in 0ms, beautiful brand typography & matching category SVG */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${selectedGrad} flex flex-col items-center justify-center p-2 text-center transition-all duration-350 ${
        imageLoaded && !imageError ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}>
        <div className="absolute inset-0 bg-white/5 dark:bg-black/5 backdrop-blur-[0.5px]"></div>
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="mb-1 opacity-70 group-hover:scale-110 transition-transform duration-300">
            {getPartnerLogo(partner, theme)}
          </div>
          <span className="text-[10px] font-black tracking-wide leading-none font-cairo drop-shadow-sm select-none">
            {initials}
          </span>
        </div>
      </div>

      {/* 2. Asynchronous Real Logo Image Layer - Smoothly fades in only when fully loaded */}
      {imageUrl && !imageError && (
        <img
          src={imageUrl}
          alt={rawName || "Partner"}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(false);
          }}
          className={`w-full h-full object-contain select-none transition-all duration-500 ease-out p-1 bg-white rounded-lg ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90 absolute pointer-events-none'
          }`}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      )}
    </div>
  );
};

// Premium image-based logo for Nile Techno with dynamic fallback sequence
const NileTechnoLogo = ({ theme, lang, className }) => {
  return (
    <div className="flex items-center select-none hover:opacity-95 transition-opacity">
      <img
        src={companyLogo}
        alt="Nile Techno Logo"
        decoding="async"
        className={`${className || "h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"} max-w-full`}
        onError={(e) => {
          e.target.src = logoTransparentWebp;
        }}
      />
    </div>
  );
};

// Subtitle Rotator for the Hero Header Section (Enterprise Feature)
const SubtitleRotator = ({ lang, theme }) => {
  const subtitles = [
    {
      icon: Calculator,
      ar: 'برنامج الحسابات العامة المتكامل وحلول الـ ERP الفعالة',
      en: 'Complete Integrated ERP Software & Financial Ecosystems',
      color: 'text-cyan-500'
    },
    {
      icon: Building2,
      ar: 'منظومة الفاتورة الضريبية والمبيعات المعتمدة من هيئة الزكاة والضرائب',
      en: 'ZATCA & ETA Certified Digital Invoicing & Instant POS Solutions',
      color: 'text-emerald-500'
    },
    {
      icon: Warehouse,
      ar: 'إدارة مستودعات ومخازن ذكية بنظام الباركود متعدد الفروع',
      en: 'Intelligent Warehouse Tracking & Multi-Store Barcode Management',
      color: 'text-blue-500'
    },
    {
      icon: Smartphone,
      ar: 'تطبيقات الهاتف الذكية لربط مناديب المبيعات والطباعة الحرارية',
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

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((p) => (p + 1) % subtitles.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [subtitles.length]);

  const current = subtitles[index];
  const CurrentIcon = current.icon;

  return (
    <div className="h-9 overflow-hidden flex items-center justify-center lg:justify-start font-cairo select-none">
      <AnimatePresence mode="wait">
        <motion.div 
          key={index} 
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`text-xs font-bold tracking-wide flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-sm select-none transition-all duration-300 ${
            theme === 'light'
              ? 'text-slate-800 bg-white border-slate-200 shadow-sm'
              : 'text-slate-200 bg-slate-900/80 border-slate-800'
          }`}
        >
          <CurrentIcon className={`w-3.5 h-3.5 shrink-0 ${current.color}`} />
          <span className="truncate">{lang === 'ar' ? current.ar : current.en}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export { IconComponent, PartnerLogo, NileTechnoLogo, SubtitleRotator };
