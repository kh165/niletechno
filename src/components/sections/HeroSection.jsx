import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Cloud, MessageSquare, Monitor, Smartphone, Sparkles } from 'lucide-react';
import { SubtitleRotator } from '../site/BrandVisuals';

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

  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return undefined;
    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom < 120 || rect.top > window.innerHeight * 0.7) return;
      const progress = Math.min(0.999, Math.max(0, (window.scrollY / Math.max(1, hero.offsetHeight)) * 1.5));
      const next = Math.min(2, Math.floor(progress * 3));
      if (next !== activePlatformIndex) setActivePlatformIndex(next);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [activePlatformIndex, setActivePlatformIndex]);

  return (
    <section id="home" className={`hero-stage relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden transition-all duration-500 ${
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

      <div className="hero-cta-backdrop" aria-hidden="true">
        <div className="hero-cta-glow hero-cta-glow-primary"></div>
        <div className="hero-cta-glow hero-cta-glow-secondary"></div>
        <div className="hero-cta-mesh"></div>
        <div className="hero-cta-dither"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl 2xl:max-w-[1360px] 3xl:max-w-[1580px] 4xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        
        {/* Modern high-tech graphic panel around main headlines */}
        <div className={`hero-main-panel hero-cta-panel relative max-w-6xl mx-auto min-h-[560px] flex items-center justify-center p-6 sm:p-10 md:p-14 rounded-[2.5rem] border backdrop-blur-md overflow-hidden transition-all duration-500 mb-16 ${
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
              className="hero-title text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.04] font-cairo"
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
              className={`max-w-2xl mx-auto text-base sm:text-lg lg:text-xl leading-relaxed font-cairo text-center font-medium drop-shadow-sm ${
                theme === 'light' ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {lang === 'ar' 
                ? 'مجموعة متكاملة من البرمجيات المالية وحلول الـ ERP المتكاملة، نقاط البيع، المستودعات، وتطبيقات الهاتف الذكي لتهيئة نشاطك لأساليب الإدارة الحديثة والربط الإلكتروني المباشر.'
                : 'A unified ecosystem of financials, supply-chain, point-of-sale ERP modules, and dedicated hybrid tablet apps engineered to scale commercial ventures smoothly.'}
            </motion.p>

            <motion.div variants={itemVariants} className="hero-cta-row mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#services"
                onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="hero-primary-cta inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/35"
              >
                {lang === 'ar' ? 'اكتشف حلولنا' : 'Explore our solutions'} <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className={`hero-secondary-cta inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5 ${theme === 'light' ? 'border-slate-300 bg-white/70 text-slate-700 hover:border-cyan-400 hover:text-cyan-700' : 'border-slate-700 bg-slate-900/60 text-slate-200 hover:border-cyan-500 hover:text-cyan-300'}`}
              >
                {lang === 'ar' ? 'تحدث مع خبير' : 'Talk to an expert'} <MessageSquare className="w-4 h-4" />
              </a>
            </motion.div>
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
          <div className="hero-visual-motion relative overflow-hidden min-h-[300px] md:min-h-[250px]">
            <AnimatePresence mode="wait" initial={false}>
            {/* Slide 1: Cloud */}
            {activePlatformIndex === 0 && (
              <motion.div
                key="cloud-platform"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -24, scale: 0.985 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
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
                        {lang === 'ar' ? 'حسابك متصل وآمن' : 'Your account is connected'}
                      </span>
                      <span className="text-[10px] opacity-75">{lang === 'ar' ? 'يعمل الآن' : 'Live now'}</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>{lang === 'ar' ? 'الوصول من أي مكان:' : 'Access anywhere:'}</span>
                        <span className="text-emerald-500 font-extrabold">{lang === 'ar' ? 'متاح' : 'Available'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{lang === 'ar' ? 'حماية بياناتك:' : 'Your data security:'}</span>
                        <span className="text-blue-400">{lang === 'ar' ? 'مشفرة بالكامل' : 'Fully encrypted'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{lang === 'ar' ? 'الفاتورة الإلكترونية:' : 'E-invoicing:'}</span>
                        <span className="text-emerald-500">{lang === 'ar' ? 'مطابقة للمتطلبات' : 'Compliant'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{lang === 'ar' ? 'الربط الضريبي:' : 'Tax integration:'}</span>
                        <span className="text-emerald-500 font-bold">{lang === 'ar' ? 'جاهز' : 'Ready'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{lang === 'ar' ? 'تحديث البيانات:' : 'Data updates:'}</span>
                        <span className="text-yellow-500">{lang === 'ar' ? 'تلقائي لحظيًا' : 'Automatic & live'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Slide 2: Desktop */}
            {activePlatformIndex === 1 && (
              <motion.div
                key="desktop-platform"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: 24, scale: 0.985 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
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
                        {lang === 'ar' ? 'يعمل داخل شركتك حتى بدون إنترنت' : 'Works inside your company offline'}
                      </span>
                      <span className="text-[10px] opacity-75">{lang === 'ar' ? 'شبكة داخلية' : 'Local network'}</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>{lang === 'ar' ? 'بيانات شركتك:' : 'Your business data:'}</span>
                        <span className="text-emerald-500 font-extrabold">{lang === 'ar' ? 'محفوظة وآمنة' : 'Safe & available'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{lang === 'ar' ? 'أجهزة العمل:' : 'Workstations:'}</span>
                        <span className="text-cyan-400">{lang === 'ar' ? 'متصلة معًا' : 'Connected together'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{lang === 'ar' ? 'النسخ الاحتياطي:' : 'Backups:'}</span>
                        <span className="text-emerald-500 font-bold">{lang === 'ar' ? 'تلقائي' : 'Automatic'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{lang === 'ar' ? 'العمل دون إنترنت:' : 'Offline work:'}</span>
                        <span className="text-yellow-550">{lang === 'ar' ? 'مستمر' : 'Always available'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{lang === 'ar' ? 'سرعة الاستخدام:' : 'Everyday speed:'}</span>
                        <span className="text-blue-400">{lang === 'ar' ? 'سريعة جدًا' : 'Instant response'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Slide 3: Mobile */}
            {activePlatformIndex === 2 && (
              <motion.div
                key="mobile-platform"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -24, scale: 0.985 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
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
                        {lang === 'ar' ? 'المندوب شغال من الموبايل' : 'Your sales team is mobile'}
                      </span>
                      <span className="text-[10px] opacity-75">{lang === 'ar' ? 'متصل الآن' : 'Connected now'}</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span>{lang === 'ar' ? 'خط سير المندوب:' : 'Sales route:'}</span>
                        <span className={`truncate max-w-[150px] font-black ${
                          theme === 'light' ? 'text-[#0a192f] text-[13px]' : 'text-slate-200'
                        }`}>{lang === 'ar' ? 'المنطقة الوسطى - الرياض' : 'Central Area - Riyadh'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>{lang === 'ar' ? 'تسجيل الطلبات:' : 'Orders:'}</span>
                        <span className={`font-bold ${theme === 'light' ? 'text-cyan-800' : 'text-cyan-400'}`}>{lang === 'ar' ? 'من أي مكان' : 'From anywhere'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>{lang === 'ar' ? 'طباعة الفاتورة:' : 'Invoice printing:'}</span>
                        <span className={`font-bold ${theme === 'light' ? 'text-amber-800' : 'text-yellow-400'}`}>{lang === 'ar' ? 'من الموبايل' : 'From mobile'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>{lang === 'ar' ? 'تحديث المخزون:' : 'Inventory:'}</span>
                        <span className={`font-bold ${theme === 'light' ? 'text-emerald-700' : 'text-emerald-400'}`}>{lang === 'ar' ? 'لحظيًا' : 'Live updates'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>{lang === 'ar' ? 'متابعة المبيعات:' : 'Sales tracking:'}</span>
                        <span className={`font-bold ${theme === 'light' ? 'text-indigo-900' : 'text-emerald-550'}`}>{lang === 'ar' ? 'واضحة أولًا بأول' : 'Always visible'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
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

export { HeroSection };
