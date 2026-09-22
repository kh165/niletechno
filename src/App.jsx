import React, { useState, useEffect, useMemo } from 'react';
import { 
  SERVICE_MODULES, 
  MOBILE_APPS, 
  BRANCHES_DATA, 
  SUCCESS_PARTNERS, 
  HOMEPAGE_SLIDER_PARTNERS,
  TRANSLATIONS 
} from './data';
import LeadCalculator from './components/LeadCalculator.jsx';
import EInvoiceDemo from './components/EInvoiceDemo.jsx';
import { motion, AnimatePresence } from 'motion/react';

// Import Company Logo Image
import companyLogo from '/logo.webp';
import logoTransparentWebp from './assets/images/nile_techno_logo_transparent.webp';
// Import E-Invoicing Section Images
import zatcaImage from './assets/images/modalLogo.webp';
import etaImage from './assets/images/699.webp';

// Import All Lucide Icons
import {
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
  HeartPulse,
  MapPin,
  Mail,
  Phone,
  Search,
  Menu,
  X,
  Globe,
  Sparkles,
  Play,
  CheckCircle2,
  Download,
  Eye,
  Send,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Calendar,
  MessageSquare,
  Award,
  Facebook,
  Youtube,
  Linkedin,
  Cloud,
  Monitor,
  Server,
  LayoutGrid,
  Columns
} from 'lucide-react';

// Icon Renderer Helper
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
  const SelectedIcon = icons[name] || HelpCircle;
  return <SelectedIcon className={className || "w-5 h-5"} />;
};

