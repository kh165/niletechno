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

export const MOBILE_APPS = [
  {
    id: 'mob-sales',
    titleAr: 'تطبيق مندوب المبيعات',
    titleEn: 'Smart Sales Representative App',
    descriptionAr: 'تطبيق موبايل ميداني يتبع المبيعات والعملاء ويسهل قيد الفواتير والتحصيل المباشر بكفاءة.',
    descriptionEn: 'Equip field agents with map routing, instant Bluetooth invoice printouts, and offline transaction records.',
    featuresAr: [
      'إصدار وطباعة فواتير مبيعات ومرتجعات فورية وتأكيد الاستلام',
      'دعم كامل للعمل بالعديد من اللغات وضبط إعدادات الخصم',
      'تتبع خطوط السير بالاعتماد على نظام الموقع الجغرافي GPS لخدمة العملاء',
      'سرعة استعراض كشوفات حساب العملاء الميدانية وطباعة إيصالات السداد'
    ],
    featuresEn: [
      'Issue and print thermal sales invoices, returns, & instant receipts',
      'Multi-language UI supporting Arabic localized discount structures',
      'GPS client auto-locator to render closest business outlets first',
      'Retrieve live age-debt reports on the go and print PDF statements'
    ],
    iconName: 'Smartphone',
    imageUrl: 'https://www.niletechno.com/assets/img/mobile/sales.webp',
    accentColor: 'from-blue-600/20 to-blue-500/10'
  },
  {
    id: 'mob-pos',
    titleAr: 'تطبيق نقطة البيع للموبايل (Mobile POS)',
    titleEn: 'Interactive Mobile POS App',
    descriptionAr: 'حوّل هاتفك أو جهازك اللوحي المحمول لنقطة بيع سريعة تدعم الطباعة وقراءة الباركود وصالح للعمل أوفلاين.',
    descriptionEn: 'Transform any smartphone or tablet into a fully certified retail terminal with offline synchronization.',
    featuresAr: [
      'بيع فوري بباركود الكاميرا وسرعة تسجيل المنتجات والكمية',
      'يعمل بالكامل دون الحاجة للاتصال بالإنترنت (Offline Mode) ويتزامن لاحقاً',
      'سهولة ربط ودعم الطابعات الحرارية المحمولة عبر البلوتوث المباشر',
      'إدارة الصندوق اليومي ومراقبة النقدية والتدفقات الصباحية والمسايية'
    ],
    featuresEn: [
      'Instant barcode scanning via smartphone camera with stock deduction',
      'Full capabilities when network is offline, syncing safely once active',
      'Native support for portable Bluetooth thermal printers',
      'Daily shift summary report with physical cash checking'
    ],
    iconName: 'Tablet',
    imageUrl: 'https://www.niletechno.com/assets/img/mobile/pos.jpg',
    accentColor: 'from-teal-600/20 to-teal-500/10'
  },
  {
    id: 'mob-restaurant',
    titleAr: 'تطبيق النادل ومتابعة المطبخ',
    titleEn: 'Smart Waiter & Kitchen App',
    descriptionAr: 'تسهيل طلبات الطاولات من خلال النادل وتسجيل كابتن الأوردر مباشرة وإرساله لوحدات التحضير بدون وقت ضائع.',
    descriptionEn: 'Empower floor captains to log table orders on handheld screens, instantly updating preparation monitors.',
    featuresAr: [
      'تسجيل طلب الكابتن واختيار الطاولة والإضافات (Modifier) بسهولة تامة',
      'توجيه الطلب فوراً إلى طابعات وشاشات العرض داخل المطبخ مقسماً بالأصناف',
      'متابعة حية لحالة الطاولات (محجوزة، فارغة، تحتاج لتنظيف، بانتظار الفاتورة)',
      'عرض المنيو الرقمي الحديث للزبائن وإمكانية الطلب عبر الـ QR'
    ],
    featuresEn: [
      'Record orders, select active tables, and define item extra components',
      'Route orders instantly to specified kitchen display screens and printers',
      'Dynamic table map indicators (booked, free, needs cleaning, billed)',
      'Provide modern digital QR menus for self-ordering options'
    ],
    iconName: 'ChefHat',
    imageUrl: 'https://www.niletechno.com/assets/img/mobile/resturant.png',
    accentColor: 'from-orange-600/20 to-orange-500/10'
  },
  {
    id: 'mob-medical',
    titleAr: 'تطبيق المندوب الطبي الدوائي',
    titleEn: 'Medical & Pharma Rep System',
    descriptionAr: 'برنامج مخصص لشركات الأدوية لمتابعة نشاط مناديب الدعاية الطبية ومقابلات الأطباء والتوزيع للصيدليات.',
    descriptionEn: 'Comprehensive companion tool for healthcare sales representatives, detailing clinic logs and pharmacy campaigns.',
    featuresAr: [
      'جدولة وتتبع زيارات الأطباء اليومية وكتابة تقرير المقابلات الفورية لجهة عمله',
      'عرض تفاعلي رائع ومحدث لكتيب المنتجات والمواصفات الطبية والمزايا',
      'تسجيل عينات الأدوية الموزعة مجاناً والهدايا العينية للعيادات',
      'تحصيل وتدوين طلبيات الصيدليات وربطها بالمخازن ووكلاء التوزيع'
    ],
    featuresEn: [
      'Schedule physician visits & draft immediate clinical meetup comments',
      'Demonstrate pharmaceutical digital product brochures with interactive specs',
      'Log free samples distribution & material aid inventories per clinic',
      'Collect pharmacy bookings and integrate them directly with warehouse queues'
    ],
    iconName: 'HeartPulse',
    imageUrl: 'https://www.niletechno.com/assets/img/mobile/medical_rep.jpg',
    accentColor: 'from-pink-600/20 to-pink-500/10'
  }
];

export const BRANCHES_DATA = [
  {
    id: 'cairo',
    cityAr: 'القاهرة، جمهورية مصر العربية',
    cityEn: 'Cairo, Egypt',
    areaAr: 'المعادي - البساتين',
    areaEn: 'Maadi - El Basatin',
    addressAr: 'شارع كورنيش النيل، المعادي، البساتين، القاهرة، مصر',
    addressEn: 'Corniche El Nile St, Maadi, Basatin, Cairo, Egypt',
    phone: '00201000082722',
    whatsapp: '201000082722',
    mapEmbedUrl: 'https://maps.google.com/maps?q=29.981800,31.251400&hl=ar&z=15&output=embed',
    googleMapsUrl: 'https://www.google.com/maps?q=29.981800,31.251400'
  },
  {
    id: 'tanta',
    cityAr: 'طنطا، جمهورية مصر العربية',
    cityEn: 'Tanta, Egypt',
    areaAr: 'طريق القاهرة الإسكندرية الزراعي',
    areaEn: 'Alexandria-Cairo Agricultural Road',
    addressAr: 'بجوار معهد الحاسبات و المعلومات طريق مصر الإسكندرية الزراعي، طنطا',
    addressEn: 'Next to the Institute of Computers & Information, Alexandria-Cairo Agricultural Road, Tanta, Egypt',
    phone: '00201000082722',
    whatsapp: '201000082722',
    mapEmbedUrl: 'https://maps.google.com/maps?q=%D9%86%D8%A7%D9%8A%D9%84%20%D8%AA%D9%83%D9%86%D9%88%20%D9%84%D9%84%D8%A8%D8%B1%D9%85%D8%AC%D9%8A%D8%A7%D8%AA%20%D9%88%D9%83%D8%A7%D9%85%D9%8A%D8%B1%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D8%B1%D8%A7%D9%82%D8%A8%D9%87%D8%8C%20%D8%B7%D8%B1%D9%8A%D9%82%20%D9%85%D8%B5%D8%B1%20%D8%A7%D9%84%D8%A5%D8%B3%D9%83%D9%86%D8%AF%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D8%B2%D8%B1%D8%A7%D8%B9%D9%8A%D8%8C%20%D8%B7%D9%86%D8%B7%D8%A7&hl=ar&z=16&output=embed',
    googleMapsUrl: 'https://maps.app.goo.gl/YmgfNNj8b53JRgvZA'
  },
  {
    id: 'riyadh',
    cityAr: 'الرياض، المملكة العربية السعودية',
    cityEn: 'Riyadh, Saudi Arabia',
    areaAr: 'الشفا - حي بدر',
    areaEn: 'Al-Shifa - Badr District',
    addressAr: 'طريق أم عمارة، حي بدر، الشفا، الرياض، المملكة العربية السعودية',
    addressEn: 'Am Omara, Badr District, Al-Shifa, Riyadh, Saudi Arabia',
    phone: '+966535653688',
    whatsapp: '966535653688',
    mapEmbedUrl: 'https://maps.google.com/maps?q=24.551130,46.611130&hl=ar&z=15&output=embed',
    googleMapsUrl: 'https://www.google.com/maps?q=24.551130,46.611130'
  }
];

