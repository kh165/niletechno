import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, Cloud, MessageSquare, Monitor, Smartphone, 
  Sparkles, ShieldCheck, CheckCircle2, Zap, ArrowLeft, ArrowRight
} from 'lucide-react';
import { SubtitleRotator } from '../site/BrandVisuals';

export function HeroSection({ 
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
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Auto-cycle platform carousel when not hovered
  useEffect(() => {
    if (isHoveredPlatforms) return undefined;
    const interval = setInterval(() => {
      setActivePlatformIndex((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHoveredPlatforms, setActivePlatformIndex]);

  const platforms = [
    {
      id: 0,
      titleAr: 'برنامج المحاسبة السحابي',
      titleEn: 'Cloud ERP Portal',
      icon: Cloud,
      badgeAr: 'سحابي بالكامل 100%',
      badgeEn: '100% Cloud ERP',
      headlineAr: 'برنامج المحاسبة السحابي المتكامل',
      headlineEn: 'Nile Techno Cloud ERP',
      descAr: 'أدر أعمالك، مبيعاتك، مخازنك، وفواتيرك الإلكترونية المتوافقة مع هيئة الزكاة والضريبة (ZATCA) وهيئة الضرائب المصرية (ETA) مباشرة عبر الويب. حماية عالية، نسخ احتياطي دوري، وسهولة تامة بالوصول من أي متصفح أو جوال.',
      descEn: 'Manage sales, warehouses, and tax-compliant e-invoicing from any browser. High security, automated backups, and instant cross-device synchronization.',
      actionTextAr: 'الدخول للخدمة السحابية ⚡',
      actionTextEn: 'Launch Cloud Portal ⚡',
      actionHref: 'https://www.niletechnoerp.com/#/login',
      isExternal: true,
      color: 'cyan',
      stats: [
        { labelAr: 'الوصول من أي مكان:', labelEn: 'Global access:', valAr: 'متاح 24/7', valEn: 'Available' },
        { labelAr: 'تشفير البيانات:', labelEn: 'Security:', valAr: 'مشفر بالكامل SSL', valEn: 'Encrypted' },
        { labelAr: 'الفاتورة الإلكترونية:', labelEn: 'E-Invoice:', valAr: 'معتمدة ZATCA/ETA', valEn: 'Compliant' },
        { labelAr: 'النسخ الاحتياطي:', labelEn: 'Backups:', valAr: 'آلي سحابي', valEn: 'Automated' },
      ]
    },
    {
      id: 1,
      titleAr: 'أنظمة الديسكتوب والشبكات',
      titleEn: 'Desktop & LAN Systems',
      icon: Monitor,
      badgeAr: 'شبكات محلية واستقرار فائق',
      badgeEn: 'Local Network ERP',
      headlineAr: 'أنظمة سطح المكتب للمصانع والشركات',
      headlineEn: 'High-Stability Desktop ERP',
      descAr: 'الحل البرمجي الأمثل للمصانع والورش والأنشطة التي تحتاج استقراراً مطلقاً بدون انقطاع. يعمل بالكامل دون الحاجة لاتصال بالإنترنت، ويدعم الربط بين عشرات أجهزة الكاشير ونقاط البيع وقواعد البيانات الضخمة.',
      descEn: 'Enterprise desktop software built for manufacturing, distribution, and heavy POS operations without internet dependency. Robust local database clustering.',
      actionTextAr: 'تصفح باقات سطح المكتب 💻',
      actionTextEn: 'Explore Desktop Packages 💻',
      actionHref: '#services',
      isExternal: false,
      color: 'blue',
      stats: [
        { labelAr: 'العمل بدون إنترنت:', labelEn: 'Offline mode:', valAr: 'مستمر 100%', valEn: 'Uninterrupted' },
        { labelAr: 'سرعة الاستجابة:', labelEn: 'Speed:', valAr: 'فورية (LAN)', valEn: 'Instant LAN' },
        { labelAr: 'قواعد البيانات:', labelEn: 'Database:', valAr: 'SQL Server محلية', valEn: 'Local SQL' },
        { labelAr: 'تعدد المستخدمين:', labelEn: 'Multi-User:', valAr: 'صلاحيات متقدمة', valEn: 'Advanced RBAC' },
      ]
    },
    {
      id: 2,
      titleAr: 'تطبيق مبيعات المناديب',
      titleEn: 'Mobile Field Sales',
      icon: Smartphone,
      badgeAr: 'أندرويد و GPS ميداني',
      badgeEn: 'Android Field Companion',
      headlineAr: 'تطبيق المندوب الذكي والتوزيع الميداني',
      headlineEn: 'Mobile Sales Representative App',
      descAr: 'تطبيق أندرويد متطور لمندوبي المبيعات وسيارات التوزيع. يتيح إصدار وطباعة الفواتير عبر طابعات البلوتوث المحمولة، تتبع خط سير المندوب بالـ GPS، ومزامنة حركة المبيعات والمخزن مع السيرفر الرئيسي لحظياً.',
      descEn: 'Dedicated Android mobile app for field reps. Print thermal receipts on Bluetooth printers, track routes via GPS, and sync transactions in real time.',
      actionTextAr: 'تحميل التطبيق من جوجل بلاي 📱',
      actionTextEn: 'Download Android App 📱',
      actionHref: 'https://play.google.com/store/apps/details?id=com.niletechno.salesperson_app',
      isExternal: true,
      color: 'emerald',
      stats: [
        { labelAr: 'طباعة الفواتير:', labelEn: 'Printing:', valAr: 'بلوتوث حراري', valEn: 'Thermal BT' },
        { labelAr: 'تتبع خط السير:', labelEn: 'Route Tracking:', valAr: 'GPS مباشر', valEn: 'Live GPS' },
        { labelAr: 'المزامنة:', labelEn: 'Sync:', valAr: 'تلقائية مع الـ ERP', valEn: 'Real-time' },
        { labelAr: 'إدارة العهدة والديون:', labelEn: 'Settlements:', valAr: 'مباشرة من الميدان', valEn: 'Instant' },
      ]
    }
  ];

  const currentPlatform = platforms[activePlatformIndex] || platforms[0];

  return (
    <section 
      id="home" 
      className={`hero-stage relative pt-20 sm:pt-24 pb-12 sm:pb-16 flex items-center justify-center overflow-hidden transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-gradient-to-b from-cyan-50/40 via-white to-slate-50 text-slate-800'
          : 'bg-gradient-to-b from-[#030712] via-[#050c1f] to-[#02050c] text-white'
      }`}
    >
      {/* Background High-Tech Mesh and Circuit Lines */}
      <div className={`absolute inset-0 pointer-events-none ${
        theme === 'light'
          ? 'bg-[radial-gradient(#0891b212_1px,transparent_1px)] [background-size:24px_24px] opacity-70'
          : 'bg-[radial-gradient(#06b6d418_1px,transparent_1px)] [background-size:28px_28px] opacity-50'
      }`}></div>

      {/* Ambient Moving Glow Spheres */}
      <motion.div 
        animate={{ 
          x: [0, 25, 0], 
          y: [0, -20, 0],
          scale: [1, 1.08, 1] 
        }} 
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        className="hidden md:block absolute top-12 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          x: [0, -20, 0], 
          y: [0, 25, 0],
          scale: [1, 1.05, 1] 
        }} 
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut', delay: 1 }}
        className="hidden md:block absolute bottom-12 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[110px] pointer-events-none"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        
        {/* Main Hero Card - Compact, balanced height that fits laptops comfortably */}
        <div className={`relative w-full rounded-3xl border backdrop-blur-md overflow-hidden p-6 sm:p-8 md:p-10 mb-8 sm:mb-10 transition-all duration-300 ${
          theme === 'light'
            ? 'bg-white/80 border-cyan-200/70 shadow-xl shadow-cyan-100/40'
            : 'bg-[#060b18]/80 border-cyan-500/20 shadow-2xl shadow-cyan-950/40'
        }`}>
          
          {/* Animated Laser Border Highlight */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>

          {/* Floating Technology Badge 1 (Left Desktop) */}
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
            className={`hidden xl:flex items-center gap-2 absolute top-8 left-8 px-3.5 py-1.5 rounded-full border text-[11px] font-bold font-cairo shadow-md backdrop-blur-md ${
              theme === 'light'
                ? 'bg-cyan-50/90 border-cyan-200 text-cyan-800'
                : 'bg-cyan-950/40 border-cyan-850/60 text-cyan-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>{lang === 'ar' ? '⚡ سحابي & مكتبي متزامن' : '⚡ Cloud & Desktop Sync'}</span>
          </motion.div>

          {/* Floating Technology Badge 2 (Right Desktop) */}
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
            className={`hidden xl:flex items-center gap-2 absolute top-8 right-8 px-3.5 py-1.5 rounded-full border text-[11px] font-bold font-cairo shadow-md backdrop-blur-md ${
              theme === 'light'
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800'
                : 'bg-emerald-950/40 border-emerald-850/60 text-emerald-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>{lang === 'ar' ? '🛡️ معتمد 100% ZATCA & ETA' : '🛡️ ZATCA & ETA Certified'}</span>
          </motion.div>

          {/* Main Top Tag */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold mb-4 font-cairo shadow-sm border ${
            theme === 'light'
              ? 'bg-cyan-500/10 border-cyan-400/40 text-cyan-800'
              : 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300'
          }">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>{lang === 'ar' ? 'منظومة إدارة الأعمال والمحاسبة الذكية ERP 🇸🇦 🇪🇬' : 'Next-Gen Enterprise ERP & Tax Compliance'}</span>
          </motion.div>

          {/* Main Headline - Clean, perfectly sized Cairo typography */}
          <motion.h1 
            variants={itemVariants}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-5.5xl font-black tracking-tight mb-3 sm:mb-4 leading-tight font-cairo"
          >
            <span className={theme === 'light' ? 'text-slate-900' : 'text-white'}>
              {lang === 'ar' ? 'دعنا ندير أعمالك بنجاح مع' : 'Empower Your Business With'}
            </span>
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 bg-clip-text text-transparent">
              {lang === 'ar' ? 'نايل تكنو للبرمجيات' : 'Nile Techno Software'}
            </span>
          </motion.h1>

          {/* Dynamic Subtitle Rotator */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-5">
            <SubtitleRotator lang={lang} theme={theme} />
          </motion.div>

          {/* Professional Paragraph */}
          <motion.p 
            variants={itemVariants}
            className={`max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed font-cairo font-medium mb-6 ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            {lang === 'ar' 
              ? 'حلول موحدة لإدارة الحسابات العامة، المخازن، نقاط البيع، وتطبيقات المناديب الذكية — مع ربط كامل ومباشر بالفاتورة الإلكترونية المعتمدة في مصر والمملكة العربية السعودية.'
              : 'A unified software suite for financials, multi-branch warehouses, cloud POS, and field sales apps — fully integrated with official electronic invoicing.'}
          </motion.p>

          {/* Direct Call to Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-cyan-500/25 transition-all hover:-translate-y-0.5 cursor-pointer font-cairo flex items-center gap-2"
            >
              <span>{lang === 'ar' ? 'اكتشف الأنظمة والحلول' : 'Explore Solutions'}</span>
              <ChevronRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </a>
            <a
              href="#einvoicing"
              onClick={(e) => { e.preventDefault(); document.getElementById('einvoicing')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`px-5 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm font-bold font-cairo transition-all hover:-translate-y-0.5 flex items-center gap-2 ${
                theme === 'light' 
                  ? 'border-slate-200 bg-white text-slate-700 hover:border-cyan-400 hover:text-cyan-700 shadow-sm' 
                  : 'border-slate-700 bg-slate-900/60 text-slate-200 hover:border-cyan-500 hover:text-cyan-300'
              }`}
            >
              <Zap className="w-4 h-4 text-cyan-500" />
              <span>{lang === 'ar' ? 'محاكي الفاتورة الإلكترونية' : 'E-Invoice Simulator'}</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`px-5 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm font-bold font-cairo transition-all hover:-translate-y-0.5 flex items-center gap-2 ${
                theme === 'light' 
                  ? 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100' 
                  : 'border-slate-800 bg-slate-900/40 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'ar' ? 'تحدث مع خبير' : 'Talk to Expert'}</span>
            </a>
          </motion.div>

        </div>

        {/* Interactive Platform Previewer (Cloud / Desktop / Mobile) */}
        <div 
          onMouseEnter={() => setIsHoveredPlatforms(true)}
          onMouseLeave={() => setIsHoveredPlatforms(false)}
          className="w-full text-right font-cairo"
        >
          {/* Platform Tab Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
            {platforms.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activePlatformIndex === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePlatformIndex(tab.id)}
                  className={`px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold border transition-all duration-200 flex items-center gap-2 cursor-pointer font-cairo ${
                    isActive
                      ? 'bg-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/20'
                      : theme === 'light'
                        ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? tab.titleAr : tab.titleEn}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping ml-1"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Platform Active Slide View */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPlatform.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 sm:p-7 rounded-2xl border transition-all duration-300 items-center text-right ${
                  theme === 'light'
                    ? 'bg-white border-slate-200 shadow-md'
                    : 'bg-[#080e1e] border-slate-800 shadow-xl'
                }`}
              >
                {/* Platform Description & CTA */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center gap-2 justify-start">
                    <span className="inline-flex px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                      {lang === 'ar' ? currentPlatform.badgeAr : currentPlatform.badgeEn}
                    </span>
                  </div>

                  <h3 className={`text-base sm:text-lg font-black ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    {lang === 'ar' ? currentPlatform.headlineAr : currentPlatform.headlineEn}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    {lang === 'ar' ? currentPlatform.descAr : currentPlatform.descEn}
                  </p>

                  <div className="pt-2">
                    <a
                      href={currentPlatform.actionHref}
                      target={currentPlatform.isExternal ? '_blank' : '_self'}
                      rel={currentPlatform.isExternal ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs transition-all shadow-md shadow-cyan-500/20 cursor-pointer font-cairo"
                    >
                      <span>{lang === 'ar' ? currentPlatform.actionTextAr : currentPlatform.actionTextEn}</span>
                      <currentPlatform.icon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Micro Live Status Panel */}
                <div className="lg:col-span-5">
                  <div className={`p-4 rounded-xl border font-mono text-[11px] text-right ${
                    theme === 'light' 
                      ? 'bg-slate-50 border-slate-200 text-slate-700' 
                      : 'bg-slate-950/80 border-slate-800 text-cyan-300'
                  }`}>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-cyan-500/10">
                      <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5 font-cairo">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        {lang === 'ar' ? 'الحالة: نشط ومتصل' : 'Status: Live & Connected'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">v2026.4</span>
                    </div>

                    <div className="space-y-1.5 font-cairo text-xs">
                      {currentPlatform.stats.map((st, sIdx) => (
                        <div key={sIdx} className="flex justify-between items-center py-0.5 border-b border-slate-200/40 dark:border-slate-800/40 last:border-none">
                          <span className={theme === 'light' ? 'text-slate-500' : 'text-slate-400'}>
                            {lang === 'ar' ? st.labelAr : st.labelEn}
                          </span>
                          <span className="font-bold text-cyan-600 dark:text-cyan-400">
                            {lang === 'ar' ? st.valAr : st.valEn}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Compact Quick Metrics Bar */}
        <motion.div 
          variants={itemVariants}
          className={`grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mt-6 pt-6 border-t ${
            theme === 'light' ? 'border-slate-200' : 'border-slate-800/80'
          }`}
        >
          {[
            { val: '2010', labelAr: 'تأسيس وخبرة ممتدة', labelEn: 'Established' },
            { val: '+1,500', labelAr: 'مؤسسة وشركة معتمدة', labelEn: 'Active Clients' },
            { val: '12 +', labelAr: 'حلول وبرمجيات متكاملة', labelEn: 'Software Systems' },
            { val: '24/7', labelAr: 'دعم فني واستجابة فورية', labelEn: 'Technical Support' }
          ].map((metric, idx) => (
            <div 
              key={idx} 
              className={`p-3 rounded-xl border transition-all duration-200 ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/40 border-slate-800/80'
              }`}
            >
              <div className="text-lg sm:text-xl font-black font-mono text-cyan-500 mb-0.5">
                {metric.val}
              </div>
              <div className={`text-[11px] font-bold font-cairo ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                {lang === 'ar' ? metric.labelAr : metric.labelEn}
              </div>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}
