import React, { lazy, Suspense, useState, useEffect, useMemo } from 'react';
import { 
  SERVICE_MODULES, 
  MOBILE_APPS, 
  BRANCHES_DATA, 
  SUCCESS_PARTNERS, 
  TRANSLATIONS 
} from './data';
const loadLeadCalculator = () => import('./components/LeadCalculator.jsx');
const loadEInvoiceDemo = () => import('./components/EInvoiceDemo.jsx');
const LeadCalculator = lazy(loadLeadCalculator);
const EInvoiceDemo = lazy(loadEInvoiceDemo);
import { IconComponent, NileTechnoLogo } from './components/site/BrandVisuals';
import { SectionSeparator } from './components/site/SectionSeparator';
import { ThemeToggle } from './components/site/ThemeToggle';
import { InteractiveConsole } from './components/sections/InteractiveConsole';
import { HeroSection } from './components/sections/HeroSection';
import { ModernSystemsShowcase } from './components/sections/ModernSystemsShowcase';
import { ModernMobileShowcase } from './components/sections/ModernMobileShowcase';
import { PartnersSection } from './components/sections/PartnersSection';
import { BranchesSection } from './components/sections/BranchesSection';
import PartnersDirectoryModal from './components/modals/PartnersDirectoryModal';
const VideoModal = lazy(() => import('./components/VideoModal.jsx'));
import { motion, AnimatePresence } from 'motion/react';
import {
  Award, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Facebook, Globe, Linkedin, Mail,
  Menu, MessageSquare, Phone, Play, Search, Send, ShieldCheck, Smartphone, Target, Calculator, SlidersHorizontal, Users,
  X, Youtube, Sun, Moon, AlertTriangle
} from 'lucide-react';
import companyLogo from './assets/images/logo.webp';

const logoTransparentWebp = companyLogo;

