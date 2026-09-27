import { COMPANY_CONFIG } from '../constants/config';

/**
 * Builds a direct wa.me link with sanitized phone and encoded text
 * @param {string} phone
 * @param {string} message
 * @returns {string}
 */
export function buildWhatsAppUrl(phone, message = '') {
  const cleanPhone = String(phone || '').replace(/[^0-9]/g, '');
  const encodedText = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${cleanPhone}${encodedText}`;
}

/**
 * Pre-defined, tailored messages for each mobile app
 */
export const APP_WHATSAPP_MESSAGES = {
  'mob-sales': {
    ar: `السلام عليكم ورحمة الله وبركاته،
أود الاستفسار وطلب تفاصيل وعرض سعر تطبيق مندوب المبيعات الميداني (Android & iOS) من شركة نايل تكنو للبرمجيات.

المعلومات المطلوبة:
• تكلفة الترخيص وتفاصيل التفعيل
• آلية الربط والتزامن اللحظي مع النظام المحاسبي المركزي
• دعم طباعة الفواتير المحمولة وتتبع خطوط سير المناديب بالـ GPS

شاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.`,
    en: `Hello Nile Techno Sales Team,

I would like to inquire about and request an official quotation for the "Smart Mobile Sales Representative App (Android & iOS)".

Requested Information:
• Licensing cost and deployment options
• Real-time synchronization with central ERP & accounting
• Mobile thermal receipt printing and GPS route tracking

Thank you for your prompt assistance and cooperation.`
  },
  'mob-pos': {
    ar: `السلام عليكم ورحمة الله وبركاته،
أود الاستفسار وطلب تفاصيل وعرض سعر "تطبيق نقطة البيع للمحمول (Mobile POS)" من شركة نايل تكنو للبرمجيات.

المعلومات المطلوبة:
• تكلفة تفعيل نقاط البيع المحمولة
• آلية العمل دون اتصال بالإنترنت (Offline Mode)
• ربط طابعات البلوتوث المحمولة وقارئ الباركود

شاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.`,
    en: `Hello Nile Techno Sales Team,

I would like to inquire about and request an official quotation for the "Mobile POS Terminal App".

Requested Information:
• Setup and licensing for portable POS devices
• Offline transaction processing and automated syncing
• Bluetooth printer and barcode scanner compatibility

Thank you for your prompt assistance and cooperation.`
  },
  'mob-restaurant': {
    ar: `السلام عليكم ورحمة الله وبركاته،
أود الاستفسار وطلب تفاصيل وعرض سعر تطبيق النادل ومتابعة المطبخ للمطاعم والكافيهات.

المعلومات المطلوبة:
• أسعار التطبيق وتجهيزه على أجهزة التابلت والموبايل
• آلية الربط المباشر بشاشات وطابعات المطبخ (KDS)
• دعم المنيو الرقمي وإدارة شاشات الطاولات والتحويل السريع

شاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.`,
    en: `Hello Nile Techno Sales Team,

I would like to inquire about and request an official quotation for the "Smart Waiter & Kitchen Display App" for restaurants and cafes.

Requested Information:
• Pricing and tablet/mobile deployment setup
• Kitchen Display System (KDS) and direct thermal printer routing
• Digital menus, table assignments, and fast order dispatch

Thank you for your prompt assistance and cooperation.`
  },
  'mob-medical': {
    ar: `السلام عليكم ورحمة الله وبركاته،
أود الاستفسار وطلب تفاصيل وعرض سعر "تطبيق المندوب الطبي والدوائي (Medical & Pharma Rep)" من شركة نايل تكنو للبرمجيات.

المعلومات المطلوبة:
• آلية جدولة وتتبع زيارات الأطباء والصيدليات بالـ GPS
• إدارة عينات الأدوية والهدايا الترويجية ومسح الكود
• عرض الأسعار وطريقة التكامل مع المنظومة المركزية

شاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.`,
    en: `Hello Nile Techno Sales Team,

I would like to inquire about and request an official quotation for the "Medical & Pharmaceutical Representative System App".

Requested Information:
• Clinic & pharmacy visit scheduling with GPS audit logs
• Medical sample tracking and promotional item inventory
• Licensing quotation and central ERP connectivity

Thank you for your prompt assistance and cooperation.`
  }
};

/**
 * Returns formatted WhatsApp link for an app showcase item
 */
export function getAppWhatsAppLink(appId, lang = 'ar') {
  const defaultApp = 'mob-sales';
  const msgObj = APP_WHATSAPP_MESSAGES[appId] || APP_WHATSAPP_MESSAGES[defaultApp];
  const message = lang === 'en' ? msgObj.en : msgObj.ar;
  return buildWhatsAppUrl(COMPANY_CONFIG.whatsappEgypt || '201000082722', message);
}

/**
 * Generates partner inquiry message for directory modal
 */
export function getPartnerInquiryMessage(partnerName, partnerInd, isRtl = true) {
  return isRtl
    ? `السلام عليكم ورحمة الله وبركاته،\n\nأود الاستفسار عن الأنظمة والحلول البرمجية ودراسات الحالة المنفذة لشركة (${partnerName})${partnerInd ? ` في قطاع (${partnerInd})` : ''}.\n\nيرجى تزويدنا بالمزيد من التفاصيل والأنظمة المقترحة لنشاطنا المشابه.\n\nشاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.`
    : `Hello Nile Techno Sales Team,\n\nI would like to inquire about your software solutions and case studies implemented for (${partnerName})${partnerInd ? ` in the (${partnerInd}) sector` : ''}.\n\nPlease provide more details on suitable ERP and mobile systems for our similar business.\n\nThank you for your assistance.`;
}

/**
 * Generates general sales directory message
 */
export function getDirectorySalesMessage(isRtl = true) {
  return isRtl
    ? `السلام عليكم ورحمة الله وبركاته،\n\nأود الاستفسار والاطلاع على سابقة أعمال شركة نايل تكنو للبرمجيات والمشاريع المنفذة في مجال نشاطنا والتوكيلات التجارية.\n\nشاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.`
    : `Hello Nile Techno Sales Team,\n\nI would like to inquire about Nile Techno software implementations, client case studies, and enterprise agency portfolio.\n\nThank you for your assistance.`;
}

/**
 * Generates inquiry message for a specific physical branch
 */
export function getBranchMessage(branch, lang = 'ar') {
  return lang === 'ar'
    ? `السلام عليكم ورحمة الله وبركاته،\n\nأود التواصل مع إدارة مبيعات شركة نايل تكنو للبرمجيات (فرع ${branch.cityAr}) للاستفسار عن الأنظمة والحلول التقنية المتاحة لنشاطنا.\n\nشاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.`
    : `Hello Nile Techno Sales Team (${branch.cityEn} Branch),\n\nI would like to inquire about your enterprise software systems and solutions for our business.\n\nThank you for your prompt assistance.`;
}

/**
 * Generates detailed estimate/inquiry message from LeadCalculator
 */
export function getLeadCalculatorMessage({ sectorLabel, scaleLabel, selectedSystems, needMobile, needEInvoicing, lang = 'ar' }) {
  return lang === 'ar'
    ? `السلام عليكم ورحمة الله وبركاته،

أود طلب استشارة رسمية وعرض سعر بخصوص المنظومة البرمجية المقترحة لنشاطنا من شركة نايل تكنو للبرمجيات:

📋 تفاصيل المتطلبات:
• مجال النشاط: ${sectorLabel}
• حجم ونطاق المنشأة: ${scaleLabel}
• الأنظمة المقترحة: ${selectedSystems}
• تطبيقات الموبايل الميدانية: ${needMobile ? 'مطلوبة' : 'غير مطلوبة'}
• الربط مع منظومة الفاتورة الإلكترونية: ${needEInvoicing ? 'مطلوب' : 'غير مطلوب'}

شاكراً لكم حسن تعاونكم ومتابعتكم الكريمة.`
    : `Hello Nile Techno Sales Team,

I would like to request an official quotation and software advisory for our business from Nile Techno:

📋 Requirements Overview:
• Business Sector: ${sectorLabel}
• Operational Scale: ${scaleLabel}
• Suggested Software Systems: ${selectedSystems}
• Mobile Field Applications: ${needMobile ? 'Required' : 'Not required'}
• E-Invoicing Integration: ${needEInvoicing ? 'Required' : 'Not required'}

Thank you for your prompt assistance and cooperation.`;
}
