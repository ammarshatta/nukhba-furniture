export type Lang = 'ar' | 'en';

const translations = {
  ar: {
    dir: 'rtl' as const,
    locale: 'ar_SA',
    nav: {
      categories: 'التصنيفات',
      products: 'المنتجات',
      gallery: 'المعرض',
      testimonials: 'آراء العملاء',
      cta: 'اطلب الآن',
      switchLang: 'English',
    },
    hero: {
      badge: 'تصاميم حصرية · جودة لا تُضاهى',
      h1: ['أثاث', 'يصنع', 'الفارق'],
      subtitle: 'شطا من أرقى تصاميم الأثاث العربي الفاخر — حرفية لا تُضاهى، وأناقة تدوم.',
      btnBrowse: 'تصفح المنتجات',
      btnWA: 'تحدث مع مستشارنا',
      stats: [
        { num: '+٥٠٠', label: 'عميل سعيد' },
        { num: '+١٢٠', label: 'تصميم فريد' },
        { num: '١٥', label: 'سنة خبرة' },
      ],
    },
    marquee: 'أثاث فاخر · غرف نوم · صالونات · سُفرات · مطابخ · ديكور · ركنات · ',
    sections: {
      categoriesEyebrow: 'تصفح حسب الفئة',
      categoriesTitle: 'اختار من تشكيلتنا',
      categoriesSub: 'كل قطعة تحكي قصة من الجمال والحرفية',
      productsEyebrow: 'منتجاتنا المميزة',
      productsTitle: 'أحدث التشكيلات',
      productsSub: 'أثاث فاخر يجمع بين الأصالة والمعاصرة',
      videoEyebrow: 'من ورشتنا',
      videoTitle: 'الحرفة تتكلم',
      videoSub: 'شاهد كيف نصنع كل قطعة بعناية واحترافية',
      videoFeatures: [
        'خشب طبيعي معتق',
        'ألوان مخصوصة لك',
        'توصيل وتركيب مجاني',
        'ضمان ٣ سنوات',
      ],
      testimonials: 'آراء عملائنا',
      ctaTitle: 'هل أنت مستعد لتحويل مساحتك؟',
      ctaSub: 'تحدث مع مستشارنا الآن وصمّم أثاثك المثالي',
      ctaBtn: 'ابدأ الآن عبر واتساب',
    },
    footer: {
      desc: 'شطا — وجهتك الأولى للأثاث الفاخر. نُقدّم تصاميم استثنائية تجمع بين الأصالة والمعاصرة.',
      colProducts: 'المنتجات',
      colCompany: 'الشركة',
      colSupport: 'الدعم',
      links: {
        about: 'من نحن',
        contact: 'تواصل معنا',
        whatsapp: 'واتساب',
        privacy: 'الخصوصية',
      },
      copyright: 'شطا للأثاث الفاخر — جميع الحقوق محفوظة',
    },
    product: {
      orderNow: 'اطلب الآن',
      waLabel: 'تحدث مع مستشارنا',
      category: 'التصنيف',
      price: 'السعر',
      priceOnRequest: 'السعر عند الطلب',
      related: 'منتجات ذات صلة',
      badges: { 'new-': 'جديد', sale: 'خصم', top: 'الأكثر مبيعاً' },
      share: 'مشاركة',
    },
    admin: {
      login: 'دخول لوحة التحكم',
      password: 'كلمة المرور',
      loginBtn: 'دخول',
      logout: 'خروج',
      dashboard: 'لوحة التحكم',
      products: 'المنتجات',
      categories: 'التصنيفات',
      tokens: 'روابط الحملات',
      settings: 'الإعدادات',
      aiTool: 'مولّد AI',
      addProduct: 'إضافة منتج',
      addCategory: 'إضافة تصنيف',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
    },
  },
  en: {
    dir: 'ltr' as const,
    locale: 'en_US',
    nav: {
      categories: 'Categories',
      products: 'Products',
      gallery: 'Gallery',
      testimonials: 'Testimonials',
      cta: 'Order Now',
      switchLang: 'عربي',
    },
    hero: {
      badge: 'Exclusive Designs · Unmatched Quality',
      h1: ['Furniture', 'That Makes', 'a Difference'],
      subtitle: 'Shatta — premium Arabic furniture crafted to perfection. Elegance that lasts.',
      btnBrowse: 'Browse Products',
      btnWA: 'Chat with Advisor',
      stats: [
        { num: '+500', label: 'Happy Clients' },
        { num: '+120', label: 'Unique Designs' },
        { num: '15', label: 'Years Experience' },
      ],
    },
    marquee: 'Luxury Furniture · Bedrooms · Living Rooms · Dining · Kitchens · Decor · Sofas · ',
    sections: {
      categoriesEyebrow: 'Browse by Category',
      categoriesTitle: 'Explore Our Collection',
      categoriesSub: 'Every piece tells a story of beauty and craftsmanship',
      productsEyebrow: 'Featured Products',
      productsTitle: 'Latest Collections',
      productsSub: 'Furniture that blends tradition and modernity',
      videoEyebrow: 'From Our Workshop',
      videoTitle: 'Craftsmanship Speaks',
      videoSub: 'See how we craft every piece with care and expertise',
      videoFeatures: [
        'Natural Aged Wood',
        'Custom Colours for You',
        'Free Delivery & Assembly',
        '3-Year Warranty',
      ],
      testimonials: 'What Our Clients Say',
      ctaTitle: 'Ready to Transform Your Space?',
      ctaSub: 'Chat with our advisor now and design your perfect furniture',
      ctaBtn: 'Start on WhatsApp',
    },
    footer: {
      desc: 'Shatta — your premier destination for luxury furniture. Exceptional designs blending tradition and modernity.',
      colProducts: 'Products',
      colCompany: 'Company',
      colSupport: 'Support',
      links: {
        about: 'About Us',
        contact: 'Contact',
        whatsapp: 'WhatsApp',
        privacy: 'Privacy Policy',
      },
      copyright: 'Shatta Luxury Furniture — All rights reserved',
    },
    product: {
      orderNow: 'Order Now',
      waLabel: 'Chat with Advisor',
      category: 'Category',
      price: 'Price',
      priceOnRequest: 'Price on Request',
      related: 'Related Products',
      badges: { 'new-': 'New', sale: 'Sale', top: 'Best Seller' },
      share: 'Share',
    },
    admin: {
      login: 'Admin Login',
      password: 'Password',
      loginBtn: 'Sign In',
      logout: 'Sign Out',
      dashboard: 'Dashboard',
      products: 'Products',
      categories: 'Categories',
      tokens: 'Campaign Links',
      settings: 'Settings',
      aiTool: 'AI Generator',
      addProduct: 'Add Product',
      addCategory: 'Add Category',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
    },
  },
};

export function useT(lang: Lang) {
  return translations[lang];
}

export function getAlternateUrl(currentPath: string, currentLang: Lang): string {
  if (currentLang === 'ar') return '/en' + (currentPath === '/' ? '' : currentPath);
  const stripped = currentPath.replace(/^\/en/, '') || '/';
  return stripped;
}

/**
 * Localizes an internal path for the given language.
 * Arabic is the root (`/...`); English lives under `/en/...`.
 * Strips any existing `/ar` or `/en` prefix first, so it is safe to pass
 * either a clean path (`/collections`) or an already-prefixed one.
 * Use this for ALL internal links so English pages never link to Arabic pages.
 */
export function localizeUrl(path: string, lang: Lang): string {
  const clean = path.replace(/^\/(ar|en)(?=\/|$)/, '') || '/';
  return lang === 'en' ? '/en' + (clean === '/' ? '' : clean) : clean;
}
