import { lazy, Suspense, useState, useEffect, useMemo } from 'react';
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
import WhatsAppIcon from './components/site/WhatsAppIcon';
import { ThemeToggle } from './components/site/ThemeToggle';
import { InteractiveConsole } from './components/sections/InteractiveConsole';
import { HeroSection } from './components/sections/HeroSection';
import { ModernSystemsShowcase } from './components/sections/ModernSystemsShowcase';
import { ModernMobileShowcase, AppleIcon, AndroidIcon } from './components/sections/ModernMobileShowcase';
import { PartnersSection } from './components/sections/PartnersSection';
import { BranchesSection } from './components/sections/BranchesSection';
import PartnersDirectoryModal from './components/modals/PartnersDirectoryModal';
import { Reveal } from './components/site/ScrollExperience';
import { ScrollProgressBar } from './components/site/ScrollProgressBar';
import { useActiveSection } from './hooks/useActiveSection';
const VideoModal = lazy(() => import('./components/VideoModal.jsx'));
import { motion, AnimatePresence } from 'motion/react';
import {
  Award, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Facebook, Globe, Linkedin, Mail,
  Menu, MessageSquare, Monitor, Phone, Play, Search, Send, ShieldCheck, Smartphone, Target, Calculator, Users,
  X, Youtube, Sun, Moon
} from 'lucide-react';

// Import E-Invoicing Section Images
import zatcaImage from './assets/images/modalLogo.png';
import etaImage from './assets/images/699.webp';

// Single source of truth for the navbar: each id must match a section id in the page.
const NAV_SECTIONS = [
  { id: 'home', labelKey: 'navHome' },
  { id: 'about', labelKey: 'navAbout' },
  { id: 'einvoicing', labelKey: 'navEinvoice' },
  { id: 'services', labelKey: 'navServices' },
  { id: 'mobile-apps', labelKey: 'navMobile' },
  { id: 'consulting', labelKey: 'navGuide' },
  { id: 'customers', labelKey: 'navCustomers' },
  { id: 'contact', labelKey: 'navContact' },
];
const NAV_SECTION_IDS = NAV_SECTIONS.map(({ id }) => id);