export const SUCCESS_PARTNERS = [
  {
    id: 'sp_yg_agencies',
    category: 'agencies_wholesale',
    nameAr: 'شركة واي جي للتوكيلات التجارية',
    nameEn: 'YG for Trading Agencies',
    industryAr: 'التوكيلات التجارية وتوزيع السلع والزيوت',
    industryEn: 'Commercial Agencies & Distribution',
    logoText: 'YG',
    imageUrl: '/yg_trading_agencies_logo.png'
  },
  {
    id: 'sp_malizia',
    category: 'agencies_wholesale',
    nameAr: 'الشركة المصرية الماليزية ش.م.م',
    nameEn: 'Egyptian Malaysian Co. S.A.E',
    industryAr: 'التوكيلات التجارية وتوزيع السلع والزيوت',
    industryEn: 'Commercial Agencies & Distribution',
    logoText: 'EM',
    imageUrl: '/el_malizia_logo.png'
  },
  {
    id: 'sp_skyhold',
    category: 'contracting',
    nameAr: 'شركة سكاي هولد لخدمات السقالات والمقاولات',
    nameEn: 'Sky Hold Scaffolding Service',
    industryAr: 'المقاولات العامة وأنظمة السقالات المعدنية',
    industryEn: 'Scaffolding Systems & Contracting',
    logoText: 'SH',
    imageUrl: '/sky_hold_logo.svg'
  },
  // ================= 1. المملكة العربية السعودية (ksa) =================
  { id: 'ksa1', category: 'ksa', nameAr: 'شركة اسدام الفنية للزجاج', nameEn: 'Asdam Technical Glass Company', industryAr: 'الزجاج والمقاولات المتخصصة', industryEn: 'Glass & Special Contracting', logoText: 'AS' },
  { id: 'ksa2', category: 'ksa', nameAr: 'شركة هيكسا باور للأنظمة المتقدمة', nameEn: 'Hexa Power Advanced Systems', industryAr: 'أنظمة الطاقة والمقاولات الكهربائية', industryEn: 'Power & Electrical Systems', logoText: 'HP' },
  { id: 'ksa3', category: 'ksa', nameAr: 'شركة الجهني وأبنائه المحدودة', nameEn: 'M. Rashid Al-Juhani Co. & Sons', industryAr: 'الخدمات اللوجستية والنقل البري', industryEn: 'Logistics & Heavy Transport', logoText: 'JH' },
  { id: 'ksa4', category: 'ksa', nameAr: 'شركة هيكسا للطلاء النانوي والدهانات', nameEn: 'Hexa Nano Coating & Paints', industryAr: 'المواد الكيميائية وحماية الأسطح', industryEn: 'Chemicals & Surface Protection', logoText: 'HN' },
  { id: 'ksa5', category: 'ksa', nameAr: 'ماركت ومخابز الخفاجي الحديثة', nameEn: 'Al-Khafaji Bakery & Supermarket', industryAr: 'السوبرماركت ونقاط المبيعات الغذائية', industryEn: 'Supermarket & Food POS Retail', logoText: 'KH' },
  { id: 'ksa6', category: 'ksa', nameAr: 'مجموعة العبود للتنمية والتطوير', nameEn: 'Al-Aboud Development Group', industryAr: 'التطوير العقاري والمقاولات العامة', industryEn: 'Real Estate & General contracting', logoText: 'AB' },
  { id: 'ksa7', category: 'ksa', nameAr: 'مصانع مياه مارين الصحية المعبأة', nameEn: 'Mareen Healthy Water Bottling Plants', industryAr: 'تعبئة مياه الشرب وإنتاج الأغذية', industryEn: 'Water Bottling & Food processing', logoText: 'MR' },
  { id: 'ksa8', category: 'ksa', nameAr: 'شركة أريج الخليج لتأجير السيارات', nameEn: 'Areej Al-Khaleej Car Rental', industryAr: 'تأجير السيارات والنقل السياحي واليومي', industryEn: 'Car Rental & Passenger Transport', logoText: 'AK' },
  { id: 'ksa9', category: 'ksa', nameAr: 'مجموعة المجال الطبي التخصصي والعيادات', nameEn: 'Al-Majal Specialist Medical Group', industryAr: 'مجموعة عيادات طب الأسنان والجلدية', industryEn: 'Clinical Booking & Pharmacy POS', logoText: 'MJ' },
  { id: 'ksa10', category: 'ksa', nameAr: 'مصانع البلاستيك الوطنية للتغليف', nameEn: 'National Plastic & Packaging Factories', industryAr: 'تصنيع البلاستيك عالي الكثافة والكرتون', industryEn: 'Plastic & Carton Manufacturing', logoText: 'NP' },
  { id: 'ksa11', category: 'ksa', nameAr: 'شركة فود لاند للمواد الغذائية بالجملة', nameEn: 'Food Land General Foodstuff Trading', industryAr: 'سلاسل بيع وتوزيع وتخزين السلع', industryEn: 'FMCG Sales & Cold Chain Logistics', logoText: 'FL' },
  { id: 'ksa12', category: 'ksa', nameAr: 'شركة مدارات الخليج للاتصالات وتقنية المعلومات', nameEn: 'Madarat Al-Khaleej Telecom & IT', industryAr: 'شبكات الاتصالات وحلول تقنية المعلومات', industryEn: 'Telecom Infrastructure & Solution', logoText: 'MK' },

  // ================= 2. شركات الاستيراد والتصدير (import_export) =================
  { id: 'ie1', category: 'import_export', nameAr: 'شركة النيل للمحاصيل والاستيراد والتصدير', nameEn: 'Nile Crops Import & Export', industryAr: 'استيراد وتصدير الحاصلات الزراعية', industryEn: 'Agricultural Crops Trading', logoText: 'NC' },
  { id: 'ie2', category: 'import_export', nameAr: 'إيجيبت بورت للشحن والتوكيلات الملاحية', nameEn: 'Egypt Port Marine Shipping & Trading', industryAr: 'التخليص الجمركي والتملك الملاحي', industryEn: 'Customs Clearance & Marine Agency', logoText: 'EP' },
  { id: 'ie3', category: 'import_export', nameAr: 'الفراعنة للاستيراد والتصدير والتوكيلات', nameEn: 'Pharaohs Import & Export Agency', industryAr: 'استيراد وتوزيع البلاستيك الخام والمواد', industryEn: 'Raw Materials & Polymer Trading', logoText: 'PH' },
  { id: 'ie4', category: 'import_export', nameAr: 'الشركة المتحدة للاستيراد وتجارة الورق', nameEn: 'United Paper Import & Trade', industryAr: 'استيراد لب الورق ولوازم الطباعة', industryEn: 'Paper Rolls & Printing Supply', logoText: 'UP' },
  { id: 'ie5', category: 'import_export', nameAr: 'شركة النجم الساطع للتوكيلات التجارية', nameEn: 'Bright Star Commercial Import', industryAr: 'استيراد قطع غيار الماكينات الثقيلة', industryEn: 'Industrial Machinery Spares Import', logoText: 'BS' },
  { id: 'ie6', category: 'import_export', nameAr: 'الشركة الشرق الأوسط للمستلزمات الزراعية', nameEn: 'ME Import & Export Agritech', industryAr: 'معدات الري ومستلزمات الصوب الزراعية', industryEn: 'Irrigation & Farming Tech Trading', logoText: 'ME' },
  { id: 'ie7', category: 'import_export', nameAr: 'الشركة الدولية لتجارة الألياف والكيماويات', nameEn: 'International Fiber & Chem Trade', industryAr: 'كيماويات البناء والألياف الصناعية للغزل', industryEn: 'Industrial Chemicals & Yarn Trade', logoText: 'IF' },
  { id: 'ie8', category: 'import_export', nameAr: 'الأندلس للاستيراد وتوريد الفولاذ والمعادن', nameEn: 'Al-Andalus Metals & Steel Importing', industryAr: 'استيراد وتوريد قطاعات الصلب المقاوم', industryEn: 'Metallic Beams & Special Alloys', logoText: 'AN' },

  // ================= 3. الكافيهات و المطاعم (hospitality) =================
  { id: 'hos1', category: 'hospitality', nameAr: 'مطابخ ومطاعم الشرق الفاخرة وسلسلة الضيافة', nameEn: 'Al-Sharq Restaurant Group', industryAr: 'إدارة المطاعم وخدمات الضيافة والبوفيه', industryEn: 'Hopsitality Management & Restaurants', logoText: 'SR' },
  { id: 'hos2', category: 'hospitality', nameAr: 'مطاعم حضرموت الشام وفروعه الحديثة', nameEn: 'Hadramout Al-Sham Central Kitchens', industryAr: 'المطابخ المركزية وسلاسل المأكولات العربية', industryEn: 'Central Kitchen & Arab Cuisine', logoText: 'HS' },
  { id: 'hos3', category: 'hospitality', nameAr: 'سلسلة مطاعم كابتن برجر الشهيرة والأغذية', nameEn: 'Captain Burger Restaurants Chain', industryAr: 'مطاعم وجبات سريعة وإدارة مخزون الفروع', industryEn: 'Fast Food Chains & Inventory POS', logoText: 'CB' },
  { id: 'hos4', category: 'hospitality', nameAr: 'سلسلة مطاعم وكافيهات شاورما الريم الشهيرة', nameEn: 'Shawarma El-Reem Chain of Restaurants', industryAr: 'إدارة المبيعات والتوصيل السريع للمطاعم', industryEn: 'Direct Ingress POS & Fast Delivery', logoText: 'RE' },
  { id: 'hos5', category: 'hospitality', nameAr: 'مطاعم قصر الضيافة للأكلات التراثية', nameEn: 'Banquets Castle for Traditional Cuisines', industryAr: 'العزائم والضيافة والمطابخ الفاخرة', industryEn: 'Fine Dining & Banquet Operations', logoText: 'QC' },
  { id: 'hos6', category: 'hospitality', nameAr: 'مجموعة مقاهي وصالات كافيهات القاهرة المتميزة', nameEn: 'Cairo Cafe and Lounge Group', industryAr: 'مبيعات الكافية ونقاط الخدمة السريعة', industryEn: 'Cafe POS Counter & Service Nodes', logoText: 'CC' },
  { id: 'hos7', category: 'hospitality', nameAr: 'سلسلة أسماك الشوكة الذهبية للمأكولات البحرية', nameEn: 'Golden Fork Seafood Chain', industryAr: 'خدمات الكاترينج والأغذية والمأكولات البحرية', industryEn: 'Seafood Restaurants & Catering', logoText: 'GF' },
  { id: 'hos8', category: 'hospitality', nameAr: 'برجر ماستر للوجبات السريعة وإدارة التوصيل', nameEn: 'Burger Master Fast Food Chain', industryAr: 'المبيعات اللحظية والربط بتطبيقات الدليفري', industryEn: 'Instant Orders & Aggregator Sync', logoText: 'BM' },
  { id: 'hos9', category: 'hospitality', nameAr: 'سي فريش للمأكولات البحرية والحفلات المفتوحة', nameEn: 'Sea Fresh Seafood & Banquet Planners', industryAr: 'إعداد الحفلات المفتوحة وخدمات العشاء', industryEn: 'Hotel Grade Buffets & Banqueting', logoText: 'SF' },
  { id: 'hos10', category: 'hospitality', nameAr: 'فندق وكافيه السفير الفاخر لإدارة الأغذية', nameEn: 'Al-Safir Hotels & Food Services Group', industryAr: 'إدارة مخازن الأغذية وصالات الميكسولوجي', industryEn: 'Hotel Stores & Premium Lounge POS', logoText: 'SL' },

  // ================= 4. المولات والاداوات المنزلية (malls_houseware) =================
  { id: 'mh1', category: 'malls_houseware', nameAr: 'مجموعة أسواق الحرم بلازا للملابس والتجزئة', nameEn: 'Al-Haram Plaza Clothes & Home Malls', industryAr: 'إدارة معارض الملابس الجاهزة والمنسوجات', industryEn: 'Garments & Apparel High-Speed POS', logoText: 'HP' },
  { id: 'mh2', category: 'malls_houseware', nameAr: 'الصفوة للأثاث المنزلي والديكورات الفاخرة', nameEn: 'Al-Safwa Furniture & Decor Centers', industryAr: 'المبيعات الكبرى للأثاث وتنزيل الخصومات', industryEn: 'Furniture Retailing & Custom Invoices', logoText: 'SF' },
  { id: 'mh3', category: 'malls_houseware', nameAr: 'رويال سنتر للأجهزة الكهربائية والمنزلية', nameEn: 'Royal Center Electronics & Home Goods', industryAr: 'سلاسل وتأمين بيع الأجهزة المنزلية بخصم', industryEn: 'Appliances Wholesaling & Serializing', logoText: 'RC' },
  { id: 'mh4', category: 'malls_houseware', nameAr: 'أسواق وبقالة الخليج والتموينات الحديثة', nameEn: 'Modern Gulf Cooperative Retail Malls', industryAr: 'إدارة الباركود ومبيعات السوبرماركت', industryEn: 'Supermarket Fast POS & Scan Nodes', logoText: 'MG' },
  { id: 'mh5', category: 'malls_houseware', nameAr: 'هايبر ماركت المدينة السريعة والمنزلية', nameEn: 'Al-Madina Hypermarkets & Homeware', industryAr: 'الأدوات المنزلية والسلع الاستهلاكية المزدوجة', industryEn: 'Multichannel Homeware & FMCG POS', logoText: 'AM' },
  { id: 'mh6', category: 'malls_houseware', nameAr: 'شركة البيت الأنيق لتجارة الأدوات المنزلية', nameEn: 'Elegant House Appliances & Malls', industryAr: 'معارض الأدوات المنزلية وتجهيزات المطابخ', industryEn: 'Homewares & Smart Kitchen Utilities', logoText: 'EH' },
  { id: 'mh7', category: 'malls_houseware', nameAr: 'مجمع النور مول للأجهزة والأقمشة الحديثة', nameEn: 'Al-Noor Mall and Textiles Network', industryAr: 'المبيعات متعددة الأقسام ومتابعة النقدية', industryEn: 'Departmental Invoicing & Cash Flow', logoText: 'NM' },
  { id: 'mh8', category: 'malls_houseware', nameAr: 'كوين جروب للأدوات المنزلية الكبرى والتحف', nameEn: 'Queen Group Housewares & Antiques', industryAr: 'استيراد وتوزيع وتجزئة التجهيزات الراقية', industryEn: 'Luxury Home Decor & Dining Retailing', logoText: 'QG' },

  // ================= 5. مصانع الاعلاف و المطاحن (mills_feed) =================
  { id: 'mf1', category: 'mills_feed', nameAr: 'مجموعة النور لإنتاج بيض المائدة وأعلاف الدواجن', nameEn: 'Al-Noor Poultry & Feed Mills', industryAr: 'تصنيع الأعلاف ومزارع الدواجن وإنتاج الغذاء', industryEn: 'Animal Feed Formulation & Hatchery', logoText: 'AN' },
  { id: 'mf2', category: 'mills_feed', nameAr: 'مطاحن الدلتا الكبرى للدقيق والنشا والغلال', nameEn: 'Delta Central Flour & Grain Mills', industryAr: 'طحن الغلال للدقيق الفاخر ومتابعة الصوامع', industryEn: 'Industrial Flour Milling & Silo Care', logoText: 'DM' },
  { id: 'mf3', category: 'mills_feed', nameAr: 'شركة الأمل لتصنيع وتجارة الأعلاف الحيوانية', nameEn: 'Al-Amal Feed Industries & Machinery', industryAr: 'إنتاج أعلاف الماشية والمركزات البروتينية', industryEn: 'Cattle Feed Pelleting & Production', logoText: 'AL' },
  { id: 'mf4', category: 'mills_feed', nameAr: 'مطاحن وصوامع القاهرة والمنطقة الشرقية', nameEn: 'Cairo & Eastern Grain Silos Corporation', industryAr: 'تخزين الغلال الاستراتيجية ومخرجات الطحن', industryEn: 'National Strategic Sourcing & Milling', logoText: 'CO' },
  { id: 'mf5', category: 'mills_feed', nameAr: 'السلام لإنتاج وتعبئة الأعلاف والغلال الكبرى', nameEn: 'Al-Salam Animal Feed & Grain Sacks', industryAr: 'إنتاج العلف المحبب ومراقبة الجودة للمزارع', industryEn: 'Grain Packaging & Livestock Nutrition', logoText: 'SL' },
  { id: 'mf6', category: 'mills_feed', nameAr: 'شركة الهدى لمطاحن الدقيق الأبيض والنخالة', nameEn: 'Al-Huda Flour Mills Corporation', industryAr: 'تكرير وتعبئة الدقيق المخصص للمخابز', industryEn: 'Flour Refineries & Wholesale Distribution', logoText: 'HD' },
  { id: 'mf7', category: 'mills_feed', nameAr: 'شركة الوادي لتصنيع الأعلاف والمركزات العضوية', nameEn: 'El-Wadi Organic Feed and Concentrates', industryAr: 'أعلاف عضوية ومكملات تغذية الأسماك والأرانب', industryEn: 'Organic Aquafeeds & Compound Feeds', logoText: 'WD' },
  { id: 'mf8', category: 'mills_feed', nameAr: 'مصنع النخبة لإنتاج أعلاف مزارع التسمين', nameEn: 'Elite Feed & Feedmill Technologies', industryAr: 'تصنيع أعلاف الماشية والدواجن بمواصفات قياسية', industryEn: 'Broad-Spectrum Feedmill Engineering', logoText: 'EF' },

  // ================= 6. شركات المقاولات (contracting) =================
  { id: 'con1', category: 'contracting', nameAr: 'شركة الإيمان للمقاولات العامة والتوريدات الصناعية', nameEn: 'Al-Eman Contracting & Trading', industryAr: 'المقاولات العامة، الحفر، وأعمال الأساسات', industryEn: 'Civil Works & Substructure Contracting', logoText: 'EM' },
  { id: 'con2', category: 'contracting', nameAr: 'مؤسسة الصفوة للمقاولات العامة والإنشاء', nameEn: 'Al-Safwa general Construction & Trading', industryAr: 'بناء الأبراج السكنية والمرافق الإدارية والمول', industryEn: 'High-rise & Administrative Facilities', logoText: 'SO' },
  { id: 'con3', category: 'contracting', nameAr: 'شركة المروة الدولية للهندسة والتشغيل واللاندسكيب', nameEn: 'Al-Marwa Engineering & Systems', industryAr: 'مستشارون هندسيون وإدارة المشروعات الإنشائية', industryEn: 'Structural Designs & Field Supervision', logoText: 'MW' },
  { id: 'con4', category: 'contracting', nameAr: 'شركة اليسر للمقاولات والتطوير العقاري العمراني', nameEn: 'Al-Yusr Contracting & Construction', industryAr: 'تشييد المدن السكنية والتخطيط والتسليم', industryEn: 'Residential Infrastructure & Urbanism', logoText: 'YE' },
  { id: 'con5', category: 'contracting', nameAr: 'الفارس للمقاولات العامة والخرسانة الجاهزة', nameEn: 'Al-Fares Ready Mix & Builders', industryAr: 'توريد الخرسانة الجاهزة ومعدات البناء الكبرى', industryEn: 'Ready Mix Concrete Sourcing & Logistics', logoText: 'FR' },
  { id: 'con6', category: 'contracting', nameAr: 'المقاولون المتحدون للإنشاءات الهندسية الكبرى', nameEn: 'United Contractors League for Projects', industryAr: 'مقاولات الكباري وشبكات الصرف ومياه الشرب', industryEn: 'Bridges & Municipal Waterway Constructing', logoText: 'UC' },
  { id: 'con7', category: 'contracting', nameAr: 'العهد للمقاولات العمومية وأعمال شق الطرق والأسفلت', nameEn: 'Al-Ahed General Roadways & Infrastructure', industryAr: 'رصف الطرق السريعة والأشغال العامة الكبرى', industryEn: 'High-speed Roadway Laying & Paving Ops', logoText: 'AH' },
  { id: 'con8', category: 'contracting', nameAr: 'شركة النخبة للإنشاء والتشطيبات والديكور الداخلي', nameEn: 'Elite Building & Interiors Company', industryAr: 'التشطيبات المعمارية الفاخرة وتجهيز الفنادق', industryEn: 'Architectural Outfits & Premium Finishing', logoText: 'EB' },

  // ================= 7. محلات المجوهرات (jewelry) =================
  { id: 'jew1', category: 'jewelry', nameAr: 'محلات لازورد للمشغولات الذهبية والمجوهرات', nameEn: 'Lazurde Gold & Jewelry Retailers', industryAr: 'المجوهرات الفاخرة وبيع المصوغات والمعشقات', industryEn: 'High Jewelry & Premium Retail Stores', logoText: 'LZ' },
  { id: 'jew2', category: 'jewelry', nameAr: 'مجموعة الفارس للمصوغات والمعادن الثمينة والذهب', nameEn: 'Al-Fares Elite Gold & Jewels', industryAr: 'صياغة ونقش وبيع أطقم الزفاف والذهب السبائك', industryEn: 'Gold Refining, Bullion Sales & Jewelry', logoText: 'AF' },
  { id: 'jew3', category: 'jewelry', nameAr: 'شركة قصر الذهب وصياغة السبائك اليدوية الفنية', nameEn: 'Gold Palace Jewelry Workshops', industryAr: 'ورش تصنيع وتوريد الذهب للمحلات والسبائك', industryEn: 'Handmade Bullion Casting & Jewelry Workshops', logoText: 'GP' },
  { id: 'jew4', category: 'jewelry', nameAr: 'شركة المزيني للمجوهرات والذهب والأطقم الماسية', nameEn: 'Al-Muzaini Gold & Fine Jewelry Co', industryAr: 'مبيعات التجزئة للمجوهرات وتفصيل الألماس', industryEn: 'Bespoke Diamonds & Premium Jewelry Box', logoText: 'MZ' },
  { id: 'jew5', category: 'jewelry', nameAr: 'معرض داماس مصر للمجوهرات والمعادن الفاخرة', nameEn: 'Damas Egypt Luxury Gold Branch', industryAr: 'معارض البيع الراقية ومعادلة أسعار الذهب لحظياً', industryEn: 'Chain Stores Inventory & Live Gold Pricing', logoText: 'DM' },
  { id: 'jew6', category: 'jewelry', nameAr: 'مجوهرات الملكة للذهب الأبيض والماس الحر', nameEn: 'Queen Diamonds & White Gold Emporium', industryAr: 'استيراد الأحجار الكريمة وشهادات فحص الماس', industryEn: 'Precious Gemstones Importing & Certification', logoText: 'QD' },
  { id: 'jew7', category: 'jewelry', nameAr: 'بيت الذهب والفضة للصياغة والمصوغات الهندية', nameEn: 'The Golden House Crafts & Silverware', industryAr: 'تصنيع وصياغة فضيات الديكور والفضة الإسترلينية', industryEn: 'Silversmithing & Indian Crafted Ornaments', logoText: 'GH' },
  { id: 'jew8', category: 'jewelry', nameAr: 'الياقوت للمجوهرات الكريمة واللؤلؤ الطبيعي', nameEn: 'Al-Yaqout Precious Stones & Pearls', industryAr: 'عقود اللؤلؤ الطبيعي والأحجار الكريمة النادرة', industryEn: 'Natural Pearls Sourcing & Luxury Goldsmith', logoText: 'YQ' },

  // ================= 8. التوكيلات التجارية والجمله (agencies_wholesale) =================
  { id: 'aw1', category: 'agencies_wholesale', nameAr: 'أسواق مكة للمواد الغذائية والسلع الاستهلاكية بالكامل', nameEn: 'Makkah FMCG Wholesale & Retail Co.', industryAr: 'توزيع وتخزين مبيعات الجملة للماركت والموردين', industryEn: 'FMCG Bulk Distribution & Warehouse ERP', logoText: 'MK' },
  { id: 'aw2', category: 'agencies_wholesale', nameAr: 'شركة الجميل لقطع غيار ومستلزمات السيارات وجملتها', nameEn: 'Al-Jameel Auto Spares Wholesale Networks', industryAr: 'قطع غيار سيارات أصلية وتوكيد قطع الغيار المعتمدة', industryEn: 'Automotive Spares Serializing & Wholesale', logoText: 'JM' },
  { id: 'aw3', category: 'agencies_wholesale', nameAr: 'التيسير للتوكيلات التجارية والتوريدات العامة الكبرى', nameEn: 'Al-Taysir Commercial Agencies & Supplies', industryAr: 'حيازة توكيلات الأغذية والأدوات المستوردة بالجملة', industryEn: 'Import Franchise Oversight & Bulk Sales', logoText: 'TS' },
  { id: 'aw4', category: 'agencies_wholesale', nameAr: 'الدولية لخدمات التجارة والتوزيع والجملة بالهيربر', nameEn: 'International Distribution & Wholesale Logistics', industryAr: 'موردو الألبان واللحوم المجمدة للأطباء والمستشفيات', industryEn: 'Cold Chain Supply & FMCG Master Distributing', logoText: 'ID' },
  { id: 'aw5', category: 'agencies_wholesale', nameAr: 'الهلال لتوريد ومبيعات الأرز والسكر والزيت جملة', nameEn: 'Al-Hilal Foodstuffs Wholesale Group', industryAr: 'تأمين مواد التموين ومظاريف مبيعات الجملة للجمعيات', industryEn: 'Bulk Commodity Trading & Sourcing Nodes', logoText: 'HL' },
  { id: 'aw6', category: 'agencies_wholesale', nameAr: 'الوفاق للتوكيلات التجارية الكيميائية والبوليمرات', nameEn: 'Al-Wifaq Chemical & Polymer Agencies', industryAr: 'مستودعات المواد البتروكيماوية وتوزيعها وتجزئتها', industryEn: 'Chemical Intermediaries Wholesaling Systems', logoText: 'WF' },
  { id: 'aw7', category: 'agencies_wholesale', nameAr: 'شركة البرق للمستلزمات المكتبية ومبيعات الجملة', nameEn: 'Al-Barq Office Stationery Wholesalers', industryAr: 'توريد أدوات المدارس والمدرسين والمطابع والورق', industryEn: 'School & Corporate Stationery Supply POS', logoText: 'BQ' },
  { id: 'aw8', category: 'agencies_wholesale', nameAr: 'شركة بابل للمستلزمات والأدوات الرياضية للجملة', nameEn: 'Babylon Sports Equipment Wholesale Center', industryAr: 'مستلزمات ملاعب كرة ومعدات فتنس وصالات الجيم', industryEn: 'Gym Equipment Importing & Bulk Invoicing', logoText: 'BB' },

  // ================= 9. معارض السيارات (car_showrooms) =================
  { id: 'cs1', category: 'car_showrooms', nameAr: 'مجموعة المجد للسيارات والمقاولات والنقل واللوجستيات', nameEn: 'Al-Majd Group for Automotive & Heavy Fleet', industryAr: 'معارض سيارات كبرى وأساطيل نقل لوجستيات شاحنات', industryEn: 'Auto Dealership networks & Fleet Maintenance', logoText: 'MJ' },
  { id: 'cs2', category: 'car_showrooms', nameAr: 'معرض المدينة المطور للتجارة وشحن وتقسيط السيارات', nameEn: 'Al-Madina Auto Showroom & Vehicle Freight', industryAr: 'تقسيط سيارات ومبيعات كاش ومعارض التوزيع المعتمد', industryEn: 'Car Financing Computations & Showroom CRM', logoText: 'MC' },
  { id: 'cs3', category: 'car_showrooms', nameAr: 'شركة النخبة العالمية لتجارة واستيراد السيارات الفاخرة', nameEn: 'Elite Global Luxury Cars Showroom', industryAr: 'استيراد الطرازات النادرة وسيارات VIP الفاخرة', industryEn: 'Supercars Importing, Customs & Luxury Showroom', logoText: 'EG' },
  { id: 'cs4', category: 'car_showrooms', nameAr: 'وكالة الرياض لبيع وتأجير ومزادات السيارات الكبرى', nameEn: 'Riyadh Auto Dealer & Live Auction Network', industryAr: 'تحديثات المزاد الميداني والبيع والتحول الضريبي', industryEn: 'Live Auto Auction Management & Fleet Sells', logoText: 'RD' },
  { id: 'cs5', category: 'car_showrooms', nameAr: 'السلام لقطع غيار وإطارات السيارات والزيوت جملة', nameEn: 'Al-Salam Tires & Spares Auto Trade Center', industryAr: 'مستودعات الإطارات المعتمدة وقطع الغيار اليبانية', industryEn: 'Tire Warehousing & Auto Spares Sales Ledger', logoText: 'AS' },
  { id: 'cs6', category: 'car_showrooms', nameAr: 'أوتو مارت للسيارات الكهربائية والشواحن ومستعملها', nameEn: 'AutoMart Electric & Used Cars Agency', industryAr: 'سيارات الطاقة النظيفة وبطاريات الليثيوم والتثمين', industryEn: 'EV Inventory, Diagnostic Tools & Sales Sync', logoText: 'AM' },
  { id: 'cs7', category: 'car_showrooms', nameAr: 'مجموعة البركة لتجارة السيارات والمعدات الثقيلة', nameEn: 'Al-Baraka Auto Group & Heavy Machine Trade', industryAr: 'لوادر، أوناش، جرافات ومعدات الطرق الإنشائية', industryEn: 'Earthmoving Machinery Sales & Serial Numbers', logoText: 'BK' },
  { id: 'cs8', category: 'car_showrooms', nameAr: 'الأهرام لخدمات السيارات والصيانة السريعة والزيوت', nameEn: 'Al-Ahram Automotive Service Care & Tyres', industryAr: 'إدارة مراكز صيانة السيارات وكميات قطع الغيار', industryEn: 'Garage POS, Service Records & Mechanics Comm', logoText: 'AA' },

  // ================= 10. شركات الادويه (pharma) =================
  { id: 'ph1', category: 'pharma', nameAr: 'مستودعات الشفا للأدوية واللقاحات والمستلزمات الطبية', nameEn: 'Al-Shifa Pharma Warehouses & Diagnostics', industryAr: 'مستودعات الأدوية ومراقبة تواريخ الصلاحية والربط', industryEn: 'Drug Batch Tracking, Expiry Controls & ZATCA', logoText: 'SF' },
  { id: 'ph2', category: 'pharma', nameAr: 'صيدليات ومجمعات د. عمرو الطبية والدوائية المجمعة', nameEn: 'Dr. Amr Healthcare & Consolidated Pharmacies', industryAr: 'مجمعات طبية وتوزيع أدوية بالتامين والباركود الموحد', industryEn: 'Clinical booking system & Insurance Pharmacy', logoText: 'AM' },
  { id: 'ph3', category: 'pharma', nameAr: 'سلسلة صيدليات الوفاء الطبية الكبرى الموحدة', nameEn: 'Al-Wafaa Chain of Pharmacies & Cosmetics', industryAr: 'إدارة مخازن الأدوية الفرعية ومبيعات المستحضرات', industryEn: 'Retail Drug POS Network & Pharmacy Warehousing', logoText: 'WF' },
  { id: 'ph4', category: 'pharma', nameAr: 'سلسلة صيدليات معاذ الموحدة بمصر والخليج والدمج', nameEn: 'Moaz Pharma & Medical Chain Group', industryAr: 'صيدليات الخدمة الشاملة والروشتة الإلكترونية', industryEn: 'EPrescription Sync & Consolidated Branches Sales', logoText: 'MZ' },
  { id: 'ph5', category: 'pharma', nameAr: 'صيدلية اليسر الطبية المتقدمة والتشخيص المنزلي', nameEn: 'Al-Yusr Medical Pharmacy & Home Lab Diagnostics', industryAr: 'أقسام الكيماويات وقياس السكر وتوصيل الدواء المنزلي', industryEn: 'Pharma Chemicals Inventory & Home Delivery CRM', logoText: 'YS' },
  { id: 'ph6', category: 'pharma', nameAr: 'شبكة صيدليات الرعاية التامة والآمنة الطبية', nameEn: 'Safe Care Pharmacy Network & Medical Depot', industryAr: 'صيدليات الدواء الحرج ومراقبة سلاسل التوريد البارد', industryEn: 'Cold Chain Vaccine Storage & Pharmacy POS Base', logoText: 'SC' },
  { id: 'ph7', category: 'pharma', nameAr: 'مجموعة صيدليات غيداء التخصصية بمستحضرات التجميل', nameEn: 'Ghaydaa Specialized Pharmacies & Cosmeceuticals', industryAr: 'مستحضرات وتركيبات طبية وصيدلانية تجميلية راقية', industryEn: 'Bespoke Compounding & High End Cosmetics Sales', logoText: 'GD' },
  { id: 'ph8', category: 'pharma', nameAr: 'صيدلية الكندي الطبية المركزية والأجهزة الطبية', nameEn: 'Al-Kindi Medical Pharmacy Center & Homecare Gear', industryAr: 'بيع الكراسي الطبية، أجهزة التنفس ومراقبة الدواء', industryEn: 'Elderly Home Care Equipment POS & Drug Pharmacy', logoText: 'KD' },

  // ================= 11. شركات العطاره (herbs_spices) =================
  { id: 'hs1', category: 'herbs_spices', nameAr: 'عطارة الحرمين للأعشاب والزيوت والمنتجات الطبيعية', nameEn: 'Al-Haramain Herbs & Natural Oils Chain', industryAr: 'بيع وتعبئة التوابل والبهارات ومسحوق الأعشاب المعتمد', industryEn: 'Bulk Seasoning Packing & Natural Herbs POS', logoText: 'HR' },
  { id: 'hs2', category: 'herbs_spices', nameAr: 'أسواق وبن وعطارة شاهين العالمية والتوابل', nameEn: 'Shaheen Quality Spices & Coffee Global Branches', industryAr: 'طحن البن الفاخر والتحويجة وتعبئة عينات التوابل', industryEn: 'Espresso & Seasoning Blending & Retail Chains', logoText: 'SH' },
  { id: 'hs3', category: 'herbs_spices', nameAr: 'شركة رجب العطار للأعشاب والبهارات الفاخرة الكبرى', nameEn: 'Ragab El-Attar Spices & Fine Herbs Enterprise', industryAr: 'استيراد التوابل من الهند وتوزيعها على المحافظات', industryEn: 'Mace & Cardamom Importing & Spices Distribution', logoText: 'RA' },
  { id: 'hs4', category: 'herbs_spices', nameAr: 'عطارة مكة والمدينة للنباتات الطبية والتمور التراثية', nameEn: 'Makkah & Medina Herbals & Premium Royal Dates', industryAr: 'تمور العجوة، تمور الخلاص، والأعشاب الطبية النادرة', industryEn: 'Rare Herbal Infusions & Dates Wholesale Sourcing', logoText: 'MM' },
  { id: 'hs5', category: 'herbs_spices', nameAr: 'واحة العطارة للأعشاب والتوابل الشرقية وتجهيزها', nameEn: 'Herbal Oasis Spices & Seasoning Workshops', industryAr: 'تجهيز خلطات الكبسة والسمك واللحوم للمطاعم الكبرى', industryEn: 'Savoury Spice Seasonings & Packaging Warehouse', logoText: 'HO' },
  { id: 'hs6', category: 'herbs_spices', nameAr: 'شركة النخبة لاستيراد وتعبئة الشاي السيلاني والبهار', nameEn: 'Elite Spices Import & Automated Packaging Plant', industryAr: 'التعبئة الآلية للكركدية، الينسون وشاي الأعشاب', industryEn: 'Automated Herb Sachet Filling & Wholesale ERP', logoText: 'ES' },
  { id: 'hs7', category: 'herbs_spices', nameAr: 'عطارة الهدى والياسمين للزيوت والبخور المستورد', nameEn: 'Al-Huda Herbs & Luxury Incense Distributing', industryAr: 'بخور العود والمسك والزيوت العطرية النقية المركزة', industryEn: 'Agarwood Oils Sourcing & Luxury Perfumery POS', logoText: 'HY' },
  { id: 'hs8', category: 'herbs_spices', nameAr: 'بن وعطارة الإسكندرية والتوابل الشرقية والمطاحن', nameEn: 'AlexAttar Spices & Coffee Roasting Hub', industryAr: 'محامص البن الفاخرة ومطاحن التوابل الحادة المفلترة', industryEn: 'Coffee Roastery & Stone ground Spice Milling CRM', logoText: 'AA' },

  // ================= 12. المصانع (factories) =================
  { id: 'fc1', category: 'factories', nameAr: 'مصانع تبارك للصناعات الغذائية الكبرى وتعبئة الزيوت', nameEn: 'Tabarak Food Industries & Oil Refineries', industryAr: 'تجهيز اللحوم، البقوليات وتعبئة المواد الغذائية', industryEn: 'FMCG Food Canning & Supply Chain Logistics', logoText: 'TB' },
  { id: 'fc2', category: 'factories', nameAr: 'شركة الفجر النقي لفلاتر ومحطات معالجة وتحلية المياه', nameEn: 'Al-Fajr Water Filters Corp & RO Station Units', industryAr: 'تصنيع فلاتر الصيانة ومظاريف فلاتر المياه المتقدمة', industryEn: 'R.O. Membrane Filtration & Assembly Systems', logoText: 'FJ' },
  { id: 'fc3', category: 'factories', nameAr: 'شركة البركة للتنمية الزراعية والإنتاج والداجنة', nameEn: 'Al-Baraka Poultry & Automated Farming Complexes', industryAr: 'الإنتاج الحيواني ومسالخ الدواجن وبطارية التفريخ', industryEn: 'Poultry Farms Integration & Feed Distribution IoT', logoText: 'AB' },
  { id: 'fc4', category: 'factories', nameAr: 'شركة الفرسان للأنظمة الحرارية وصناعة مكيفات الـ HVAC', nameEn: 'Al-Fursan HVAC Systems Fabrication Factories', industryAr: 'تصنيع وصيانة مجاري كابلات ومكيفات وصاج تبريد الهواء', industryEn: 'Centrifugal HVAC Manufacturing & Service App', logoText: 'FS' },
  { id: 'fc5', category: 'factories', nameAr: 'شركة الصفا لتجارة وصناعة الحديد والصلب الكبرى', nameEn: 'Al-Safa Steel & Heavy Iron Industrial Mills', industryAr: 'دافلة الحديد، حديد التسليح وتشكيل المعادن الثقيلة', industryEn: 'Hot-rolled Reinforcing Steel Rebar Production', logoText: 'SF' },
  { id: 'fc6', category: 'factories', nameAr: 'شركة النيل للغزل والنسيج والملابس الجاهزة والتصدير', nameEn: 'Nile Spinning, Weaving & Garments Factory Group', industryAr: 'محالج القطن وصناعة أرقى المنسوجات والملابس الفاخرة', industryEn: 'Weaving Mills, Spinning Looms & Garment Finishing', logoText: 'NS' },
  { id: 'fc7', category: 'factories', nameAr: 'مصانع دلتا الكبرى للغزل والنسيج والصباغة والطباعة', nameEn: 'Delta Textile & Weaving & Dyeing Factories', industryAr: 'صباغة وتجهيز الأقمشة المصدرة للاتحاد الأوروبي', industryEn: 'Fabric Dyeing, Finishing & Industrial ERP Sync', logoText: 'DT' },
  { id: 'fc8', category: 'factories', nameAr: 'الشركة العربية للأسمنت والخرسانة الجاهزة والبلوك', nameEn: 'Arabian Cement & Ready Mixed Concrete Factories', industryAr: 'طحن الأسمنت والخرسانة المسلحة وتعبئة الشكائر صب', industryEn: 'Cement Rotary Kiln & Readymix Concrete Transit', logoText: 'AC' },
  { id: 'fc9', category: 'factories', nameAr: 'تكنوباك للصناعات البلاستيكية والكرتون المقوى والتغليف', nameEn: 'TechnoPack Plastics & Cardboard Packaging Plants', industryAr: 'صناعة الصناديق لتصدير الموالح والمواد الغذائية السريعة', industryEn: 'Multiplying Corrugated Box Manufacturing Lines', logoText: 'TP' },
  { id: 'fc10', category: 'factories', nameAr: 'مصنع البحر الأحمر للرخام والجرانيت الثقيل والتقطيع', nameEn: 'Red Sea Marble & Granite Factory & Cutting Yards', industryAr: 'تقليع كتل الرخام الوطني وقص بلاطات المطابخ والواجهة', industryEn: 'Gang-saw Marble Blocks Processing & Slab Polishing', logoText: 'RS' }
];

