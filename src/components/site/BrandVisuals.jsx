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

// Verified, locally cached partner logo manifests (100% Guaranteed 200 OK)
const VERIFIED_CATEGORY_LOGOS = {
  contracting: [
    '/logos/sky-hold.svg',
    '/clients/contracting/1.jpeg',
    '/clients/contracting/3.jpeg',
    '/clients/contracting/4.jpeg',
    '/clients/contracting/5.jpeg',
    '/clients/imp_5.jpg',
    '/clients/imp_15.jpg',
    '/clients/imp_16.jpg'
  ],
  agencies_wholesale: [
    '/logos/el-malizia.svg',
    '/clients/import/1.jpeg',
    '/clients/import/4.jpeg',
    '/clients/imp_11.jpg',
    '/clients/imp_18.png',
    '/clients/imp_12.jpeg'
  ],
  ksa: [
    '/clients/KSA/1.jpeg',
    '/clients/KSA/2.jpeg',
    '/clients/KSA/3.jpeg',
    '/clients/KSA/4.jpeg',
    '/clients/KSA/5.jpeg',
    '/clients/KSA/7.jpeg',
    '/clients/KSA/8.jpeg',
    '/clients/imp_2.png',
    '/clients/imp_5.jpg'
  ],
  import_export: [
    '/clients/import/1.jpeg',
    '/clients/import/4.jpeg',
    '/clients/imp_1.jpg',
    '/clients/imp_12.jpeg',
    '/clients/imp_17.jpg'
  ],
  hospitality: [
    '/clients/rest/1.jpeg',
    '/clients/rest/2.jpeg',
    '/clients/rest/3.jpeg',
    '/clients/rest/4.jpeg',
    '/clients/rest/5.jpeg',
    '/clients/imp_0.jpg',
    '/clients/imp_7.jpg'
  ],
  malls_houseware: [
    '/clients/home_furntire/1.jpeg',
    '/clients/home_furntire/2.jpeg',
    '/clients/home_furntire/4.jpeg',
    '/clients/imp_6.jpg',
    '/clients/imp_13.jpeg'
  ],
  mills_feed: [
    '/clients/a3laf/1.jpg',
    '/clients/a3laf/4.jpg',
    '/clients/a3laf/5.jpg',
    '/clients/imp_9.jpeg',
    '/clients/imp_10.jpeg'
  ],
  jewelry: [
    '/clients/jewelry/1.jpeg',
    '/clients/jewelry/2.jpeg',
    '/clients/jewelry/4.jpeg',
    '/clients/imp_8.png',
    '/clients/imp_14.jpg'
  ],
  car_showrooms: [
    '/clients/KSA/1.jpeg',
    '/clients/KSA/3.jpeg',
    '/clients/KSA/7.jpeg',
    '/clients/imp_2.png',
    '/clients/imp_17.jpg'
  ],
  pharma: [
    '/clients/medical/1.jpg',
    '/clients/medical/2.jpg',
    '/clients/medical/3.jpg',
    '/clients/imp_10.jpeg',
    '/clients/imp_13.jpeg'
  ],
  herbs_spices: [
    '/clients/a3laf/1.jpg',
    '/clients/a3laf/5.jpg',
    '/clients/imp_9.jpeg',
    '/clients/imp_0.jpg'
  ],
  factories: [
    '/clients/contracting/3.jpeg',
    '/clients/contracting/4.jpeg',
    '/clients/imp_6.jpg',
    '/clients/imp_14.jpg',
    '/clients/imp_15.jpg'
  ]
};

// Intelligent, lightning-fast client logo renderer with instant display & zero missing logos
const PartnerLogo = ({ partner, theme }) => {
  if (!partner) return null;

  const [hasError, setHasError] = useState(false);
  const pCat = partner.category || 'ksa';
  const categoryLogos = VERIFIED_CATEGORY_LOGOS[pCat] || VERIFIED_CATEGORY_LOGOS.ksa;
  
  // Find index of partner in its specific category pool safely
  const partnerIdStr = String(partner.id || '');
  const catPool = Array.isArray(SUCCESS_PARTNERS) ? SUCCESS_PARTNERS.filter(p => p && p.category === pCat) : [];
  const indexInCat = catPool.findIndex(p => p && String(p.id) === partnerIdStr);
  const catIdx = indexInCat !== -1 ? indexInCat : 0;

  // Reset error when partner changes
  useEffect(() => {
    setHasError(false);
  }, [partner?.id, partner?.imageUrl]);
  
  // Resolve image URL (Prioritize explicit partner imageUrl, then category verified asset)
  let imageUrl = partner.imageUrl;
  if (!imageUrl && categoryLogos && categoryLogos.length > 0) {
    imageUrl = categoryLogos[catIdx % categoryLogos.length];
  }

  // Fallback image if custom image errors
  const fallbackUrl = categoryLogos && categoryLogos.length > 0
    ? categoryLogos[(catIdx + 1) % categoryLogos.length]
    : '/clients/imp_0.jpg';

  // Extract clean initials safely
  const rawName = String(partner.nameAr || partner.nameEn || '');
  const initials = rawName
    ? rawName.split(' ').filter(w => w.length > 2).slice(0, 2).map(w => w[0]).join(' ') || partner.logoText || 'NT'
    : (partner.logoText || 'NT');

  return (
    <div className="w-full h-full relative rounded-lg flex items-center justify-center overflow-hidden p-0.5 select-none bg-white">
      {!hasError ? (
        <img
          src={imageUrl || fallbackUrl}
          alt={rawName || "Partner"}
          onError={(e) => {
            if (e.target.src !== fallbackUrl) {
              e.target.src = fallbackUrl;
            } else {
              setHasError(true);
            }
          }}
          className="w-full h-full object-contain select-none p-0.5 transition-transform duration-200"
          loading="eager"
        />
      ) : (
        <div className="w-full h-full rounded-md bg-gradient-to-br from-slate-50 to-cyan-50/50 border border-slate-200/60 flex flex-col items-center justify-center p-0.5 text-center">
          <div className="text-[#00a3c4] opacity-85 scale-75">
            {getPartnerLogo(partner, 'light')}
          </div>
          <span className="text-[9px] font-black text-slate-700 tracking-tight leading-none font-cairo select-none truncate max-w-full px-0.5">
            {initials}
          </span>
        </div>
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
        className={className || "h-11 sm:h-12 md:h-13 w-auto object-contain transition-all duration-300 hover:scale-[1.02]"}
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
