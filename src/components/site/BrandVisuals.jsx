import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator, Warehouse, TrendingUp, Cpu, Users, ShoppingBag, Gem, Utensils, Truck, Wrench,
  CalendarClock, Car, Smartphone, Tablet, ChefHat, HeartPulse, Building2, CircleHelp
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
  const CategoryIcon = categoryIcons[partner.category] || Building2;
  return (
    <CategoryIcon
      aria-hidden="true"
      className="w-8 h-8 opacity-80 transition-transform duration-300 group-hover:scale-105"
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

// Intelligent, non-lagging client logo renderer with exact manifest matching and 1-hit loading
const PartnerLogo = ({ partner, theme }) => {
  const pCat = partner.category || 'ksa';
  const folder = categoryFolders[pCat] || 'KSA';
  const manifest = LOGO_MANIFEST[pCat] || LOGO_MANIFEST.ksa;
  
  // Find index of partner in its specific category pool
  const catPool = SUCCESS_PARTNERS.filter(p => p.category === pCat);
  const indexInCat = catPool.findIndex(p => p.id === partner.id);
  const catIdx = indexInCat !== -1 ? indexInCat : 0;
  
  // Resolve using exact scanned indices or direct image url
  let imageUrl = '';
  if (partner.imageUrl) {
    imageUrl = partner.imageUrl;
  } else {
    const mItem = manifest[catIdx % manifest.length] || { idx: 1, ext: 'jpg' };
    const fileIdx = mItem.idx;
    const ext = mItem.ext;
    imageUrl = `https://www.niletechno.com/Clients/Clients/${folder}/${fileIdx}.${ext}`;
  }

  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate gorgeous, high-contrast local decorative gradient cards
  const gradients = [
    'from-cyan-500/20 to-blue-600/10 text-cyan-600 dark:text-cyan-400',
    'from-blue-600/20 to-indigo-600/10 text-blue-600 dark:text-blue-400',
    'from-emerald-500/20 to-teal-600/10 text-emerald-600 dark:text-emerald-400',
    'from-purple-600/20 to-pink-500/10 text-purple-600 dark:text-purple-400',
    'from-slate-700/20 to-slate-900/10 text-slate-700 dark:text-slate-400',
    'from-amber-500/20 to-orange-600/10 text-amber-600 dark:text-amber-400'
  ];
  const hash = partner.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const selectedGrad = gradients[hash % gradients.length];
  
  // Extract clean initials
  const initials = partner.nameAr.split(' ').filter(w => w.length > 2).slice(0, 2).map(w => w[0]).join(' ') || partner.logoText || 'NT';

  return (
    <div className="w-full h-full relative rounded-xl flex items-center justify-center overflow-hidden p-1 select-none">
      
      {/* 1. Instant Premium Placeholder Layer - Loads in 0ms, beautiful brand typography & matching category SVG */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${selectedGrad} flex flex-col items-center justify-center p-2 text-center transition-all duration-350 ${
        imageLoaded ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
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
      <img
        src={imageUrl}
        alt={partner.nameAr}
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-contain select-none transition-all duration-500 ease-out p-1 bg-white rounded-lg ${
          imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90 absolute pointer-events-none'
        }`}
        referrerPolicy="no-referrer"
        loading="lazy"
      />
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
        className={className || "h-9 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-[1.03]"}
        onError={(e) => {
          e.target.src = logoTransparentWebp;
        }}
      />
    </div>
  );
};

// Subtitle Rotator for the Hero Header Section (Innovation Feature)
const SubtitleRotator = ({ lang, theme }) => {
  const subtitlesAr = [
    'برنامج الحسابات العامة المتكامل وحلول الـ ERP الفعالة 📊',
    'منظومة الفاتورة الضريبية والمبيعات المعتمدة 100% من هيئة الزكاة 🇸🇦',
    'إدارة مستودعات ومخازن ذكية بباركود للأصناف المتعددة 📦',
    'تطبيقات الهاتف الذكية لربط مناديب المبيعات والتوكيلات الفان 📱',
    'أسرع استجابة دعم فني ميداني وسحابي مع تحديثات سنوية دورية ⚡'
  ];
  const subtitlesEn = [
    'Complete Integrated ERP Software & Financial ecosystems 📊',
    'ZATCA/ETA Certified Digital Invoicing & Instant POS solutions 🇸🇦',
    'Intelligent Warehouse Tracking & Multi-Store Barcode structures 📦',
    'Advanced Companion Mobile app arrays for salesman routing 📱',
    'High-Speed SLA technical support with free annual system rollouts ⚡'
  ];
  const list = lang === 'ar' ? subtitlesAr : subtitlesEn;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((p) => (p + 1) % list.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [list]);

  return (
    <div className="h-12 overflow-hidden flex items-center justify-center font-cairo select-none">
      <AnimatePresence mode="wait">
        <motion.span 
          key={index} 
          initial={{ y: 25, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -25, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={`text-xs sm:text-sm font-extrabold tracking-wide flex items-center gap-2 px-5 py-2 rounded-full border shadow-md select-none text-center transition-all duration-300 ${
            theme === 'light'
              ? 'text-blue-900 bg-blue-50/85 border-blue-200/90 shadow-blue-100/45'
              : 'text-cyan-400 bg-cyan-950/40 border-cyan-850/40 shadow-cyan-950/20'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{list[index]}</span>
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export { IconComponent, PartnerLogo, NileTechnoLogo, SubtitleRotator };
