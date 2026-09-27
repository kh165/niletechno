/**
 * Central Configuration for Nile Techno
 * Single source of truth for contact info, phone numbers, WhatsApp, and company stats.
 * All phone numbers use standard E.164-compatible formats without misplaced leading zeros.
 */

export const COMPANY_CONFIG = {
  nameAr: 'شركة نايل تكنو للبرمجيات',
  nameEn: 'Nile Techno Software Co.',
  taglineAr: 'شريكك الاستراتيجي في التحول الرقمي وحلول الـ ERP منذ عام 2010',
  taglineEn: 'Your Strategic Digital Transformation & ERP Solutions Partner Since 2010',
  establishedYear: 2010,
  websiteUrl: 'https://www.niletechno.com',
  email: 'info@niletechno.com',
  pdfProfileUrl: '/company-profile.pdf',
  
  // Standardized phones and WhatsApp links (No local 0 after country code)
  contact: {
    ksa: {
      countryNameAr: 'المملكة العربية السعودية',
      countryNameEn: 'Saudi Arabia',
      phoneDisplay: '+966 51 135 1059',
      phoneRaw: '+966511351059',
      whatsappNumber: '966511351059', // Clean E.164 for wa.me
      whatsappUrl: 'https://wa.me/966511351059',
      addressAr: 'طريق أم عمارة، حي بدر، الشفا، الرياض، المملكة العربية السعودية',
      addressEn: 'Am Omara, Badr District, Al-Shifa, Riyadh, Saudi Arabia',
    },
    egypt: {
      countryNameAr: 'جمهورية مصر العربية',
      countryNameEn: 'Egypt',
      phoneDisplay: '+20 100 008 2722',
      phoneRaw: '+201000082722',
      whatsappNumber: '201000082722',
      whatsappUrl: 'https://wa.me/201000082722',
      addressAr: 'شارع كورنيش النيل، المعادي، القاهرة / طنطا - طريق مصر الإسكندرية الزراعي',
      addressEn: 'Corniche El Nile St, Maadi, Cairo / Tanta - Alex Agricultural Rd',
    },
  },

  social: {
    facebook: 'https://www.facebook.com/niletechno',
    linkedin: 'https://www.linkedin.com/company/niletechno',
    youtube: 'https://www.youtube.com/@niletechno',
  },

  // Central company statistics (No scattered magic numbers)
  stats: [
    { id: 'clients', value: '1500+', labelAr: 'عميل وشركة تثق بنا', labelEn: 'Enterprise Clients' },
    { id: 'experience', value: '16+', labelAr: 'عاماً من الخبرة والابتكار', labelEn: 'Years of Innovation' },
    { id: 'modules', value: '12+', labelAr: 'نظام إداري ومحاسبي', labelEn: 'Modular ERP Engines' },
    { id: 'retention', value: '99%', labelAr: 'نسبة رضا واستقرار العملاء', labelEn: 'Client Satisfaction Rate' },
  ]
};

export const createWhatsAppUrl = (country = 'ksa', message = '') => {
  const number = country === 'egy' ? COMPANY_CONFIG.contact.egypt.whatsappNumber : COMPANY_CONFIG.contact.ksa.whatsappNumber;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};