export const TRANSLATIONS = {
  ar: {
    metaTitle: 'نايل تكنو للبرمجيات وأنظمة ERP',
    logoBrand: 'نايل تكنو',
    taglineLetter: 'Let Us Manage Your Business',
    navHome: 'الرئيسية',
    navAbout: 'من نحن',
    navEinvoice: 'الفاتورة الإلكترونية',
    navServices: 'الأنظمة والبرمجيات',
    navMobile: 'تطبيقات الموبايل',
    navCustomers: 'شركاء النجاح',
    navContact: 'تواصل معنا',
    aboutHeadline: 'من نحن',
    aboutSub: 'شريكك في التحول الرقمي وتطوير الحلول البرمجية منذ عام 2010.',
    aboutCompanyTitle: 'نايل تكنو للبرمجيات',
    aboutCompanyDesc1: 'تأسست شركة نايل تكنو في أغسطس 2010، لتقديم حلول برمجية عملية تدعم مسيرة التحول الرقمي وتطوير الأعمال في الوطن العربي.',
    aboutCompanyDesc2: 'على مدار أكثر من 16 عاماً، قمنا بتطوير برامج محاسبية وإدارية ونقاط بيع وتطبيقات هاتف تخدم العديد من الشركات في مصر والمملكة العربية السعودية والخليج العربي.',
    visionTab: 'رؤيتنا',
    missionTab: 'رسالتنا',
    visionContent: 'تقديم برمجيات إدارية ومالية سهلة وعملية، تساعد أصحاب الأعمال على متابعة أنشطتهم بدقة وبتكلفة مناسبة.',
    missionContent: 'بناء وتطوير حلول برمجية تسهل إدارة المخازن والمبيعات والحسابات، مع تقديم دعم فني مستمر وخدمات ما بعد البيع الموثوقة.',
    einvoiceHeadline: 'دعم كامل للفاتورة الإلكترونية',
    einvoiceSub: 'حلول متوافقة مع منظومة الفاتورة والإيصال الإلكتروني لمصلحة الضرائب المصرية (ETA) وهيئة الزكاة والضريبة والجمارك (ZATCA).',
    einvoiceDesc: 'تحتوي جميع أنظمتنا على مديول الفاتورة الإلكترونية والربط المباشر لحفظ وإصدار الفواتير الضريبية المشفرة مع توليد فوري لرموز الاستجابة السريعة (QR Code) المشفرة والداعمة لمتطلبات الربط الفني.',
    einvoiceListTitle: 'مواصفات الفاتورة الإلكترونية في أنظمتنا:',
    einvoiceItem1: 'توليد رمز QR مشفر يقرأ البيانات الرئيسية (البائع، الرقم الضريبي، التاريخ، الإجمالي، قيمة الضريبة).',
    einvoiceItem2: 'إمكانية إصدار الفواتير دون توقف حتى في حال انقطاع الاتصال بالسيرفر.',
    einvoiceItem3: 'ربط مباشر مع واجهات الـ API المعتمدة ومزامنة الفواتير ببصمة إلكترونية مشفرة.',
    calculatorHeadline: 'الحاسبة التفاعلية واختيار النظام المناسب',
    calculatorSub: 'حدد نشاطك وحجم عملك، وسنقترح عليك الأنظمة الأنسب مع تقدير مبدئي لاحتياجاتك.',
    calcTypeSelection: 'ما هو قطاع ونوع عملك الرئيسي؟',
    calcSizeSelection: 'حجم الشركة التقريبي (عدد الموظفين أو المنافذ):',
    calcSystemTitle: 'الأنظمة المقترحة لشركتك:',
    calcSystemRequest: 'طلب عرض سعر رسمي لهذه الأنظمة',
    whatsappSend: 'تواصل عبر واتساب لمناقشة التفاصيل',
    contactHeadline: 'تواصل معنا',
    contactSub: 'نحن هنا لمساعدتك على إدارة أعمالك بكفاءة. تفضل بزيارة أحد فروعنا أو تواصل معنا مباشرة.',
    formName: 'الاسم',
    formEmail: 'البريد الإلكتروني',
    formPhone: 'رقم الهاتف / الجوال',
    formCompany: 'اسم الشركة أو النشاط',
    formMessage: 'تفاصيل استفسارك',
    formSubmit: 'إرسال الرسالة',
    formSuccess: 'تم استلام رسالتك بنجاح، وسنتواصل معك في أقرب وقت.',
    branchesHeadline: 'فروعنا وتواجدنا المباشر',
    whatsAppSupport: 'تواصل عبر واتساب',
    clientPdfDownload: 'تحميل ملف سابقة أعمال نايل تكنو (PDF)',
    allRightsReserved: 'جميع الحقوق محفوظة لصالح شركة نايل تكنو للبرمجيات',
    showDemo: 'شاهد الشرح بالفيديو',
    filterAll: 'جميع الأنظمة والحلول',
    filterErp: 'أنظمة ERP والمالية',
    filterRetail: 'البيع بالتجزئة ونقاط البيع',
    filterLogistics: 'لوجستيات ومخازن ونقل',
    filterSpecialized: 'أنظمة وخدمات تخصصية',
    validatorTitle: 'محاكي الفاتورة الإلكترونية',
    validatorDesc: 'أدخل بيانات الفاتورة لمعاينة هيكل الفاتورة المشفرة ونموذج الـ QR الضريبي المعتمد في مصر والسعودية:',
    sellerNameLabel: 'اسم البائع / المنشأة',
    vatNoLabel: 'الرقم الضريبي للمنشأة',
    totalAmountLabel: 'إجمالي الفاتورة (شامل الضريبة)',
    vatAmountLabel: 'قيمة الضريبة المضافة (14% لمصر أو 15% للسعودية)',
    invoiceDateLabel: 'تاريخ وتوقيت الفاتورة',
    generatedQRText: 'الرمز مشفر ومتوافق مع متطلبات الأنظمة الضريبية',
    simulateVerify: 'معاينة توليد الفاتورة المشفرة',
    invoiceCodePreview: 'مخطط البيانات الضريبية المستخرجة (TLVs Hex):'
  },
  en: {
    metaTitle: 'Nile Techno for Software & ERP Systems',
    logoBrand: 'Nile Techno',
    taglineLetter: 'Let Us Manage Your Business',
    navHome: 'Home',
    navAbout: 'About Us',
    navEinvoice: 'E-Invoicing',
    navServices: 'Software Systems',
    navMobile: 'Mobile Apps',
    navCustomers: 'Success Partners',
    navContact: 'Contact Us',
    aboutHeadline: 'About Us',
    aboutSub: 'Your strategic digital transformation partner creating high-fidelity business applications since 2010.',
    aboutCompanyTitle: 'Nile Techno Software',
    aboutCompanyDesc1: 'Established in August 2010, Nile Techno is a leading architect of enterprise software systems, powering the majestic Digital Transformation wave across Middle Eastern markets.',
    aboutCompanyDesc2: 'Over the course of 16 years, we have built top-tier accounting suites, inventory platforms, custom point-of-sale apps, and mobile clients serving thousands of enterprises in Egypt, Saudi Arabia, and the Gulf region.',
    visionTab: 'Strategic Vision',
    missionTab: 'Our Mission',
    visionContent: 'We strive to remain the premier digital transformation reference in the Middle East, establishing the perfect synergy between advanced software reliability, high user friendliness, and affordable pricing models.',
    missionContent: 'To formulate tailor-made software solutions that organize commercial and industrial challenges with supreme clarity, backed by outstanding, always-available after-sales technical support.',
    einvoiceHeadline: 'Certified E-Invoicing Systems',
    einvoiceSub: 'Full compliance with Egypt Tax Authority (ETA) and Saudi ZATCA Phase 1 & Phase 2 legal integrations.',
    einvoiceDesc: 'All of our solutions are built with a native E-Invoicing middleware capable of generating, signing, and printing standardized VAT-certified tax bills containing secure, cryptographic QR Codes representing dynamic transactional hashes.',
    einvoiceListTitle: 'Our Certified E-Invoice Compliance Metrics:',
    einvoiceItem1: 'Encrypted QR Code compilation storing essential tags (Seller, VAT ID, Datetime, Gross Total, and Tax amount).',
    einvoiceItem2: 'Offline resilience system letting users complete and queues invoices even during local server offline gaps.',
    einvoiceItem3: 'Two-way integration via official APIs, complete with digital signatures and strict audit trail logging.',
    calculatorHeadline: 'Interactive Consultation & Cost Estimator',
    calculatorSub: 'Select your business domain, approximate size, and explore custom software pairings alongside calculated pricing targets instantly!',
    calcTypeSelection: 'What is your core business sector?',
    calcSizeSelection: 'Approximate business metrics (staff / locations):',
    calcSystemTitle: 'Suggested Nile Techno Solutions:',
    calcSystemRequest: 'Request an Official Enterprise Quotation for these selections',
    whatsappSend: 'Contact Dedicated Sales Representative on WhatsApp',
    contactHeadline: 'Contact Nile Techno Experts',
    contactSub: 'We are prepared to take your business metrics to the next tier of excellence. Visit one of our offices or contact us.',
    formName: 'Your Full Name',
    formEmail: 'Email Address',
    formPhone: 'Phone / Cell Number',
    formCompany: 'Company / Firm Name',
    formMessage: 'Describe Your Business Requirements',
    formSubmit: 'Submit Request & Save Inquiry',
    formSuccess: 'Thank you! Your information is securely logged. A designated account manager will contact you via phone or email shortly!',
    branchesHeadline: 'Our Regional Offices & Geographical Map Locations',
    whatsAppSupport: 'Instant WhatsApp Assistance',
    clientPdfDownload: 'Download Nile Techno Corporate Profile (PDF)',
    allRightsReserved: 'All rights reserved © Nile Techno for Software',
    showDemo: 'Watch Play Video Demo',
    filterAll: 'All Solutions',
    filterErp: 'ERP & Financials',
    filterRetail: 'Retail & POS Systems',
    filterLogistics: 'Logistics & Supply Chain',
    filterSpecialized: 'Specialized Industry Solutions',
    validatorTitle: 'Interactive E-Invoicing Validator & QR Generator',
    validatorDesc: 'Input tax values to simulate cryptographic ZATCA & Egypt ETA formatted QR payloads and see live decoding metrics:',
    sellerNameLabel: 'Seller / Business Name',
    vatNoLabel: 'Corporate VAT Registration No',
    totalAmountLabel: 'Gross Invoice Total (Incl. VAT)',
    vatAmountLabel: 'VAT Amount (15% or 14%)',
    invoiceDateLabel: 'Invoice Timestamp',
    generatedQRText: 'Cryptographic QR Code compliant with target regulatory guidelines',
    simulateVerify: 'Generate Encrypted Invoice QR',
    invoiceCodePreview: 'Parsed Regulatory TLV Hex payload output:'
  }
};