// Import E-Invoicing Section Images
import zatcaImage from './assets/images/modalLogo.png';
import etaImage from './assets/images/699.webp';

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
              <AlertTriangle className="w-8 h-8 text-red-500" />
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
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchInput]);

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
  const [activeSection, setActiveSection] = useState('home');
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ids = ['home', 'about', 'services', 'mobile-apps', 'einvoicing', 'customers', 'contact'];
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActiveSection(visible.target.id);
    }, { rootMargin: '-24% 0px -58% 0px', threshold: [0.05, 0.2, 0.5] });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, href) => {
    if (href === '#customers') {
      e.preventDefault();
      setShowPartnersModal(true);
      if (mobileMenuOpen) setMobileMenuOpen(false);
      return;
    }
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        // Precise offset to align beautifully under the fixed header with ample margin
        const headerOffset = scrolled ? 68 : 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        window.history.pushState(null, '', href);
      }
      if (mobileMenuOpen) setMobileMenuOpen(false);
    }
  };

  const [hasInteractedWithPlatforms, setHasInteractedWithPlatforms] = useState(false);

  useEffect(() => {
    if (isHoveredPlatforms) return;
    const interval = setInterval(() => {
      setActivePlatformIndex((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHoveredPlatforms]);

  // Video Lightbox Modal State
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    videoUrl: '',
    title: ''
  });

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
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(true);

  const handleSelectAppForQuote = (appId) => {
    setFormData(prev => ({
      ...prev,
      interestedModules: prev.interestedModules.includes(appId)
        ? prev.interestedModules
        : [...prev.interestedModules, appId]
    }));
  };

  const t = TRANSLATIONS[lang];

  // Apply language state to HTML-tag direction and document title for SEO
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.title = lang === 'ar'
      ? 'نايل تكنو للبرمجيات وأنظمة ERP السحابية | Nile Techno Software'
      : 'Nile Techno for Software & Cloud ERP Systems | Official';
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

  // Prevent background scrolling cleanly when a modal is open without locking html documentElement
  useEffect(() => {
    if (showPartnersModal || videoModal.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
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
    const messageText = `رسالة واردة من الموقع الرسمي لشركة نايل تكنو للبرمجيات.

السلام عليكم ورحمة الله وبركاته،

أرغب في الاستفسار عن حلول شركة نايل تكنو للبرمجيات.

الاسم: ${cleanName}
رقم الهاتف: ${cleanPhone}
البريد الإلكتروني: ${cleanEmail || 'غير متوفر'}
اسم المؤسسة: ${cleanCompanyName || 'غير متوفر'}
الأنظمة محل الاهتمام: ${modulesText}
تفاصيل الاستفسار: ${cleanMessage || 'أرغب في الحصول على معلومات عن الحلول البرمجية المناسبة لنشاطي.'}`;

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
          <div className={`flex justify-between items-center flex-row-reverse lg:flex-row transition-all duration-300 ${scrolled ? 'h-13 sm:h-14' : 'h-14 sm:h-15'}`}>
            
            {/* Corporate Logo Emblem using high-performance vector component */}
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="cursor-pointer">
              <NileTechnoLogo 
                theme={theme} 
                lang={lang} 
                className={scrolled ? "h-8 sm:h-8.5 md:h-9 w-auto object-contain transition-all duration-300" : "h-8.5 sm:h-9 md:h-10 w-auto object-contain transition-all duration-300"}
              />
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-5">
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
                  className={`nav-link-premium text-[11px] sm:text-xs font-bold font-cairo py-1 px-1.5 transition-colors duration-200 uppercase tracking-wide ${
                    activeSection === link.href.slice(1) ? 'nav-link-active' : ''
                  } ${
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
            <div className="flex items-center gap-2">
              
              {/* Persistent Theme Toggle Component */}
              <ThemeToggle 
                theme={theme} 
                setTheme={setTheme} 
                lang={lang} 
                className="order-3 lg:order-1" 
              />

              {/* Language Switch button */}
              <button 
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className={`min-h-[36px] flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-bold transition-all cursor-pointer order-2 lg:order-2 ${
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
                className={`lg:hidden min-w-[38px] min-h-[38px] flex items-center justify-center p-2 rounded-xl border transition-colors cursor-pointer order-1 lg:order-3 ${
                  theme === 'light'
                    ? 'bg-slate-100 border-slate-300 text-slate-600 hover:text-slate-900'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
                aria-label={lang === 'ar' ? 'عرض القائمة المنسدلة للأجهزة الذكية' : 'Toggle mobile drawer menu options'}
              >
                {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
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
                className={`nav-link-premium min-h-[44px] flex items-center text-sm font-bold py-2.5 px-3 rounded-lg transition-colors ${
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

      {/* Decorative Separator: Hero -> About */}
      <SectionSeparator theme={theme} />

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
                      theme === 'light' ? 'text-slate-500' : 'text-slate-400'
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
                  className={`min-h-[44px] flex items-center justify-center py-2.5 px-3 rounded-lg text-xs font-bold transition-all text-center font-cairo cursor-pointer ${
                    aboutActivePanel === 'vision'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                      : (theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white')
                  }`}
                >
                  {t.visionTab}
                </button>
                <button
                  onClick={() => setAboutActivePanel('mission')}
                  className={`min-h-[44px] flex items-center justify-center py-2.5 px-3 rounded-lg text-xs font-bold transition-all text-center font-cairo cursor-pointer ${
                    aboutActivePanel === 'mission'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
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
                  <span className="inline-flex p-2.5 rounded-lg bg-cyan-500/10 text-cyan-500 mb-2">
                    <Target className="w-6 h-6" />
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

      {/* Decorative Separator: About -> E-Invoice */}
      <SectionSeparator theme={theme} />

      {/* 4. Complete E-Invoicing Section */}
      <section id="einvoicing" className={`pt-12 pb-1 relative transition-all duration-500 border-t border-b ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-slate-100/30 via-cyan-50/15 to-white border-slate-150' 
          : 'bg-gradient-to-b from-[#070d1e] to-[#050917] border-slate-900'
      }`}>
        <div className="absolute inset-0 bg-[radial-gradient(#0b72c908_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
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
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain select-none"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mt-2.5">
                    <img loading="lazy" decoding="async" src="https://flagcdn.com/w20/eg.png" alt="Egypt flag" className="w-4 h-3 object-cover rounded-sm border border-slate-200/50" referrerPolicy="no-referrer" />
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
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain select-none"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mt-2.5">
                    <img loading="lazy" decoding="async" src="https://flagcdn.com/w20/sa.png" alt="KSA flag" className="w-4 h-3 object-cover rounded-sm border border-slate-200/50" referrerPolicy="no-referrer" />
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
              <Suspense fallback={<div className="min-h-[420px] rounded-3xl bg-slate-100/50 dark:bg-slate-900/50 animate-pulse" />}>
                <EInvoiceDemo lang={lang} theme={theme} />
              </Suspense>
            </div>

          </div>

        </div>
      </section>

      {/* Decorative Separator: E-Invoice -> Services */}
      <SectionSeparator theme={theme} />

      {/* 5. Software Systems Grid Showcase */}
      <section id="services" className={`pt-4 pb-16 relative border-t transition-all duration-500 ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-white via-slate-50/60 to-white border-slate-150' 
          : 'bg-gradient-to-b from-[#050917] via-[#091122] to-[#040814] border-slate-900'
      }`}>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
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

          <ModernSystemsShowcase
            lang={lang}
            theme={theme}
            t={t}
            modules={SERVICE_MODULES}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            handleOpenVideo={handleOpenVideo}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </section>

      {/* Decorative Separator: Services -> Mobile Apps */}
      <SectionSeparator theme={theme} />

      {/* 6. Modern Mobile Applications Studio Section */}
      <section id="mobile-apps" className={`py-12 sm:py-16 relative transition-all duration-500 border-t border-b ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-white via-cyan-50/15 to-slate-50 border-slate-150' 
          : 'bg-gradient-to-b from-[#040814] to-[#080e1b] border-slate-900'
      }`}>
        <div className="absolute inset-0 bg-[radial-gradient(#0b72c908_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-10 w-80 h-80 bg-blue-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold mb-4 font-cairo border border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Smartphone className="w-3.5 h-3.5 shrink-0" />
              <span>{lang === 'ar' ? 'حلول الهواتف الذكية وتطبيقات أندرويد و iOS' : 'Hybrid Mobile Companion Apps'}</span>
            </div>
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

          <ModernMobileShowcase
            lang={lang}
            theme={theme}
            mobileApps={MOBILE_APPS}
            onSelectAppForQuote={handleSelectAppForQuote}
            formData={formData}
          />
        </div>
      </section>

      {/* 7. Consultation Lead Calculator Section (Collapsible & Expandable) */}
      <section id="consulting" className={`py-12 sm:py-16 relative transition-all duration-500 border-t border-b ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-slate-50 via-white to-slate-100/30 border-slate-200' 
          : 'bg-gradient-to-b from-[#080e1b] to-[#060c18] border-slate-900'
      }`}>
        <div className="absolute inset-0 bg-[radial-gradient(#cbd2db_0.8px,transparent_0.8px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40"></div>
        <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold mb-4 font-cairo border border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Calculator className="w-3.5 h-3.5 shrink-0" />
              <span>{lang === 'ar' ? 'استشارة برمجية سريعة' : 'Instant ERP Advisory'}</span>
            </div>
            <h2 className={`text-2xl sm:text-3.5xl font-extrabold font-cairo mb-3 uppercase tracking-wide ${
              theme === 'light' ? 'text-slate-950' : 'text-white'
            }`}>
              {lang === 'ar' ? 'هل أنت محتار؟ اختر النظام الملائم الآن' : 'Unsure of What Fits Your Business Scale?'}
            </h2>
            <p className={`text-xs sm:text-sm font-cairo max-w-2xl mx-auto ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {lang === 'ar' ? 'استخدم حاسبتنا الذكية لتقدير النطاق والأنظمة المتكاملة المطلوبة لقطاع نشاطك فوراً وبخطوة واحدة!' : 'Enter your parameters to see recommended packages tailored specifically for your operational target.'}
            </p>
          </div>

          {/* Unified Elegant Collapsible Container */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait" initial={false}>
              {isCalculatorOpen ? (
                <motion.div
                  key="calculator-open-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  {/* Top Active Bar with Close Control */}
                  <div className={`p-4 sm:p-5 rounded-2xl border flex items-center justify-between gap-4 transition-colors ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 shadow-sm' 
                      : 'bg-slate-900/90 border-slate-800 shadow-md'
                  }`}>
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Calculator className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold font-cairo ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                            {lang === 'ar' ? 'مستشار اختيار وتخصيص النظام المناسب' : 'Smart Solution & Package Finder'}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>{lang === 'ar' ? 'نشط الآن' : 'Active'}</span>
                          </span>
                        </div>
                        <p className={`text-[11px] font-cairo mt-0.5 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                          {lang === 'ar' ? 'قم بتحديد بيانات نشاطك بالأسفل ثم انقر زر الاستشارة عبر واتساب' : 'Select your sector and scale to reveal instant package recommendations'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCalculatorOpen(false)}
                      className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold font-cairo flex items-center gap-2 cursor-pointer transition-all shrink-0 ${
                        theme === 'light' 
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200' 
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <span>{lang === 'ar' ? 'طي وإخفاء الحاسبة' : 'Collapse Calculator'}</span>
                      <ChevronUp className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Calculator Body */}
                  <Suspense fallback={<div className="min-h-[520px] rounded-3xl bg-slate-100/50 dark:bg-slate-900/50 animate-pulse" />}>
                    <LeadCalculator lang={lang} theme={theme} />
                  </Suspense>

                  {/* Bottom Collapse Button for effortless UX */}
                  <div className="pt-2 flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCalculatorOpen(false);
                        const el = document.getElementById('consulting');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`min-h-[44px] px-6 py-2.5 rounded-xl text-xs font-bold font-cairo flex items-center gap-2 cursor-pointer transition-all shadow-sm ${
                        theme === 'light' 
                          ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200' 
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                      }`}
                    >
                      <ChevronUp className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'طي وإخفاء الحاسبة التفاعلية' : 'Collapse Calculator'}</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="calculator-closed-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setIsCalculatorOpen(true)}
                  className={`group p-6 sm:p-8 rounded-3xl border cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.006] ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 hover:border-cyan-400 shadow-slate-200/50' 
                      : 'bg-gradient-to-br from-[#091224] to-[#0c1830] border-slate-800 hover:border-cyan-500/60 shadow-slate-950/60'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4 text-right">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
                        <Calculator className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <h3 className={`text-lg sm:text-xl font-bold font-cairo ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                            {lang === 'ar' ? 'مستشار اختيار وتخصيص النظام المناسب' : 'Interactive Scope & Pricing Estimator'}
                          </h3>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                            <SlidersHorizontal className="w-3 h-3" />
                            <span>{lang === 'ar' ? 'أداة تفاعلية سريعة' : 'Instant Tool'}</span>
                          </span>
                        </div>
                        <p className={`text-xs sm:text-sm font-cairo leading-relaxed max-w-xl ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                          {lang === 'ar' 
                            ? 'حدد نشاطك وحجم فروعك لاكتشاف النظام المقترح مع تفاصيل الموديولات وإمكانية طلب عرض السعر فوراً عبر واتساب.' 
                            : 'Select your sector and operational scale to view suggested modules and receive a dedicated advisory plan via WhatsApp.'}
                        </p>
                      </div>
                    </div>

                    <div className="w-full md:w-auto shrink-0 flex items-center justify-end">
                      <div className="w-full md:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm font-cairo flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 transition-all duration-200 group-hover:scale-[1.02]">
                        <span>{lang === 'ar' ? 'فتح واستخدام الحاسبة التفاعلية' : 'Expand Interactive Calculator'}</span>
                        <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
                      className={`w-full min-h-[44px] text-xs px-4 py-3 rounded-xl border focus:border-cyan-500 font-cairo transition-all ${
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
                      className={`w-full min-h-[44px] text-xs px-4 py-3 rounded-xl border focus:border-cyan-500 font-mono transition-all ${
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
                      className={`w-full min-h-[44px] text-xs px-4 py-3 rounded-xl border focus:border-cyan-500 font-mono transition-all ${
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
                      className={`w-full min-h-[44px] text-xs px-4 py-3 rounded-xl border focus:border-cyan-500 font-cairo transition-all ${
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
                          className={`min-h-[44px] flex items-center gap-2 p-2.5 rounded-xl border text-right transition-all cursor-pointer font-cairo ${
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
                      ? '* عند النقر على إرسال، يتم تجهيز رسالة تفصيلية منظمة بطلبك وتوجيهك مباشرة إلى محادثة واتساب الرسمية لخدمة العملاء.'
                      : '* Clicking submit prepares a structured WhatsApp inquiry directing you directly to our official client support desk.'}
                  </p>
                  <button
                    type="submit"
                    aria-label={lang === 'ar' ? 'إرسال الطلب عبر واتساب' : 'Send via WhatsApp'}
                    className="w-full sm:w-auto min-h-[44px] px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer font-cairo"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'إرسال الطلب عبر واتساب' : 'Send Inquiry via WhatsApp'}</span>
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
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain p-4 select-none transition-transform duration-350 group-hover:scale-[1.06]"
                  onError={(e) => {
                    e.target.src = logoTransparentWebp;
                  }}
                />
              </div>
            </div>

            {/* Complex systems group tagline */}
            <div className="flex items-center justify-center gap-2 mb-4 px-4 max-w-4xl flex-wrap">
              <ShieldCheck className="w-5 h-5 text-[#00c272] shrink-0" />
              <h3 className={`text-base sm:text-lg md:text-[20px] font-black tracking-wide leading-relaxed text-center ${
                theme === 'light' ? 'text-slate-800 font-cairo' : 'text-white font-cairo'
              }`}>
                <span className="font-mono uppercase tracking-wider">Nile Techno Complex Systems Group</span>
                <span className="mx-2 text-[#00c272]">•</span>
                <span>{lang === 'ar' ? 'مجموعة نايل تكنو للأنظمة البرمجية المتكاملة' : 'Integrated Enterprise Software Group'}</span>
              </h3>
              <ShieldCheck className="w-5 h-5 text-[#00c272] shrink-0" />
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
                  theme === 'light' ? 'text-slate-800' : 'text-white'
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
                  theme === 'light' ? 'text-slate-800' : 'text-white'
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
                  theme === 'light' ? 'text-slate-800' : 'text-white'
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
                    <span className="font-mono text-sm tracking-wide" dir="ltr">KSA: +966 51 135 1059</span>
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
                  href={`https://wa.me/+201000082722?text=${encodeURIComponent('رسالة واردة من الموقع الرسمي لشركة نايل تكنو للبرمجيات.\n\nالسلام عليكم ورحمة الله وبركاته، أرغب في التواصل مع فريق المبيعات والاستفسار عن الحلول المناسبة لنشاطي.')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Support"
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 text-slate-500 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] shadow-sm shadow-emerald-500/5' 
                      : 'bg-[#0b101c] border border-slate-800 text-slate-400 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-lg hover:shadow-[#25D366]/20'
                  }`}
                  title="WhatsApp Support"
                >
                  <MessageSquare className="w-[18px] h-[18px]" />
                </a>
                <a 
                  href="https://www.youtube.com/channel/UCZ76wzqWkF8fW4StPpc9L8A" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 text-slate-500 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] shadow-sm shadow-red-500/5' 
                      : 'bg-[#0b101c] border border-slate-800 text-slate-400 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] hover:shadow-lg hover:shadow-[#FF0000]/20'
                  }`}
                  title="YouTube"
                >
                  <Youtube className="w-[18px] h-[18px]" />
                </a>
                <a 
                  href="https://www.facebook.com/niletechnosoftware?_rdc=1&_rdr#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Facebook Page"
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 text-slate-500 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] shadow-sm shadow-blue-500/5' 
                      : 'bg-[#0b101c] border border-slate-800 text-slate-400 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-lg hover:shadow-[#1877F2]/20'
                  }`}
                  title="Facebook"
                >
                  <Facebook className="w-[18px] h-[18px]" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/niletechno/posts/?feedView=all" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 text-slate-500 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] shadow-sm shadow-blue-650/5' 
                      : 'bg-[#0b101c] border border-slate-800 text-slate-400 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:shadow-lg hover:shadow-[#0A66C2]/20'
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
          href={`https://wa.me/+966511351059?text=${encodeURIComponent('رسالة واردة من الموقع الرسمي لشركة نايل تكنو للبرمجيات.\n\nالسلام عليكم ورحمة الله وبركاته، أرغب في الاستفسار عن الحلول البرمجية المناسبة لنشاطي.')}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -30, y: 15 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className={`group flex items-center justify-between w-[136px] sm:w-[144px] min-h-[44px] h-[44px] px-3 rounded-xl border shadow-[0_10px_25px_rgba(37,211,102,0.08)] backdrop-blur-xl transition-all duration-300 pointer-events-auto ${
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
          href={`https://wa.me/+201000082722?text=${encodeURIComponent('رسالة واردة من الموقع الرسمي لشركة نايل تكنو للبرمجيات.\n\nالسلام عليكم ورحمة الله وبركاته، أرغب في الاستفسار عن الحلول البرمجية المناسبة لنشاطي.')}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -30, y: 15 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className={`group flex items-center justify-between w-[136px] sm:w-[144px] min-h-[44px] h-[44px] px-3 rounded-xl border shadow-[0_10px_25px_rgba(37,211,102,0.08)] backdrop-blur-xl transition-all duration-300 pointer-events-auto ${
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
      <PartnersDirectoryModal
        isOpen={showPartnersModal}
        onClose={() => setShowPartnersModal(false)}
        lang={lang}
        theme={theme}
      />

      <Suspense fallback={null}>
        <VideoModal
          lang={lang}
          videoModal={videoModal}
          onClose={() => setVideoModal({ isOpen: false, videoUrl: '', title: '' })}
        />
      </Suspense>

    </div>
    </ErrorBoundary>
  );
}
