import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { SubtitleRotator } from '../site/BrandVisuals';
import { AnimatedCounter } from '../site/AnimatedCounter';
import { Reveal } from '../site/ScrollExperience';
import { HERO_PLATFORMS } from '../../data/heroPlatforms';
import { AppleIcon } from './ModernMobileShowcase';

export function HeroSection({ 
  lang, 
  theme, 
  t, 
  activePlatformIndex,
  setActivePlatformIndex,
  isHoveredPlatforms,
  setIsHoveredPlatforms
}) {
  // 5-second automatic looping carousel between the 3 platforms
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlatformIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, [activePlatformIndex, setActivePlatformIndex]);

  const currentPlatform = HERO_PLATFORMS[activePlatformIndex] || HERO_PLATFORMS[0];

  // Subtle 3D tilt and mouse parallax tracking for the active platform showcase
  const [cardTilt, setCardTilt] = useState({ rx: 0, ry: 0, tx: 0, ty: 0, isHovered: false });

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({
      rx: -y * 8, // gentle tilt pitch
      ry: x * 8,  // gentle tilt yaw
      tx: x * 8,
      ty: y * 8,
      isHovered: true
    });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ rx: 0, ry: 0, tx: 0, ty: 0, isHovered: false });
  };

  return (
    <section 
      id="home" 
      className="relative pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 overflow-hidden transition-colors duration-500 bg-gradient-to-b from-sky-50/70 via-white to-blue-50/40 text-slate-800 dark:from-[#0b152e] dark:via-[#0d1a3a] dark:to-[#0a1329] dark:text-white"
    >
      {/* Dynamic Animated Background Grid & Ambient Mesh */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#0284c718_1px,transparent_1px)] [background-size:28px_28px] opacity-80 dark:bg-[radial-gradient(#38bdf815_1px,transparent_1px)] dark:[background-size:32px_32px] dark:opacity-35" />

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
        className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none"
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
            className={`absolute ${node.size} rounded-full bg-[#1a85ea]/60 shadow-[0_0_8px_#1a85ea] dark:bg-[#38bdf8] dark:shadow-[0_0_12px_#1a85ea]`}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Hero Card - Spacious, comfortable for the eyes */}
        <div className="relative w-full rounded-3xl border backdrop-blur-xl overflow-hidden p-4 sm:p-8 md:p-12 mb-8 sm:mb-10 transition-all duration-300 bg-white/90 border-cyan-200/70 shadow-2xl shadow-cyan-100/40 dark:bg-[#131d35]/90 dark:border-slate-700/60 dark:shadow-xl">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

          {/* Official Tag */}
          <Reveal delay={0.05}>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold mb-4 font-cairo shadow-sm border max-w-full bg-cyan-50 border-cyan-200 text-cyan-800 dark:bg-cyan-950/50 dark:border-cyan-800/60 dark:text-cyan-300">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500 shrink-0" />
              <span className="leading-tight">
                {lang === 'ar' 
                  ? 'أنظمة إدارة الأعمال والمحاسبة ERP | مصر والسعودية'
                  : 'Enterprise ERP & Certified E-Invoicing | EG & KSA'}
              </span>
            </div>
          </Reveal>

          {/* Main Headline - Calm, bold, comfortable to read */}
          <Reveal delay={0.12}>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-snug sm:leading-tight font-cairo">
              <span className="text-slate-900 dark:text-white">
                {lang === 'ar' ? 'دعنا ندير أعمالك بنجاح مع' : 'Let Us Manage Your Business'}
              </span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 bg-clip-text text-transparent">
                {lang === 'ar' ? 'نايل تكنو للبرمجيات' : 'Nile Techno Software'}
              </span>
            </h1>
          </Reveal>

          {/* Dynamic Subtitle Rotator */}
          <Reveal delay={0.18} className="mb-5 flex justify-center">
            <SubtitleRotator lang={lang} theme={theme} />
          </Reveal>

          {/* Professional Reassuring Paragraph */}
          <Reveal delay={0.24}>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-[15px] leading-relaxed font-cairo font-medium text-slate-600 dark:text-slate-300">
              {lang === 'ar' 
                ? 'برامج لإدارة الحسابات والمخازن ونقاط البيع وتطبيقات المناديب، مع الربط بالفاتورة الإلكترونية في مصر والمملكة العربية السعودية.'
                : 'A unified software suite for financials, multi-branch warehouses, cloud POS, and field sales apps — fully integrated with official electronic invoicing.'}
            </p>
          </Reveal>
        </div>

        {/* Interactive Platform Previewer (Cloud / Desktop / Mobile) - Looping Visual Showcase */}
        <div className="w-full text-right font-cairo">
          {/* Platform Tab Navigation Buttons */}
          <div className="hero-platform-tabs flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
            {HERO_PLATFORMS.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activePlatformIndex === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePlatformIndex(tab.id)}
                  className={`hero-platform-tab min-h-[42px] px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold border transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 cursor-pointer font-cairo relative overflow-hidden flex-1 sm:flex-initial min-w-0 max-w-full ${
                    isActive
                      ? 'bg-[#1a85ea] text-white border-[#1a85ea] shadow-md shadow-[#1a85ea]/25'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-[#15203b] dark:border-slate-700/60 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="hero-platform-tab-label min-w-0 text-center leading-tight">
                    <span className="hidden sm:inline">{lang === 'ar' ? tab.titleAr : tab.titleEn}</span>
                    <span className="sm:hidden">{lang === 'ar' ? tab.mobileTitleAr : tab.mobileTitleEn}</span>
                  </span>
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

          {/* Platform Active Slide View with Interactive 3D Tilt Parallax */}
          <div 
            className="relative [perspective:1200px]"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPlatform.id}
                initial={{ opacity: 0, y: 8, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.99 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  transform: `rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg) translateZ(${cardTilt.isHovered ? 12 : 0}px)`,
                  transition: cardTilt.isHovered 
                    ? 'transform 0.12s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s ease' 
                    : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
                className="feature-block-lift relative grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 sm:p-7 rounded-2xl border items-center text-right bg-white/95 border-slate-200/90 shadow-lg hover:border-cyan-400/60 dark:bg-[#131d35]/95 dark:border-slate-700/70 dark:shadow-2xl dark:hover:border-cyan-500/50"
              >
                {/* Specular Light Reflection that tracks mouse cursor */}
                {cardTilt.isHovered && (
                  <div 
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-60 dark:opacity-40 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(480px circle at ${(cardTilt.ry / 8 + 0.5) * 100}% ${(-cardTilt.rx / 8 + 0.5) * 100}%, rgba(56, 189, 248, 0.14), transparent 70%)`
                    }}
                  />
                )}

                {/* Platform Description & CTA with Subtle Parallax Depth */}
                <div 
                  className="lg:col-span-7 space-y-3 relative z-10"
                  style={{
                    transform: cardTilt.isHovered 
                      ? `translateZ(18px) translate3d(${-cardTilt.tx * 0.4}px, ${-cardTilt.ty * 0.4}px, 0)` 
                      : 'translateZ(0px)',
                    transition: cardTilt.isHovered ? 'transform 0.12s ease-out' : 'transform 0.45s ease-out'
                  }}
                >
                  <div className="flex items-center gap-2 justify-start">
                    <span className="inline-flex px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 whitespace-nowrap">
                      {lang === 'ar' ? currentPlatform.badgeAr : currentPlatform.badgeEn}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black leading-snug text-slate-900 dark:text-white">
                    {lang === 'ar' ? currentPlatform.headlineAr : currentPlatform.headlineEn}
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {lang === 'ar' ? currentPlatform.descAr : currentPlatform.descEn}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-2.5">
                    <a
                      href={currentPlatform.actionHref}
                      target={currentPlatform.isExternal ? '_blank' : '_self'}
                      rel={currentPlatform.isExternal ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center justify-center gap-2 min-h-[44px] min-w-0 max-w-full px-4 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-cyan-500/20 cursor-pointer font-cairo w-full sm:w-auto text-center leading-tight whitespace-normal hover:scale-105 active:scale-95"
                    >
                      <span className="min-w-0 whitespace-normal">{lang === 'ar' ? currentPlatform.actionTextAr : currentPlatform.actionTextEn}</span>
                      <currentPlatform.icon className="w-4 h-4 shrink-0" />
                    </a>

                    {currentPlatform.iosActionHref && (
                      <a
                        href={currentPlatform.iosActionHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 min-h-[44px] min-w-0 max-w-full px-4 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 hover:from-slate-800 hover:to-slate-700 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-slate-900/30 cursor-pointer font-cairo w-full sm:w-auto text-center leading-tight whitespace-normal border border-slate-700/60 hover:scale-105 active:scale-95"
                      >
                        <span className="min-w-0 whitespace-normal">
                          {lang === 'ar' ? currentPlatform.iosActionTextAr : currentPlatform.iosActionTextEn}
                        </span>
                        <AppleIcon className="w-4 h-4 shrink-0 fill-current" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Micro Live Status Panel with Elevated Floating Depth */}
                <div 
                  className="lg:col-span-5 relative z-10"
                  style={{
                    transform: cardTilt.isHovered 
                      ? `translateZ(26px) translate3d(${cardTilt.tx * 0.5}px, ${cardTilt.ty * 0.5}px, 0)` 
                      : 'translateZ(0px)',
                    transition: cardTilt.isHovered ? 'transform 0.12s ease-out' : 'transform 0.45s ease-out'
                  }}
                >
                  <div className="feature-block-lift p-4 sm:p-5 rounded-2xl border text-xs text-right transition-all duration-300 bg-slate-50 border-slate-200 text-slate-700 shadow-2xs hover:border-cyan-300 dark:bg-[#0e1629] dark:border-slate-700/60 dark:text-slate-200 dark:hover:border-slate-600">
                    <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-cyan-500/10">
                      <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5 font-cairo">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        {lang === 'ar' ? 'الحالة: نشط ومتوافق' : 'Status: Active & Certified'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">v2026.4</span>
                    </div>

                    <div className="space-y-2 font-cairo text-xs">
                      {currentPlatform.stats.map((st, sIdx) => (
                        <div key={sIdx} className="hero-platform-stat-row flex justify-between items-center py-1.5 gap-2 border-b border-slate-200/50 dark:border-slate-800/50 last:border-none">
                          <span className="text-slate-500 dark:text-slate-400">
                            {lang === 'ar' ? st.labelAr : st.labelEn}
                          </span>
                          <span className="hero-platform-stat-value font-bold text-cyan-600 dark:text-cyan-400 whitespace-nowrap shrink-0">
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
        <Reveal delay={0.3} className="max-w-4xl mx-auto mt-6 pt-6 border-t border-slate-200 dark:border-slate-800/80">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { val: '2010', labelAr: 'تأسيس وخبرة ممتدة', labelEn: 'Established' },
              { val: '+1,500', labelAr: 'مؤسسة وشركة معتمدة', labelEn: 'Active Clients' },
              { val: '12 +', labelAr: 'حلول وبرمجيات متكاملة', labelEn: 'Software Systems' },
              { val: '24/7', labelAr: 'دعم فني واستجابة فورية', labelEn: 'Technical Support' }
            ].map((metric, idx) => (
              <div 
                key={idx} 
                className="p-2.5 sm:p-4 rounded-xl border transition-all duration-200 flex flex-col justify-center min-h-[68px] sm:min-h-[74px] bg-white border-slate-200 shadow-sm dark:bg-[#131d35]/70 dark:border-slate-700/50"
              >
                <div className="text-base sm:text-xl font-black font-mono text-cyan-500 mb-0.5 sm:mb-1 whitespace-nowrap">
                  <AnimatedCounter value={metric.val} />
                </div>
                <div className="text-[10px] sm:text-xs font-bold font-cairo leading-snug text-slate-600 dark:text-slate-400">
                  {lang === 'ar' ? metric.labelAr : metric.labelEn}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default HeroSection;