export const HOMEPAGE_SLIDER_PARTNERS = [
  {
    id: 'hp_yg_agencies',
    nameAr: 'شركة واي جي للتوكيلات التجارية',
    nameEn: 'YG for Trading Agencies',
    industryAr: 'التوكيلات التجارية وتوزيع السلع والزيوت',
    industryEn: 'Commercial Agencies & Distribution',
    imageUrl: '/yg_trading_agencies_logo.png'
  },
  {
    id: 'hp_malizia',
    nameAr: 'الشركة المصرية الماليزية ش.م.م',
    nameEn: 'Egyptian Malaysian Co. S.A.E',
    industryAr: 'التوكيلات التجارية وتوزيع السلع والزيوت',
    industryEn: 'Commercial Agencies & Distribution',
    imageUrl: '/el_malizia_logo.png'
  },
  {
    id: 'hp_skyhold',
    nameAr: 'شركة سكاي هولد لخدمات السقالات والمقاولات',
    nameEn: 'Sky Hold Scaffolding Service',
    industryAr: 'المقاولات العامة وأنظمة السقالات المعدنية',
    industryEn: 'Scaffolding Systems & Contracting',
    imageUrl: '/sky_hold_logo.svg'
  },
  {
    id: 'hp1',
    nameAr: 'مجموعة المجد للسيارات والمقاولات والنقل',
    nameEn: 'Al-Majd Group for Automotive & Heavy Fleet',
    industryAr: 'أساطيل نقل لوجستيات شاحنات ومعارض سيارات',
    industryEn: 'Auto Dealership networks & Fleet Maintenance',
    imageUrl: 'https://www.niletechno.com/assets/img/important%2012/2.png'
  },
  {
    id: 'hp2',
    nameAr: 'الجمعية التعاونية الاستهلاكية للخدمات المنزلية',
    nameEn: 'Cooperative Consumer Services Society',
    industryAr: 'إدارة الباركود ومبيعات السوبرماركت والمخازن',
    industryEn: 'Supermarket Fast POS & Scan Nodes',
    imageUrl: 'https://www.niletechno.com/assets/img/important%2012/0.jpg'
  },
  {
    id: 'hp3',
    nameAr: 'شركة أسدام الفنية للزجاج والمقاولات المتخصصة',
    nameEn: 'Asdam Technical Glass Company',
    industryAr: 'الزجاج والمقاولات المتخصصة وعمليات التصنيع',
    industryEn: 'Glass & Special Contracting',
    imageUrl: 'https://www.niletechno.com/assets/img/important%2012/1.jpg'
  },
  {
    id: 'hp4',
    nameAr: 'مجموعة العبود للتنمية والتطوير العقاري',
    nameEn: 'Al-Aboud Development Group',
    industryAr: 'التطوير العقاري والمقاولات العامة والإنشاء',
    industryEn: 'Real Estate & General contracting',
    imageUrl: 'https://www.niletechno.com/assets/img/important%2012/5.jpg'
  },
  {
    id: 'hp5',
    nameAr: 'شركة هيكسا باور للأنظمة المتقدمة وطاقة المستقبل',
    nameEn: 'Hexa Power Advanced Systems',
    industryAr: 'أنظمة الطاقة والمقاولات الكهربائية وتوليد الطاقة',
    industryEn: 'Power & Electrical Systems',
    imageUrl: 'https://www.niletechno.com/assets/img/important%2012/6.jpg'
  },
  {
    id: 'hp6',
    nameAr: 'ماركت ومخابز الخفاجي الحديثة ونقاط البيع السريع',
    nameEn: 'Al-Khafaji Bakery & Supermarket',
    industryAr: 'السوبرماركت ونقاط المبيعات الغذائية والحسابات',
    industryEn: 'Supermarket & Food POS Retail',
    imageUrl: 'https://www.niletechno.com/assets/img/important%2012/7.jpg'
  },
  {
    id: 'hp7',
    nameAr: 'شركة هيكسا للطلاء النانوي والدهانات الذكية',
    nameEn: 'Hexa Nano Coating & Paints',
    industryAr: 'المواد الكيميائية وحماية الأسطح وتوريد المواد',
    industryEn: 'Chemicals & Surface Protection',
    imageUrl: 'https://www.niletechno.com/assets/img/important%2012/8.png'
  },
  {
    id: 'hp8',
    nameAr: 'مصانع مياه مارين الصحية المعبأة في الشرق الأوسط',
    nameEn: 'Mareen Healthy Water Bottling Plants',
    industryAr: 'تعبئة مياه الشرب وإنتاج الأغذية والمشروبات التلقائية',
    industryEn: 'Water Bottling & Food processing',
    imageUrl: 'https://www.niletechno.com/assets/img/important%2012/9.jpeg'
  },
  {
    id: 'hp9',
    nameAr: 'شركة أريج الخليج لتأجير السيارات والشحن البري',
    nameEn: 'Areej Al-Khaleej Car Rental',
    industryAr: 'تأجير السيارات والنقل السياحي واليومي وأساطيل المركبات',
    industryEn: 'Car Rental & Passenger Transport',
    imageUrl: 'https://www.niletechno.com/assets/img/important%2012/10.jpeg'
  },
  {
    id: 'hp10',
    nameAr: 'مجموعة المجال الطبي التخصصي والعيادات والخدمات',
    nameEn: 'Al-Majal Specialist Medical Group',
    industryAr: 'مجموعة عيادات طب الأسنان والجلدية وعلاقات المرضى',
    industryEn: 'Clinical Booking & Pharmacy POS',
    imageUrl: 'https://www.niletechno.com/assets/img/important%2012/11.jpg'
  },
  {
    id: 'hp11',
    nameAr: 'مصانع البلاستيك الوطنية للتغليف والصناعات الكرتونية',
    nameEn: 'National Plastic & Packaging Factories',
    industryAr: 'تصنيع البلاستيك عالي الكثافة والكرتون المقوى',
    industryEn: 'Plastic & Carton Manufacturing',
    imageUrl: 'https://www.niletechno.com/assets/img/important%2012/12.jpeg'
  },
  {
    id: 'hp12',
    nameAr: 'شركة فود لاند للمواد الغذائية بالجملة وسلاسل البيع',
    nameEn: 'Food Land General Foodstuff Trading',
    industryAr: 'سلاسل بيع وتوزيع وتخزين السلع الغذائية الفعالة',
    industryEn: 'FMCG Sales & Cold Chain Logistics',
    imageUrl: 'https://www.niletechno.com/assets/img/important%2012/13.jpeg'
  },
  {
    id: 'hp13',
    nameAr: 'شركة مدارات الخليج للاتصالات وتقنية المعلومات المتقدمة',
    nameEn: 'Madarat Al-Khaleej Telecom & IT',
    industryAr: 'شبكات الاتصالات وحلول تقنية المعلومات والربط الفني',
    industryEn: 'Telecom Infrastructure & Solution',
    imageUrl: 'https://www.niletechno.com/assets/img/important%2012/14.jpg'
  },
  {
    id: 'hp14',
    nameAr: 'شركة الهدى لمطاحن الدقيق الأبيض والنخالة والغلال الكبرى',
    nameEn: 'Al-Huda Flour Mills Corporation',
    industryAr: 'تكرير وتعبئة الدقيق المخصص للمخابز وإدارة الصوامع',
    industryEn: 'Flour Refineries & Wholesale Distribution',
    imageUrl: 'https://www.niletechno.com/assets/img/important%2012/16.jpg'
  },
  {
    id: 'hp15',
    nameAr: 'شركة البركة للتنمية الزراعية والإنتاج والداجنة الآلية',
    nameEn: 'Al-Baraka Poultry & Automated Farming Complexes',
    industryAr: 'الإنتاج الحيواني ومسالخ الدواجن وبطارية التفريخ الآلية',
    industryEn: 'Poultry Farms Integration & Feed Distribution IoT',
    imageUrl: 'https://www.niletechno.com/assets/img/important%2012/18.png'
  }
];
