import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, Network, LockKeyhole, TrendingUp } from 'lucide-react';
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
      theme === 'light' ? 'bg-slate-50/55 border-slate-200' : 'bg-[#0f172a] border-slate-800/80'
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
            theme === 'light' ? 'text-slate-600' : 'text-slate-400'
          }`}>
            {lang === 'ar' 
              ? 'تفاعل مع أزرار لوحة القيادة أدناه لتكتشف في ثوانٍ كيف تقوم برمجياتنا بربط مبيعات الفروع والمستودعات والتحقق الضريبي التلقائي بمرونة لا تضاهى.' 
              : 'Interact with our console switcher below to experience real-time transactions, automated legal regulatory verification, and live fleet syncing.'}
          </p>
        </div>

        {/* Elegant glassmorphic console frame */}
        <div className={`max-w-4xl mx-auto rounded-2xl border overflow-hidden shadow-2xl transition-all duration-300 ${
          theme === 'light' ? 'bg-white border-slate-200/80 shadow-cyan-100/20' : 'bg-[#131d35]/90 border-slate-700/60'
        }`}>
          {/* Header bar */}
          <div className={`px-4 py-3 border-b flex justify-between items-center ${
            theme === 'light' ? 'bg-slate-100/50 border-slate-205' : 'bg-[#0e1629] border-slate-700/60'
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
              theme === 'light' ? 'bg-slate-50/75 border-slate-200/80' : 'bg-[#0e1629]/90 border-slate-700/60'
            }`}>
              <button
                type="button"
                onClick={() => setActiveTab('sales')}
                className={`w-full text-right px-4 py-3.5 rounded-xl transition-all flex items-center justify-between gap-3 text-xs font-bold font-cairo cursor-pointer shrink-0 ${
                  activeTab === 'sales'
                    ? 'bg-[#1a85ea] text-white shadow-md shadow-[#1a85ea]/25'
                    : (theme === 'light' ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:bg-slate-800/40')
                }`}
              >
                  <span className="flex items-center gap-2"><BarChart3 aria-hidden="true" className="w-4 h-4" strokeWidth={1.8} />{lang === 'ar' ? 'نمو المبيعات لايف' : 'Sales Visualizer'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('branches')}
                className={`w-full text-right px-4 py-3.5 rounded-xl transition-all flex items-center justify-between gap-3 text-xs font-bold font-cairo cursor-pointer shrink-0 ${
                  activeTab === 'branches'
                    ? 'bg-[#1a85ea] text-white shadow-md shadow-[#1a85ea]/25'
                    : (theme === 'light' ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:bg-slate-800/40')
                }`}
              >
                  <span className="flex items-center gap-2"><Network aria-hidden="true" className="w-4 h-4" strokeWidth={1.8} />{lang === 'ar' ? 'شبكة الفروع والمزامنة' : 'Branch Hub Net'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('compliance')}
                className={`w-full text-right px-4 py-3.5 rounded-xl transition-all flex items-center justify-between gap-3 text-xs font-bold font-cairo cursor-pointer shrink-0 ${
                  activeTab === 'compliance'
                    ? 'bg-[#1a85ea] text-white shadow-md shadow-[#1a85ea]/25'
                    : (theme === 'light' ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:bg-slate-800/40')
                }`}
              >
                  <span className="flex items-center gap-2"><LockKeyhole aria-hidden="true" className="w-4 h-4" strokeWidth={1.8} />{lang === 'ar' ? 'الفحص والتحقق الضريبي' : 'ZATCA Compliance'}</span>
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
                          <TrendingUp className="w-3.5 h-3.5" />
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
                            <stop offset="0%" stopColor="#1a85ea" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#1a85ea" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Dynamic Path compilation based on state */}
                        <path
                          d={`M ${salesData.map((val, idx) => `${(idx / (salesData.length - 1)) * 100}%,${100 - (val / 100) * 100}`).join(' L ')}`}
                          fill="none"
                          stroke="#1a85ea"
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
                            <line x1="40" y1="30" x2="160" y2="40" stroke="#1a85ea" strokeWidth="1" strokeDasharray="3,3" className="animate-pulse" />
                            <line x1="40" y1="30" x2="60" y2="90" stroke="#1a85ea" strokeWidth="1" strokeDasharray="3,3" />
                            <line x1="160" y1="40" x2="60" y2="90" stroke="#1a85ea" strokeWidth="1.5" strokeDasharray="4,4" />
                            <line x1="160" y1="40" x2="140" y2="95" stroke="#1a85ea" strokeWidth="1" strokeDasharray="4,4" />
                            {/* Sync packets animating */}
                            <circle r="2.5" fill="#38bdf8" className="animate-bounce">
                              <animateMotion path="M 40,30 Q 100,20 160,40" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle r="2.5" fill="#1a85ea" className="animate-ping">
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

export { InteractiveConsole };