function SectionDivider({ theme }) {
  return (
    <div
      className={`section-divider ${theme === 'light' ? 'section-divider-light' : 'section-divider-dark'}`}
      aria-hidden="true"
    >
      <span className="section-divider-line" />
      <span className="section-divider-mark" />
      <span className="section-divider-line" />
    </div>
  );
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

  const [selectedBranchId, setSelectedBranchId] = useState('cairo');
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
  const { activeSection, scrollToSection } = useActiveSection(NAV_SECTION_IDS);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (id === 'customers') {
      setShowPartnersModal(true);
      return;
    }
    if (id === 'consulting') setIsCalculatorOpen(true);
    scrollToSection(id);
    window.history.pushState(null, '', `#${id}`);
  };

  const [hasInteractedWithPlatforms, setHasInteractedWithPlatforms] = useState(false);

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
  const [guideData, setGuideData] = useState(null);
  const [quoteGroup, setQuoteGroup] = useState('systems'); // 'systems' | 'mobile'
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const handleSelectAppForQuote = (appId) => {
    setQuoteGroup('mobile');
    setFormData(prev => ({
      ...prev,
      interestedModules: prev.interestedModules.includes(appId)
        ? prev.interestedModules
        : [...prev.interestedModules, appId]
    }));
    const targetEl = document.getElementById('quote-selection-group') || document.getElementById('contact');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSelectSystemForQuote = (sysId) => {
    setQuoteGroup('systems');
    setFormData(prev => ({
      ...prev,
      interestedModules: prev.interestedModules.includes(sysId)
        ? prev.interestedModules
        : [...prev.interestedModules, sysId]
    }));
    const targetEl = document.getElementById('quote-selection-group') || document.getElementById('contact');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSendSuggestionsToContact = (selectionData) => {
    let sysIds = [];
    if (selectionData && Array.isArray(selectionData.suggestions)) {
      sysIds = selectionData.suggestions.map(s => s.id);
      setGuideData(selectionData);
    } else if (selectionData && Array.isArray(selectionData.suggestedIds)) {
      sysIds = selectionData.suggestedIds;
      setGuideData(selectionData);
    } else if (Array.isArray(selectionData)) {
      sysIds = selectionData;
      setGuideData(null);
    }

    setQuoteGroup('systems');
    setFormData(prev => ({
      ...prev,
      interestedModules: Array.from(new Set([...prev.interestedModules, ...sysIds]))
    }));

    const targetEl = document.getElementById('quote-selection-group') || document.getElementById('contact');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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
    const currentHash = window.location.hash || '';
    const newUrl = `${window.location.pathname}${newSearch ? '?' + newSearch : ''}${currentHash}`;
    
    // Only invoke replaceState if the URL actually changed, preventing unwanted scroll resets
    const currentFullUrl = `${window.location.pathname}${window.location.search}${currentHash}`;
    if (currentFullUrl !== newUrl) {
      window.history.replaceState(null, '', newUrl);
    }
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
    
    // Plain text sanitizer for WhatsApp payload (strip tags and control characters, no HTML encoding)
    const clean = (val) => {
      if (!val) return '';
      return String(val)
        .replace(/<[^>]*>?/gm, '')
        .replace(/[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g, '')
        .trim();
    };

    const cleanName = clean(formData.name);
    const cleanPhone = clean(formData.phone);
    const cleanEmail = clean(formData.email);
    const cleanCompanyName = clean(formData.companyName);
    const cleanMessage = clean(formData.message);

    if (!cleanName || !cleanPhone) return;
    setFormSubmitted(true);

    // Categorize selected items into Systems vs Mobile Apps
    const selectedSystems = SERVICE_MODULES.filter(m => formData.interestedModules.includes(m.id));
    const selectedApps = MOBILE_APPS.filter(a => formData.interestedModules.includes(a.id));

    let messageText = '';

    if (lang === 'ar') {
      if (guideData) {
        const secLabel = guideData.sectorLabel?.ar || guideData.sector;
        const sclLabel = guideData.scaleLabel?.ar || guideData.scale;
        const cntryLabel = guideData.countryLabel?.ar || (guideData.country === 'ksa' ? 'المملكة العربية السعودية' : 'جمهورية مصر العربية');
        const suggestedIds = (guideData.suggestions || []).map(s => s.id);
        
        let solutionsLines = [];
        if (selectedSystems.length > 0) {
          solutionsLines.push('الأنظمة والبرامج المحاسبية المعتمدة في هذا الطلب:');
          selectedSystems.forEach(s => {
            const isExtra = !suggestedIds.includes(s.id);
            solutionsLines.push(`- ${s.titleAr}${isExtra ? ' (إضافة إضافية محددة من العميل)' : ''}`);
          });
        }
        if (selectedApps.length > 0) {
          if (solutionsLines.length > 0) solutionsLines.push('');
          solutionsLines.push('تطبيقات الهواتف الذكية الميدانية:');
          selectedApps.forEach(a => {
            solutionsLines.push(`- ${a.titleAr}`);
          });
        }
        if (solutionsLines.length === 0) {
          solutionsLines.push('- استشارة فنية متخصصة لتحديد النظام الأنسب لنشاطنا');
        }

        const suggestedLines = (guideData.suggestions || []).map(s => `  - ${s.titleAr}`).join('\n');

        messageText = `السلام عليكم ورحمة الله وبركاته،

أود طلب عرض سعر رسمي واستشارة فنية متكاملة بخصوص حلول وأنظمة شركة نايل تكنو للبرمجيات، وفقاً للمواصفات ومخرجات دليل اختيار النظام المحددة لنشاطنا:

*بيانات المنشأة والتواصل:*
- الاسم الكريم: ${cleanName}
- رقم الهاتف: ${cleanPhone}${cleanCompanyName ? `\n- اسم المنشأة / الشركة: ${cleanCompanyName}` : ''}${cleanEmail ? `\n- البريد الإلكتروني: ${cleanEmail}` : ''}
- الدولة ونطاق العمل: ${cntryLabel}

*المواصفات المستهدفة (دليل اختيار النظام):*
- قطاع ونوع النشاط: ${secLabel}
- حجم ونطاق الفروع: ${sclLabel}
- المتطلبات التشغيلية الإضافية:
  - تطبيقات الموبايل الميدانية للمناديب: ${guideData.needMobile ? 'مطلوبة ومضمنة بالدراسة' : 'غير مطلوبة حالياً'}
  - منظومة الفاتورة الإلكترونية والربط الضريبي: ${guideData.needEInvoicing ? 'مطلوبة ومضمنة بالدراسة' : 'غير مطلوبة حالياً'}
- ترشيحات الدليل المبدئية:
${suggestedLines}

*الأنظمة والتطبيقات المحددة والمعتمدة نهائياً في الطلب:*
${solutionsLines.join('\n')}${cleanMessage ? `\n\n*ملاحظات ومتطلبات إضافية خاصة بالطلب:*\n${cleanMessage}` : ''}

أرجو من سيادتكم التكرم بتزويدنا بعرض السعر المعتمد، متضمناً المواصفات الفنية وجدول التوريد والتدريب.

شاكراً ومقدراً لكم حسن تعاونكم واهتمامكم الكريم.`;
      } else {
        let solutionsLines = [];
        if (selectedSystems.length > 0) {
          solutionsLines.push('*الأنظمة والبرمجيات المحاسبية المطلوبة:*');
          selectedSystems.forEach(s => {
            solutionsLines.push(`- ${s.titleAr}`);
          });
        }
        if (selectedApps.length > 0) {
          if (solutionsLines.length > 0) solutionsLines.push('');
          solutionsLines.push('*تطبيقات الهواتف الذكية الميدانية:*');
          selectedApps.forEach(a => {
            solutionsLines.push(`- ${a.titleAr}`);
          });
        }
        if (solutionsLines.length === 0) {
          solutionsLines.push('- استشارة عامة لتحديد النظام البرمجي والحل الأنسب لنشاطنا');
        }

        messageText = `السلام عليكم ورحمة الله وبركاته،

أود طلب عرض سعر رسمي واستشارة فنية بخصوص حلول وأنظمة شركة نايل تكنو للبرمجيات الموضحة أدناه:

*بيانات المنشأة والتواصل:*
- الاسم الكريم: ${cleanName}
- رقم الهاتف: ${cleanPhone}${cleanCompanyName ? `\n- اسم المنشأة / الشركة: ${cleanCompanyName}` : ''}${cleanEmail ? `\n- البريد الإلكتروني: ${cleanEmail}` : ''}

*الحلول والأنظمة المختارة:*
${solutionsLines.join('\n')}${cleanMessage ? `\n\n*ملاحظات وتفاصيل إضافية خاصة بالطلب:*\n${cleanMessage}` : ''}

أرجو من سيادتكم التكرم بتزويدنا بعرض السعر المعتمد، متضمناً المواصفات الفنية وجدول التوريد والتدريب.

شاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.`;
      }
    } else {
      if (guideData) {
        const secLabel = guideData.sectorLabel?.en || guideData.sector;
        const sclLabel = guideData.scaleLabel?.en || guideData.scale;
        const cntryLabel = guideData.countryLabel?.en || (guideData.country === 'ksa' ? 'Saudi Arabia' : 'Egypt');
        const suggestedIds = (guideData.suggestions || []).map(s => s.id);

        let solutionsLines = [];
        if (selectedSystems.length > 0) {
          solutionsLines.push('Confirmed ERP & Software Systems:');
          selectedSystems.forEach(s => {
            const isExtra = !suggestedIds.includes(s.id);
            solutionsLines.push(`- ${s.titleEn}${isExtra ? ' (Custom client addition)' : ''}`);
          });
        }
        if (selectedApps.length > 0) {
          if (solutionsLines.length > 0) solutionsLines.push('');
          solutionsLines.push('Mobile Companion Applications:');
          selectedApps.forEach(a => {
            solutionsLines.push(`- ${a.titleEn}`);
          });
        }
        if (solutionsLines.length === 0) {
          solutionsLines.push('- General Technical Advisory');
        }

        const suggestedLines = (guideData.suggestions || []).map(s => `  - ${s.titleEn}`).join('\n');

        messageText = `Hello Nile Techno Sales & Advisory Team,

I would like to request an official quotation and consultation based on our System Selection Guide assessment:

Contact & Enterprise Details:
- Contact Name: ${cleanName}
- Phone: ${cleanPhone}${cleanCompanyName ? `\n- Company / Organization: ${cleanCompanyName}` : ''}${cleanEmail ? `\n- Email: ${cleanEmail}` : ''}
- Country & Operation Scope: ${cntryLabel}

System Guide Specifications:
- Industry / Sector: ${secLabel}
- Organization Scale: ${sclLabel}
- Functional Requirements:
  - Mobile Sales Representative Apps: ${guideData.needMobile ? 'Required & included' : 'Not required at this stage'}
  - Tax & E-Invoicing Integration: ${guideData.needEInvoicing ? 'Required & included' : 'Not required at this stage'}
- Initial Guide Recommendations:
${suggestedLines}

Confirmed Systems & Applications in Request:
${solutionsLines.join('\n')}${cleanMessage ? `\n\nAdditional Requirements & Specifications:\n${cleanMessage}` : ''}

Please provide us with the official quotation, technical specifications, and implementation roadmap.

Thank you for your assistance and cooperation.`;
      } else {
        let solutionsLines = [];
        if (selectedSystems.length > 0) {
          solutionsLines.push('ERP & Software Systems:');
          selectedSystems.forEach(s => {
            solutionsLines.push(`- ${s.titleEn}`);
          });
        }
        if (selectedApps.length > 0) {
          if (solutionsLines.length > 0) solutionsLines.push('');
          solutionsLines.push('Mobile Field Apps:');
          selectedApps.forEach(a => {
            solutionsLines.push(`- ${a.titleEn}`);
          });
        }
        if (solutionsLines.length === 0) {
          solutionsLines.push('- General Software Advisory');
        }

        messageText = `Hello Nile Techno Sales Team,

I would like to request an official quotation and consultation regarding Nile Techno software solutions:

Contact Information:
- Name: ${cleanName}
- Phone: ${cleanPhone}${cleanCompanyName ? `\n- Company / Organization: ${cleanCompanyName}` : ''}${cleanEmail ? `\n- Email: ${cleanEmail}` : ''}

Selected Systems & Applications:
${solutionsLines.join('\n')}${cleanMessage ? `\n\nAdditional Requirements / Details:\n${cleanMessage}` : ''}

Please provide us with the official quotation, technical specifications, and implementation roadmap.

Thank you for your prompt assistance and cooperation.`;
      }
    }

    const whatsappUrl = `https://wa.me/201000082722?text=${encodeURIComponent(messageText)}`;
    
    // Redirect immediately to prevent browser popup security from blocking the window.open
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setFormSubmitted(false);
      setGuideData(null);
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
      <div 
        dir={lang === 'ar' ? 'rtl' : 'ltr'} 
          className={`site-density min-h-screen ${lang === 'ar' ? 'rtl font-cairo' : 'ltr font-sans'} ${
          theme === 'light' 
            ? 'bg-[#f4f6f9] text-slate-800' 
            : 'bg-[#0b1329] text-slate-100'
        } selection:bg-cyan-500 selection:text-slate-900 transition-colors duration-300`}
      >
        {/* Real-time Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Main Body Canvas - Bounded with clean white/ambient margins on large screens instead of stretching edge-to-edge */}
        <div className={`w-full max-w-[1440px] 2xl:max-w-[1536px] mx-auto min-h-screen relative transition-colors duration-300 ${
          theme === 'light'
            ? 'bg-white shadow-[0_0_50px_rgba(0,0,0,0.06)] border-x border-slate-200/80'
            : 'bg-[#0f172a] shadow-[0_0_60px_rgba(0,0,0,0.35)] border-x border-slate-800/70'
        }`}>

        {/* 1. Header & Navigation Panel */}
        <nav className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
          theme === 'light' 
            ? (scrolled ? 'bg-white/95 border-b border-slate-200/90 text-slate-800 shadow-sm backdrop-blur-md' : 'bg-white/90 border-b border-slate-200/60 text-slate-800 shadow-none backdrop-blur-md')
            : (scrolled ? 'bg-[#0f172a]/95 border-b border-slate-800 text-white shadow-lg shadow-black/30 backdrop-blur-md' : 'bg-[#0f172a]/90 border-b border-slate-800/60 text-white shadow-none backdrop-blur-md')
        }`}>
          <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-2.5 xs:px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 justify-between items-center gap-1.5 sm:gap-2 h-16 sm:h-18">
            
              {/* Theme Toggle, Language Switcher, WhatsApp Contact, and Drawer Trigger */}
              <div className="flex shrink-0 items-center gap-1 sm:gap-2 order-1 lg:order-3">
                {/* Hamburger Mobile Menu Indicator */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`lg:hidden min-w-[36px] min-h-[36px] w-9 h-9 flex items-center justify-center p-1.5 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                    theme === 'light'
                      ? 'bg-slate-100 border-slate-300 text-slate-600 hover:text-slate-900'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  aria-label={lang === 'ar' ? 'فتح قائمة الهاتف' : 'Toggle mobile menu'}
                >
                  {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
                </button>

                {/* Persistent Theme Toggle Component */}
                <ThemeToggle 
                  theme={theme} 
                  setTheme={setTheme} 
                  lang={lang} 
                  className="min-w-[36px] min-h-[36px] w-9 h-9"
                />

                {/* Language Switch button */}
                <button 
                  onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                  className={`min-h-[36px] flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 rounded-full border text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
                    theme === 'light'
                      ? 'border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'border-slate-700/80 bg-[#0d1527] text-slate-300 hover:border-cyan-500 hover:text-cyan-400'
                  }`}
                  aria-label={lang === 'ar' ? 'عرض الصفحة باللغة الإنجليزية' : 'Translate page presentation to Arabic'}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="whitespace-nowrap">{lang === 'ar' ? 'English' : 'العربية'}</span>
                </button>

                {/* Calm & Chic WhatsApp Contact Quick Action */}
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className={`min-h-[36px] flex items-center justify-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full border text-[11px] font-bold transition-all duration-200 cursor-pointer select-none shrink-0 ${
                    theme === 'light'
                      ? 'border-emerald-700/20 bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100/80 hover:border-emerald-700/35 hover:text-emerald-900 shadow-2xs'
                      : 'border-emerald-500/25 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/50 hover:border-emerald-500/40 hover:text-emerald-200 shadow-2xs'
                  }`}
                  title={lang === 'ar' ? 'الانتقال إلى قسم التواصل' : 'Scroll down to contact section'}
                  aria-label={lang === 'ar' ? 'الانتقال إلى قسم التواصل' : 'Scroll down to contact section'}
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="font-cairo whitespace-nowrap hidden sm:inline">{lang === 'ar' ? 'للتواصل' : 'Contact'}</span>
                </a>
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-3.5 xl:gap-5 lg:order-2">
                {NAV_SECTIONS.map((link) => (
                  <a 
                    key={link.id} 
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`nav-link-premium text-[11px] sm:text-xs font-bold font-cairo py-1 px-1.5 transition-colors duration-200 uppercase tracking-wide ${
                      activeSection === link.id ? 'nav-link-active' : ''
                    } ${
                      theme === 'light' 
                        ? 'text-slate-500 hover:text-cyan-600' 
                        : 'text-slate-300 hover:text-cyan-400'
                    }`}
                  >
                    {t[link.labelKey]}
                  </a>
                ))}
              </div>

              {/* Corporate Logo Emblem using high-performance vector component */}
              <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="min-w-0 max-w-[34vw] xs:max-w-[42vw] sm:max-w-none cursor-pointer flex items-center shrink-0 group order-2 lg:order-1">
                <NileTechnoLogo 
                  theme={theme} 
                  lang={lang} 
                  className="h-10 sm:h-11 md:h-12 w-auto max-w-[190px] object-contain transition-opacity duration-200"
                />
              </a>

          </div>
        </div>

        {/* Responsive Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-b px-4 pt-2 pb-6 space-y-2 transition-all ${
            theme === 'light' 
              ? 'bg-white border-slate-200 text-slate-800' 
              : 'bg-[#0d1527] border-slate-800 text-white'
          }`}>
            {NAV_SECTIONS.map((link) => (
              <a 
                key={link.id} 
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`nav-link-premium min-h-[44px] flex items-center text-sm font-bold py-2.5 px-3 rounded-lg transition-colors ${
                  activeSection === link.id ? 'nav-link-active' : ''
                } ${
                  theme === 'light'
                    ? 'text-slate-700 hover:bg-slate-100 hover:text-cyan-600'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-cyan-400'
                }`}
              >
                {t[link.labelKey]}
              </a>
            ))}

            {/* Direct WhatsApp & Contact Button in Mobile Drawer */}
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80">
              <a 
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className={`min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-bold font-cairo transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'border-emerald-700/25 bg-emerald-50/80 text-emerald-900 hover:bg-emerald-100 shadow-2xs'
                    : 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-950/60 shadow-2xs'
                }`}
              >
                <WhatsAppIcon className="w-4 h-4 fill-current text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{lang === 'ar' ? 'تواصل معنا (واتساب ومبيعات)' : 'Contact Us (WhatsApp & Sales)'}</span>
              </a>
            </div>
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

      <SectionDivider theme={theme} />

      {/* 3. Who We Are Section */}
      <section id="about" className={`py-10 sm:py-12 relative transition-all duration-500 ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-blue-50/40 via-white to-sky-50/30' 
          : 'bg-gradient-to-b from-[#0a1329] via-[#0c1836] to-[#0a142c]'
      }`}>
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
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
              <div className={`feature-block-lift relative p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.008] ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-sm hover:shadow-xl hover:border-cyan-400/40' : 'bg-slate-900 rounded-2xl border border-slate-800 hover:shadow-2xl hover:border-cyan-500/40'
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

                <div className={`feature-block-lift p-4 rounded-xl border flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                  theme === 'light' ? 'bg-slate-50 border-slate-200 hover:border-cyan-300' : 'bg-[#131d35] border border-slate-700/60 hover:border-slate-600'
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
                  className={`min-h-[40px] flex items-center justify-center py-2 px-3 rounded-lg text-xs font-bold transition-all text-center font-cairo cursor-pointer ${
                    aboutActivePanel === 'vision'
                      ? 'bg-[#1a85ea] hover:bg-[#1470c7] text-white shadow-md shadow-[#1a85ea]/25'
                      : (theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white')
                  }`}
                >
                  {t.visionTab}
                </button>
                <button
                  onClick={() => setAboutActivePanel('mission')}
                  className={`min-h-[40px] flex items-center justify-center py-2 px-3 rounded-lg text-xs font-bold transition-all text-center font-cairo cursor-pointer ${
                    aboutActivePanel === 'mission'
                      ? 'bg-[#1a85ea] hover:bg-[#1470c7] text-white shadow-md shadow-[#1a85ea]/25'
                      : (theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white')
                  }`}
                >
                  {t.missionTab}
                </button>
              </div>

              {/* Dynamic Content display */}
              <div className={`feature-block-lift p-6 sm:p-8 rounded-2xl border min-h-64 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.008] ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-sm hover:shadow-xl hover:border-cyan-400/40' : 'bg-slate-900/40 rounded-2xl border border-slate-800 hover:shadow-2xl hover:border-cyan-500/40'
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

      <SectionDivider theme={theme} />

      {/* 4. Complete E-Invoicing Section */}
      <section id="einvoicing" className={`pt-10 pb-12 relative transition-all duration-500 ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-sky-50/30 via-cyan-50/30 to-blue-50/40' 
          : 'bg-gradient-to-b from-[#0a142c] via-[#0d1b3d] to-[#0a1329]'
      }`}>
        <div className="absolute inset-0 bg-[radial-gradient(#1a85ea08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal className="text-center max-w-3xl mx-auto mb-10">
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
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-4">
            
            {/* Left parameters explanations & restored detailed compliance specifications */}
            <Reveal className="lg:col-span-5 space-y-6">
              
              {/* Dynamic compliance imagery at the top as requested - perfectly visual and fully customizable */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2 pb-4">
                <div className={`feature-block-lift flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-lg ${
                  theme === 'light' ? 'bg-white border-slate-200/90 shadow-2xs hover:border-cyan-400/50' : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/50 shadow-inner'
                }`}>
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

                <div className={`feature-block-lift flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-lg ${
                  theme === 'light' ? 'bg-white border-slate-200/90 shadow-2xs hover:border-cyan-400/50' : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/50 shadow-inner'
                }`}>
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
                <div className={`feature-block-lift p-4 rounded-xl flex items-center gap-3 border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  theme === 'light' ? 'bg-slate-50 border-slate-200/80 shadow-sm hover:border-emerald-300' : 'bg-slate-900 border border-slate-800 hover:border-emerald-500/40'
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

            </Reveal>

            {/* Right: embedded interactive e-invoicing simulator */}
            <div className="lg:col-span-7">
              <Suspense fallback={<div className="min-h-[420px] rounded-3xl bg-slate-100/50 dark:bg-slate-900/50 animate-pulse" />}>
                <EInvoiceDemo lang={lang} theme={theme} />
              </Suspense>
            </div>

          </div>

        </div>
      </section>

      <SectionDivider theme={theme} />

      {/* 5. Software Systems Grid Showcase */}
      <section id="services" className={`pt-10 pb-16 relative transition-all duration-500 ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-blue-50/40 via-white to-sky-50/30' 
          : 'bg-gradient-to-b from-[#0a1329] via-[#0f2044] to-[#0b1632]'
      }`}>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider font-cairo ${
              theme === 'light' ? 'bg-cyan-50 text-cyan-700' : 'bg-cyan-950 text-cyan-400'
            }`}>
              {lang === 'ar' ? 'أنظمة برمجية رائدة ومتفردة' : 'Enterprise Class Software Solutions'}
            </span>
            <h2 className={`text-3xl sm:text-4.5xl font-extrabold font-cairo mb-4 uppercase tracking-wide ${
              theme === 'light' ? 'text-slate-950' : 'text-white'
            }`}>
              {lang === 'ar' ? 'برمجيات وحلول نايل تكنو' : 'Nile Techno Software'}
            </h2>
            <p className={`text-xs sm:text-sm font-cairo ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {lang === 'ar' ? 'أنظمة محاسبية وإدارية تناسب الأنشطة المختلفة، وتعمل عبر السحابة أو على خوادم الشركة.' : 'Accounting and business systems for different industries, available on cloud or local servers.'}
            </p>
          </Reveal>

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
            onSelectSystemForQuote={handleSelectSystemForQuote}
          />
        </div>
      </section>

      <SectionDivider theme={theme} />

      {/* 6. Modern Mobile Applications Studio Section */}
      <section id="mobile-apps" className={`py-10 sm:py-12 relative transition-all duration-500 ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-sky-50/30 via-cyan-50/20 to-blue-50/30' 
          : 'bg-gradient-to-b from-[#0b1632] via-[#0d1a3a] to-[#091225]'
      }`}>
        <div className="absolute inset-0 bg-[radial-gradient(#1a85ea08_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-10 w-80 h-80 bg-blue-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10">
            <div className={`inline-flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 px-4 py-2 rounded-2xl text-xs font-bold mb-4 font-cairo transition-all duration-300 shadow-sm ${
              theme === 'light'
                ? 'bg-gradient-to-r from-blue-50/90 via-sky-50/90 to-cyan-50/90 border border-blue-200/80 text-slate-800'
                : 'bg-gradient-to-r from-slate-900/95 via-blue-950/40 to-slate-900/95 border border-cyan-500/30 text-slate-100 shadow-cyan-950/20'
            }`}>
              <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                <Smartphone className="w-4 h-4 shrink-0 hidden xs:block" />
                <span className="font-extrabold">{lang === 'ar' ? 'حلول وتطبيقات الهواتف' : 'Mobile Applications'}</span>
              </div>

              <span className="text-slate-300 dark:text-slate-700 font-bold hidden sm:inline">|</span>

              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[11px] font-bold shadow-xs hover:scale-105 transition-transform">
                  <AppleIcon className="w-3.5 h-3.5" />
                  <span>iOS (iPhone)</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 text-[11px] font-bold shadow-xs hover:scale-105 transition-transform">
                  <AndroidIcon className="w-3.5 h-3.5" />
                  <span>Android</span>
                </span>
              </div>
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
          </Reveal>

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
      <section id="consulting" className={`py-7 sm:py-9 relative transition-all duration-500 border-t border-b ${
        theme === 'light' 
          ? 'bg-white border-slate-200/50' 
          : 'bg-[#0f172a] border-cyan-500/10'
      }`}>
        <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal className="text-center max-w-3xl mx-auto mb-5">
            <h2 className={`text-2xl sm:text-3xl font-extrabold font-cairo mb-3 uppercase tracking-wide ${
              theme === 'light' ? 'text-slate-950' : 'text-white'
            }`}>
              {lang === 'ar' ? 'هل أنت محتار؟ اختر النظام الملائم الآن' : 'Unsure of What Fits Your Business Scale?'}
            </h2>
            <p className={`text-xs sm:text-sm font-cairo max-w-2xl mx-auto ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {lang === 'ar' ? 'حدد نشاطك وحجم منشأتك للاطلاع على الأنظمة التي تناسب احتياجاتك.' : 'Choose your industry and business size to view matching systems.'}
            </p>
          </Reveal>

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
                  <div className={`feature-block-lift p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 shadow-sm hover:border-cyan-300' 
                      : 'bg-slate-900/90 border-slate-800 shadow-md hover:border-slate-700'
                  }`}>
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Calculator className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs sm:text-sm font-bold font-cairo ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                            {lang === 'ar' ? 'دليل اختيار نظامك' : 'System Selection Guide'}
                          </span>
                        </div>
                        <p className={`text-[11px] font-cairo mt-0.5 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                          {lang === 'ar' ? 'حدد نشاطك وحجم فروعك بالأسفل للاطلاع على الأنظمة ومتابعة طلبك' : 'Select your sector and scale below to view recommended systems and proceed'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCalculatorOpen(false)}
                      className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-bold font-cairo flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0 w-full sm:w-auto ${
                        theme === 'light' 
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200' 
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <span>{lang === 'ar' ? 'إغلاق الدليل' : 'Close Guide'}</span>
                      <ChevronUp className="w-4 h-4 shrink-0" />
                    </button>
                  </div>

                  {/* Calculator Body */}
                  <Suspense fallback={<div className="min-h-[520px] rounded-3xl bg-slate-100/50 dark:bg-slate-900/50 animate-pulse" />}>
                    <LeadCalculator lang={lang} theme={theme} onSendToContactForm={handleSendSuggestionsToContact} />
                  </Suspense>

                </motion.div>
              ) : (
                <motion.div
                  key="calculator-closed-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setIsCalculatorOpen(true)}
                  role="button"
                  tabIndex={0}
                  aria-expanded="false"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsCalculatorOpen(true);
                    }
                  }}
                  className={`calculator-closed-card feature-block-lift group p-3.5 sm:p-4 md:p-5 rounded-2xl border cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 ${
                    theme === 'light' 
                      ? 'bg-gradient-to-r from-sky-50 via-cyan-50 to-blue-50 border-cyan-200 hover:border-[#1a85ea]/60 shadow-cyan-100/60'
                      : 'bg-gradient-to-r from-[#102746] via-[#10365a] to-[#12304d] border-[#1a85ea]/40 hover:border-[#38bdf8]/70 shadow-blue-950/40'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-3.5 text-right min-w-0">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#1a85ea] to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/30 group-hover:scale-105 transition-transform duration-300">
                        <Calculator className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1">
                          <h3 className={`text-sm sm:text-base font-bold font-cairo ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                            {lang === 'ar' ? 'دليل اختيار نظامك' : 'System Selection Guide'}
                          </h3>
                        </div>
                        <p className={`text-xs sm:text-sm font-cairo leading-relaxed max-w-xl ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                          {lang === 'ar' 
                            ? 'حدد نشاطك وحجم منشأتك للاطلاع على الأنظمة المناسبة.'
                            : 'Choose your industry and company size to see suitable systems.'}
                        </p>
                      </div>
                    </div>

                    <div className="w-full md:w-auto shrink-0 flex items-center justify-end">
                      <div className="w-full md:w-auto min-h-[38px] px-3.5 py-2 rounded-lg font-bold text-[11px] sm:text-xs font-cairo flex items-center justify-center gap-2 bg-gradient-to-r from-[#1a85ea] to-cyan-500 hover:from-[#1470c7] hover:to-cyan-400 text-white shadow-sm shadow-cyan-500/30 transition-all duration-200">
                        <span>{lang === 'ar' ? 'استعراض الدليل' : 'Open guide'}</span>
                        <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-200 shrink-0" />
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
      <SectionDivider theme={theme} />
      <PartnersSection lang={lang} theme={theme} setShowPartnersModal={setShowPartnersModal} />

      {/* 9. Interactive Maps & Branches coordinates component */}
      <SectionDivider theme={theme} />
      <BranchesSection lang={lang} theme={theme} t={t} selectedBranchId={selectedBranchId} setSelectedBranchId={setSelectedBranchId} />

      {/* 10. Contact Us Advanced Leads Form */}
      <SectionDivider theme={theme} />
      <section id="contact" className={`py-10 sm:py-12 relative transition-all duration-500 ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-sky-50/30 via-cyan-50/20 to-slate-100/70' 
          : 'bg-gradient-to-b from-[#0a1329] via-[#0e1c3e] to-[#081022]'
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
                      placeholder={lang === 'ar' ? 'خالد صلاح ' : 'khalid salah'}
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

                {/* Solution Category Track Selector: Systems vs Mobile Apps */}
                <div className="space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className={`block text-xs font-black uppercase tracking-wider font-cairo ${
                      theme === 'light' ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      {lang === 'ar' ? 'اختر مسار الحلول المطلوب لطلب العرض:' : 'Choose Solution Category for Quotation:'}
                    </label>
                    
                    {/* Real-time selection badge */}
                    <div className="flex items-center gap-1.5 text-[11px] font-cairo font-bold">
                      <span className={theme === 'light' ? 'text-slate-500' : 'text-slate-400'}>
                        {lang === 'ar' ? 'المحدد:' : 'Selected:'}
                      </span>
                      {(() => {
                        const sysCount = SERVICE_MODULES.filter(m => formData.interestedModules.includes(m.id)).length;
                        const appCount = MOBILE_APPS.filter(a => formData.interestedModules.includes(a.id)).length;
                        if (sysCount === 0 && appCount === 0) {
                          return (
                            <span className="px-2 py-0.5 rounded-full bg-sky-50 text-[#1470c7] border border-sky-100 text-[10px]">
                              {lang === 'ar' ? 'استشارة عامة' : 'General Consulting'}
                            </span>
                          );
                        }
                        return (
                          <div className="flex items-center gap-1">
                            {sysCount > 0 && (
                              <span className="px-2 py-0.5 rounded-full bg-[#1a85ea]/15 text-[#1a85ea] dark:text-[#38bdf8] border border-[#1a85ea]/25 text-[10px] font-bold">
                                {sysCount} {lang === 'ar' ? 'نظام محاسبي' : 'ERP System'}
                              </span>
                            )}
                            {appCount > 0 && (
                              <span className="px-2 py-0.5 rounded-full bg-[#1a85ea]/15 text-[#1a85ea] dark:text-[#38bdf8] border border-[#1a85ea]/25 text-[10px] font-bold">
                                {appCount} {lang === 'ar' ? 'تطبيق موبايل' : 'Mobile App'}
                              </span>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* High-visibility Group Tabs: Systems vs Mobile Apps */}
                  <div id="quote-selection-group" className={`grid grid-cols-2 gap-1.5 p-1.5 rounded-2xl border transition-colors ${theme === 'light' ? 'bg-slate-100/95 border-slate-200/90 shadow-sm' : 'bg-slate-900/95 border-slate-800 shadow-inner'}`}>
                    {/* Option 1: ERP & Software Systems */}
                    <button
                      type="button"
                      onClick={() => setQuoteGroup('systems')}
                      className={`min-h-[46px] rounded-xl font-normal text-[9px] sm:text-sm font-cairo flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 leading-tight text-center transition-all duration-200 cursor-pointer ${
                        quoteGroup === 'systems'
                          ? 'bg-[#1a85ea] text-white shadow-md shadow-[#1a85ea]/25 scale-[1.01]'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
                      }`}
                    >
                      <Monitor className="w-4 h-4 shrink-0 hidden xs:block" />
                      <span>{lang === 'ar' ? 'الأنظمة والبرمجيات' : 'ERP & Software Systems'}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-normal shrink-0 ${
                        quoteGroup === 'systems' ? 'bg-white/25 text-white' : 'bg-sky-50 border border-sky-100 text-[#1470c7]'
                      }`}>
                        {SERVICE_MODULES.length}
                      </span>
                    </button>

                    {/* Option 2: Mobile Apps */}
                    <button
                      type="button"
                      onClick={() => setQuoteGroup('mobile')}
                      className={`min-h-[46px] rounded-xl font-normal text-[9px] sm:text-sm font-cairo flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 leading-tight text-center transition-all duration-200 cursor-pointer ${
                        quoteGroup === 'mobile'
                          ? 'bg-[#1a85ea] text-white shadow-md shadow-[#1a85ea]/25 scale-[1.01]'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 shrink-0 hidden xs:block" />
                      <span>{lang === 'ar' ? 'تطبيقات الموبايل' : 'Smart Mobile Apps'}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-normal shrink-0 ${
                        quoteGroup === 'mobile' ? 'bg-white/25 text-white' : 'bg-sky-50 border border-sky-100 text-[#1470c7]'
                      }`}>
                        {MOBILE_APPS.length}
                      </span>
                    </button>
                  </div>

                  {/* Systems View */}
                  {quoteGroup === 'systems' && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-cairo px-1">
                        <span>{lang === 'ar' ? 'انقر لتحديد أو إلغاء تحديد الأنظمة المحاسبية المطلوبة:' : 'Click to select or deselect software systems:'}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const allSysIds = SERVICE_MODULES.map(m => m.id);
                            const allSelected = allSysIds.every(id => formData.interestedModules.includes(id));
                            setFormData(prev => ({
                              ...prev,
                              interestedModules: allSelected
                                ? prev.interestedModules.filter(id => !allSysIds.includes(id))
                                : Array.from(new Set([...prev.interestedModules, ...allSysIds]))
                            }));
                          }}
                          className="text-[#1a85ea] dark:text-[#38bdf8] hover:underline font-bold cursor-pointer"
                        >
                          {SERVICE_MODULES.every(m => formData.interestedModules.includes(m.id))
                            ? (lang === 'ar' ? 'إلغاء تحديد كل الأنظمة' : 'Deselect All')
                            : (lang === 'ar' ? 'تحديد كل الأنظمة' : 'Select All')}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {SERVICE_MODULES?.map((module) => {
                          const isChecked = formData.interestedModules.includes(module.id);
                          return (
                            <button
                              key={module.id}
                              type="button"
                              onClick={() => toggleModuleInterest(module.id)}
                              className={`min-h-[46px] flex items-center justify-between p-2.5 rounded-xl border text-right transition-all cursor-pointer font-cairo ${
                                isChecked
                                  ? (theme === 'light' ? 'bg-blue-50/80 border-[#1a85ea] text-slate-900 shadow-xs' : 'bg-blue-950/40 border-[#1a85ea] text-white shadow-xs')
                                  : (theme === 'light' ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300' : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white')
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0 pr-1">
                                <span className={`w-4.5 h-4.5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                                  isChecked 
                                    ? 'bg-[#1a85ea] text-white border-[#1a85ea]' 
                                    : (theme === 'light' ? 'border-slate-300 bg-slate-50' : 'border-slate-700 bg-slate-900')
                                }`}>
                                  {isChecked && <span className="text-[11px] font-bold">✓</span>}
                                </span>
                                <span className="text-[11.5px] truncate font-bold leading-tight">
                                  {lang === 'ar' ? module.titleAr : module.titleEn}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Mobile Apps View */}
                  {quoteGroup === 'mobile' && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-cairo px-1">
                        <span>{lang === 'ar' ? 'انقر لتحديد أو إلغاء تحديد تطبيقات الموبايل المطلوبة:' : 'Click to select or deselect mobile applications:'}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const allMobIds = MOBILE_APPS.map(a => a.id);
                            const allSelected = allMobIds.every(id => formData.interestedModules.includes(id));
                            setFormData(prev => ({
                              ...prev,
                              interestedModules: allSelected
                                ? prev.interestedModules.filter(id => !allMobIds.includes(id))
                                : Array.from(new Set([...prev.interestedModules, ...allMobIds]))
                            }));
                          }}
                          className="text-[#1a85ea] dark:text-[#38bdf8] hover:underline font-bold cursor-pointer"
                        >
                          {MOBILE_APPS.every(a => formData.interestedModules.includes(a.id))
                            ? (lang === 'ar' ? 'إلغاء تحديد كل التطبيقات' : 'Deselect All')
                            : (lang === 'ar' ? 'تحديد كل التطبيقات' : 'Select All')}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {MOBILE_APPS?.map((app) => {
                          const isChecked = formData.interestedModules.includes(app.id);
                          return (
                            <button
                              key={app.id}
                              type="button"
                              onClick={() => toggleModuleInterest(app.id)}
                              className={`min-h-[50px] flex items-center justify-between p-2.5 rounded-xl border text-right transition-all cursor-pointer font-cairo ${
                                isChecked
                                  ? (theme === 'light' ? 'bg-blue-50/80 border-[#1a85ea] text-slate-900 shadow-xs' : 'bg-blue-950/40 border-[#1a85ea] text-white shadow-xs')
                                  : (theme === 'light' ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300' : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white')
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0 pr-1">
                                <span className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                                  isChecked 
                                    ? 'bg-[#1a85ea] text-white border-[#1a85ea]' 
                                    : (theme === 'light' ? 'border-slate-300 bg-slate-50' : 'border-slate-700 bg-slate-900')
                                }`}>
                                  {isChecked && <span className="text-[12px] font-bold">✓</span>}
                                </span>
                                <div className="text-right truncate">
                                  <div className="text-xs sm:text-sm font-bold truncate">
                                    {lang === 'ar' ? app.titleAr : app.titleEn}
                                  </div>
                                  <div className={`text-[10px] truncate ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                                    {lang === 'ar' ? app.descriptionAr : app.descriptionEn}
                                  </div>
                                </div>
                              </div>
                              <span className={`text-[9.5px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                                isChecked ? 'bg-[#1a85ea]/10 text-[#1a85ea] border border-[#1a85ea]/30' : (theme === 'light' ? 'bg-cyan-50 text-[#1a85ea] border border-cyan-100' : 'bg-slate-800 text-slate-300 border border-slate-700')
                              }`}>
                                Android & iOS
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
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
                    className="w-full sm:w-auto min-h-[42px] px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer font-cairo transition-all"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
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
        className={`relative pt-10 sm:pt-12 pb-6 border-t transition-colors duration-500 overflow-hidden font-cairo ${
          theme === 'light' 
            ? 'bg-gradient-to-b from-slate-100/70 via-slate-100 to-slate-200/90 text-slate-750 border-slate-200/80 shadow-inner' 
            : 'bg-gradient-to-b from-[#081022] to-[#050b18] text-slate-400 border-slate-800/80'
        }`}
      >
        {/* Dynamic decorative backdrop subtle lights */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className={`absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-40 ${
          theme === 'light' ? 'bg-cyan-200' : 'bg-cyan-500/10'
        }`}></div>

        <div className="max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-1">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-6 sm:mb-8">
            
            {/* Column 1: Our Digital Vision (رؤيتنا الرقمية) */}
            <div className="lg:col-span-4 space-y-2.5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80 dark:border-slate-800/50">
                <span className="w-1.5 h-4 rounded-full bg-cyan-400 shrink-0"></span>
                <h4 className={`text-sm sm:text-base font-black font-cairo ${
                  theme === 'light' ? 'text-slate-800' : 'text-white'
                }`}>
                  {lang === 'ar' ? 'رؤيتنا الرقمية' : 'Our Digital Vision'}
                </h4>
              </div>
              <p className={`text-[12.5px] leading-relaxed font-bold font-cairo ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}>
                {lang === 'ar' 
                  ? 'مجموعة نايل تكنو للبرمجيات تدعم آلاف المنشآت والشركات والمصانع في الشرق الأوسط بحلول محاسبية متقدمة منذ عام 2010، وتسعى دائماً لتطوير الحلول التقنية الأكثر أماناً وموثوقية بالشرق الأوسط.'
                  : 'Nile Techno Software Group supports thousands of establishments, enterprises, and factories across the Middle East with comprehensive, state-of-the-art accounting solutions since 2010, constantly dedicated to developing highly secure and reliable corporate systems.'}
              </p>
            </div>

            {/* Column 2: Improved Software & Systems (البرمجيات والأنظمة المحسنة) */}
            <div className="lg:col-span-5 space-y-2.5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80 dark:border-slate-800/50">
                <span className="w-1.5 h-4 rounded-full bg-blue-500 shrink-0"></span>
                <h4 className={`text-sm sm:text-base font-black font-cairo ${
                  theme === 'light' ? 'text-slate-800' : 'text-white'
                }`}>
                  {lang === 'ar' ? 'البرمجيات والأنظمة المحسنة' : 'Enhanced Software & Systems'}
                </h4>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-[12.5px] font-bold font-cairo">
                {/* RTL Right side under Arabic / First block */}
                <div className="space-y-2">
                  <a href="#services" className={`flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:text-[#00c272] dark:hover:text-[#00e085] ${
                    theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <span className="text-sm shrink-0">📦</span>
                    <span>{lang === 'ar' ? 'مبيعات الكاشير والمستودعات' : 'Point of Sale / POS'}</span>
                  </a>
                  <a href="#services" className={`flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:text-[#00c272] dark:hover:text-[#00e085] ${
                    theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <span className="text-sm shrink-0">🏗️</span>
                    <span>{lang === 'ar' ? 'برامج المصانع والورش والإنتاج' : 'Manufacturing & Industry'}</span>
                  </a>
                  <a href="#services" className={`flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:text-[#00c272] dark:hover:text-[#00e085] ${
                    theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <span className="text-sm shrink-0">🍕</span>
                    <span>{lang === 'ar' ? 'إدارة المطاعم والكافيهات' : 'Restaurants & Cafes POS'}</span>
                  </a>
                </div>

                {/* RTL Left side under Arabic / Second block */}
                <div className="space-y-2">
                  <a href="#services" className={`flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:text-[#00c272] dark:hover:text-[#00e085] ${
                    theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <span className="text-sm shrink-0">👔</span>
                    <span>{lang === 'ar' ? 'شؤون الموظفين والمرتبات' : 'HR & Payroll Systems'}</span>
                  </a>
                  <a href="#services" className={`flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:text-[#00c272] dark:hover:text-[#00e085] ${
                    theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <span className="text-sm shrink-0">🏢</span>
                    <span>{lang === 'ar' ? 'المقاولات والعقارات المتكاملة' : 'Contracting & Real Estate'}</span>
                  </a>
                  <a href="#services" className={`flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:text-[#00c272] dark:hover:text-[#00e085] ${
                    theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <span className="text-sm shrink-0">📊</span>
                    <span>{lang === 'ar' ? 'النسخة المحاسبية السحابية' : 'Cloud Accounting Version'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 3: Contact Us & Social Links (اتصل بنا والشبكات الاجتماعية) */}
            <div className="lg:col-span-3 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80 dark:border-slate-800/50">
                <span className="w-1.5 h-4 rounded-full bg-cyan-500 shrink-0"></span>
                <h4 className={`text-sm sm:text-base font-black font-cairo ${
                  theme === 'light' ? 'text-slate-800' : 'text-white'
                }`}>
                  {lang === 'ar' ? 'اتصل بنا والشبكات الاجتماعية' : 'Get Connected & Social'}
                </h4>
              </div>
              
              <ul className={`space-y-2.5 text-xs font-semibold font-cairo ${
                theme === 'light' ? 'text-slate-700' : 'text-slate-350'
              }`}>
                <li className="flex gap-2 items-center justify-between hover:text-cyan-500 transition-colors duration-300">
                  <div className="flex flex-col items-start font-bold">
                    <span className="text-[9.5px] text-slate-400 leading-none mb-0.5">{lang === 'ar' ? 'جمهورية مصر العربية' : 'Egypt Office Branch'}</span>
                    <span className="font-mono text-xs tracking-wide" dir="ltr">EGY: +20 100 008 2722</span>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0 border border-cyan-500/10">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                </li>
                <li className="flex gap-2 items-center justify-between hover:text-[#00c272] dark:hover:text-[#00e085] transition-colors duration-300">
                  <div className="flex flex-col items-start font-bold">
                    <span className="text-[9.5px] text-slate-400 leading-none mb-0.5">{lang === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia Branch'}</span>
                    <span className="font-mono text-xs tracking-wide" dir="ltr">KSA: +966 53 565 3688</span>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 border border-emerald-500/10">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                </li>
                <li className="flex gap-2 items-center justify-between hover:text-cyan-500 transition-colors duration-300">
                  <div className="flex flex-col items-start font-bold">
                    <span className="text-[9.5px] text-slate-400 leading-none mb-0.5">{lang === 'ar' ? 'البريد الإلكتروني الموحد' : 'Corporate Email Address'}</span>
                    <a href="mailto:info@niletechno.com" className="inline-flex min-h-0 lowercase font-mono text-xs underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1a85ea] rounded-sm" aria-label={lang === 'ar' ? 'إرسال بريد إلكتروني إلى info@niletechno.com' : 'Email info@niletechno.com'}>info@niletechno.com</a>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0 border border-cyan-500/10">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                </li>
              </ul>

              {/* Sophisticated Compact Social Buttons */}
              <div className="flex gap-2.5 pt-1 justify-center sm:justify-start">
                <a 
                  href={`https://wa.me/201000082722?text=${encodeURIComponent(
                    lang === 'ar'
                      ? 'السلام عليكم ورحمة الله وبركاته،\n\nأود التواصل والاستفسار مع فريق خدمة العملاء والمبيعات بشركة نايل تكنو للبرمجيات بخصوص الحلول والأنظمة المناسبة لنشاطنا.\n\nشاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.'
                      : 'Hello Nile Techno Sales Team,\n\nI would like to inquire about your software solutions, enterprise ERP systems, and services.\n\nThank you for your assistance.'
                  )}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Support"
                  className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-300 hover:scale-110 ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 text-slate-500 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] shadow-xs' 
                      : 'bg-[#131d35] border border-slate-700/60 text-slate-400 hover:bg-[#25D366] hover:text-white hover:border-[#25D366]'
                  }`}
                  title="WhatsApp Support"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
                </a>
                <a 
                  href="https://www.youtube.com/channel/UCZ76wzqWkF8fW4StPpc9L8A" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                  className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-300 hover:scale-110 ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 text-slate-500 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] shadow-xs' 
                      : 'bg-[#131d35] border border-slate-700/60 text-slate-400 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]'
                  }`}
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.facebook.com/niletechnosoftware?_rdc=1&_rdr#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Facebook Page"
                  className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-300 hover:scale-110 ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 text-slate-500 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] shadow-xs' 
                      : 'bg-[#131d35] border border-slate-700/60 text-slate-400 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]'
                  }`}
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/niletechno/posts/?feedView=all" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-300 hover:scale-110 ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 text-slate-500 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] shadow-xs' 
                      : 'bg-[#131d35] border border-slate-700/60 text-slate-400 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]'
                  }`}
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
          {/* Bottom Footer legal bar */}
          <div className={`pt-4 text-center border-t ${
            theme === 'light' ? 'border-slate-200/80' : 'border-slate-800/50'
          }`}>
            <span className={`text-sm font-cairo font-semibold block tracking-wide ${
              theme === 'light' ? 'text-slate-650' : 'text-slate-400'
            }`}>
              Nile Techno — All rights reserved | 2026 ©
            </span>
          </div>

        </div>
      </footer>
      </div>

      {/* 12. Floating Ultra-Premium Stacked WhatsApp Capsule Dock */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-3 sm:bottom-6 sm:left-6 z-[100] font-cairo select-none flex flex-col gap-1.5 sm:gap-2 items-start">
        {/* Egypt Sales Capsule - Prioritized */}
        <motion.a
          href={`https://wa.me/201000082722?text=${encodeURIComponent(
            lang === 'ar'
              ? 'السلام عليكم ورحمة الله وبركاته،\n\nأود التواصل مع إدارة مبيعات شركة نايل تكنو للبرمجيات (فرع جمهورية مصر العربية) للاستفسار عن الأنظمة والحلول البرمجية المناسبة لنشاطنا.\n\nشاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.'
              : 'Hello Nile Techno Sales Team (Egypt Branch),\n\nI would like to inquire about your software solutions, enterprise ERP systems, and services for our business in Egypt.\n\nThank you for your assistance.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -30, y: 15 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className={`group flex items-center justify-between w-[104px] xs:w-[110px] sm:w-[118px] min-h-[34px] sm:min-h-[36px] h-[34px] sm:h-[36px] px-2 sm:px-2.5 rounded-lg border shadow-[0_10px_25px_rgba(37,211,102,0.08)] backdrop-blur-xl transition-all duration-300 pointer-events-auto ${
            theme === 'light'
              ? 'bg-white/95 border-emerald-100 shadow-emerald-500/5 hover:border-emerald-400 text-slate-800'
              : 'bg-slate-950/90 border-slate-900 shadow-black/80 hover:border-emerald-500/30 text-white'
          }`}
        >
          {/* Real WhatsApp Icon inside the field */}
          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#128c7e] to-[#25d366] flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform duration-300 shadow-sm shadow-emerald-500/10">
            <WhatsAppIcon className="w-2.5 h-2.5 fill-white" />
          </div>
          <div className="relative w-3.5 h-3.5 rounded-full overflow-hidden shrink-0 border border-slate-200/20 shadow-inner flex items-center justify-center">
            <img 
              src="https://flagcdn.com/w40/eg.png" 
              alt="Egypt" 
              className="w-full h-full object-cover scale-110" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <span className="w-11 text-center text-[10px] font-black tracking-wide font-cairo shrink-0">
            {lang === 'ar' ? 'مصر' : 'Egypt'}
          </span>
          <span className="relative flex h-1.5 w-1.5 select-none shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
        </motion.a>

        {/* Saudi Arabia Sales Capsule */}
        <motion.a
          href={`https://wa.me/966535653688?text=${encodeURIComponent(
            lang === 'ar'
              ? 'السلام عليكم ورحمة الله وبركاته،\n\nأود التواصل مع إدارة مبيعات شركة نايل تكنو للبرمجيات (فرع المملكة العربية السعودية) للاستفسار عن الأنظمة والحلول البرمجية المناسبة لنشاطنا بالمملكة.\n\nشاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.'
              : 'Hello Nile Techno Sales Team (Saudi Arabia Branch),\n\nI would like to inquire about your software solutions, enterprise ERP systems, and services for our business in Saudi Arabia.\n\nThank you for your assistance.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -30, y: 15 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className={`group flex items-center justify-between w-[104px] xs:w-[110px] sm:w-[118px] min-h-[34px] sm:min-h-[36px] h-[34px] sm:h-[36px] px-2 sm:px-2.5 rounded-lg border shadow-[0_10px_25px_rgba(37,211,102,0.08)] backdrop-blur-xl transition-all duration-300 pointer-events-auto ${
            theme === 'light'
              ? 'bg-white/95 border-emerald-100 shadow-emerald-500/5 hover:border-emerald-400 text-slate-800'
              : 'bg-slate-950/90 border-slate-900 shadow-black/80 hover:border-emerald-500/30 text-white'
          }`}
        >
          {/* Real WhatsApp Icon inside the field */}
          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#128c7e] to-[#25d366] flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform duration-300 shadow-sm shadow-emerald-500/10">
            <WhatsAppIcon className="w-2.5 h-2.5 fill-white" />
          </div>
          <div className="relative w-3.5 h-3.5 rounded-full overflow-hidden shrink-0 border border-slate-200/20 shadow-inner flex items-center justify-center">
            <img 
              src="https://flagcdn.com/w40/sa.png" 
              alt="KSA" 
              className="w-full h-full object-cover scale-110" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <span className="w-11 text-center text-[10px] font-black tracking-wide font-cairo shrink-0">
            {lang === 'ar' ? 'السعودية' : 'KSA'}
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
  );
}