const HelpCircle = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Helper to render beautiful category-based customer logos (representing dynamic brands)
const getPartnerLogo = (partner, theme) => {
  switch (partner.category) {
    case 'ksa':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-emerald-500 fill-current opacity-90 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      );
    case 'import_export':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-500 fill-current opacity-90 transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 4.07C7.5 4.54 4.54 7.5 4.07 11H11V4.07ZM13 4.07V11H19.93C19.46 7.5 16.5 4.54 13 4.07ZM4.07 13C4.54 16.5 7.5 19.46 11 19.93V13H4.07ZM13 19.93C16.5 19.46 19.46 16.5 19.93 13H13V19.93Z" />
        </svg>
      );
    case 'hospitality':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-orange-500 fill-current opacity-90 transition-all duration-300 group-hover:scale-115">
          <path d="M8.1 14.14C9.28 15.32 10.14 16.82 10.63 18.5H13.37C13.86 16.82 14.72 15.32 15.9 14.14L19 11L14.76 6.76L11.5 10L10 8.5L13.26 5.24C13.68 4.82 14.32 4.82 14.74 5.24L18.76 9.26C19.18 9.68 19.18 10.32 18.76 10.74L15.9 13.6C14.53 14.97 13.56 16.63 13.06 18.5H10.94C10.44 16.63 9.47 14.97 8.1 13.6L5.24 10.74C4.82 10.32 4.82 9.68 5.24 9.26L9.26 5.24C9.68 4.82 10.32 4.82 10.74 5.24L7.5 8.5L6 10L2.74 6.76L7 11L8.1 14.14Z" />
        </svg>
      );
    case 'malls_houseware':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-amber-500 fill-current opacity-90 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
          <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z" />
        </svg>
      );
    case 'mills_feed':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-teal-600 fill-current opacity-90 transition-all duration-300 group-hover:scale-110">
          <path d="M12 3C11.45 3 11 3.45 11 4V11.23C10.63 11.08 10.22 11 9.8 11C8.25 11 7 12.25 7 13.8V21H17V13.8C17 12.25 15.75 11 14.2 11C13.78 11 13.37 11.08 13 11.23V4C13 3.45 12.55 3 12 3ZM9.8 13C10.24 13 10.6 13.36 10.6 13.8V19H8.6V13.8C8.6 13.36 8.96 13 9.8 13ZM14.2 13C15.04 13 15.4 13.36 15.4 13.8V19H13.4V13.8C13.4 13.36 13.76 13 14.2 13Z" />
        </svg>
      );
    case 'contracting':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#6366f1] fill-current opacity-90 transition-all duration-300 group-hover:scale-110">
          <path d="M12 3L2 12h3v8h5v-6h4v6h5v-8h3L12 3zm0 2.85l6 5.4V18h-2v-6H8v6H6v-6.75l6-5.4z" />
        </svg>
      );
    case 'jewelry':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-rose-500 fill-current opacity-90 transition-all duration-300 group-hover:scale-120">
          <path d="M12 2L2 9l10 13L22 9L12 2zm0 3.23L18.43 9H5.57L12 5.23zM12 18.25L6.15 11h11.7L12 18.25z" />
        </svg>
      );
    case 'agencies_wholesale':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-cyan-500 fill-current opacity-90 transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1">
          <path d="M20 8l-8-5-8 5v8l8 5 8-5V8zm-8 4.7L6.5 9.8l5.5-2.9 5.5 2.9-5.5 2.9z" />
        </svg>
      );
    case 'car_showrooms':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-slate-400 fill-current opacity-90 transition-all duration-300 group-hover:scale-110 group-hover:rotate-90">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4.54C16.12 4.54 19.46 7.88 19.46 12C19.46 16.12 16.12 19.46 12 19.46C7.88 19.46 4.54 16.12 4.54 12C4.54 7.88 7.88 4.54 12 4.54ZM12 8.5C10.07 8.5 8.5 10.07 8.5 12C8.5 13.93 10.07 15.5 12 15.5C13.93 15.5 15.5 13.93 15.5 12C15.5 10.07 13.93 8.5 12 8.5Z" />
        </svg>
      );
    case 'pharma':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-emerald-400 fill-current opacity-90 transition-all duration-300 group-hover:scale-110">
          <path d="M4.5 10.5C3.67 10.5 3 11.17 3 12C3 12.83 3.67 13.5 4.5 13.5H19.5C20.33 13.5 21 12.83 21 12C21 11.17 20.33 10.5 19.5 10.5H4.5ZM10.5 4.5V19.5C10.5 20.33 11.17 21 12 21C12.83 21 13.5 20.33 13.5 19.5V4.5C13.5 3.67 12.83 3 12 3C11.17 3 10.5 3.67 10.5 4.5Z" />
        </svg>
      );
    case 'herbs_spices':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-emerald-600 fill-current opacity-90 transition-all duration-300 group-hover:scale-110 group-hover:skew-x-3">
          <path d="M12 3C6.5 3 2 7.5 2 13C2 17.5 20 21 20 21C20 21 22 12 18 8C15 5 13.5 3.5 12 3ZM12 5.5C12.8 5.5 14 7 15.5 8.5C17 10 18.2 12.3 18.4 14.5C15 14 11.5 12.5 10 10.5C8.8 8.9 10.2 6.5 12 5.5Z" />
        </svg>
      );
    case 'factories':
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-violet-500 fill-current opacity-90 transition-all duration-500 group-hover:rotate-180">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-cyan-455 fill-current opacity-90">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
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
const NileTechnoLogo = ({ theme, lang }) => {
  return (
    <div className="flex items-center select-none hover:opacity-95 transition-opacity">
      <img
        src={companyLogo}
        alt="Nile Techno Logo"
        className="h-18 sm:h-22 md:h-24 lg:h-26 max-h-26 w-auto object-contain transition-transform duration-300 hover:scale-[1.05]"
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

// Beautiful Interactive ERP Dashboard Simulator and Graphic Console
function InteractiveConsole({ lang, theme }) {
  const [activeTab, setActiveTab] = useState('sales');
  const [salesData, setSalesData] = useState([45, 52, 49, 60, 55, 68, 74]);
  const [complianceActive, setComplianceActive] = useState(true);
  const [activeBranch, setActiveBranch] = useState('riyadh');
  const [salesAnim, setSalesAnim] = useState(false);

  // Smooth sales simulation incrementor
  const handleAddSale = () => {
    setSalesAnim(true);
    setSalesData(prev => {
      const nextData = [...prev.slice(1), Math.floor(Math.random() * 25) + 65];
      return nextData;
    });
    setTimeout(() => setSalesAnim(false), 500);
  };

  const branches = {
    cairo: { nameAr: 'فرع القاهرة والمخازن', nameEn: 'Cairo Branch & Stores', value: '4,821', pingsAr: 'مستمر', pingsEn: 'Online' },
    riyadh: { nameAr: 'فرع الرياض الرئيسي', nameEn: 'Riyadh Main HQ', value: '7,354', pingsAr: 'مستمر / هيئة الزكاة', pingsEn: 'ZATCA Linked' },
    jeddah: { nameAr: 'فرع جدة والمبيعات', nameEn: 'Jeddah Branch', value: '5,012', pingsAr: 'مستمر / مبيعات الكاشير', pingsEn: 'Cashier Live' },
    dammam: { nameAr: 'فرع الدمام اللوجستي', nameEn: 'Dammam Branch', value: '3,910', pingsAr: 'مستمر / المستودعات', pingsEn: 'Sync Ready' }
  };

  return (
    <section className={`py-14 relative overflow-hidden text-right border-b ${
      theme === 'light' ? 'bg-slate-50/55 border-slate-200' : 'bg-[#060b17] border-slate-900'
    }`} id="interactive-console">
      <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className={`inline-block px-3.5 py-1 rounded-full text-[10px] font-bold mb-3 uppercase tracking-wider font-cairo ${
            theme === 'light' ? 'bg-cyan-50 text-cyan-700' : 'bg-cyan-950/80 text-cyan-400'
          }`}>
            {lang === 'ar' ? 'لوحة المحاكاة والتحكم التفاعلية لايف' : 'Live Interactive Software Experience'}
          </span>
          <h2 className={`text-2.5xl sm:text-3.5xl font-extrabold font-cairo mb-3 leading-tight ${
            theme === 'light' ? 'text-slate-950' : 'text-white'
          }`}>
            {lang === 'ar' ? 'تحكم باللوحة التفاعلية واكتشف قوة النظام' : 'Take Control & Test Nile Techno Capabilities'}
          </h2>
          <p className={`text-xs sm:text-sm font-cairo max-w-2xl mx-auto ${
            theme === 'light' ? 'text-slate-605' : 'text-slate-400'
          }`}>
            {lang === 'ar' 
              ? 'تفاعل مع أزرار لوحة القيادة أدناه لتكتشف في ثوانٍ كيف تقوم برمجياتنا بربط مبيعات الفروع والمستودعات والتحقق الضريبي التلقائي بمرونة لا تضاهى.' 
              : 'Interact with our console switcher below to experience real-time transactions, automated legal regulatory verification, and live fleet syncing.'}
          </p>
        </div>

        {/* Elegant glassmorphic console frame */}
        <div className={`max-w-4xl mx-auto rounded-2xl border overflow-hidden shadow-2xl transition-all duration-300 ${
          theme === 'light' ? 'bg-white border-slate-200/80 shadow-cyan-100/20' : 'bg-[#0b1329]/80 border-slate-800'
        }`}>
          {/* Header bar */}
          <div className={`px-4 py-3 border-b flex justify-between items-center ${
            theme === 'light' ? 'bg-slate-100/50 border-slate-205' : 'bg-[#090f23] border-slate-800/85'
          }`}>
            {/* Window control dots */}
            <div className="flex gap-1.5 order-2 sm:order-1">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            </div>
            
            {/* System Status badge */}
            <div className="flex items-center gap-2 order-1 sm:order-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">
                {lang === 'ar' ? 'سحابي متكامل نشط v14.2' : 'Cloud ERP Console v14.2'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
            {/* Left sidebar console tabs controls */}
            <div className={`md:col-span-3 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible border-b md:border-b-0 md:border-l ${
              theme === 'light' ? 'bg-slate-50/75 border-slate-200/80' : 'bg-[#070d1e]/80 border-slate-800/80'
            }`}>
              <button
                type="button"
                onClick={() => setActiveTab('sales')}
                className={`w-full text-right px-4 py-3.5 rounded-xl transition-all flex items-center justify-between gap-3 text-xs font-bold font-cairo cursor-pointer shrink-0 ${
                  activeTab === 'sales'
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                    : (theme === 'light' ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:bg-slate-800/40')
                }`}
              >
                <span>📈 {lang === 'ar' ? 'نمو المبيعات لايف' : 'Sales Visualizer'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('branches')}
                className={`w-full text-right px-4 py-3.5 rounded-xl transition-all flex items-center justify-between gap-3 text-xs font-bold font-cairo cursor-pointer shrink-0 ${
                  activeTab === 'branches'
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                    : (theme === 'light' ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:bg-slate-800/40')
                }`}
              >
                <span>🌐 {lang === 'ar' ? 'شبكة الفروع والمزامنة' : 'Branch Hub Net'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('compliance')}
                className={`w-full text-right px-4 py-3.5 rounded-xl transition-all flex items-center justify-between gap-3 text-xs font-bold font-cairo cursor-pointer shrink-0 ${
                  activeTab === 'compliance'
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                    : (theme === 'light' ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:bg-slate-800/40')
                }`}
              >
                <span>🔒 {lang === 'ar' ? 'الفحص والتحقق الضريبي' : 'ZATCA Compliance'}</span>
              </button>
            </div>

            {/* Right main simulator viewport */}
            <div className="md:col-span-9 p-6 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                
                {/* 1. SALES ANALYTICS TAB */}
                {activeTab === 'sales' && (
                  <motion.div
                    key="sales"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex-1 flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className={`text-sm font-bold font-cairo ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                          {lang === 'ar' ? 'الرسم البياني لحجم المبيعات الفورية' : 'Dynamic Sales Dashboard Metrics'}
                        </h4>
                        <button
                          type="button"
                          onClick={handleAddSale}
                          className="px-3.5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-[11px] font-bold rounded-xl font-cairo cursor-pointer flex items-center gap-1.5 shadow-md shadow-emerald-500/10 active:scale-95 transition-all outline-none"
                        >
                          <Sparkles className="w-3.5 h-3.5 animate-spin" />
                          <span>{lang === 'ar' ? 'أضف حركة بيع (لايف)' : 'Post Sale Transaction'}</span>
                        </button>
                      </div>
                      
                      <p className={`text-[11px] font-cairo mb-6 leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                        {lang === 'ar' 
                          ? 'يقوم نظام نايل تكنو السحابي بتوليد الإحصائيات الفورية وتحديث مؤشر نمو الأرباح تلقائياً فور إصدار أي كاشير في أي منفذ لفاتورة مبسطة.'
                          : 'Our system automatically plots operational metrics that help corporate boards run predictive inventory care without delay.'}
                      </p>
                    </div>

                    {/* Responsive customized SVG chart representing sales */}
                    <div className="h-40 w-full relative flex items-end justify-between px-4 pb-2 border-b border-l border-slate-250 dark:border-slate-800">
                      {/* Grid background lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                        <div className="border-t border-slate-400 w-full"></div>
                        <div className="border-t border-slate-400 w-full"></div>
                        <div className="border-t border-slate-400 w-full"></div>
                        <div className="border-t border-slate-400 h-0 w-full"></div>
                      </div>

                      {/* Animated SVG Path Line Chart */}
                      <svg className="absolute inset-x-0 bottom-2 h-32 w-full overflow-visible" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Dynamic Path compilation based on state */}
                        <path
                          d={`M ${salesData.map((val, idx) => `${(idx / (salesData.length - 1)) * 100}%,${100 - (val / 100) * 100}`).join(' L ')}`}
                          fill="none"
                          stroke="#22d3ee"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          className="transition-all duration-500 ease-out"
                          style={{
                            vectorEffect: 'non-scaling-stroke'
                          }}
                        />
                        {/* Shaded Area under path */}
                        <path
                          d={`M 0,100 L ${salesData.map((val, idx) => `${(idx / (salesData.length - 1)) * 100}%,${100 - (val / 100) * 100}`).join(' L ')} L 100,100 Z`}
                          fill="url(#chartGrad)"
                          className="transition-all duration-500 ease-out"
                        />
                      </svg>

                      {/* Display individual pulsing bar columns */}
                      {salesData.map((val, idx) => (
                        <div key={idx} className="flex flex-col items-center z-10 w-8 group">
                          {/* Value tooltip */}
                          <div className={`transition-all duration-200 transform -translate-y-1 mb-1 opacity-0 group-hover:opacity-100 bg-cyan-500 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow absolute top-5 scale-90`}>
                            {val}K
                          </div>
                          
                          {/* Mini visual column */}
                          <div 
                            style={{ height: `${val}%` }} 
                            className={`w-2 rounded-t bg-cyan-400/20 group-hover:bg-cyan-500/60 transition-all duration-300 ease-out relative overflow-hidden ${
                              salesAnim && idx === salesData.length - 1 ? 'animate-bounce' : ''
                            }`}
                          >
                            <div className="absolute top-0 bottom-0 left-0 right-0 bg-cyan-400 animate-pulse"></div>
                          </div>
                          
                          {/* Label bottom */}
                          <span className={`text-[8px] font-mono mt-1 font-bold ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                            {idx + 1}0:00
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Quick values summary */}
                    <div className={`flex gap-4 items-center justify-start mt-4 p-3.5 rounded-xl border transition-all duration-300 ${
                      theme === 'light'
                        ? 'bg-cyan-500/5 border-cyan-500/10' 
                        : 'bg-cyan-950/20 border-cyan-850/30'
                    }`}>
                      <span className={`text-xs font-bold font-cairo ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                        {lang === 'ar' ? 'ملخص مبيعات اليوم :' : 'Daily Sales Revenue :'}
                      </span>
                      <span className={`text-xs font-black font-mono animate-pulse ${theme === 'light' ? 'text-cyan-700' : 'text-cyan-400'}`}>
                        {salesData.reduce((a, b) => a + b, 0).toLocaleString()} KSA
                      </span>
                      <span className={`text-[10px] font-bold font-cairo px-2.5 py-0.5 rounded-full ${
                        theme === 'light'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/20'
                      }`}>
                        {lang === 'ar' ? 'ارتفاع مستمر ↑' : '+14.2% growth ↑'}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* 2. BRANCH SYNC VIEW */}
                {activeTab === 'branches' && (
                  <motion.div
                    key="branches"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex-1 flex flex-col justify-between h-full"
                  >
                    <div>
                      <h4 className={`text-sm font-bold font-cairo mb-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        {lang === 'ar' ? 'شبكة الفروع المترابطة سحابياً' : 'Integrated Cross-Border Sync Engine'}
                      </h4>
                      <p className={`text-[11px] font-cairo mb-4 leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                        {lang === 'ar' 
                          ? 'بنقرة واحدة، تترابط جميع كاشيرات وفروع مصر والمملكة لحظياً على قواعد بيانات مركزية فائقة السرعة مع حماية تامة ضد انقطاع الشبكة.'
                          : 'Our hybrid architecture stores backup buffers locally, pushing bulk sets to Central Cloud once internet connects.'}
                      </p>
                    </div>

                    {/* Interactive Graphic: Linked Branches Network */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      {/* Graphics Area */}
                      <div className="sm:col-span-7 h-44 relative bg-cyan-950/10 dark:bg-slate-950/40 border border-cyan-500/15 rounded-xl overflow-hidden flex items-center justify-center p-4">
                        {/* Connection beams layout */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <svg className="w-full h-full" viewBox="0 0 200 120">
                            <line x1="40" y1="30" x2="160" y2="40" stroke="#0891b2" strokeWidth="1" strokeDasharray="3,3" className="animate-pulse" />
                            <line x1="40" y1="30" x2="60" y2="90" stroke="#0891b2" strokeWidth="1" strokeDasharray="3,3" />
                            <line x1="160" y1="40" x2="60" y2="90" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="4,4" />
                            <line x1="160" y1="40" x2="140" y2="95" stroke="#0891b2" strokeWidth="1" strokeDasharray="4,4" />
                            {/* Sync packets animating */}
                            <circle r="2.5" fill="#22d3ee" className="animate-bounce">
                              <animateMotion path="M 40,30 Q 100,20 160,40" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle r="2.5" fill="#38bdf8" className="animate-ping">
                              <animateMotion path="M 160,40 Q 110,65 60,90" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                          </svg>
                        </div>

                        {/* Cairo Node */}
                        <button
                          type="button"
                          onClick={() => setActiveBranch('cairo')}
                          className={`absolute top-4 left-6 p-2 rounded-lg border flex flex-col items-center transition-all cursor-pointer ${
                            activeBranch === 'cairo' 
                              ? 'bg-cyan-500 text-white border-cyan-400 shadow-md scale-105' 
                              : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-[9px] font-black font-cairo leading-none">القاهرة</span>
                        </button>

                        {/* Riyadh Node */}
                        <button
                          type="button"
                          onClick={() => setActiveBranch('riyadh')}
                          className={`absolute top-6 right-8 p-2 rounded-lg border flex flex-col items-center transition-all cursor-pointer ${
                            activeBranch === 'riyadh' 
                              ? 'bg-cyan-500 text-white border-cyan-400 shadow-md scale-105' 
                              : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-[9px] font-black font-cairo leading-none">الرياض</span>
                        </button>

                        {/* Jeddah Node */}
                        <button
                          type="button"
                          onClick={() => setActiveBranch('jeddah')}
                          className={`absolute bottom-6 left-12 p-2 rounded-lg border flex flex-col items-center transition-all cursor-pointer ${
                            activeBranch === 'jeddah' 
                              ? 'bg-cyan-500 text-white border-cyan-400 shadow-md scale-105' 
                              : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-[9px] font-black font-cairo leading-none">جدة</span>
                        </button>

                        {/* Dammam Node */}
                        <button
                          type="button"
                          onClick={() => setActiveBranch('dammam')}
                          className={`absolute bottom-4 right-14 p-2 rounded-lg border flex flex-col items-center transition-all cursor-pointer ${
                            activeBranch === 'dammam' 
                              ? 'bg-cyan-500 text-white border-cyan-400 shadow-md scale-105' 
                              : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-[9px] font-black font-cairo leading-none">الدمام</span>
                        </button>
                      </div>

                      {/* Stats Area */}
                      <div className="sm:col-span-5 space-y-2">
                        <div className={`p-3 rounded-xl border ${
                          theme === 'light' ? 'bg-slate-100/60 border-slate-200' : 'bg-slate-900/50 border-slate-800'
                        }`}>
                          <span className="text-[9px] text-slate-500 block uppercase font-mono tracking-wider">
                            {lang === 'ar' ? 'الفرع المفتوح حالياً' : 'Current Active branch'}
                          </span>
                          <span className={`text-xs font-black font-cairo block mt-0.5 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                            {lang === 'ar' ? branches[activeBranch].nameAr : branches[activeBranch].nameEn}
                          </span>
                        </div>

                        <div className={`p-3 rounded-xl border ${
                          theme === 'light' ? 'bg-slate-100/60 border-slate-200' : 'bg-slate-900/50 border-slate-800'
                        }`}>
                          <span className="text-[9px] text-slate-500 block uppercase font-mono tracking-wider">
                            {lang === 'ar' ? 'فواتير اليوم المسجلة' : 'Registered Invoices Today'}
                          </span>
                          <span className="text-sm font-black font-mono text-cyan-400 block mt-0.5">
                            {branches[activeBranch].value}
                          </span>
                        </div>

                        <div className={`p-3 rounded-xl border ${
                          theme === 'light' ? 'bg-slate-100/60 border-slate-200' : 'bg-slate-900/50 border-slate-800'
                        }`}>
                          <span className="text-[9px] text-slate-500 block uppercase font-mono tracking-wider">
                            {lang === 'ar' ? 'حالة المناهزة والمطابقة' : 'Cloud Sync Link status'}
                          </span>
                          <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            {lang === 'ar' ? branches[activeBranch].pingsAr : branches[activeBranch].pingsEn}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. COMPLIANCE & ZATCA TAX TAB */}
                {activeTab === 'compliance' && (
                  <motion.div
                    key="compliance"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex-1 flex flex-col justify-between h-full"
                  >
                    <div>
                      <h4 className={`text-sm font-bold font-cairo mb-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        {lang === 'ar' ? 'التحقق والمطابقة مع الفاتورة الإلكترونية والـ XML' : 'Regulatory Check & XML Hashing'}
                      </h4>
                      <p className={`text-[11px] font-cairo mb-5 leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                        {lang === 'ar' 
                          ? 'يقوم النظام السحابي بتوليد الـ Hash والتوقيع الرقمي للأمن السيبراني تمهيداً لرفع الفواتير فورا وإقرارها ضريبيا بنجاح.'
                          : 'We guarantee zero audit warnings on VAT submission cycles by cross-compiling structures live at checkout.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                      {/* Interactive toggle card */}
                      <div className={`sm:col-span-6 p-4 rounded-xl border flex flex-col justify-between gap-3.5 ${
                        theme === 'light' ? 'bg-slate-100/50 border-slate-200' : 'bg-slate-900/40 border-slate-800'
                      }`}>
                        <div className="flex justify-between items-center">
                          <span className={`text-xs font-bold font-cairo ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                            {lang === 'ar' ? 'التوقيع والوسم الرقمي (XML)' : 'Cryptographic check'}
                          </span>
                          <button
                            type="button"
                            onClick={() => setComplianceActive(!complianceActive)}
                            className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${
                              complianceActive ? 'bg-cyan-500' : 'bg-slate-700'
                            }`}
                          >
                            <span className={`w-4 h-4 bg-white rounded-full absolute top-[3px] transition-all ${
                              complianceActive ? 'left-[18px]' : 'left-[3px]'
                            }`}></span>
                          </button>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-500 font-cairo">{lang === 'ar' ? 'بصمة الـ UUID الفاتورة الكترونية' : 'Invoice UUID Match'}</span>
                            <span className="text-emerald-500 font-mono font-bold">PASS ✔</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-500 font-cairo">{lang === 'ar' ? 'التحويل الآلي لمصلحة الضرائب' : 'ZATCA Gateway Stream'}</span>
                            <span className="text-emerald-500 font-mono font-bold">SECURE ✔</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-500 font-cairo">{lang === 'ar' ? 'تشفير الـ Cryptographic Stamp' : 'Structural Encryption'}</span>
                            <span className={complianceActive ? "text-emerald-500 font-mono font-bold animate-pulse" : "text-amber-500 font-mono font-bold"}>
                              {complianceActive ? "ENCRYPTED ✔" : "NO STAMP ⚠"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Visual QR Verification card block */}
                      <div className="sm:col-span-6 flex items-center justify-center">
                        <div className={`p-4 rounded-xl border relative overflow-hidden flex items-center gap-3 w-full max-w-[280px] transition-all ${
                          theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
                        }`}>
                          {/* Laser light bar overlay when active */}
                          {complianceActive && (
                            <div className="absolute inset-x-0 h-0.5 bg-cyan-400 top-0 animate-bounce"></div>
                          )}

                          {/* Quick simulated QR graphic canvas */}
                          <div className="w-12 h-12 bg-slate-950 border border-slate-830 rounded flex items-center justify-center p-1 shrink-0 relative">
                            <div className="grid grid-cols-4 gap-[2px] w-full h-full opacity-95">
                              {[...Array(16)].map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`rounded-[1px] ${
                                    (i % 3 === 0 || i % 5 === 1) && complianceActive ? 'bg-cyan-400' : 'bg-slate-700'
                                  }`}
                                ></div>
                              ))}
                            </div>
                            {complianceActive && (
                              <div className="absolute inset-0 bg-cyan-500/10 flex items-center justify-center">
                                <span className="text-[10px] text-cyan-400 font-black animate-pulse">✓</span>
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <span className="text-[9px] text-slate-500 block uppercase font-mono tracking-wider">
                              {lang === 'ar' ? 'الاعتماد والمطابقة والـ Hash' : 'Regulatory Quality Seal'}
                            </span>
                            <span className={`text-[11px] font-black font-cairo block leading-none mt-1 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                              {lang === 'ar' ? 'فواتير مطابقة كلياً دافع' : 'Nile Techno Certified'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 2. Hero Header Section Component
function HeroSection({ 
  lang, 
  theme, 
  t, 
  handleOpenVideo,
  activePlatformIndex,
  setActivePlatformIndex,
  isHoveredPlatforms,
  setIsHoveredPlatforms
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 35, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="home" className={`relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden transition-all duration-500 ${
      theme === 'light'
        ? 'bg-gradient-to-b from-cyan-50/30 via-slate-50 to-white text-slate-800 light-hero-grid'
        : 'bg-gradient-to-b from-[#030712] via-[#040d24] to-[#02050c] text-white dark-hero-grid'
    }`}>
      {/* High-tech Blueprint Tech Grid & Glowing Matrix Graphics */}
      <div className={`absolute inset-0 pointer-events-none ${
        theme === 'light'
          ? 'bg-[linear-gradient(to_right,#0891b208_1px,transparent_1px),linear-gradient(to_bottom,#0891b208_1px,transparent_1px)] bg-[size:40px_40px] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-550/10 via-transparent to-transparent opacity-80'
          : 'bg-[radial-gradient(#111827_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-45'
      }`}></div>

      {/* Cyber Grid Lines overlay for that detailed architectural blueprint aesthetic */}
      {theme === 'light' ? (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(8,145,178,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(8,145,178,0.05)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"></div>
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.04)_1px,transparent_1px)] bg-[size:56px_56px] pointer-events-none"></div>
      )}

      {/* Ambient glass orbs and decorations in Light Mode for rich visual active effects */}
      {theme === 'light' && (
        <>
          <div className="light-orb-1"></div>
          <div className="light-orb-2"></div>
          <div className="light-orb-3"></div>
          {/* Tech Graphic Elements */}
          <div className="light-tech-shape shape-1"></div>
          <div className="light-tech-shape shape-2"></div>
        </>
      )}
      
      {/* Decorative vector meshes with floating keyframe class with beautiful bright accents - optimized for mobile performance by rendering only on desktop */}
      <div className="hidden md:block absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/10 to-blue-500/5 rounded-full blur-[140px] pointer-events-none animate-glow-pulse"></div>
      <div className="hidden md:block absolute bottom-1/4 left-1/4 w-[420px] h-[420px] bg-gradient-to-br from-indigo-500/5 to-cyan-550/5 rounded-full blur-[140px] pointer-events-none animate-float-slow" style={{ animationDelay: '2s' }}></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        
        {/* Modern high-tech graphic panel around main headlines */}
        <div className={`relative max-w-5xl mx-auto p-6 sm:p-10 md:p-14 rounded-[2.5rem] border backdrop-blur-md overflow-hidden transition-all duration-500 mb-16 ${
          theme === 'light'
            ? 'bg-gradient-to-br from-cyan-50 via-sky-100 to-indigo-100 border-cyan-300/80 shadow-2xl shadow-cyan-200/50'
            : 'bg-gradient-to-br from-[#040817]/99 via-[#030713]/95 to-[#02050e]/99 border-cyan-500/20 shadow-2xl shadow-cyan-950/40'
        }`}>
          {/* Scientific blueprint grids solely for coordinates framing */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.25] [background-size:16px_16px] bg-[radial-gradient(#22d3ee_1px,transparent_1px)]"></div>

          {/* Futuristic corner widgets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/60 rounded-tl-2xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/60 rounded-tr-2xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/60 rounded-bl-2xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/60 rounded-br-2xl animate-pulse"></div>

          {/* Electronic micro circuits visual graphic lines */}
          <div className="absolute top-4 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
          <div className="absolute bottom-4 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>

          {/* Circular radial graphics orbs inside the text compartment - optimized for mobile performance */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-cyan-400/25 to-blue-500/15 rounded-full blur-[75px] pointer-events-none animate-pulse"></div>

          <div className="relative z-10">
            {/* Dynamic Sparkles Floating Badge */}
            <motion.div 
              variants={itemVariants}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold mb-8 font-cairo shadow-lg hover:scale-[1.02] transition-all duration-300 ${
                theme === 'light'
                  ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-750 shadow-cyan-500/5'
                  : 'bg-cyan-500/15 border border-cyan-500/35 text-cyan-400 shadow-cyan-950/20'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 animate-bounce ${theme === 'light' ? 'text-cyan-600' : 'text-cyan-400'}`} />
              <span className={theme === 'light' ? 'text-cyan-805' : 'text-cyan-300'}>{lang === 'ar' ? 'التحول الرقمي الموثوق للشركات والمصانع والمنشآت الضريبية 🇸🇦 🇪🇬' : 'Complete Digital Transformation & Tax Compliance'}</span>
            </motion.div>

            {/* Clean, high-contrast, perfectly visible headlines in dark/light mode */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight font-cairo"
            >
              <span className={theme === 'light' ? 'text-slate-950' : 'text-white'}>
                {lang === 'ar' ? 'دعنا ندير أعمالك' : 'Let Us Manage Your business'}
              </span>
              <span className={`block mt-3 font-black ${
                theme === 'light' 
                  ? 'text-cyan-600 drop-shadow-[0_1px_2px_rgba(8,145,178,0.1)]' 
                  : 'text-cyan-400 drop-shadow-[0_2px_10px_rgba(34,211,238,0.15)] bg-gradient-to-r from-cyan-400 via-sky-305 to-cyan-400 bg-clip-text text-transparent'
              }`}>
                {lang === 'ar' ? 'نايل تكنو للبرمجيات' : 'Nile Techno Systems'}
              </span>
            </motion.h1>

            {/* Dynamic automatic subtitle rotator directly underneath H1 */}
            <motion.div variants={itemVariants} className="mb-8">
              <SubtitleRotator lang={lang} theme={theme} />
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className={`max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed font-cairo text-center font-medium drop-shadow-sm ${
                theme === 'light' ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {lang === 'ar' 
                ? 'مجموعة متكاملة من البرمجيات المالية وحلول الـ ERP المتكاملة، نقاط البيع، المستودعات، وتطبيقات الهاتف الذكي لتهيئة نشاطك لأساليب الإدارة الحديثة والربط الإلكتروني المباشر.'
                : 'A unified ecosystem of financials, supply-chain, point-of-sale ERP modules, and dedicated hybrid tablet apps engineered to scale commercial ventures smoothly.'}
            </motion.p>
          </div>
        </div>

        {/* Three Channels Platforms Carousel Slider - Expanded to full widescreen layout as requested */}
        <div 
          onMouseEnter={() => setIsHoveredPlatforms(true)}
          onMouseLeave={() => setIsHoveredPlatforms(false)}
          className="max-w-full px-4 sm:px-8 lg:px-16 mx-auto mb-6 text-right font-cairo"
        >
          {/* Tabs Navigation Selector */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
            {[
              { id: 0, titleAr: 'برنامج المحاسبة السحابي ⚡', titleEn: 'Cloud ERP Portal ⚡', activeColor: 'border-cyan-500 text-cyan-500 bg-cyan-500/5' },
              { id: 1, titleAr: 'أنظمة الديسكتوب والشبكات 💻', titleEn: 'Desktop Solutions 💻', activeColor: 'border-blue-500 text-blue-500 bg-blue-500/5' },
              { id: 2, titleAr: 'تطبيق مبيعات المناديب 📱', titleEn: 'Sales Representative App 📱', activeColor: 'border-emerald-500 text-emerald-500 bg-emerald-500/5' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePlatformIndex(tab.id)}
                className={`px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  activePlatformIndex === tab.id
                    ? tab.activeColor
                    : theme === 'light'
                      ? 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      : 'border-slate-800 bg-[#060b18]/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {/* Micro timing progress bar overlay on tabs */}
                <div className="relative flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    activePlatformIndex === tab.id ? 'bg-current animate-ping' : 'bg-slate-400/50'
                  }`}></span>
                  <span>{lang === 'ar' ? tab.titleAr : tab.titleEn}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Core Widescreen Display Container with beautiful animations */}
          <div className="relative overflow-hidden min-h-[300px] md:min-h-[250px]">
            {/* Slide 1: Cloud */}
            {activePlatformIndex === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-10 rounded-3xl border relative overflow-hidden items-center ${
                  theme === 'light'
                    ? 'bg-gradient-to-br from-white via-slate-50/80 to-cyan-50/20 border-slate-200/80 shadow-2xl shadow-cyan-100/35'
                    : 'bg-slate-950/80 backdrop-blur-md border-cyan-950/60 shadow-2xl shadow-cyan-950/30'
                }`}
              >
                {/* Accent highlights */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-cyan-400/5 rounded-full blur-3xl"></div>

                {/* Left/Right standard swapping layouts for Arab/Eng */}
                <div className="lg:col-span-7 space-y-4">
                  <span className={`inline-flex px-3 py-1 rounded-md text-xs font-black tracking-wider uppercase ${
                    theme === 'light' ? 'bg-cyan-50 text-cyan-600' : 'bg-cyan-950/80 text-cyan-400'
                  }`}>
                    {lang === 'ar' ? 'سحابي بالكامل (كلاود)' : '100% Cloud ERP'}
                  </span>
                  
                  <h3 className={`text-xl sm:text-2xl font-extrabold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    {lang === 'ar' ? 'برنامج المحاسبة السحابي المتكامل' : 'Nile Techno Integrated Cloud ERP'}
                  </h3>

                  <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    {lang === 'ar'
                      ? 'أدر أعمالك التجارية، مبيعاتك، مخازنك، وفواتيرك الإلكترونية المتوافقة مع متمتطلبات هيئة الزكاة والضريبة والجمارك وهيئة الضرائب المصرية مباشرةً عبر الويب. لا يحتاج لتثبيت، آمن تماماً، ويسهل الوصول إليه عبر الجوال أو المتصفح من أي مكان بالعالم.'
                      : 'Manage your commercial enterprise, sales, stores, and compliant e-invoicing instantly from any device. Secure server encryption, automatic daily backups, and unified APIs for ultimate multi-screen mobility.'}
                  </p>

                  <div className="pt-4">
                    <a 
                      href="https://www.niletechnoerp.com/#/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-cyan-500/20 cursor-pointer transform active:scale-95"
                    >
                      <span>{lang === 'ar' ? 'الدخول للخدمة السحابية ⚡' : 'Sign in to Cloud Portal ⚡'}</span>
                      <Cloud className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  {/* Micro Terminal Sync Visual Grid */}
                  <div className={`p-5 rounded-2xl border text-left font-mono text-[10px] ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#040813] border-cyan-950/45 text-cyan-300'
                  }`}>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-cyan-500/10">
                      <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        Nile Node #4 (Active)
                      </span>
                      <span className="text-[10px] opacity-75">v5.8.1-REST</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>API Connection:</span>
                        <span className="text-emerald-500 font-extrabold">200 OK</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SSL & Crypt:</span>
                        <span className="text-blue-400">TLS 1.3 Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span>E-Invoice JSON Payload:</span>
                        <span className="text-emerald-500">{"{ compliant: true }"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ZATCA Phase 2 Tunnel:</span>
                        <span className="text-emerald-500 font-bold">READY</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Sync Users:</span>
                        <span className="text-yellow-500">744 Current</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Slide 2: Desktop */}
            {activePlatformIndex === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-10 rounded-3xl border relative overflow-hidden items-center ${
                  theme === 'light'
                    ? 'bg-gradient-to-br from-white via-slate-50/80 to-cyan-50/20 border-slate-200/80 shadow-2xl shadow-cyan-100/35'
                    : 'bg-slate-950/80 backdrop-blur-md border-blue-950/60 shadow-2xl shadow-blue-950/30'
                }`}
              >
                {/* Accent highlights */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-blue-500/5 rounded-full blur-3xl"></div>

                <div className="lg:col-span-7 space-y-4">
                  <span className={`inline-flex px-3 py-1 rounded-md text-xs font-black tracking-wider uppercase ${
                    theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-blue-950/80 text-blue-400'
                  }`}>
                    {lang === 'ar' ? 'ديسكتوب وشبكات محلي' : 'Desktop & Local Networks'}
                  </span>
                  
                  <h3 className={`text-xl sm:text-2xl font-extrabold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    {lang === 'ar' ? 'أنظمة المحاسبة والمخازن لسطح المكتب' : 'High-Stability Desktop ERP Systems'}
                  </h3>

                  <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    {lang === 'ar'
                      ? 'الحل البرمجي المثالي للمصانع الكبرى، الورش والحلول التي تتطلب استقراراً فائقاً دون الحاجة للاتصال بالإنترنت. يدعم الشبكات الداخلية المترابطة، أنظمة الكاشير السريعة، نقاط البيع اللامحدودة بمثالية أمنية تامة وقواعد بيانات محلية مشفرة بالكامل.'
                      : 'Robust, battle-tested administrative software built to run on local servers offline. High database durability utilizing local networks, custom modules for large warehouses, manufacturing formulas, and fast POS checkouts.'}
                  </p>

                  <div className="pt-4">
                    <a 
                      href="#services"
                      className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border font-extrabold text-xs sm:text-sm transition-all shadow-sm cursor-pointer ${
                        theme === 'light'
                          ? 'bg-slate-100 hover:bg-slate-150 border-slate-200 text-slate-800'
                          : 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800'
                      }`}
                    >
                      <span>{lang === 'ar' ? 'تصفح البرمجيات والأنظمة 💻' : 'Browse Desktop solutions 💻'}</span>
                      <Monitor className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  {/* Micro LAN network topology dashboard */}
                  <div className={`p-5 rounded-2xl border text-left font-mono text-[10px] ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#040813] border-blue-950/45 text-blue-300'
                  }`}>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-blue-500/10">
                      <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        LAN Host (Offline Mode)
                      </span>
                      <span className="text-[10px] opacity-75">TCP/IP Protocol</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Database Status:</span>
                        <span className="text-emerald-500 font-extrabold">Autonomous Online</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Terminals Connected:</span>
                        <span className="text-cyan-400">5 Cashier Terminals</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sync with Backup Server:</span>
                        <span className="text-emerald-500 font-bold">Auto Backup Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ZATCA Offline Signing:</span>
                        <span className="text-yellow-550">COMPLIANT Crypt v2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Response Time/Query:</span>
                        <span className="text-blue-400">{"< 1ms Response"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Slide 3: Mobile */}
            {activePlatformIndex === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-10 rounded-3xl border relative overflow-hidden items-center ${
                  theme === 'light'
                    ? 'bg-gradient-to-br from-white via-slate-50/80 to-cyan-50/20 border-slate-200/80 shadow-2xl shadow-cyan-100/35'
                    : 'bg-slate-950/80 backdrop-blur-md border-emerald-950/60 shadow-2xl shadow-emerald-950/30'
                }`}
              >
                {/* Accent highlights */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-emerald-500/5 rounded-full blur-3xl"></div>

                <div className="lg:col-span-7 space-y-4">
                  <span className={`inline-flex px-3 py-1 rounded-md text-xs font-black tracking-wider uppercase ${
                    theme === 'light' ? 'bg-emerald-50 text-emerald-750' : 'bg-emerald-950/80 text-emerald-400'
                  }`}>
                    {lang === 'ar' ? 'تطبيق المبيعات للمناديب' : 'Mobile Sales Platform'}
                  </span>
                  
                  <h3 className={`text-xl sm:text-2xl font-extrabold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    {lang === 'ar' ? 'تطبيق مندوب المبيعات المتكامل للاندرويد' : 'Mobile Representative Android & GPS App'}
                  </h3>

                  <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    {lang === 'ar'
                      ? 'تطبيق التابلت والاندرويد المتطور المصمم خصيصاً لمندوبي المبيعات والتوزيع الميداني. يدعم إصدار الفواتير وطباعتها لحظياً عبر طابعات البلوتوث وتتبع مسار المندوب بالـ GPS ومزامنة المبيعات والمخزون مع السيرفر الرئيسي لحظة بلحظة.'
                      : 'Robust Field Sales mobile client. Instantly issue sales, invoices, handle routes, and print physical thermal receipts on the move via Bluetooth pocket printers, automatically synced back with your central ERP server.'}
                  </p>

                  <div className="pt-4">
                    <a 
                      href="https://play.google.com/store/apps/details?id=com.niletechno.salesperson_app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 cursor-pointer transform active:scale-95"
                    >
                      <span>{lang === 'ar' ? 'تحميل تطبيق الاندرويد 📱' : 'Download Sales Android App 📱'}</span>
                      <Smartphone className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  {/* Micro GPS/Rep tracking dashboard */}
                  <div className={`p-5 rounded-2xl border text-left font-mono text-[10px] ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#040813] border-emerald-950/45 text-emerald-350'
                  }`}>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-emerald-500/10">
                      <span className="text-xs font-bold text-emerald-450 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-550 animate-pulse"></span>
                        POS Representative App (Android)
                      </span>
                      <span className="text-[10px] opacity-75">GPS & Bluetooth Up</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span>Assigned Route Area:</span>
                        <span className={`truncate max-w-[150px] font-black ${
                          theme === 'light' ? 'text-[#0a192f] text-[13px]' : 'text-slate-200'
                        }`}>{lang === 'ar' ? 'المنطقة الوسطى - الرياض' : 'Central Area - Riyadh'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Device Sync:</span>
                        <span className={`font-bold ${theme === 'light' ? 'text-cyan-800' : 'text-cyan-400'}`}>Auto Synchronized</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Thermal Printer:</span>
                        <span className={`font-bold ${theme === 'light' ? 'text-amber-800' : 'text-yellow-400'}`}>M-PRT 80mm ON</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>ZATCA QR-CodeGen:</span>
                        <span className={`font-bold ${theme === 'light' ? 'text-emerald-700' : 'text-emerald-400'}`}>Instant TLV Base64</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Offline Database:</span>
                        <span className={`font-bold ${theme === 'light' ? 'text-indigo-900' : 'text-emerald-550'}`}>SQLite Embedded</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Quick Metrics Labels Grid (Highly designed margins) */}
        <motion.div 
          variants={itemVariants}
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-4 pt-4 border-t ${
            theme === 'light' ? 'border-slate-100' : 'border-slate-800/60'
          }`}
        >
          {[
            { val: '2010', labelAr: 'بداية التأسيس والابتكار الأصيل', labelEn: 'Inception date' },
            { val: '+10,000', labelAr: 'مستثمر وتاجر يثقون في نايل تكنو', labelEn: 'Active deployment runs' },
            { val: '12+', labelAr: 'أنظمة محاسبية ذكية متكاملة ببعضها', labelEn: 'Stand-alone modules' },
            { val: '24/7', labelAr: 'دعم فني هندسي متواصل لحل الأعطال', labelEn: 'Customer support SLA' }
          ].map((metric, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-sm hover:shadow-md' : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/70 hover:border-cyan-500/30'
              }`}
            >
              <div className={`text-xl sm:text-2xl font-extrabold font-mono mb-1 ${
                theme === 'light' ? 'text-cyan-600' : 'text-cyan-400'
              }`}>
                {metric.val}
              </div>
              <div className={`text-xs font-cairo ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}>
                {lang === 'ar' ? metric.labelAr : metric.labelEn}
              </div>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}

// 8. Success Partners Block Component
function PartnersSection({ lang, theme, setShowPartnersModal }) {
  const scrollContainerRef = React.useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
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
        <div className="relative mb-12 group/slider">
          
          <div className={`absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-r ${
            theme === 'light' ? 'from-white to-transparent' : 'from-[#060c18] to-transparent'
          } hidden sm:block`}></div>
          <div className={`absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-l ${
            theme === 'light' ? 'from-white to-transparent' : 'from-[#060c18] to-transparent'
          } hidden sm:block`}></div>

          {/* Left Arrow Button */}
          <button
            onClick={scrollLeft}
            type="button"
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full border shadow-lg cursor-pointer transition-all duration-300 opacity-0 group-hover/slider:opacity-100 hover:scale-110 active:scale-95 hidden sm:flex items-center justify-center ${
              theme === 'light' 
                ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-55' 
                : 'bg-slate-900 border-slate-800 text-cyan-400 hover:bg-slate-800'
            }`}
            title={lang === 'ar' ? 'السابق' : 'Previous'}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
 
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent overscroll-x-contain scroll-smooth" 
            style={{ overscrollBehaviorX: 'contain' }}
          >
            {HOMEPAGE_SLIDER_PARTNERS.map((partner, idx) => {
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
                  key={partner.id} 
                  title={lang === 'ar' ? `${partner.nameAr} - ${partner.industryAr}` : `${partner.nameEn} - ${partner.industryEn}`}
                  className={`w-28 h-28 sm:w-32 sm:h-32 shrink-0 snap-start group p-0 rounded-2xl border-t-4 border-r border-b border-l hover:border-cyan-500/60 dark:hover:border-cyan-400/55 transition-all duration-300 flex items-center justify-center relative overflow-hidden ${borderAccent} ${
                    theme === 'light' 
                      ? 'bg-gradient-to-br from-white via-slate-50/40 to-cyan-50/15 border-slate-200/70 shadow-sm hover:shadow-md hover:-translate-y-1' 
                      : 'bg-gradient-to-br from-[#0f172a] to-[#070e1e] border-slate-800/80 hover:bg-slate-900/50 hover:-translate-y-1'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
 
                  {/* Perfectly centered brand logo symbol */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PartnerLogo partner={partner} theme={theme} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={scrollRight}
            type="button"
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full border shadow-lg cursor-pointer transition-all duration-300 opacity-0 group-hover/slider:opacity-100 hover:scale-110 active:scale-95 hidden sm:flex items-center justify-center ${
              theme === 'light' 
                ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-55' 
                : 'bg-slate-900 border-slate-800 text-cyan-400 hover:bg-slate-800'
            }`}
            title={lang === 'ar' ? 'التالي' : 'Next'}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
 
          <p className="text-center text-[10px] font-cairo text-slate-400 mt-2 sm:hidden">
            {lang === 'ar' ? 'اسحب لمشاهدة المزيد ⟷' : 'Swipe to explore more ⟷'}
          </p>
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
            href="https://wa.me/201000082722" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`w-full sm:w-auto px-7 py-3.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer font-cairo shadow-sm ${
              theme === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-slate-950 border-slate-200'
                : 'bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-slate-205 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'ar' ? 'تواصل مع مبيعات مصر ودعم الأداء' : 'Contact Egypt Sales & Support'}</span>
          </a>
          
          <a 
            href="mailto:info@niletechno.com?subject=Inquiry About Corporate Profile"
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

// 9. Interactive Maps & Branches coordinates component
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
                  href={`https://wa.me/${currentBranch.whatsapp}`}
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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#070b13] text-white p-6 font-cairo text-center">
          <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-black mb-2">عذراً، حدث خطأ غير متوقع</h2>
            <p className="text-sm text-slate-400 mb-6 font-semibold font-cairo">An unexpected application error has occurred. Our systems have been alerted.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-xl bg-[#00c272] text-white font-bold hover:bg-emerald-500 transition-colors cursor-pointer"
            >
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  // Sizable global states
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('nt_theme') || 'light';
    } catch {
      return 'light';
    }
  });
  const [showPartnersMobile, setShowPartnersMobile] = useState(false);
  const [showPartnersModal, setShowPartnersModal] = useState(false);
  const [showAssistHub, setShowAssistHub] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [partnerSearchQuery, setPartnerSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [partnerSearchInput, setPartnerSearchInput] = useState('');
  const [partnerActiveTab, setPartnerActiveTab] = useState('all');
  const [modalSliderIndex, setModalSliderIndex] = useState(0);
  const [modalViewMode, setModalViewMode] = useState('grid');
  const modalTabsContainerRef = React.useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setPartnerSearchQuery(partnerSearchInput);
    }, 250);
    return () => clearTimeout(handler);
  }, [partnerSearchInput]);

  useEffect(() => {
    setModalSliderIndex(0);
  }, [partnerActiveTab, partnerSearchQuery]);
  const [selectedBranchId, setSelectedBranchId] = useState('riyadh');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutActivePanel, setAboutActivePanel] = useState('vision');

  // Platform Slider state
  const [activePlatformIndex, setActivePlatformIndex] = useState(0);
  const [isHoveredPlatforms, setIsHoveredPlatforms] = useState(false);
  
  // Tax compliance logo image error fallback states - designed for human overrides
  const [zatcaImgError, setZatcaImgError] = useState(false);
  const [etaImgError, setEtaImgError] = useState(false);
  
  // Custom Consolidated WhatsApp Help Panel state
  const [whatsappPanelOpen, setWhatsappPanelOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    if (href === '#customers') {
      e.preventDefault();
      setShowPartnersModal(true);
      return;
    }
    
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        // Precise offset to align beautifully under the fixed header with ample margin
        const headerOffset = scrolled ? 70 : 86;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        window.history.pushState(null, '', href);
      }
    }
  };

  const [hasInteractedWithPlatforms, setHasInteractedWithPlatforms] = useState(false);

  useEffect(() => {
    if (isHoveredPlatforms || hasInteractedWithPlatforms) return;
    const interval = setInterval(() => {
      setActivePlatformIndex((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHoveredPlatforms, hasInteractedWithPlatforms]);

  // Video Lightbox Modal State
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    videoUrl: '',
    title: ''
  });
  const [videoSize, setVideoSize] = useState('large'); // 'medium', 'large', 'xlarge'

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    message: '',
    interestedModules: []
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const t = TRANSLATIONS[lang];

  // Apply language state to HTML-tag direction
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Apply theme state to document body background color to ensure consistency and persist value
  useEffect(() => {
    try {
      localStorage.setItem('nt_theme', theme);
    } catch (e) {
      console.error(e);
    }
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
    } else {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0f172a';
    }
  }, [theme]);

  // Sync URL search parameters with Active Tab and Search Queries
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabQuery = params.get('tab');
    const qQuery = params.get('q');
    if (tabQuery) {
      setActiveTab(tabQuery);
    }
    if (qQuery) {
      setSearchQuery(qQuery);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (activeTab && activeTab !== 'all') {
      params.set('tab', activeTab);
    } else {
      params.delete('tab');
    }
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    } else {
      params.delete('q');
    }
    const newSearch = params.toString();
    const newUrl = `${window.location.pathname}${newSearch ? '?' + newSearch : ''}`;
    window.history.replaceState(null, '', newUrl);
  }, [activeTab, searchQuery]);

  // Prevent background scrolling and double scroll when a modal is open
  useEffect(() => {
    if (showPartnersModal || videoModal.isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [showPartnersModal, videoModal.isOpen]);

  // Escape key to close active modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setVideoModal({ isOpen: false, videoUrl: '', title: '' });
        setShowPartnersModal(false);
      }
    };
    if (videoModal.isOpen || showPartnersModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [videoModal.isOpen, showPartnersModal]);

  // Convert regular watch YouTube link to embed link
  const getEmbedLink = (url) => {
    if (!url) return '';
    try {
      let videoId = '';
      if (url.includes('youtu.be/')) {
        const parts = url.split('youtu.be/');
        if (parts[1]) {
          videoId = parts[1].split('?')[0].split('&')[0];
        }
      } else if (url.includes('youtube.com/watch')) {
        const parts = url.split('v=');
        if (parts[1]) {
          videoId = parts[1].split('&')[0].split('?')[0];
        }
      } else if (url.includes('youtube.com/embed/')) {
        const parts = url.split('embed/');
        if (parts[1]) {
          videoId = parts[1].split('?')[0].split('&')[0];
        }
      } else {
        // Safe regex fallback if all else fails
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
        if (match && match[1]) {
          videoId = match[1];
        }
      }

      if (videoId && videoId.trim().length === 11) {
        // Return clear, correct embedded URL enabling playback controls (controls=1) and fullscreen capability (fs=1)
        return `https://www.youtube.com/embed/${videoId.trim()}?autoplay=1&controls=1&rel=0&fs=1&enablejsapi=1`;
      }
    } catch (e) {
      console.error("Error formatting video URL: ", e);
    }
    return url;
  };

  // Open Youtube light-box modal
  const handleOpenVideo = (videoUrl, title) => {
    setVideoModal({
      isOpen: true,
      videoUrl: getEmbedLink(videoUrl),
      title
    });
  };

  // Filter service modules dynamically based on Category & Search Queries
  const filteredModules = useMemo(() => {
    return SERVICE_MODULES.filter(m => {
      const matchesTab = activeTab === 'all' || m.category === activeTab;
      
      const title = (lang === 'ar' ? m.titleAr : m.titleEn).toLowerCase();
      const desc = (lang === 'ar' ? m.descriptionAr : m.descriptionEn).toLowerCase();
      const features = (lang === 'ar' ? m.featuresAr : m.featuresEn).join(' ').toLowerCase();
      const cleanedQuery = searchQuery.trim().toLowerCase();

      const matchesSearch = title.includes(cleanedQuery) || 
                            desc.includes(cleanedQuery) || 
                            features.includes(cleanedQuery);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, lang]);

  // Current selected map url
  const currentBranch = useMemo(() => {
    return BRANCHES_DATA.find(b => b.id === selectedBranchId) || BRANCHES_DATA[0];
  }, [selectedBranchId]);

  // Filter success partners dynamically based on Category & Search Queries
  const filteredPartners = useMemo(() => {
    return SUCCESS_PARTNERS.filter(partner => {
      // Category match
      let categoryMatch = true;
      if (partnerActiveTab !== 'all') {
        categoryMatch = partner.category === partnerActiveTab;
      }

      // Search query match
      let searchMatch = true;
      if (partnerSearchQuery.trim()) {
        const query = partnerSearchQuery.trim().toLowerCase();
        const nameAr = partner.nameAr.toLowerCase();
        const nameEn = partner.nameEn.toLowerCase();
        const indAr = partner.industryAr.toLowerCase();
        const indEn = partner.industryEn.toLowerCase();
        searchMatch = nameAr.includes(query) || nameEn.includes(query) || indAr.includes(query) || indEn.includes(query);
      }

      return categoryMatch && searchMatch;
    });
  }, [partnerActiveTab, partnerSearchQuery]);

  // Handle simple submit callback
  // Toggle module interest in contact form checkboxes
  const toggleModuleInterest = (moduleId) => {
    setFormData(prev => ({
      ...prev,
      interestedModules: prev.interestedModules.includes(moduleId)
        ? prev.interestedModules.filter(id => id !== moduleId)
        : [...prev.interestedModules, moduleId]
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Simple HTML and tag stripper for client robustness (Sanitizer)
    const clean = (val) => {
      if (!val) return '';
      return String(val)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .replace(/<[^>]*>?/gm, '') // Strip tags completely
        .trim();
    };

    const cleanName = clean(formData.name);
    const cleanPhone = clean(formData.phone);
    const cleanEmail = clean(formData.email);
    const cleanCompanyName = clean(formData.companyName);
    const cleanMessage = clean(formData.message);

    if (!cleanName || !cleanPhone) return;
    setFormSubmitted(true);

    const modulesText = formData.interestedModules.map(clean).join(', ') || (lang === 'ar' ? 'استشارة عامة' : 'General Consulting');
    const messageText = lang === 'ar'
      ? `طلب تواصل جديد من موقع نايل تكنو للبرمجيات:\n\n👤 الاسم: ${cleanName}\n📞 الهاتف: ${cleanPhone}\n✉️ البريد الإلكتروني: ${cleanEmail || 'غير متوفر'}\n🏢 المؤسسة: ${cleanCompanyName || 'غير متوفر'}\n💼 الأنظمة المهتم بها: ${modulesText}\n📝 الرسالة والاستفسار: ${cleanMessage || 'طلب استفسار وتواصل عام'}`
      : `New Software Inquiry via Nile Techno Web:\n\n👤 Name: ${cleanName}\n📞 Phone: ${cleanPhone}\n✉️ Email: ${cleanEmail || 'N/A'}\n🏢 Company: ${cleanCompanyName || 'N/A'}\n💼 Modules Selected: ${modulesText}\n📝 Message Details: ${cleanMessage || 'General custom ERP inquiry'}`;

    const whatsappUrl = `https://wa.me/201000082722?text=${encodeURIComponent(messageText)}`;
    
    // Redirect immediately to prevent browser popup security from blocking the window.open
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        message: '',
        interestedModules: []
      });
    }, 4500);
  };

  return (
    <ErrorBoundary>
      <div 
        dir={lang === 'ar' ? 'rtl' : 'ltr'} 
      className={`min-h-screen ${lang === 'ar' ? 'rtl font-cairo' : 'ltr font-sans'} ${
        theme === 'light' 
          ? 'bg-white text-slate-800' 
          : 'bg-[#0a0f1d] text-slate-100'
      } selection:bg-cyan-500 selection:text-slate-900 transition-colors duration-300`}
    >

      {/* 1. Header & Navigation Panel */}
      <nav className={`fixed top-0 inset-x-0 z-50 ${
        theme === 'light' 
          ? (scrolled ? 'bg-white/70 border-slate-200/50 text-slate-800 shadow-sm' : 'bg-white/95 border-slate-200 text-slate-800 shadow-sm')
          : (scrolled ? 'bg-[#050914]/65 border-slate-900/60 text-white shadow-lg' : 'bg-[#050914]/90 border-slate-900 text-white')
      } backdrop-blur-md border-b transition-all duration-300`}>
        <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center flex-row-reverse lg:flex-row transition-all duration-300 ${scrolled ? 'h-14 lg:h-16' : 'h-18 lg:h-20'}`}>
            
            {/* Corporate Logo Emblem using high-performance vector component */}
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="cursor-pointer">
              <NileTechnoLogo theme={theme} lang={lang} />
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6">
              {[
                { label: t.navHome, href: '#home' },
                { label: t.navAbout, href: '#about' },
                { label: t.navServices, href: '#services' },
                { label: t.navMobile, href: '#mobile-apps' },
                { label: t.navEinvoice, href: '#einvoicing' },
                { label: t.navCustomers, href: '#customers' },
                { label: t.navContact, href: '#contact' }
              ].map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-xs font-bold font-cairo transition-colors duration-200 uppercase tracking-wide ${
                    theme === 'light' 
                      ? 'text-slate-500 hover:text-cyan-600' 
                      : 'text-slate-300 hover:text-cyan-400'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Theme Toggle, Language Switcher and Drawer Trigger */}
            <div className="flex items-center gap-3">
              
              {/* Premium Light/Dark Theme Switcher */}
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`flex items-center justify-center p-2 rounded-full border transition-all cursor-pointer order-3 lg:order-1 ${
                  theme === 'light'
                    ? 'border-slate-300 bg-slate-100 text-amber-500 hover:bg-slate-200'
                    : 'border-slate-800 bg-slate-900/60 text-indigo-400 hover:border-cyan-500 hover:text-cyan-400'
                }`}
                title={lang === 'ar' ? 'تغيير المظهر' : 'Toggle theme'}
                aria-label={lang === 'ar' ? 'تغيير مظهر لوحة العرض بين الفاتحة والمظلمة' : 'Toggle between light and dark display mode'}
              >
                {theme === 'dark' ? (
                  <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728A9 9 0 115.636 5.636 9 9 0 0117.657 17.657z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Language Switch button */}
              <button 
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer order-2 lg:order-2 ${
                  theme === 'light'
                    ? 'border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'border-slate-700/80 bg-[#0d1527] text-slate-300 hover:border-cyan-500 hover:text-cyan-400'
                }`}
                aria-label={lang === 'ar' ? 'عرض الصفحة باللغة الإنجليزية' : 'Translate page presentation to Arabic'}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
              </button>

              {/* Hamburger Mobile Menu Indicator */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg border transition-colors cursor-pointer order-1 lg:order-3 ${
                  theme === 'light'
                    ? 'bg-slate-100 border-slate-300 text-slate-600 hover:text-slate-900'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
                aria-label={lang === 'ar' ? 'عرض القائمة المنسدلة للأجهزة الذكية' : 'Toggle mobile drawer menu options'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Responsive Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-b px-4 pt-2 pb-6 space-y-2 transition-all ${
            theme === 'light' 
              ? 'bg-white border-slate-200 text-slate-800' 
              : 'bg-[#0d1527] border-slate-800 text-white'
          }`}>
            {[
              { label: t.navHome, href: '#home' },
              { label: t.navAbout, href: '#about' },
              { label: t.navServices, href: '#services' },
              { label: t.navMobile, href: '#mobile-apps' },
              { label: t.navEinvoice, href: '#einvoicing' },
              { label: t.navCustomers, href: '#customers' },
              { label: t.navContact, href: '#contact' }
            ].map((link, idx) => (
              <a 
                key={idx} 
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, link.href);
                }}
                className={`block text-sm font-bold py-2.5 px-3 rounded-lg transition-colors ${
                  theme === 'light'
                    ? 'text-slate-700 hover:bg-slate-100 hover:text-cyan-600'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-cyan-400'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* 2. Hero Header Section */}
      <HeroSection 
        lang={lang} 
        theme={theme} 
        t={t} 
        handleOpenVideo={handleOpenVideo} 
        activePlatformIndex={activePlatformIndex}
        setActivePlatformIndex={(val) => {
          setActivePlatformIndex(val);
          setHasInteractedWithPlatforms(true);
        }}
        isHoveredPlatforms={isHoveredPlatforms}
        setIsHoveredPlatforms={setIsHoveredPlatforms}
      />

      {/* 3. Who We Are Section */}
      <section id="about" className={`py-8 sm:py-10 relative transition-all duration-500 border-t ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30 border-slate-150' 
          : 'bg-gradient-to-b from-[#040814] to-[#070d1e] border-slate-900'
      }`}>
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className={`text-3xl sm:text-4.5xl font-extrabold font-cairo mb-4 uppercase tracking-wide ${
              theme === 'light' ? 'text-slate-950' : 'text-white'
            }`}>
              {t.aboutHeadline}
            </h2>
            <div className="w-16 h-1 bg-cyan-500 mx-auto mb-4 rounded-full"></div>
            <p className={`text-sm sm:text-base font-cairo ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {t.aboutSub}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Visual branding statement card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 blur pointer-events-none"></div>
              <div className={`relative p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 rounded-2xl border border-slate-800'
              }`}>
                <h3 className={`text-lg font-bold mb-4 font-cairo ${
                  theme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  {t.aboutCompanyTitle}
                </h3>
                <p className={`text-xs sm:text-sm font-cairo leading-relaxed mb-4 ${
                  theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  {t.aboutCompanyDesc1}
                </p>
                <p className={`text-xs sm:text-sm font-cairo leading-relaxed mb-6 ${
                  theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  {t.aboutCompanyDesc2}
                </p>

                <div className={`p-4 rounded-xl border flex items-center gap-3 transition-colors ${
                  theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0a0f1d] border border-slate-800'
                }`}>
                  <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold font-cairo ${
                      theme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>Let Us Manage Your Business</h4>
                    <span className={`text-[10px] font-mono ${
                      theme === 'light' ? 'text-slate-550' : 'text-slate-400'
                    }`}>EST. AUGUST 2010</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Tabbed vision and mission switcher */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              
              {/* Tab Selector buttons */}
              <div className={`grid grid-cols-2 p-1.5 rounded-xl border transition-colors ${
                theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 rounded-xl border border-slate-800'
              }`}>
                <button
                  onClick={() => setAboutActivePanel('vision')}
                  className={`py-3 rounded-lg text-xs font-bold transition-all text-center font-cairo cursor-pointer ${
                    aboutActivePanel === 'vision'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                      : (theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white')
                  }`}
                >
                  {t.visionTab}
                </button>
                <button
                  onClick={() => setAboutActivePanel('mission')}
                  className={`py-3 rounded-lg text-xs font-bold transition-all text-center font-cairo cursor-pointer ${
                    aboutActivePanel === 'mission'
                      ? 'bg-gradient-to-r from-cyan-550 to-blue-600 text-white shadow-md'
                      : (theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white')
                  }`}
                >
                  {t.missionTab}
                </button>
              </div>

              {/* Dynamic Content display */}
              <div className={`p-6 sm:p-8 rounded-2xl border min-h-64 flex flex-col justify-between transition-colors duration-300 ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/40 rounded-2xl border border-slate-800'
              }`}>
                <div className="space-y-4">
                  <span className="inline-flex p-2.5 rounded-lg bg-cyan-500/5 text-cyan-400 mb-2">
                    <Sparkles className="w-6 h-6" />
                  </span>
                  <p className={`text-sm sm:text-base leading-relaxed font-cairo text-justify ${
                    theme === 'light' ? 'text-slate-700' : 'text-slate-330'
                  }`}>
                    {aboutActivePanel === 'vision' ? t.visionContent : t.missionContent}
                  </p>
                </div>

                <div className={`pt-6 border-t grid grid-cols-2 gap-4 mt-4 ${
                  theme === 'light' ? 'border-slate-100' : 'border-t border-slate-800/60'
                }`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className={`text-xs font-cairo ${
                      theme === 'light' ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      {lang === 'ar' ? 'فريق فني محترف متكامل' : 'Professional Engineering Team'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className={`text-xs font-cairo ${
                      theme === 'light' ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      {lang === 'ar' ? 'جاهز للربط الفني والضريبي' : 'Tax Regulatory Compliant API'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. Complete E-Invoicing Section */}
      <section id="einvoicing" className={`pt-12 pb-1 relative transition-all duration-500 border-t border-b ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-slate-100/30 via-cyan-50/15 to-white border-slate-150' 
          : 'bg-gradient-to-b from-[#070d1e] to-[#050917] border-slate-900'
      }`}>
        <div className="absolute inset-0 bg-[radial-gradient(#0891b206_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider font-cairo ${
              theme === 'light' ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-950 text-emerald-400'
            }`}>
              {lang === 'ar' ? 'متطلبات هيئة الزكاة والضرائب المصرية والخليجية' : 'ZATCA & Egypt ETA VAT Standards'}
            </span>
            <h2 className={`text-3xl sm:text-4.5xl font-extrabold font-cairo mb-4 uppercase tracking-wide ${
              theme === 'light' ? 'text-slate-950' : 'text-white'
            }`}>
              {t.einvoiceHeadline}
            </h2>
            <p className={`text-sm sm:text-base font-cairo leading-relaxed ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {t.einvoiceSub}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-4">
            
            {/* Left parameters explanations & restored detailed compliance specifications */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Dynamic compliance imagery at the top as requested - perfectly visual and fully customizable */}
              <div className="grid grid-cols-2 gap-6 pt-2 pb-4">
                <div className="flex flex-col items-center justify-center p-2 transition-transform duration-300 hover:scale-[1.05]">
                  <div className="h-20 w-full flex items-center justify-center">
                    <img 
                      src={etaImage}
                      alt="Egypt ETA Logo" 
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain select-none"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mt-2.5">
                    <img src="https://flagcdn.com/w20/eg.png" alt="Egypt flag" className="w-4 h-3 object-cover rounded-sm border border-slate-200/50" referrerPolicy="no-referrer" />
                    <span className={`text-xs font-black font-cairo ${theme === 'light' ? 'text-slate-700' : 'text-slate-400'}`}>
                      {lang === 'ar' ? 'منظومة الضرائب (مصر)' : 'ETA System'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-2 transition-transform duration-300 hover:scale-[1.05]">
                  <div className="h-20 w-full flex items-center justify-center">
                    <img 
                      src={zatcaImage}
                      alt="KSA ZATCA Logo" 
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain select-none"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mt-2.5">
                    <img src="https://flagcdn.com/w20/sa.png" alt="KSA flag" className="w-4 h-3 object-cover rounded-sm border border-slate-200/50" referrerPolicy="no-referrer" />
                    <span className={`text-xs font-black font-cairo ${theme === 'light' ? 'text-slate-700' : 'text-slate-400'}`}>
                      {lang === 'ar' ? 'بوابة زكاة (السعودية)' : 'ZATCA Gateway'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className={`text-xl sm:text-2xl font-black font-cairo ${
                  theme === 'light' ? 'text-slate-900 font-extrabold' : 'text-white'
                }`}>
                  {lang === 'ar' ? 'التحول الضريبي الرقمي بكل مرونة' : 'Certified Compliance Standard'}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed font-cairo text-justify ${
                  theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  {t.einvoiceDesc}
                </p>

                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 font-cairo ${
                    theme === 'light' ? 'text-slate-800' : 'text-slate-200'
                  }`}>
                    {t.einvoiceListTitle}
                  </h4>
                  <ul className="space-y-3">
                    {[t.einvoiceItem1, t.einvoiceItem2, t.einvoiceItem3].map((item, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <span className="p-1 rounded bg-cyan-500/10 text-cyan-400 mt-0.5 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        </span>
                        <span className={`text-[11px] sm:text-[12px] font-cairo leading-relaxed ${
                          theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                        }`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Secure tag */}
                <div className={`p-4 rounded-xl flex items-center gap-3 border transition-colors ${
                  theme === 'light' ? 'bg-slate-50 border-slate-200/80 shadow-sm' : 'bg-slate-900 border border-slate-800'
                }`}>
                  <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0" />
                  <div>
                    <h5 className={`text-xs font-bold font-cairo ${
                      theme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      {lang === 'ar' ? 'ربط المرحلة الأولى والثانية' : 'Approved Integration'}
                    </h5>
                    <p className={`text-[10px] font-cairo ${
                      theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      {lang === 'ar' ? 'مطابق للتعليمات الصادرة بنظام التشفير' : 'Standard 100% compliant cryptography payloads'}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Embedded Interactive simulator demo - "متقربش خالص من محاكي ومولد الفاتورة الإلكترونية الذكي" */}
            <div className="lg:col-span-7">
              <EInvoiceDemo lang={lang} theme={theme} />
            </div>

          </div>

        </div>
      </section>

      {/* 5. Software Systems Grid Showcase */}
      <section id="services" className={`pt-3 pb-16 relative border-t transition-all duration-500 ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-white via-slate-50/60 to-white border-slate-150' 
          : 'bg-gradient-to-b from-[#050917] via-[#091122] to-[#040814] border-slate-900'
      }`}>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider font-cairo ${
              theme === 'light' ? 'bg-cyan-50 text-cyan-700' : 'bg-cyan-950 text-cyan-400'
            }`}>
              {lang === 'ar' ? 'أنظمة برمجية رائدة ومتفردة' : 'Enterprise Class Software Solutions'}
            </span>
            <h2 className={`text-3xl sm:text-4.5xl font-extrabold font-cairo mb-4 uppercase tracking-wide ${
              theme === 'light' ? 'text-slate-950' : 'text-white'
            }`}>
              {lang === 'ar' ? 'برمجيات وحلول نايل تكنو الذكية' : 'Nile Techno Software Ecosystem'}
            </h2>
            <p className={`text-xs sm:text-sm font-cairo ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {lang === 'ar' ? 'أنظمة محاسبية ذكية، مصممة بدقة لتلبية تطلعات مختلف الأنشطة والمؤسسات مع إمكانية التشغيل السحابي أو المحلي.' : 'Engineered products tailored to resolve specific business challenges locally or via advanced regional cloud clusters.'}
            </p>
          </div>

          {/* Interactive Search Bar & Categories Tabs panel */}
          <div className="max-w-4xl mx-auto mb-10 space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder={lang === 'ar' ? 'ابحث عن حلول (سيارات، كاشير، حسابات، مجوهرات...)' : 'Search systems (GL, POS, Inventory, Gold, Car...)'}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={`w-full pl-10 pr-10 py-3.5 rounded-2xl border text-sm transition-all focus:border-cyan-500 font-cairo ${
                  theme === 'light'
                    ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                    : 'bg-slate-900 border-slate-800 placeholder:text-slate-500 text-white'
                }`}
              />
              <Search className={`absolute ${lang === 'ar' ? 'left-4' : 'right-4'} top-3.5 w-5 h-5 text-slate-400`} />
            </div>

            {/* Nav Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { id: 'all', label: t.filterAll },
                { id: 'erp', label: t.filterErp },
                { id: 'retail', label: t.filterRetail },
                { id: 'logistics', label: t.filterLogistics },
                { id: 'specialized', label: t.filterSpecialized }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-cairo ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                      : (theme === 'light' ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800/80 hover:bg-slate-800')
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>

          {/* Sizable Services Grid */}
          <div className="min-h-[460px] sm:min-h-[500px] md:min-h-[620px] lg:min-h-[720px] transition-all duration-300">
            {filteredModules.length === 0 ? (
              <div className={`text-center py-16 rounded-2xl border max-w-xl mx-auto ${
                theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800 shadow-sm' : 'bg-slate-900/30 border-slate-800'
              }`}>
                <span className="block text-slate-400 text-sm mb-2 font-cairo">
                  {lang === 'ar' ? 'عذراً، لم نجد نتائج مطابقة لمصطلح البحث' : 'No matching results found.'}
                </span>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                  className="text-xs text-cyan-400 underline font-semibold font-cairo cursor-pointer"
                >
                  {lang === 'ar' ? 'عرض جميع البرامج' : 'Reset filters'}
                </button>
              </div>
            ) : (
              <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 pb-6 pt-2 snap-x snap-mandatory scrollbar-none overscroll-x-contain" style={{ overscrollBehaviorX: 'contain' }}>
                {filteredModules.map((sys) => (
                  <div 
                    key={sys.id} 
                    className={`w-[82vw] sm:w-[60vw] md:w-auto shrink-0 snap-start group relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between border hover:border-cyan-500/60 dark:hover:border-cyan-400/50 transition-all duration-500 transform hover:-translate-y-1.5 ${
                      theme === 'light' 
                        ? 'bg-white border-slate-200/90 shadow-[0_4px_22px_-6px_rgba(148,163,184,0.15)] hover:shadow-[0_12px_32px_-8px_rgba(6,182,212,0.22)] hover:bg-gradient-to-br hover:from-white hover:to-cyan-50/30 border-t-4 border-t-cyan-500' 
                        : 'bg-[#0f172a] border-slate-800 shadow-md hover:shadow-cyan-950/40 hover:bg-slate-900/40'
                    }`}
                  >
                    {/* Accent border highlight */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r opacity-50 rounded-t-2xl group-hover:opacity-100 transition-opacity"></div>
                    
                    <div>
                      {/* Header: Icon Component & Title */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${sys.accentColor} text-white shadow-md shadow-slate-950/30`}>
                          <IconComponent name={sys.iconName} className="w-6 h-6 text-white" />
                        </div>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border uppercase tracking-widest font-mono ${
                          theme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-slate-900 border border-slate-800 text-slate-400'
                        }`}>
                          {sys.category}
                        </span>
                      </div>

                      <h3 className={`text-base sm:text-lg font-bold group-hover:text-cyan-500 transition-colors mb-2 font-cairo ${
                        theme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        {lang === 'ar' ? sys.titleAr : sys.titleEn}
                      </h3>

                      <p className={`text-xs line-clamp-3 mb-6 leading-relaxed font-cairo ${
                        theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        {lang === 'ar' ? sys.descriptionAr : sys.descriptionEn}
                      </p>

                      {/* Features list */}
                      <div className="space-y-2 mb-6">
                        {(lang === 'ar' ? sys.featuresAr : sys.featuresEn).slice(0, 4).map((feat, idx) => (
                          <div key={idx} className={`flex gap-2 items-start text-xs font-cairo ${
                            theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                          }`}>
                             <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Watch Video Demo direct action */}
                    <div className={`pt-4 border-t flex items-center justify-between mt-auto ${
                      theme === 'light' ? 'border-slate-100' : 'border-slate-800'
                    }`}>
                      <button
                        onClick={() => handleOpenVideo(sys.youtubeUrl, lang === 'ar' ? sys.titleAr : sys.titleEn)}
                        className="text-xs font-bold text-cyan-500 hover:text-cyan-600 flex items-center gap-1.5 transition-colors cursor-pointer group-hover:underline font-cairo"
                      >
                        <Play className="w-3.5 h-3.5 rounded-full bg-cyan-950 text-cyan-400 p-0.5 fill-current" />
                        <span>{t.showDemo}</span>
                      </button>

                      <a 
                        href="#contact"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            interestedModules: prev.interestedModules.includes(sys.id) 
                               ? prev.interestedModules 
                               : [...prev.interestedModules, sys.id]
                          }));
                        }}
                        className={`text-[10px] uppercase font-bold font-cairo ${
                          theme === 'light' ? 'text-slate-605 hover:text-slate-900 font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {lang === 'ar' ? 'طلب تسعيرة' : 'Get Quote'}
                      </a>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 6. Mobile Applications Bento Section */}
      <section id="mobile-apps" className={`py-8 sm:py-10 relative transition-all duration-500 border-t border-b ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-white via-cyan-50/15 to-slate-50 border-slate-150' 
          : 'bg-gradient-to-b from-[#040814] to-[#080e1b] border-slate-900'
      }`}>
        <div className="absolute inset-0 bg-[radial-gradient(#0891b203_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-10 w-80 h-80 bg-blue-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider font-cairo ${
              theme === 'light' ? 'bg-indigo-50 text-indigo-700' : 'bg-indigo-950 text-indigo-400'
            }`}>
              {lang === 'ar' ? 'حلول الهواتف الذكية وتطبيقات أندرويد و iOS' : 'Hybrid Mobile Companion Apps'}
            </span>
            <h2 className={`text-3xl sm:text-4.5xl font-extrabold font-cairo mb-4 uppercase tracking-wide ${
              theme === 'light' ? 'text-slate-950' : 'text-white'
            }`}>
              {lang === 'ar' ? 'نايل تكنو لحلول تطبيقات الموبايل الميدانية' : 'Nile Techno Mobile Field Agents'}
            </h2>
            <p className={`text-xs sm:text-sm font-cairo leading-relaxed ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {lang === 'ar' ? 'تطبيقات هواتف متكاملة، تتزامن بكفاءة تامة مع قاعدة البيانات الرئيسية وتدعم طباعة الفواتير بالبلوتوث وتحديد خطوط السير بالـ GPS.' : 'Handheld solutions coordinating on-field operations, with direct Bluetooth ticket printing, offline storage caching and GPS tracking.'}
            </p>
          </div>

          <div className="flex overflow-x-auto lg:grid lg:grid-cols-2 gap-6 items-stretch font-cairo pb-6 snap-x snap-mandatory scrollbar-none overscroll-x-contain" style={{ overscrollBehaviorX: 'contain' }}>
            {MOBILE_APPS.map((app) => (
              <div 
                key={app.id}
                className={`w-[82vw] sm:w-[65vw] lg:w-auto shrink-0 snap-start p-5 sm:p-6 flex flex-col md:flex-row gap-6 items-stretch justify-between border transition-all ${
                  theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                {/* Details side */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                        <IconComponent name={app.iconName} className="w-5 h-5" />
                      </span>
                      <h3 className={`text-base sm:text-lg font-bold ${
                        theme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        {lang === 'ar' ? app.titleAr : app.titleEn}
                      </h3>
                    </div>
                    <p className={`text-xs leading-relaxed text-justify mb-4 ${
                      theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      {lang === 'ar' ? app.descriptionAr : app.descriptionEn}
                    </p>

                    <div className="space-y-2">
                      {(lang === 'ar' ? app.featuresAr : app.featuresEn).map((feat, idx) => (
                        <div key={idx} className={`flex gap-2 items-start text-xs ${
                          theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`pt-4 border-t flex items-center justify-between ${
                    theme === 'light' ? 'border-slate-100' : 'border-slate-800'
                  }`}>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#06b6d4]">Android - iOS Support</span>
                    <a 
                      href="#contact"
                      className={`text-xs font-bold ${
                        theme === 'light' ? 'text-slate-900 hover:text-cyan-600' : 'text-white hover:text-cyan-400'
                      }`}
                    >
                      {lang === 'ar' ? 'طلب نسخة تجريبية' : 'Request Mobile Demo'}
                    </a>
                  </div>
                </div>

                {/* Minimal responsive device illustration on right */}
                <div className={`w-full md:w-36 rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-inner relative overflow-hidden group border transition-colors ${
                  theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#0a0f1d] border border-slate-800 text-white'
                }`}>
                  <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-500/10 rounded-full blur-xl"></div>
                  
                  <div className="w-full flex justify-between items-center text-[8px] text-slate-500 font-mono mb-2">
                    <span>GPS ACTIVE</span>
                    <span>100%</span>
                  </div>

                  {/* Representation of Mobile app Screen */}
                  <div className="flex-1 flex flex-col justify-center items-center py-4 space-y-2">
                    <Smartphone className="w-10 h-10 text-[#06b6d4] animate-bounce shrink-0" />
                    <span className={`text-[10px] font-bold ${
                      theme === 'light' ? 'text-slate-900' : 'text-slate-200'
                    }`}>
                      {lang === 'ar' ? 'متصل بالنظام' : 'Ready Node'}
                    </span>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider scale-90 ${
                      theme === 'light' ? 'bg-indigo-100 text-indigo-705' : 'bg-indigo-950 text-indigo-300'
                    }`}>
                      Offline Cache
                    </span>
                  </div>

                  <span className="text-[8px] text-slate-500 mt-2 font-mono">NILE TECHNO ENGINE RESILIENT</span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Consultation Lead Calculator Section */}
      <section id="consulting" className={`py-8 sm:py-10 relative transition-all duration-500 border-t border-b ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-slate-50 via-white to-slate-100/30 border-slate-200' 
          : 'bg-gradient-to-b from-[#080e1b] to-[#060c18] border-slate-900'
      }`}>
        <div className="absolute inset-0 bg-[radial-gradient(#cbd2db_0.8px,transparent_0.8px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40"></div>
        <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider font-cairo ${
              theme === 'light' ? 'bg-cyan-50 text-cyan-700' : 'bg-cyan-950 text-cyan-400'
            }`}>
              {lang === 'ar' ? 'استشارة برمجية سريعة' : 'Instant ERP Advisory'}
            </span>
            <h2 className={`text-3xl sm:text-4.5xl font-extrabold font-cairo mb-4 uppercase tracking-wide ${
              theme === 'light' ? 'text-slate-950' : 'text-white'
            }`}>
              {lang === 'ar' ? 'هل أنت محتار؟ اختر النظام الملائم الآن' : 'Unsure of What Fits Your Business Scale?'}
            </h2>
            <p className={`text-xs sm:text-sm font-cairo ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {lang === 'ar' ? 'استخدم حاسبتنا الذكية لتقدير النطاق والأنظمة المتكاملة المطلوبة لقطاع نشاطك فوراً وبخطوة واحدة!' : 'Enter your parameters to see recommended packages tailored specifically for your operational target.'}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <LeadCalculator lang={lang} theme={theme} />
          </div>

        </div>
      </section>

      {/* 8. Success Partners Block */}
      <PartnersSection lang={lang} theme={theme} setShowPartnersModal={setShowPartnersModal} />

      {/* 9. Interactive Maps & Branches coordinates component */}
      <BranchesSection lang={lang} theme={theme} t={t} selectedBranchId={selectedBranchId} setSelectedBranchId={setSelectedBranchId} />

      {/* 10. Contact Us Advanced Leads Form */}
      <section id="contact" className={`py-8 sm:py-10 relative transition-all duration-500 border-t border-b ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-white via-cyan-50/20 to-slate-50 border-slate-150' 
          : 'bg-gradient-to-b from-[#050916] to-[#02050c] border-slate-900'
      }`}>
        <div className="absolute inset-0 bg-[radial-gradient(#cbd2db_0.7px,transparent_0.7px)] dark:bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40"></div>
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-blue-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className={`text-3xl sm:text-4.5xl font-extrabold font-cairo mb-4 uppercase tracking-wide ${
              theme === 'light' ? 'text-slate-950' : 'text-white'
            }`}>
              {t.contactHeadline}
            </h2>
            <p className={`text-sm sm:text-base font-cairo ${
              theme === 'light' ? 'text-slate-600 font-medium' : 'text-slate-400'
            }`}>
              {t.contactSub}
            </p>
          </div>

          <div className={`max-w-4xl mx-auto rounded-3xl p-6 md:p-10 shadow-2xl relative border transition-colors ${
            theme === 'light' ? 'bg-slate-50 border-slate-200 shadow-md' : 'bg-slate-900/40 border border-slate-800'
          }`}>
            
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto border ${
                  theme === 'light' ? 'bg-emerald-50 text-emerald-600 border-emerald-250 shadow-inner' : 'bg-emerald-950 text-emerald-400 border-emerald-500/20'
                }`}>
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className={`text-xl font-bold font-cairo ${
                  theme === 'light' ? 'text-slate-950' : 'text-white'
                }`}>
                  {lang === 'ar' ? 'تم استلام بياناتك بنجاح' : 'Inquiry Logged successfully'}
                </h3>
                <p className={`text-sm font-cairo max-w-md mx-auto ${
                  theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  {t.formSuccess}
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* Identity information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 font-cairo ${
                      theme === 'light' ? 'text-slate-700' : 'text-slate-400'
                    }`}>
                      {t.formName} <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      autoComplete="name"
                      aria-label={t.formName}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === 'ar' ? 'خالد ' : 'khalid'}
                      className={`w-full text-xs px-4 py-3 rounded-xl border focus:border-cyan-500 font-cairo transition-all ${
                        theme === 'light' ? 'bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 shadow-inner' : 'bg-slate-950 border border-slate-800 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 font-cairo ${
                      theme === 'light' ? 'text-slate-700' : 'text-slate-400'
                    }`}>
                      {t.formPhone} <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      autoComplete="tel"
                      aria-label={t.formPhone}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={lang === 'ar' ? '01000082722' : '01000082722'}
                      className={`w-full text-xs px-4 py-3 rounded-xl border focus:border-cyan-500 font-mono transition-all ${
                        theme === 'light' ? 'bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 shadow-inner' : 'bg-slate-950 border border-slate-800 text-white'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 font-cairo ${
                      theme === 'light' ? 'text-slate-700' : 'text-slate-400'
                    }`}>
                      {t.formEmail}
                    </label>
                    <input
                      type="email"
                      autoComplete="email"
                      aria-label={t.formEmail}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="info@niletechno.com"
                      className={`w-full text-xs px-4 py-3 rounded-xl border focus:border-cyan-500 font-mono transition-all ${
                        theme === 'light' ? 'bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 shadow-inner' : 'bg-slate-950 border border-slate-800 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 font-cairo ${
                      theme === 'light' ? 'text-slate-700' : 'text-slate-400'
                    }`}>
                      {t.formCompany}
                    </label>
                    <input
                      type="text"
                      autoComplete="organization"
                      aria-label={t.formCompany}
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder={lang === 'ar' ? 'شركة النيل ' : 'NileTechno Co.'}
                      className={`w-full text-xs px-4 py-3 rounded-xl border focus:border-cyan-500 font-cairo transition-all ${
                        theme === 'light' ? 'bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 shadow-inner' : 'bg-slate-950 border border-slate-800 text-white'
                      }`}
                    />
                  </div>
                </div>

                {/* Multiple Checklist select system interest */}
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-3 font-cairo ${
                    theme === 'light' ? 'text-slate-700' : 'text-slate-400'
                  }`}>
                    {lang === 'ar' ? 'حدد الأنظمة المحاسبية والبرامج المهتم بها:' : 'Mark the ERP systems that you require:'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SERVICE_MODULES?.map((module) => {
                      const isChecked = formData.interestedModules.includes(module.id);
                      return (
                        <button
                          key={module.id}
                          type="button"
                          onClick={() => toggleModuleInterest(module.id)}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-right transition-all cursor-pointer font-cairo ${
                            isChecked
                              ? (theme === 'light' ? 'bg-cyan-50 border-cyan-500 text-cyan-700 font-bold' : 'bg-cyan-500/10 border-cyan-500 text-cyan-300')
                              : (theme === 'light' ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white')
                          }`}
                        >
                          <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                            isChecked 
                              ? 'bg-cyan-500 text-white border-cyan-500' 
                              : (theme === 'light' ? 'border-slate-300' : 'border-slate-800')
                          }`}>
                            {isChecked && <span className="text-[10px] font-bold">✓</span>}
                          </span>
                          <span className="text-[11px] truncate font-semibold leading-none">
                            {lang === 'ar' ? module.titleAr : module.titleEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Inquiry text */}
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 font-cairo ${
                    theme === 'light' ? 'text-slate-700' : 'text-slate-400'
                  }`}>
                    {t.formMessage}
                  </label>
                  <textarea
                    rows={4}
                    autoComplete="off"
                    aria-label={t.formMessage}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={lang === 'ar' ? 'تفضل بكتابة متطلباتك بالتفصيل هنا...' : 'Input features or custom settings requirements...'}
                    className={`w-full text-xs px-4 py-3 rounded-xl border focus:border-cyan-500 font-cairo transition-all resize-none ${
                      theme === 'light' ? 'bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 shadow-inner' : 'bg-slate-950 border-slate-800 text-white'
                    }`}
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                  <p className="text-[11px] text-slate-500 font-cairo text-center sm:text-right">
                    {lang === 'ar' 
                      ? '* من خلال إرسال الطلب، يتلقى قسم المبيعات والتحليل متطلباتك فوراً لإعداد باقة السداد والمزامنة المناسبة.'
                      : '* Submission redirects target settings directly to our structural engineers and sales planning desk.'}
                  </p>
                  <button
                    type="submit"
                    aria-label={t.formSubmit}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40 cursor-pointer font-cairo"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.formSubmit}</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      <footer 
        dir={lang === 'ar' ? 'rtl' : 'ltr'} 
        className={`relative pt-16 pb-10 border-t transition-colors duration-300 overflow-hidden font-cairo ${
          theme === 'light' 
            ? 'bg-[#ecf2f8] text-slate-750 border-slate-200/80 shadow-inner' 
            : 'bg-gradient-to-b from-[#060a12] via-[#04070d] to-[#010204] text-slate-400 border-slate-900'
        }`}
      >
        {/* Dynamic decorative backdrop subtle lights */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className={`absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-40 ${
          theme === 'light' ? 'bg-cyan-200' : 'bg-cyan-500/10'
        }`}></div>

        <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Brand Block - Inspired by nile-techno-v2.vercel.app */}
          <div className="flex flex-col items-center justify-center text-center pt-8 pb-14 mb-14 border-b border-dashed border-slate-200/60 dark:border-slate-800/60">
            {/* The white/dark elegant rounded card */}
            <div className="relative group mb-6">
              {/* Glow shadow back-drop */}
              <div className="absolute -inset-1.5 rounded-[28px] bg-gradient-to-r from-[#00c272] via-cyan-400 to-blue-500 opacity-20 blur-xl group-hover:opacity-45 transition-all duration-500"></div>
              
              <div className={`relative w-52 sm:w-64 h-32 sm:h-40 rounded-3xl overflow-hidden flex items-center justify-center shadow-xl ${
                theme === 'light' ? 'bg-white border border-slate-200/50' : 'bg-slate-950/95 border border-slate-800'
              }`}>
                <img
                  src={companyLogo}
                  alt="Nile Techno Logo"
                  className="w-full h-full object-contain p-4 select-none transition-transform duration-350 group-hover:scale-[1.06]"
                  onError={(e) => {
                    e.target.src = logoTransparentWebp;
                  }}
                />
              </div>
            </div>

            {/* Complex systems group tagline */}
            <div className="flex items-center justify-center gap-2 mb-4 px-4 max-w-4xl flex-wrap">
              <Sparkles className="w-5 h-5 text-[#00c272] animate-pulse shrink-0" />
              <h3 className={`text-base sm:text-lg md:text-[20px] font-black tracking-wide leading-relaxed text-center ${
                theme === 'light' ? 'text-slate-850 font-cairo' : 'text-white font-cairo'
              }`}>
                <span className="font-mono uppercase tracking-wider">Nile Techno Complex Systems Group</span>
                <span className="mx-2 text-[#00c272]">•</span>
                <span>{lang === 'ar' ? 'مجموعة نايل تكنو للأنظمة البرمجية المتكاملة' : 'Integrated Enterprise Software Group'}</span>
              </h3>
              <Sparkles className="w-5 h-5 text-[#00c272] animate-pulse shrink-0" />
            </div>

            {/* Certified tax/zakat partner description */}
            <p className={`text-xs sm:text-sm leading-relaxed max-w-3xl px-4 font-bold text-center font-cairo ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {lang === 'ar' 
                ? 'شريكك البرمجي والضريبي المعتمد من قبل هيئة الزكاة والضريبة والجمارك بالمملكة العربية السعودية ومصلحة الضرائب المصرية.'
                : 'Your certified software and tax partner, approved by the Zakat, Tax and Customs Authority (ZATCA) in Saudi Arabia and the Egyptian Tax Authority (ETA).'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            
            {/* Column 1: Our Digital Vision (رؤيتنا الرقمية) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2 pb-3.5 border-b border-slate-200/80 dark:border-slate-800/50">
                <span className="w-1.5 h-4.5 rounded-full bg-cyan-400 shrink-0"></span>
                <h4 className={`text-base font-black font-cairo ${
                  theme === 'light' ? 'text-slate-850' : 'text-white'
                }`}>
                  {lang === 'ar' ? 'رؤيتنا الرقمية' : 'Our Digital Vision'}
                </h4>
              </div>
              <p className={`text-[13px] leading-relaxed font-bold font-cairo ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}>
                {lang === 'ar' 
                  ? 'مجموعة نايل تكنو للبرمجيات تدعم آلاف المنشآت والشركات والمصانع في الشرق الأوسط بحلول محاسبية متقدمة منذ عام 2010، وتسعى دائماً لتطوير الحلول التقنية الأكثر أماناً وموثوقية بالشرق الأوسط.'
                  : 'Nile Techno Software Group supports thousands of establishments, enterprises, and factories across the Middle East with comprehensive, state-of-the-art accounting solutions since 2010, constantly dedicated to developing highly secure and reliable corporate systems.'}
              </p>
            </div>

            {/* Column 2: Improved Software & Systems (البرمجيات والأنظمة المحسنة) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 pb-3.5 border-b border-slate-200/80 dark:border-slate-800/50">
                <span className="w-1.5 h-4.5 rounded-full bg-blue-500 shrink-0"></span>
                <h4 className={`text-base font-black font-cairo ${
                  theme === 'light' ? 'text-slate-850' : 'text-white'
                }`}>
                  {lang === 'ar' ? 'البرمجيات والأنظمة المحسنة' : 'Enhanced Software & Systems'}
                </h4>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 text-[13px] font-bold font-cairo">
                {/* RTL Right side under Arabic / First block */}
                <div className="space-y-3">
                  <a href="#services" className={`flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] hover:text-[#00c272] dark:hover:text-[#00e085] ${
                    theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <span className="text-base shrink-0">📦</span>
                    <span>{lang === 'ar' ? 'مبيعات الكاشير والمستودعات' : 'Point of Sale / POS'}</span>
                  </a>
                  <a href="#services" className={`flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] hover:text-[#00c272] dark:hover:text-[#00e085] ${
                    theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <span className="text-base shrink-0">🏗️</span>
                    <span>{lang === 'ar' ? 'برامج المصانع والورش والإنتاج' : 'Manufacturing & Industry'}</span>
                  </a>
                  <a href="#services" className={`flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] hover:text-[#00c272] dark:hover:text-[#00e085] ${
                    theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <span className="text-base shrink-0">🍕</span>
                    <span>{lang === 'ar' ? 'إدارة المطاعم والكافيهات' : 'Restaurants & Cafes POS'}</span>
                  </a>
                </div>

                {/* RTL Left side under Arabic / Second block */}
                <div className="space-y-3">
                  <a href="#services" className={`flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] hover:text-[#00c272] dark:hover:text-[#00e085] ${
                    theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <span className="text-base shrink-0">👔</span>
                    <span>{lang === 'ar' ? 'شؤون الموظفين والمرتبات' : 'HR & Payroll Systems'}</span>
                  </a>
                  <a href="#services" className={`flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] hover:text-[#00c272] dark:hover:text-[#00e085] ${
                    theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <span className="text-base shrink-0">🏢</span>
                    <span>{lang === 'ar' ? 'المقاولات والعقارات المتكاملة' : 'Contracting & Real Estate'}</span>
                  </a>
                  <a href="#services" className={`flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] hover:text-[#00c272] dark:hover:text-[#00e085] ${
                    theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <span className="text-base shrink-0">📊</span>
                    <span>{lang === 'ar' ? 'النسخة المحاسبية السحابية' : 'Cloud Accounting Version'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 3: Contact Us & Social Links (اتصل بنا والشبكات الاجتماعية) */}
            <div className="lg:col-span-3 space-y-5">
              <div className="flex items-center gap-2 pb-3.5 border-b border-slate-200/80 dark:border-slate-800/50">
                <span className="w-1.5 h-4.5 rounded-full bg-indigo-500 shrink-0"></span>
                <h4 className={`text-base font-black font-cairo ${
                  theme === 'light' ? 'text-slate-850' : 'text-white'
                }`}>
                  {lang === 'ar' ? 'اتصل بنا والشبكات الاجتماعية' : 'Get Connected & Social'}
                </h4>
              </div>
              
              <ul className={`space-y-4 text-xs font-semibold font-cairo ${
                theme === 'light' ? 'text-slate-700' : 'text-slate-350'
              }`}>
                <li className="flex gap-2.5 items-center justify-between hover:text-[#00c272] dark:hover:text-[#00e085] transition-colors duration-300">
                  <div className="flex flex-col items-start font-bold">
                    <span className="text-[10px] text-slate-400 leading-none mb-1">{lang === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia Branch'}</span>
                    <span className="font-mono text-sm tracking-wide" dir="ltr">KSA: +966 550180902</span>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 border border-emerald-500/10">
                    <Phone className="w-4 h-4" />
                  </div>
                </li>
                <li className="flex gap-2.5 items-center justify-between hover:text-cyan-500 transition-colors duration-300">
                  <div className="flex flex-col items-start font-bold">
                    <span className="text-[10px] text-slate-400 leading-none mb-1">{lang === 'ar' ? 'جمهورية مصر العربية' : 'Egypt Office Branch'}</span>
                    <span className="font-mono text-sm tracking-wide" dir="ltr">EGY: +20 1000082722</span>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0 border border-cyan-500/10">
                    <Phone className="w-4 h-4" />
                  </div>
                </li>
                <li className="flex gap-2.5 items-center justify-between hover:text-indigo-500 transition-colors duration-300">
                  <div className="flex flex-col items-start font-bold">
                    <span className="text-[10px] text-slate-400 leading-none mb-1">{lang === 'ar' ? 'البريد الإلكتروني الموحد' : 'Corporate Email Address'}</span>
                    <span className="lowercase font-mono text-[13px]">info@niletechno.com</span>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0 border border-indigo-500/10">
                    <Mail className="w-4 h-4" />
                  </div>
                </li>
              </ul>

              {/* Sophisticated Rounded Square Buttons with Dynamic Hover Colors */}
              <div className="flex gap-3 pt-2 justify-center sm:justify-start">
                <a 
                  href="https://wa.me/+201000082722" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 text-slate-500 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] shadow-sm shadow-emerald-500/5' 
                      : 'bg-[#0b101c] border border-slate-850 text-slate-400 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-lg hover:shadow-[#25D366]/20'
                  }`}
                  title="WhatsApp Support"
                >
                  <MessageSquare className="w-[18px] h-[18px]" />
                </a>
                <a 
                  href="https://www.youtube.com/channel/UCZ76wzqWkF8fW4StPpc9L8A" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 text-slate-500 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] shadow-sm shadow-red-500/5' 
                      : 'bg-[#0b101c] border border-slate-850 text-slate-400 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] hover:shadow-lg hover:shadow-[#FF0000]/20'
                  }`}
                  title="YouTube"
                >
                  <Youtube className="w-[18px] h-[18px]" />
                </a>
                <a 
                  href="https://www.facebook.com/niletechnosoftware?_rdc=1&_rdr#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 text-slate-500 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] shadow-sm shadow-blue-500/5' 
                      : 'bg-[#0b101c] border border-slate-850 text-slate-400 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-lg hover:shadow-[#1877F2]/20'
                  }`}
                  title="Facebook"
                >
                  <Facebook className="w-[18px] h-[18px]" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/niletechno/posts/?feedView=all" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 text-slate-500 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] shadow-sm shadow-blue-650/5' 
                      : 'bg-[#0b101c] border border-slate-850 text-slate-400 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:shadow-lg hover:shadow-[#0A66C2]/20'
                  }`}
                  title="LinkedIn"
                >
                  <Linkedin className="w-[18px] h-[18px]" />
                </a>
              </div>
            </div>

          </div>
          {/* Bottom Footer legal bar */}
          <div className={`pt-8 text-center border-t ${
            theme === 'light' ? 'border-slate-200/80' : 'border-slate-800/50'
          }`}>
            <span className={`text-xs font-cairo font-semibold block tracking-wide ${
              theme === 'light' ? 'text-slate-650' : 'text-slate-400'
            }`}>
              Nile Techno — All rights reserved | 2026 ©
            </span>
          </div>

        </div>
      </footer>

      {/* 12. Floating Ultra-Premium Stacked WhatsApp Capsule Dock */}
      <div className="fixed bottom-6 left-6 z-[100] font-cairo select-none flex flex-col gap-2.5 items-start">
        {/* Saudi Arabia Sales Capsule */}
        <motion.a
          href="https://wa.me/+9660511351059?text=Inquiry%20from%20Nile%2520Techno%2520Web"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -30, y: 15 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className={`group flex items-center justify-between w-[130px] sm:w-[140px] h-[35px] sm:h-[39px] px-2.5 rounded-xl border shadow-[0_10px_25px_rgba(37,211,102,0.08)] backdrop-blur-xl transition-all duration-300 pointer-events-auto ${
            theme === 'light'
              ? 'bg-white/95 border-emerald-100 shadow-emerald-500/5 hover:border-emerald-400 text-slate-800'
              : 'bg-slate-950/90 border-slate-900 shadow-black/80 hover:border-emerald-500/30 text-white'
          }`}
        >
          {/* Real WhatsApp Icon inside the field */}
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#128c7e] to-[#25d366] flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform duration-300 shadow-sm shadow-emerald-500/10">
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 border border-slate-200/20 shadow-inner flex items-center justify-center">
            <img 
              src="https://flagcdn.com/w40/sa.png" 
              alt="KSA" 
              className="w-full h-full object-cover scale-110" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <span className="w-14 text-center text-[10px] sm:text-[11px] font-black tracking-wide font-cairo shrink-0">
            {lang === 'ar' ? 'السعودية' : 'KSA'}
          </span>
          <span className="relative flex h-1.5 w-1.5 select-none shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
        </motion.a>

        {/* Egypt Sales Capsule */}
        <motion.a
          href="https://wa.me/+201000082722?text=Inquiry%20from%20Nile%2520Techno%2520Web"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -30, y: 15 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className={`group flex items-center justify-between w-[130px] sm:w-[140px] h-[35px] sm:h-[39px] px-2.5 rounded-xl border shadow-[0_10px_25px_rgba(37,211,102,0.08)] backdrop-blur-xl transition-all duration-300 pointer-events-auto ${
            theme === 'light'
              ? 'bg-white/95 border-emerald-100 shadow-emerald-500/5 hover:border-emerald-400 text-slate-800'
              : 'bg-slate-950/90 border-slate-900 shadow-black/80 hover:border-emerald-500/30 text-white'
          }`}
        >
          {/* Real WhatsApp Icon inside the field */}
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#128c7e] to-[#25d366] flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform duration-300 shadow-sm shadow-emerald-500/10">
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 border border-slate-200/20 shadow-inner flex items-center justify-center">
            <img 
              src="https://flagcdn.com/w40/eg.png" 
              alt="Egypt" 
              className="w-full h-full object-cover scale-110" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <span className="w-14 text-center text-[10px] sm:text-[11px] font-black tracking-wide font-cairo shrink-0">
            {lang === 'ar' ? 'مصر' : 'Egypt'}
          </span>
          <span className="relative flex h-1.5 w-1.5 select-none shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
        </motion.a>
      </div>

{/* 13. Interactive Success Partners Directory Modal */}
      {showPartnersModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
          onClick={() => setShowPartnersModal(false)}
        >
          <div 
            className={`relative w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-300 ${
              theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0a0f1d] border-slate-800'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`p-4 sm:p-5 border-b flex items-center justify-between gap-4 shrink-0 transition-colors ${
              theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
            }`}>
              <div className="flex items-center gap-2.5 text-cyan-500 min-w-0">
                <div className="p-2 rounded-lg bg-cyan-500/10 shrink-0">
                  <Award className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <h3 className={`text-sm sm:text-base font-extrabold font-cairo truncate ${
                    theme === 'light' ? 'text-slate-950' : 'text-white'
                  }`}>
                    {lang === 'ar' ? 'دليل شركاء النجاح وسابقة الأعمال الكاملة' : 'Nile Techno Certified Partners Directory'}
                  </h3>
                  <p className={`text-[10px] font-cairo hidden sm:block ${
                    theme === 'light' ? 'text-slate-550' : 'text-slate-400'
                  }`}>
                    {lang === 'ar' ? 'تصفح تفاعلي لقائمة عملائنا البالغ عددهم 1,500+ في مختلف القطاعات التجارية والمؤسسية' : 'Interactive exploration catalog for 1,500+ active commercial nodes.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPartnersModal(false)}
                className={`p-1.5 sm:p-2 rounded-full cursor-pointer transition-colors ${
                  theme === 'light' ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-slate-800 text-slate-400'
                }`}
                title={lang === 'ar' ? 'إغلاق الكتالوج' : 'Close Catalog'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Search and Filter Directory */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 overscroll-y-contain" style={{ overscrollBehaviorY: 'contain' }}>
              
              {/* Context Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 text-center">
                {[
                  { val: '1,500+', labelAr: 'مؤسسة مفعلة', labelEn: 'Active servers', descAr: 'ثقة وتواجد إقليمي', descEn: 'Regional deployment trust' },
                  { val: '15 +', labelAr: 'عام من الابتكار والنجاح', labelEn: 'Years of Dev operations', descAr: 'منذ عام 2010 م', descEn: 'Inception 2010' },
                  { val: '36 +', labelAr: 'عميل مسجل ونشاط معتمد', labelEn: 'Verified Case Studies', descAr: 'متصلون بأحدث التقنيات', descEn: 'Enterprise trust nodes' },
                  { val: '99.4%', labelAr: 'نسبة الرضا عن الدعم الفني', labelEn: 'Quality support rating', descAr: 'متكامل ومستمر', descEn: 'Peak financial support' }
                ].map((item, idx) => (
                  <div key={idx} className={`p-3.5 rounded-2xl border transition-colors ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-800/80'
                  }`}>
                    <div className="text-lg sm:text-xl font-extrabold text-cyan-500 font-mono mb-0.5">{item.val}</div>
                    <div className={`text-[10px] font-bold font-cairo mb-0.5 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>{lang === 'ar' ? item.labelAr : item.labelEn}</div>
                    <div className="text-[9px] font-cairo text-slate-450">{lang === 'ar' ? item.descAr : item.descEn}</div>
                  </div>
                ))}
              </div>

              {/* Filtering Segment */}
              {/* Optimized Filtering Segment - Prioritizing Category Tabs Visibility */}
              <div className={`rounded-2xl p-2.5 sm:p-3 border flex flex-row items-center justify-between gap-3 transition-colors ${
                theme === 'light' ? 'bg-slate-50/80 border-slate-200' : 'bg-[#0a0f1d] border-slate-800/80'
              }`}>
                {/* Scrollable Selector Tabs with navigation slider */}
                <div className="relative flex-1 min-w-0 group/tabs flex items-center px-6">
                  {/* Left scroll arrow */}
                  <button
                    onClick={() => {
                      if (modalTabsContainerRef.current) {
                        modalTabsContainerRef.current.scrollBy({ left: -180, behavior: 'smooth' });
                      }
                    }}
                    type="button"
                    className={`absolute left-0 z-10 p-1 rounded-full border shadow-sm cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center ${
                      theme === 'light' 
                        ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:text-cyan-550' 
                        : 'bg-[#0f172a] border-slate-800 text-cyan-450 hover:bg-slate-800 hover:text-white'
                    }`}
                    title={lang === 'ar' ? 'السابق' : 'Previous'}
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </button>

                  <div 
                    ref={modalTabsContainerRef}
                    className="flex-1 flex items-center gap-1 overflow-x-auto pb-0.5 max-w-full scrollbar-none overscroll-x-contain scroll-smooth" 
                    style={{ overscrollBehaviorX: 'contain' }}
                  >
                    {[
                      { id: 'all', ar: '📌 الكل', en: '📌 All' },
                      { id: 'ksa', ar: '🇸🇦 السعودية', en: '🇸🇦 KSA' },
                      { id: 'import_export', ar: '📦 الاستيراد والتصدير', en: '📦 Import & Export' },
                      { id: 'hospitality', ar: '☕ الكافيهات والمطاعم', en: '☕ Cafes & Restaurants' },
                      { id: 'malls_houseware', ar: '🛍️ المولات والأدوات المنزلية', en: '🛍️ Malls & Homewares' },
                      { id: 'mills_feed', ar: '🌾 مصانع الأعلاف والمطاحن', en: '🌾 Feed Mills' },
                      { id: 'contracting', ar: '🏗️ شركات المقاولات', en: '🏗️ Contracting' },
                      { id: 'jewelry', ar: '💎 محلات المجوهرات', en: '💎 Jewelry & Gold' },
                      { id: 'agencies_wholesale', ar: '🤝 التوكيلات والجملة', en: '🤝 Wholesale Agencies' },
                      { id: 'car_showrooms', ar: '🚗 معارض السيارات', en: '🚗 Car Showrooms' },
                      { id: 'pharma', ar: '💊 شركات الأدوية', en: '💊 Pharmaceuticals' },
                      { id: 'herbs_spices', ar: '🌿 شركات العطارة', en: '🌿 Herbs & Spices' },
                      { id: 'factories', ar: '🏭 المصانع والإنتاج الكبرى', en: '🏭 Factories' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setPartnerActiveTab(tab.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold whitespace-nowrap cursor-pointer transition-all duration-300 font-cairo ${
                          partnerActiveTab === tab.id
                            ? 'bg-cyan-500 text-white dark:text-slate-950 shadow-[0_4px_12px_rgba(6,182,212,0.2)] font-black scale-[1.02]'
                            : (theme === 'light' ? 'bg-white border border-slate-200/60 text-slate-650 hover:text-slate-950 hover:bg-slate-100' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white')
                        }`}
                      >
                        {lang === 'ar' ? tab.ar : tab.en}
                      </button>
                    ))}
                  </div>

                  {/* Right scroll arrow */}
                  <button
                    onClick={() => {
                      if (modalTabsContainerRef.current) {
                        modalTabsContainerRef.current.scrollBy({ left: 180, behavior: 'smooth' });
                      }
                    }}
                    type="button"
                    className={`absolute right-0 z-10 p-1 rounded-full border shadow-sm cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center ${
                      theme === 'light' 
                        ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:text-cyan-550' 
                        : 'bg-[#0f172a] border-slate-800 text-cyan-450 hover:bg-slate-800 hover:text-white'
                    }`}
                    title={lang === 'ar' ? 'التالي' : 'Next'}
                  >
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Highly Compact Minimal Search Pill */}
                <div className="relative w-24 sm:w-36 md:w-40 lg:w-44 flex-shrink-0">
                  <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    value={partnerSearchInput}
                    onChange={(e) => setPartnerSearchInput(e.target.value)}
                    placeholder={lang === 'ar' ? 'البحث السريع...' : 'Quick Search...'}
                    className={`w-full pl-2 pr-7 py-1 rounded-md border text-[10.5px] font-cairo outline-none focus:border-cyan-500 transition-colors ${
                      theme === 'light' ? 'bg-white border-slate-200 text-slate-800 placeholder-slate-450' : 'bg-[#04080f] border-slate-800/80 text-white placeholder-slate-500'
                    }`}
                  />
                  {partnerSearchInput && (
                    <button
                      onClick={() => setPartnerSearchInput('')}
                      className="absolute left-1.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-200 rounded-full"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Dynamic View Representation - Simplified to beautiful grid-only presentation */}
              {filteredPartners.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center pt-4">
                  {filteredPartners.map((partner) => (
                    <div 
                      key={partner.id} 
                      title={lang === 'ar' ? `${partner.nameAr} - ${partner.industryAr}` : `${partner.nameEn} - ${partner.industryEn}`}
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border hover:border-cyan-550/40 transition-all flex items-center justify-center p-3 relative overflow-hidden group ${
                        theme === 'light' ? 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1' : 'bg-slate-900/10 border border-slate-800/80 hover:bg-slate-900/40 hover:-translate-y-1'
                      }`}
                    >
                      {/* Logo container centered perfectly */}
                      <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <PartnerLogo partner={partner} theme={theme} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-14 text-center space-y-3">
                  <Users className="w-10 h-10 text-slate-600 mx-auto" />
                  <h5 className="text-xs font-bold text-slate-400 font-cairo">
                    {lang === 'ar' ? 'لم يتم العثور على شركاء يطابقون تصفيتك' : 'No clients match your filter criteria'}
                  </h5>
                  <button
                    onClick={() => { setPartnerSearchInput(''); setPartnerActiveTab('all'); }}
                    type="button"
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-450 text-[11px] font-bold cursor-pointer font-cairo transition-colors"
                  >
                    {lang === 'ar' ? 'إعادة ضبط عوامل التصفية' : 'Reset Search Filters'}
                  </button>
                </div>
              )}

            </div>

            {/* Modal Footer CTA */}
            <div className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3.5 shrink-0 transition-colors ${
              theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-805'
            }`}>
              <span className="text-[9px] sm:text-[10px] text-slate-450 font-cairo">
                {lang === 'ar' ? '* لمزيد من دراسات الحالة المفصلة، تواصل بشكل مباشر مع شريك الدعم الفني والمبيعات' : '* Contact Support directly to see live models of systems deployment.'}
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a 
                  href="https://wa.me/201000082722" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#128c7e] via-[#25d366] to-[#34af23] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto shadow-lg shadow-emerald-500/25 dark:shadow-emerald-900/40 hover:shadow-xl hover:shadow-emerald-500/45 hover:-translate-y-0.5 hover:scale-[1.04] active:scale-95 cursor-pointer border border-emerald-400/20"
                >
                  {/* Glowing Active indicator */}
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-100"></span>
                  </span>

                  {/* Real Official High-Quality Certified WhatsApp Vector Glyph */}
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>{lang === 'ar' ? 'واتساب مبيعات مصر' : 'Egypt Sales WhatsApp'}</span>
                </a>
                <button
                  onClick={() => setShowPartnersModal(false)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors w-full sm:w-auto text-center ${
                    theme === 'light' ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {lang === 'ar' ? 'إغلاق الدليل' : 'Close'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 13. YouTube Overlay Video Lightbox Modal */}
      {videoModal.isOpen && (
        <div 
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-md animate-fade-in cursor-default ${
            videoSize === 'fullscreen' ? 'p-0' : 'p-3 sm:p-6'
          }`}
          onClick={() => setVideoModal({ isOpen: false, videoUrl: '', title: '' })}
        >
          <div 
            className={`relative bg-[#0b0f19] shadow-2xl overflow-hidden flex flex-col cursor-default font-cairo transition-all duration-300 ${
              videoSize === 'small' 
                ? 'max-w-2xl w-[92vw] border border-slate-800/80 rounded-2xl' 
                : videoSize === 'medium' 
                ? 'max-w-4xl w-[92vw] border border-slate-800/80 rounded-2xl' 
                : videoSize === 'large' 
                ? 'max-w-5xl md:max-w-6xl w-[95vw] border border-slate-800/80 rounded-2xl' 
                : 'max-w-full w-screen h-screen rounded-none border-0'
            }`}
            style={{ maxHeight: videoSize === 'fullscreen' ? '100vh' : '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal headers */}
            <div className={`p-4 px-5 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between gap-4 shrink-0 transition-colors duration-300 ${videoSize === 'fullscreen' ? 'py-3' : ''}`}>
              <div className="flex items-center gap-2 text-cyan-400 min-w-0">
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400 shrink-0 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold truncate">
                  {videoModal.title}
                </span>
                {videoSize === 'fullscreen' && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 uppercase tracking-wider shrink-0 animate-pulse">
                    {lang === 'ar' ? 'ملء الشاشة 🖥️' : 'Fullscreen'}
                  </span>
                )}
              </div>
              <button
                onClick={() => setVideoModal({ isOpen: false, videoUrl: '', title: '' })}
                className="p-1.5 px-3 rounded-xl bg-red-600/95 hover:bg-red-750 text-white border border-red-500/20 transition-all cursor-pointer text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-lg active:scale-95"
                title={lang === 'ar' ? 'إغلاق الفيديو' : 'Close Video'}
              >
                <X className="w-4 h-4 stroke-[2.5]" /> 
                <span>{lang === 'ar' ? 'إغلاق' : 'Close'}</span>
              </button>
            </div>

            {/* Sizing Control Bar */}
            <div className="px-5 py-2.5 bg-slate-900/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0 select-none">
              <div className="flex items-center gap-1.5 text-slate-300 font-bold">
                <span className="text-[14px]">📐</span>
                <span>{lang === 'ar' ? 'التحكم في حجم مشغل الفيديو:' : 'Adjust Video Player Size:'}</span>
              </div>
              <div className="flex flex-wrap items-center gap-1 bg-black/40 p-1 rounded-xl border border-slate-800/60 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setVideoSize('small')}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    videoSize === 'small'
                      ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {lang === 'ar' ? 'صغير' : 'Small'}
                </button>
                <button
                  type="button"
                  onClick={() => setVideoSize('medium')}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    videoSize === 'medium'
                      ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {lang === 'ar' ? 'متوسط' : 'Medium'}
                </button>
                <button
                  type="button"
                  onClick={() => setVideoSize('large')}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    videoSize === 'large'
                      ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {lang === 'ar' ? 'مسرحي 🎬' : 'Theater 🎬'}
                </button>
                <button
                  type="button"
                  onClick={() => setVideoSize('fullscreen')}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    videoSize === 'fullscreen'
                      ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md'
                      : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
                  }`}
                >
                  <span>📺</span>
                  <span>{lang === 'ar' ? 'شاشة كاملة' : 'Full Screen'}</span>
                </button>
              </div>
            </div>

            {/* Video viewport aspect ratio */}
            <div className={`relative bg-black w-full flex-1 ${videoSize === 'fullscreen' ? 'h-full' : 'aspect-video mx-auto'}`}>
              <iframe
                title={`${lang === 'ar' ? 'مشغل فيديو منتجات نايل تكنو' : 'Nile Techno video presentation display player'} - ${videoModal.title}`}
                src={videoModal.videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen={true}
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>

            {videoSize !== 'fullscreen' && (
              <div className="p-3 bg-slate-900/60 text-[9px] sm:text-[10px] text-slate-400 text-center font-cairo border-t border-slate-800/50">
                {lang === 'ar' 
                  ? '💡 يمكن التحكم المدمج أعلاه بتكبير أو تصغير نافذة المشغل لتناسب حجم شاشتك بالكامل.' 
                  : '💡 You can use the buttons above to scale the player to small, medium, theater layout, or enter full browser window mode.'}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
    </ErrorBoundary>
  );
}