export const SERVICE_MODULES = [
  {
    id: 'accounts',
    titleAr: 'برنامج الحسابات العامة',
    titleEn: 'General Ledger & Financials',
    descriptionAr: 'نظام محاسبي متكامل يغطي كافة الاحتياجات المالية للشركات والمؤسسات مع دعم معايير المحاسبة الدولية والتحول الرقمي.',
    descriptionEn: 'A comprehensive, cloud-ready financial ecosystem supporting global accounting standards, cost centers, and automated ledger operations.',
    category: 'erp',
    iconName: 'Calculator',
    accentColor: 'from-blue-600 to-cyan-500',
    youtubeUrl: 'https://youtu.be/u_Z48DhHULo?si=wOAvTkjrPCvAHw01',
    featuresAr: [
      'إنشاء دليل حسابات ودليل مركز تكلفة مرن',
      'تسجيل جميع الأرصدة الافتتاحية والمقاصات',
      'إمكانية إضافة قيود بعملات متعددة ومتطورة',
      'موديول كامل للشيكات، التحصيلات وأوراق القبض',
      'موديول كامل للأصول الثابتة وإهلاكاتها التلقائية',
      'إدارة متقدمة للقيود الدورية والمستندات المخزنة'
    ],
    featuresEn: [
      'Flexible charts of accounts & multi-level cost centers',
      'Opening balance entries & automated clearing houses',
      'Multi-currency support with real-time conversion rates',
      'Full checks system (treasury, checkbook, collection tracking)',
      'Fixed Assets register with automatic monthly depreciation',
      'Advanced recurring entries & attached documents manager'
    ]
  },
  {
    id: 'warehouse',
    titleAr: 'برنامج إدارة المخازن',
    titleEn: 'Inventory & Stock Management',
    descriptionAr: 'نظام إدارة لوجستية يسمح لك بمتابعة المخازن المتعددة وحركات الأصناف بكفاءة عالية وبأقل جهد.',
    descriptionEn: 'Efficiently oversee complex operations across multiple warehouses, stock valuations, and dynamic supply chain integrations.',
    category: 'logistics',
    iconName: 'Warehouse',
    accentColor: 'from-emerald-600 to-teal-500',
    youtubeUrl: 'https://youtu.be/HhS52NgxyV8?si=wEjRYlsUpGm8GfBw',
    featuresAr: [
      'متابعة حركة المخازن المتعددة ومعدلات دوران الأصناف',
      'متابعة دقيقة لحسابات العملاء والموردين وأرصدتهم',
      'إصدار أوامر البيع والشراء والتحجيم والحجوزات المؤقتة',
      'متابعة عمليات التحويل الداخلي بين المخازن والسيارات',
      'توليد وطباعة الباركود والملصقات للأصناف مباشرة',
      'إدارة الاعتمادات المستندية، تكاليف الاستيراد ومصروفات الشحن'
    ],
    featuresEn: [
      'Multi-warehouse tracking & item turnover metrics',
      'Accurate customer & supplier credit registers',
      'Sales/Purchase orders, reservations, & approvals pipeline',
      'Internal transfers setup between storage yards & delivery trucks',
      'Dynamic barcode formulation and layout generator',
      'Letter of Credit (L/C) setup & global freight cost distribution'
    ]
  },
  {
    id: 'agencies',
    titleAr: 'إدارة التوكيلات التجارية',
    titleEn: 'Commercial Distribution & Agencies',
    descriptionAr: 'حل متكامل للشركات ذات التوزيع الواسع والسيارات المحملة لمتابعة المناديب وخطوط السير والإنتاجية.',
    descriptionEn: 'A high-fidelity distribution system to coordinate delivery vehicles, salesman paths, routes, and commissions.',
    category: 'logistics',
    iconName: 'TrendingUp',
    accentColor: 'from-cyan-600 to-blue-500',
    youtubeUrl: 'https://youtu.be/09w8-IOCgUo?si=IETm3HI_orq__sq7',
    featuresAr: [
      'متابعة كافة المخازن، السيارات البضائعية والمناديب الميدانيين',
      'رسم ومتابعة خطوط سير السيارات وعمولات مبيعات الفان',
      'متابعة عمليات التحميل الصباحية وتصفية السيارات المسائية',
      'منظومة بوانص الأصناف، الخصومات المتدرجة والترويجية',
      'متابعة مستمرة لمديونيات العملاء ومصادقات الأرصدة',
      'متابعة أهداف البيع (Target) السنوية والشهرية على مستوى المندوب'
    ],
    featuresEn: [
      'Real-time tracking of mobile vans, micro-warehouses, & salesmen',
      'Route sheets planning, GPS markers, and dynamic commission structures',
      'Morning inventory loading & evening cash/unallocated stock settlement',
      'Built-in support for bonuses, progressive tiers & seasonal discounts',
      'Automated customer debt aging & balance verification reporting',
      'Sales target management (quota settings per product and representative)'
    ]
  },
  {
    id: 'manufacturing',
    titleAr: 'برنامج الإنتاج والتصنيع',
    titleEn: 'Production & Manufacturing (MRP)',
    descriptionAr: 'نظام متقدم لتخطيط الاحتياجات من المواد الأولية وإصدار أوامر تصنيع وضبط تكلفة المنتج النهائي.',
    descriptionEn: 'Plan and execute production runs, record manufacturing costs (BOM), raw materials, and factory utilization.',
    category: 'erp',
    iconName: 'Cpu',
    accentColor: 'from-amber-600 to-orange-500',
    youtubeUrl: 'https://youtu.be/mV1-bJBMJwM?si=c-LEZ7Zx1a0pJmHA',
    featuresAr: [
      'إمكانية عمل معايرة وهيكل المواد (BOM) لكل منتج على حدة',
      'ربط معايرة المنتجات بطلبيات عملاء مخصصين',
      'إصدار أوامر الإنتاج والتأكد من توافر الخامات قبل البدء',
      'مراقبة وتحميل مبيعات المصروفات غير المباشرة لتكلفة الصنف',
      'متابعة دقيقة لأرصدة وحسابات موردين المواد الخام والمعدات',
      'إمكانيات مخصصة لتركيبات المطاحن والأغذية والصناعات التجزيئية'
    ],
    featuresEn: [
      'Produce custom Bill of Materials (BOM) & recipes for end-products',
      'Link production configurations directly to specific customer orders',
      'Generate production orders & evaluate raw material availability first',
      'Monitor and distribute indirect overhead costs onto finalized batches',
      'Detailed balance statements of raw material vendors & logistics crews',
      'Special configurations tailored for flour mills, food items & compounding'
    ]
  },
  {
    id: 'hr',
    titleAr: 'إدارة شئون الموظفين (HR)',
    titleEn: 'HR, Attendance & Arabic Payroll',
    descriptionAr: 'نظام لإدارة الموارد البشرية والحضور والانصراف وحساب الرواتب والضرائب.',
    descriptionEn: 'Optimize human resource management with bio-metric integrations, local labor tax calculations, and dynamic scheduler options.',
    category: 'erp',
    iconName: 'Users',
    accentColor: 'from-indigo-600 to-purple-500',
    youtubeUrl: 'https://youtu.be/gjjZgYxYV7o?si=aphreyeE5vaOerjG',
    featuresAr: [
      'ملفات كاملة للموظفين تشمل كافة المستندات والبيانات القانونية',
      'إعداد فترات العمل (الورديات) المرنة وتدشين طبيعة عمل الموظف',
      'تكامل مباشر مع أجهزة البصمة وقراءة الحضور والانصراف تلقائياً',
      'إمكانية مراجعة وتعديل كشوف الحضور والانصراف يدوياً مع الموافقات',
      'حساب تلقائي للرواتب والبدلات والمقتطعات والإجازات',
      'دعم كامل للتأمينات الاجتماعية وضريبة كسب العمل المصرية والسعودية'
    ],
    featuresEn: [
      'Comprehensive employee profiles with expired document warning system',
      'Configurable work shifts (multiple rotas) & customized contract setups',
      'Native biometric API for automated attendance file reading',
      'Manual modifications panel with approval logs for exceptional overrides',
      'Instant calculation of basic salary, allowances, deductions & leaves',
      'Local Arabic labor rules compliance (social security, income taxes, etc.)'
    ]
  },
  {
    id: 'pos',
    titleAr: 'برنامج الماركت ونقاط البيع',
    titleEn: 'Supermarkets & Retail POS',
    descriptionAr: 'واجهة بيع سريعة للمحلات والسوبرماركت تدعم الباركود والموازين وتعمل حتى مع انقطاع الإنترنت.',
    descriptionEn: 'High-speed checkout experiences for retail environments, configured with dynamic barcode scanner scales and robust local cache options.',
    category: 'retail',
    iconName: 'ShoppingBag',
    accentColor: 'from-pink-600 to-rose-500',
    youtubeUrl: 'https://youtu.be/OmYi3ncF-wc?si=gcqGasNsScpcBxbC',
    featuresAr: [
      'واجهات سهلة ومبسطة جداً لتسريع عمليات البيع في الكاشير',
      'تحديد صلاحيات دقيقة ومستويات أمان لكل كاشير ومستلم وردية',
      'ربط وتكامل فوري مع موازين الباركود الإلكترونية والباركود المدمج',
      'ربط مبيعات كل نقطة بيع تلقائياً بالمخزن المحدد لها لتحديث الأرصدة',
      'متابعة حد الطلب والتنبيه التلقائي بنواقص الأصناف الهامة',
      'إمكانيات طباعة باركود الأصناف وتولير ملصقات الأسعار من النظام'
    ],
    featuresEn: [
      'Sleek and easy cash-desk viewport to optimize fast transactions',
      'Granular roles, shift handovers, and cash drawer security permissions',
      'Dynamic support for electronic barcode scales and weight reading',
      'Direct synchronization of physical retail outlets with target warehouses',
      'Minimum threshold alarms to prompt re-order activities on key stocks',
      'Integrated barcode label editing & sticker printing suite'
    ]
  },
  {
    id: 'jewelry',
    titleAr: 'نظام محلات المجوهرات والذهب',
    titleEn: 'Jewelry & Gold Retail System',
    descriptionAr: 'برنامج متخصص لمحلات الذهب والمجوهرات يتابع الوزن والعيار والذهب الكسر وحركات الخزينة باحترافية.',
    descriptionEn: 'Custom retail suite to track solid metal weight, purities (karats), broken gold exchange, and dual financial records.',
    category: 'retail',
    iconName: 'Gem',
    accentColor: 'from-yellow-600 to-amber-500',
    youtubeUrl: 'https://youtu.be/7jNv0wpMRQQ?si=dBESTz983MTYi8Fu',
    featuresAr: [
      'تسجيل الأصناف مع تصنيف العيارات (18, 21, 24) والمصنعية',
      'طباعة ملصقات (باركود) مخصصة للخواتم والأساور بالمواصفات والوزن',
      'إدارة مزدوجة للوزن بالجرام والعدد لكل صنف وحركة محاسبية',
      'شاشة متطورة لتحديث وتعيين أسعار الذهب والعيارات يومياً',
      'إمكانية شراء وارتجاع الذهب الكسر واحتسابه في فواتير الاستبدال',
      'خزائن نقدية وعينية متعددة لمتابعة الأرصدة المالية والذهب الخام'
    ],
    featuresEn: [
      'Register items categorized by gold karat (18k, 21k, 24k) and workmanship',
      'Print loop barcode stickers tailored for rings & bracelets with specs',
      'Dual ledger metrics keeping track of both count and net weight in grams',
      'Dynamic workspace to set daily gold metal marketplace global prices',
      'Integrated trade-in engine supporting scrap gold purchases on invoices',
      'Multi-currency cash drawers alongside weight-based gold lockers'
    ]
  },
  {
    id: 'restaurants',
    titleAr: 'إدارة المطاعم والكافيهات',
    titleEn: 'Restaurants, Cafes & Kitchens',
    descriptionAr: 'نظام إدارة كامل للطلب، الطاولات، التيك أوي، وتتبع وصفات الطعام (الريسيبي) والمستودع.',
    descriptionEn: 'Maximize table turns and manage recipe scaling, cloud captain orders, and phone-in deliveries effortlessly.',
    category: 'retail',
    iconName: 'Utensils',
    accentColor: 'from-orange-600 to-red-500',
    youtubeUrl: 'https://youtu.be/vRnWqeNIU4A?si=auIICE8Kvwp15kHa',
    featuresAr: [
      'نظام دقيق لإدارة تكوين الوجبات (الريسيبي) وحساب استهلاك المواد خام',
      'إدارة شاملة للصالات، الطاولات، والتيك أوف، والتسليم المنزلي',
      'منظومة كابتن أورد (Captain Order) متطورة من أجهزة التابلت والموبايل',
      'طباعة بونات المطبخ آلياً مقسمة حسب أقسام التجهيز والمشروبات والفيزا',
      'نظام متكامل لخدمة مراكز الاتصال (Call Center) وتحديد فروع التنفيذ',
      'تتبع الطيارين (الدليفري) وحساب العمولات ومدة توصيل الطلبات'
    ],
    featuresEn: [
      'Deep recipe ingredients builder with dynamic raw material deduction',
      'Comprehensive floor/table matrix layout, takeaway, and home delivery',
      'Advanced digital captain ordering App for waiters (tablet-based)',
      'Automated routing of kitchen dockets partitioned by preparation center',
      'Consolidated multi-branch Call Center module with customer location history',
      'Delivery courier dispatch metrics, route timing, and driver earnings'
    ]
  },
  {
    id: 'transport',
    titleAr: 'شركات النقل والشحن',
    titleEn: 'Logistics, Shipping & Fleet Management',
    descriptionAr: 'نظام لتتبع حركة أسطول الشاحنات والبضائع المنقولة مع مصروفات عقود النولون والبوالص.',
    descriptionEn: 'Take command of your logistics company. Run truck dispatching, trip log expenses, and invoicing rules smoothly.',
    category: 'logistics',
    iconName: 'Truck',
    accentColor: 'from-teal-600 to-emerald-500',
    youtubeUrl: 'https://youtu.be/D8tP6AbxKW4?si=HLxzBD6b9yXkXu4t',
    featuresAr: [
      'تسجيل الشاحنات، المقطورات، السائقين وبيانات الرخص والتحذيرات',
      'إدارة عقود نقل العملاء المحددة سلفاً واحتساب النولون التلقائي',
      'إنشاء بوالص الشحن بكافة التفاصيل المالية والكمية وأقسام التفريغ',
      'تتبع الحركة اليومية لكل شاحنة وتكاليف السفر والبدلات للسائق',
      'تسجيل مصاريف الرحلات وبوابات العبور (الكارتات) والصيانة على الطريق',
      'إصدار كشوفات وفواتير نقل مجمعة للعملاء والمقاولين الخارجيين'
    ],
    featuresEn: [
      'Maintain fleet register (trucks, trailers, drivers) with license alerts',
      'Predefined commercial distribution contracts with auto-freight cost tiers',
      'Formulate delivery waybills detailing cargo weight, site points, & status',
      'Record daily trip metrics, drivers travel allowances, and diesel usage',
      'Instantly log highway toll payments, vehicle maintenance, and unexpected fees',
      'Issue batch freight invocations for heavy load business clients'
    ]
  },
  {
    id: 'filters',
    titleAr: 'إدارة شركات الفلاتر والتكييفات',
    titleEn: 'HVAC & Filter Maintenance Service',
    descriptionAr: 'برنامج لحصر العملاء ومتابعة عقود الصيانة الدورية ومواعيد تغيير الشمع والضمان تلقائياً.',
    descriptionEn: 'Purpose-built CRM to coordinate periodical maintenance visits, filter replacement calendars, and split-payment plans.',
    category: 'specialized',
    iconName: 'Wrench',
    accentColor: 'from-sky-600 to-blue-500',
    youtubeUrl: 'https://youtu.be/D8tP6AbxKW4?si=d3JKL7BwDkqG4hgv',
    featuresAr: [
      'تسجيل بيانات العملاء وتصنيفهم حسب المنطقة والنوع والفلتر المستخدم',
      'إدارة مناديب وفنيي الصيانة وتعيين مناطق العمل لكل فني',
      'جدولة مواعيد الصيانة الدورية (تغيير شمعات الفلاتر وتدقيق التكييف) بدقة',
      'متابعة فترات الضمان للأجهزة وقطع الغيار المركبة للعميل',
      'إمكانية إصدار فواتير بيع بالتقسيط مع احتساب عوائد الفائدة بسهولة',
      'إصدار أوامر الشغل وطلبيات التركيب ومراجعة تقارير زيارة الفنيين'
    ],
    featuresEn: [
      'Log subscriber addresses, filter models, and service classes',
      'Field team scheduling, technician assignments, and territory coverage',
      'Automated scheduler for periodical cartridge changes or AC checkups',
      'Track appliance active warranties, parts usage, and repairs records',
      'Built-in installments generator calculating interest rates & monthly bills',
      'Issue physical work tickets, check technicians notes on site visits'
    ]
  },
  {
    id: 'bookings',
    titleAr: 'أنظمة الحجوزات والمناسبات المختلفة',
    titleEn: 'Reservation & Banquet Halls System',
    descriptionAr: 'برنامج لتنظيم وحجز قاعات المناسبات، الملاعب، أو العيادات والمراكز الخدمية مع تتبع الدفعات.',
    descriptionEn: 'Plan and schedule reservations for social banquet halls, sports fields, or medical clinics with deposit checks.',
    category: 'specialized',
    iconName: 'CalendarClock',
    accentColor: 'from-violet-600 to-fuchsia-500',
    youtubeUrl: 'https://youtu.be/qv2magISJAo?si=0JIV7uGADovBPaly',
    featuresAr: [
      'شاشات تقويمية مرنة وسهلة جداً لعرض المواعيد الشاغرة ومحجوزة',
      'جدولة مرنة للمقاعد، الساعات اليومية، أو فترات العيادات المتغيرة',
      'تسجيل أصناف ولوازم المناسبات والعروض كالديكور والوجبات والتقديم',
      'إدارة قاعات وملاعب متعددة ومراكز المناسبات بتهيئة منفصلة كلية',
      'متابعة دفعات الحجز، الأقساط المتبقية، وسرعة استخراج كشوف حسابات',
      'تقارير تحليلية شاملة للتدفقات اليومية والشهرية لنسب الإشغال والنشاط'
    ],
    featuresEn: [
      'Highly visual calendar UI depicting open time-slots and tight bookings',
      'Flexible scheduling of rows, daily hours, or clinical consultation times',
      'Log event setup items, caterings, customized themes, and audio plans',
      'Manage multiple banquets, properties, or sports venues in one panel',
      'Follow up on reservation deposits, installment balances, and print ledger',
      'Aggregate revenue statistics, daily/monthly occupancy, and peak times'
    ]
  },
  {
    id: 'cars',
    titleAr: 'إدارة معارض معرض السيارات',
    titleEn: 'Car Showrooms & Installments',
    descriptionAr: 'برنامج لإدارة معارض السيارات وتتبع الشاسيه والموتور وعقود التقسيط والكمبيالات المحصلة.',
    descriptionEn: 'Manage vehicle inventory, match engine/chassis numbers, construct installment agreements, and print promissory notes.',
    category: 'specialized',
    iconName: 'Car',
    accentColor: 'from-neutral-605 to-slate-500',
    youtubeUrl: 'https://youtu.be/D8tP6AbxKW4?si=BHeZBYc0ZmgeAKGg',
    featuresAr: [
      'دليل كامل للعملاء والموردين وتصنيف فئات السيارات الفاخرة والاقتصادية',
      'تسجيل بيانات السيارات بدقة متناهية (رقم الشاسيه، رقم الموتور، اللون، الموديل)',
      'إصدار فواتير بيع السيارات مدمجاً بها شروحات الجمارك والمواصفات',
      'متابعة عقود التقسيط الشاملة ودفتر توليد الكمبيالات الشهرية للفحص',
      'تتبع كشوفات حساب المشترين والموردين وتنبيهات تخطي حد الائتمان',
      'إحصائيات فورية للأرباح وخسائر التشغيل وتقارير المركز المالي للمؤسسة'
    ],
    featuresEn: [
      'Comprehensive buyer & broker registries with credit rating tags',
      'Log micro details: engine numbers, chassis serials, and custom parameters',
      'Car sales invoice generator detailing customs declaration & tax compliance',
      'Formulate structural installment tables & track monthly payment schedules',
      'Automated customer transaction statements & overdue credit notifications',
      'Get immediate profit-margin calculation per car sale or overall fleet'
    ]
  }
];

export default SERVICE_MODULES;
