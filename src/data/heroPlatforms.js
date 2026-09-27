import { Cloud, Monitor, Smartphone } from 'lucide-react';

export const HERO_PLATFORMS = [
  {
    id: 0,
    titleAr: 'برنامج المحاسبة السحابي',
    titleEn: 'Cloud ERP Portal',
    mobileTitleAr: 'سحابي',
    mobileTitleEn: 'Cloud',
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
    mobileTitleAr: 'ديسكتوب',
    mobileTitleEn: 'Desktop',
    icon: Monitor,
    badgeAr: 'شبكات محلية واستقرار فائق',
    badgeEn: 'Local Network ERP',
    headlineAr: 'أنظمة سطح المكتب للمصانع والشركات',
    headlineEn: 'High-Stability Desktop ERP',
    descAr: 'أنظمة للمصانع والورش تعمل دون الحاجة إلى اتصال بالإنترنت، مع ربط أجهزة الكاشير ونقاط البيع وقواعد البيانات على الشبكة المحلية.',
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
    mobileTitleAr: 'موبايل',
    mobileTitleEn: 'Mobile',
    icon: Smartphone,
    badgeAr: 'أندرويد و GPS ميداني',
    badgeEn: 'Android Field Companion',
    headlineAr: 'تطبيق المندوب والتوزيع الميداني',
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

export default HERO_PLATFORMS;
