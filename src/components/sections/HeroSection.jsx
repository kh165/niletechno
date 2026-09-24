import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, Cloud, MessageSquare, Monitor, Smartphone, 
  ShieldCheck, Zap
} from 'lucide-react';
import { SubtitleRotator } from '../site/BrandVisuals';

export function HeroSection({ 
  lang, 
  theme, 
  t, 
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
    hidden: { y: 15, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // 5-second automatic looping carousel between the 3 platforms
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlatformIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, [activePlatformIndex, setActivePlatformIndex]);

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
      descAr: 'أدر أعمالك، مبيعاتك، مخازنك، وفواتيرك الإلكترونية المتوافقة مع مصلحة الضرائب المصرية (ETA) وهيئة الزكاة والضريبة والجمارك (ZATCA) مباشرة عبر الويب. حماية عالية، نسخ احتياطي دوري، وسهولة تامة بالوصول من أي متصفح أو جوال.',
      descEn: 'Manage sales, warehouses, and tax-compliant e-invoicing from any browser. High security, automated backups, and instant cross-device synchronization.',
      actionTextAr: 'الدخول للخدمة السحابية',
      actionTextEn: 'Launch Cloud Portal',
      actionHref: 'https://www.niletechnoerp.com/#/login',
      isExternal: true,
      stats: [
        { labelAr: 'الوصول من أي مكان:', labelEn: 'Global access:', valAr: 'متاح 24/7', valEn: 'Available' },
        { labelAr: 'تشفير البيانات:', labelEn: 'Security:', valAr: 'مشفر بالكامل SSL', valEn: 'Encrypted' },
        { labelAr: 'الفاتورة الإلكترونية:', labelEn: 'E-Invoice:', valAr: 'معتمدة ETA / ZATCA', valEn: 'Compliant' },
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
      actionTextAr: 'تصفح باقات سطح المكتب',
      actionTextEn: 'Explore Desktop Packages',
      actionHref: '#services',
      isExternal: false,
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
      actionTextAr: 'تحميل التطبيق من جوجل بلاي',
      actionTextEn: 'Download Android App',
      actionHref: 'https://play.google.com/store/apps/details?id=com.niletechno.salesperson_app',
      isExternal: true,
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
      className={`relative pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 overflow-hidden transition-colors duration-500 ${
        theme === 'light'
          ? 'bg-gradient-to-b from-sky-50/70 via-white to-slate-50 text-slate-800'
          : 'bg-gradient-to-b from-[#0b1329] via-[#0f172a] to-[#0b1329] text-white'
      }`}
    >
      {/* Dynamic Animated Background Grid & Ambient Mesh */}
      <div className={`absolute inset-0 pointer-events-none ${
        theme === 'light'
          ? 'bg-[radial-gradient(#0284c718_1px,transparent_1px)] [background-size:28px_28px] opacity-80'
          : 'bg-[radial-gradient(#38bdf815_1px,transparent_1px)] [background-size:32px_32px] opacity-35'
      }`} />

      {/* Multi-Layered Floating Ambient Light Glow with Smooth Easing */}
      <motion.div 
        animate={{ 
          x: [0, 25, -15, 0], 
          y: [0, -20, 15, 0],
          scale: [1, 1.08, 0.98, 1],
          opacity: [0.15, 0.25, 0.18, 0.15]
        }} 
        transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
        className="absolute top-10 left-10 md:left-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          x: [0, -30, 20, 0], 
          y: [0, 25, -20, 0],
          scale: [1, 1.1, 0.95, 1],
          opacity: [0.15, 0.28, 0.18, 0.15]
        }} 
        transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-10 right-10 md:right-1/4 w-96 sm:w-[420px] h-96 sm:h-[420px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          x: [0, 25, -30, 0], 
          y: [0, 20, -20, 0],
          scale: [0.9, 1.1, 1, 0.9],
          opacity: [0.2, 0.45, 0.25, 0.2]
        }} 
        transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut', delay: 2.5 }}
        className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none"
      />

      {/* Floating Animated Geometric Tech Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {[
          { top: '18%', left: '12%', size: 'w-2 h-2', delay: 0 },
          { top: '28%', right: '14%', size: 'w-3 h-3', delay: 1.2 },
          { top: '65%', left: '8%', size: 'w-2.5 h-2.5', delay: 2.4 },
          { top: '78%', right: '12%', size: 'w-2 h-2', delay: 0.8 },
          { top: '45%', right: '6%', size: 'w-1.5 h-1.5', delay: 3.1 },
        ].map((node, nIdx) => (
          <motion.div
            key={nIdx}
            style={{ top: node.top, left: node.left, right: node.right }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.25, 1]
            }}
            transition={{
              duration: 4 + nIdx,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: node.delay
            }}
            className={`absolute ${node.size} rounded-full ${
              theme === 'light' ? 'bg-[#0b72c9]/60 shadow-[0_0_8px_#0b72c9]' : 'bg-[#299df7] shadow-[0_0_12px_#0b72c9]'
            }`}
          />
        ))}
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Main Hero Card - Spacious, comfortable for the eyes */}
        <div className={`relative w-full rounded-3xl border backdrop-blur-xl overflow-hidden p-6 sm:p-10 md:p-12 mb-8 sm:mb-10 transition-all duration-300 ${
          theme === 'light'
            ? 'bg-white/90 border-cyan-200/70 shadow-2xl shadow-cyan-100/40'
            : 'bg-[#131d35]/90 border-slate-700/60 shadow-xl'
        }`}>
          {/* Subtle Top Accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

          {/* Official Tag */}
          <motion.div 
            variants={itemVariants} 
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 font-cairo shadow-sm border ${
              theme === 'light'
                ? 'bg-cyan-50 border-cyan-200 text-cyan-800'
                : 'bg-cyan-950/50 border-cyan-800/60 text-cyan-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-cyan-500 shrink-0" />
            <span>
              {lang === 'ar' 
                ? 'منظومة إدارة الأعمال والمحاسبة الذكية ERP | مصر & السعودية' 
                : 'Enterprise ERP & Certified E-Invoicing | EG & KSA'}
            </span>
          </motion.div>

          {/* Main Headline - Calm, bold, comfortable to read */}
          <motion.h1 
            variants={itemVariants}
            className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-snug sm:leading-tight font-cairo"
          >
            <span className={theme === 'light' ? 'text-slate-900' : 'text-white'}>
              {lang === 'ar' ? 'دعنا ندير أعمالك بنجاح مع' : 'Empower Your Business With'}
            </span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 bg-clip-text text-transparent">
              {lang === 'ar' ? 'نايل تكنو للبرمجيات' : 'Nile Techno Software'}
            </span>
          </motion.h1>

          {/* Dynamic Subtitle Rotator */}
          <motion.div variants={itemVariants} className="mb-5 flex justify-center">
            <SubtitleRotator lang={lang} theme={theme} />
          </motion.div>

          {/* Professional Reassuring Paragraph */}
          <motion.p 
            variants={itemVariants}
            className={`max-w-2xl mx-auto text-xs sm:text-sm md:text-[15px] leading-relaxed font-cairo font-medium ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            {lang === 'ar' 
              ? 'حلول موحدة لإدارة الحسابات العامة، المخازن، نقاط البيع، وتطبيقات المناديب الذكية — مع ربط كامل ومباشر بالفاتورة الإلكترونية المعتمدة في مصر والمملكة العربية السعودية.'
              : 'A unified software suite for financials, multi-branch warehouses, cloud POS, and field sales apps — fully integrated with official electronic invoicing.'}
          </motion.p>
        </div>

        {/* Interactive Platform Previewer (Cloud / Desktop / Mobile) - Looping Visual Showcase */}
        <div className="w-full text-right font-cairo">
          {/* Platform Tab Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
            {platforms.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activePlatformIndex === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePlatformIndex(tab.id)}
                  className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold border transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-cairo relative overflow-hidden ${
                    isActive
                      ? 'bg-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/20'
                      : theme === 'light'
                        ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        : 'bg-[#15203b] border-slate-700/60 text-slate-300 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? tab.titleAr : tab.titleEn}</span>
                  {isActive && (
                    <motion.div
                      key={`progress-${activePlatformIndex}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5, ease: 'linear' }}
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/80 rounded-full"
                    />
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
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 sm:p-7 rounded-2xl border transition-all duration-300 items-center text-right ${
                  theme === 'light'
                    ? 'bg-white/95 border-slate-200 shadow-md'
                    : 'bg-[#131d35]/95 border-slate-700/60 shadow-xl'
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
                      className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs transition-all shadow-md shadow-cyan-500/20 cursor-pointer font-cairo"
                    >
                      <span>{lang === 'ar' ? currentPlatform.actionTextAr : currentPlatform.actionTextEn}</span>
                      <currentPlatform.icon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Micro Live Status Panel */}
                <div className="lg:col-span-5">
                  <div className={`p-4 rounded-xl border text-xs text-right ${
                    theme === 'light' 
                      ? 'bg-slate-50 border-slate-200 text-slate-700' 
                      : 'bg-[#0e1629] border-slate-700/60 text-slate-200'
                  }`}>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-cyan-500/10">
                      <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5 font-cairo">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        {lang === 'ar' ? 'الحالة: نشط ومتوافق' : 'Status: Active & Certified'}
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

        {/* Compact Clean Metrics Bar */}
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
                theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#131d35]/70 border-slate-700/50'
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
