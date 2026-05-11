import { c as createComponent } from './astro-component_fXe-XK7e.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead, a3 as addAttribute, be as unescapeHTML, bh as renderHead, C as renderSlot, F as Fragment } from './params-and-props_C-Av644s.mjs';
import { r as renderComponent } from './entrypoint_i2FeS_sn.mjs';
import { r as renderScript } from './global_6FqtibVT.mjs';
import 'clsx';
import { a as buildProductJsonLd, c as buildOrganizationJsonLd, d as buildBreadcrumbJsonLd } from './seo_CBJxIJPX.mjs';

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BaseHead;
  const { lang } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"><script src="https://unpkg.com/@phosphor-icons/web"><\/script><link rel="icon" type="image/svg+xml" href="/favicon.svg">'])));
}, "D:/Furniture/nukba/src/components/layout/BaseHead.astro", void 0);

const translations = {
  ar: {
    dir: "rtl",
    locale: "ar_SA",
    nav: {
      categories: "التصنيفات",
      products: "المنتجات",
      gallery: "المعرض",
      testimonials: "آراء العملاء",
      cta: "اطلب الآن",
      switchLang: "English"
    },
    hero: {
      badge: "تصاميم حصرية · جودة لا تُضاهى",
      h1: ["أثاث", "يصنع", "الفارق"],
      subtitle: "نُخبة من أرقى تصاميم الأثاث العربي الفاخر — حرفية لا تُضاهى، وأناقة تدوم.",
      btnBrowse: "تصفح المنتجات",
      btnWA: "تحدث مع مستشارنا",
      stats: [
        { num: "+٥٠٠", label: "عميل سعيد" },
        { num: "+١٢٠", label: "تصميم فريد" },
        { num: "١٥", label: "سنة خبرة" }
      ]
    },
    marquee: "أثاث فاخر · غرف نوم · صالونات · سُفرات · مطابخ · ديكور · ركنات · ",
    sections: {
      categoriesEyebrow: "تصفح حسب الفئة",
      categoriesTitle: "اختار من تشكيلتنا",
      categoriesSub: "كل قطعة تحكي قصة من الجمال والحرفية",
      productsEyebrow: "منتجاتنا المميزة",
      productsTitle: "أحدث التشكيلات",
      productsSub: "أثاث فاخر يجمع بين الأصالة والمعاصرة",
      videoEyebrow: "من ورشتنا",
      videoTitle: "الحرفة تتكلم",
      videoSub: "شاهد كيف نصنع كل قطعة بعناية واحترافية",
      videoFeatures: [
        "خشب طبيعي معتق",
        "ألوان مخصوصة لك",
        "توصيل وتركيب مجاني",
        "ضمان ٣ سنوات"
      ],
      testimonials: "آراء عملائنا",
      ctaTitle: "هل أنت مستعد لتحويل مساحتك؟",
      ctaSub: "تحدث مع مستشارنا الآن وصمّم أثاثك المثالي",
      ctaBtn: "ابدأ الآن عبر واتساب"
    },
    footer: {
      desc: "نُخبة — وجهتك الأولى للأثاث الفاخر. نُقدّم تصاميم استثنائية تجمع بين الأصالة والمعاصرة.",
      colProducts: "المنتجات",
      colCompany: "الشركة",
      colSupport: "الدعم",
      links: {
        about: "من نحن",
        contact: "تواصل معنا",
        whatsapp: "واتساب",
        privacy: "الخصوصية"
      },
      copyright: "© ٢٠٢٤ نُخبة للأثاث الفاخر — جميع الحقوق محفوظة"
    },
    product: {
      orderNow: "اطلب الآن",
      waLabel: "تحدث مع مستشارنا",
      category: "التصنيف",
      price: "السعر",
      related: "منتجات ذات صلة",
      badges: { "new-": "جديد", sale: "خصم", top: "الأكثر مبيعاً" },
      share: "مشاركة"
    },
    admin: {
      login: "دخول لوحة التحكم",
      password: "كلمة المرور",
      loginBtn: "دخول",
      logout: "خروج",
      dashboard: "لوحة التحكم",
      products: "المنتجات",
      categories: "التصنيفات",
      tokens: "روابط التتبع",
      settings: "الإعدادات",
      aiTool: "مولّد AI",
      addProduct: "إضافة منتج",
      addCategory: "إضافة تصنيف",
      save: "حفظ",
      cancel: "إلغاء",
      delete: "حذف",
      edit: "تعديل"
    }
  },
  en: {
    dir: "ltr",
    locale: "en_US",
    nav: {
      categories: "Categories",
      products: "Products",
      gallery: "Gallery",
      testimonials: "Testimonials",
      cta: "Order Now",
      switchLang: "عربي"
    },
    hero: {
      badge: "Exclusive Designs · Unmatched Quality",
      h1: ["Furniture", "That Makes", "a Difference"],
      subtitle: "Nukba — premium Arabic furniture crafted to perfection. Elegance that lasts.",
      btnBrowse: "Browse Products",
      btnWA: "Chat with Advisor",
      stats: [
        { num: "+500", label: "Happy Clients" },
        { num: "+120", label: "Unique Designs" },
        { num: "15", label: "Years Experience" }
      ]
    },
    marquee: "Luxury Furniture · Bedrooms · Living Rooms · Dining · Kitchens · Decor · Sofas · ",
    sections: {
      categoriesEyebrow: "Browse by Category",
      categoriesTitle: "Explore Our Collection",
      categoriesSub: "Every piece tells a story of beauty and craftsmanship",
      productsEyebrow: "Featured Products",
      productsTitle: "Latest Collections",
      productsSub: "Furniture that blends tradition and modernity",
      videoEyebrow: "From Our Workshop",
      videoTitle: "Craftsmanship Speaks",
      videoSub: "See how we craft every piece with care and expertise",
      videoFeatures: [
        "Natural Aged Wood",
        "Custom Colours for You",
        "Free Delivery & Assembly",
        "3-Year Warranty"
      ],
      testimonials: "What Our Clients Say",
      ctaTitle: "Ready to Transform Your Space?",
      ctaSub: "Chat with our advisor now and design your perfect furniture",
      ctaBtn: "Start on WhatsApp"
    },
    footer: {
      desc: "Nukba — your premier destination for luxury furniture. Exceptional designs blending tradition and modernity.",
      colProducts: "Products",
      colCompany: "Company",
      colSupport: "Support",
      links: {
        about: "About Us",
        contact: "Contact",
        whatsapp: "WhatsApp",
        privacy: "Privacy Policy"
      },
      copyright: "© 2024 Nukba Luxury Furniture — All rights reserved"
    },
    product: {
      orderNow: "Order Now",
      waLabel: "Chat with Advisor",
      category: "Category",
      price: "Price",
      related: "Related Products",
      badges: { "new-": "New", sale: "Sale", top: "Best Seller" },
      share: "Share"
    },
    admin: {
      login: "Admin Login",
      password: "Password",
      loginBtn: "Sign In",
      logout: "Sign Out",
      dashboard: "Dashboard",
      products: "Products",
      categories: "Categories",
      tokens: "Tracking Links",
      settings: "Settings",
      aiTool: "AI Generator",
      addProduct: "Add Product",
      addCategory: "Add Category",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit"
    }
  }
};
function useT(lang) {
  return translations[lang];
}
function getAlternateUrl(currentPath, currentLang) {
  if (currentLang === "ar") return "/en" + (currentPath === "/" ? "" : currentPath);
  const stripped = currentPath.replace(/^\/en/, "") || "/";
  return stripped;
}

const $$Nav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Nav;
  const { lang, currentPath } = Astro2.props;
  const t = useT(lang);
  const altUrl = getAlternateUrl(currentPath, lang);
  return renderTemplate`${maybeRenderHead()}<nav class="nav" id="mainNav"> <a${addAttribute(lang === "en" ? "/en" : "/", "href")} class="nav-logo"> <svg width="32" height="32" viewBox="0 0 44 44" fill="none"> <path d="M8 38 L8 20 Q8 8 22 8 Q36 8 36 20 L36 38" stroke="rgba(47,31,14,.5)" stroke-width="2" fill="none" stroke-linecap="round"></path> <path d="M13 38 L13 21 Q13 13 22 13 Q31 13 31 21 L31 38" stroke="#B8922A" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".7"></path> <line x1="5" y1="38" x2="39" y2="38" stroke="rgba(47,31,14,.5)" stroke-width="2" stroke-linecap="round"></line> <circle cx="22" cy="9" r="2.5" fill="#B8922A"></circle> </svg> <span class="logo-ar">نُخبة</span> </a> <ul class="nav-links"> <li><a${addAttribute(lang === "en" ? "/en/#cats" : "/#cats", "href")}>${t.nav.categories}</a></li> <li><a${addAttribute(lang === "en" ? "/en/#products" : "/#products", "href")}>${t.nav.products}</a></li> <li><a${addAttribute(lang === "en" ? "/en/#vid" : "/#vid", "href")}>${t.nav.gallery}</a></li> <li><a${addAttribute(lang === "en" ? "/en/#testimonials" : "/#testimonials", "href")}>${t.nav.testimonials}</a></li> <li><a${addAttribute(altUrl, "href")} class="nav-lang">${t.nav.switchLang}</a></li> <li><a href="#" class="nc" id="navWA">${t.nav.cta}</a></li> </ul> <button class="ham" id="hamBtn" aria-label="Menu"> <span></span><span></span><span></span> </button> </nav> <div class="mob-menu" id="mobMenu"> <button class="mob-close" id="mobClose">×</button> <a${addAttribute(lang === "en" ? "/en/#cats" : "/#cats", "href")}>${t.nav.categories}</a> <a${addAttribute(lang === "en" ? "/en/#products" : "/#products", "href")}>${t.nav.products}</a> <a${addAttribute(lang === "en" ? "/en/#vid" : "/#vid", "href")}>${t.nav.gallery}</a> <a${addAttribute(lang === "en" ? "/en/#testimonials" : "/#testimonials", "href")}>${t.nav.testimonials}</a> <a${addAttribute(altUrl, "href")} style="font-size:1rem;color:var(--muted);">${t.nav.switchLang}</a> </div> ${renderScript($$result, "D:/Furniture/nukba/src/components/layout/Nav.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Furniture/nukba/src/components/layout/Nav.astro", void 0);

function buildWAUrl(waNumber, messageText, refToken) {
  const text = refToken ? `${messageText}
[ref:${refToken}]` : messageText;
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
}
function resolveWANumber(productNumber, globalNumber) {
  return productNumber?.trim() || globalNumber;
}

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Footer;
  const { lang, settings, categories } = Astro2.props;
  const t = useT(lang);
  const waUrl = buildWAUrl(settings.waNumber, lang === "ar" ? "مرحباً، أريد الاستفسار عن منتجاتكم" : "Hello, I would like to inquire about your products");
  return renderTemplate`${maybeRenderHead()}<footer> <div class="ftop"> <div class="fcol fcol-brand"> <div class="logo-ar">نُخبة</div> <p class="fdesc">${t.footer.desc}</p> <div class="fsocials"> <a${addAttribute(waUrl, "href")} target="_blank" class="fsoc" aria-label="WhatsApp"> <i class="ph ph-whatsapp-logo"></i> </a> <a href="#" class="fsoc" aria-label="Instagram"><i class="ph ph-instagram-logo"></i></a> <a href="#" class="fsoc" aria-label="Facebook"><i class="ph ph-facebook-logo"></i></a> </div> </div> <div class="fcol"> <h4>${t.footer.colProducts}</h4> <ul> ${categories.slice(0, 5).map((cat) => renderTemplate`<li> <a${addAttribute(`${lang === "en" ? "/en" : ""}/category/${cat.slug}`, "href")}> ${lang === "ar" ? cat.nameAr : cat.nameEn} </a> </li>`)} </ul> </div> <div class="fcol"> <h4>${t.footer.colCompany}</h4> <ul> <li><a href="#">${t.footer.links.about}</a></li> <li><a href="#">${t.footer.links.privacy}</a></li> </ul> </div> <div class="fcol"> <h4>${t.footer.colSupport}</h4> <ul> <li><a href="#">${t.footer.links.contact}</a></li> <li><a${addAttribute(waUrl, "href")} target="_blank">${t.footer.links.whatsapp}</a></li> </ul> </div> </div> <div class="fbot"> <span>${t.footer.copyright}</span> <span style="font-size:.7rem;color:rgba(237,228,214,.2);">Powered by Nukba</span> </div> </footer>`;
}, "D:/Furniture/nukba/src/components/layout/Footer.astro", void 0);

const $$WhatsAppFAB = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$WhatsAppFAB;
  const { waNumber, lang } = Astro2.props;
  const msg = lang === "ar" ? "مرحباً، أريد الاستفسار عن منتجاتكم" : "Hello, I would like to inquire about your products";
  const tipText = lang === "ar" ? "تحدث معنا الآن!" : "Chat with us now!";
  const url = buildWAUrl(waNumber, msg);
  return renderTemplate`${maybeRenderHead()}<div class="wa-float"> <div class="wa-tip">${tipText}</div> <a${addAttribute(url, "href")} target="_blank" rel="noopener" class="wa-fab" aria-label="WhatsApp"> <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path> </svg> </a> </div> ${renderScript($$result, "D:/Furniture/nukba/src/components/layout/WhatsAppFAB.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Furniture/nukba/src/components/layout/WhatsAppFAB.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b, _c;
const $$SEOHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SEOHead;
  const {
    title,
    description,
    canonical,
    lang,
    alternateUrl,
    ogImage = "/og-default.jpg",
    ogType = "website",
    product,
    settings,
    breadcrumbs
  } = Astro2.props;
  const siteTitle = lang === "ar" ? "نُخبة للأثاث الفاخر" : "Nukba Luxury Furniture";
  const fullTitle = `${title} — ${siteTitle}`;
  const baseUrl = "http://localhost:4321";
  const arUrl = lang === "ar" ? canonical : alternateUrl;
  const enUrl = lang === "en" ? canonical : alternateUrl;
  const ogImageFull = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`;
  const productJsonLd = product ? buildProductJsonLd(product, lang, baseUrl) : null;
  const orgJsonLd = ogType === "website" && settings ? buildOrganizationJsonLd(settings, baseUrl) : null;
  const breadcrumbJsonLd = breadcrumbs?.length ? buildBreadcrumbJsonLd(breadcrumbs) : null;
  return renderTemplate`<title>${fullTitle}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonical, "href")}><link rel="alternate" hreflang="ar"${addAttribute(arUrl, "href")}><link rel="alternate" hreflang="en"${addAttribute(enUrl, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(arUrl, "href")}><!-- Open Graph --><meta property="og:title"${addAttribute(fullTitle, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(ogImageFull, "content")}><meta property="og:url"${addAttribute(canonical, "content")}><meta property="og:type"${addAttribute(ogType, "content")}><meta property="og:locale"${addAttribute(lang === "ar" ? "ar_SA" : "en_US", "content")}><meta property="og:site_name"${addAttribute(siteTitle, "content")}><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(fullTitle, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImageFull, "content")}><!-- JSON-LD -->${productJsonLd && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "</script>"])), unescapeHTML(JSON.stringify(productJsonLd)))}${orgJsonLd && renderTemplate(_b || (_b = __template(['<script type="application/ld+json">', "</script>"])), unescapeHTML(JSON.stringify(orgJsonLd)))}${breadcrumbJsonLd && renderTemplate(_c || (_c = __template(['<script type="application/ld+json">', "</script>"])), unescapeHTML(JSON.stringify(breadcrumbJsonLd)))}`;
}, "D:/Furniture/nukba/src/components/seo/SEOHead.astro", void 0);

const $$PublicLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PublicLayout;
  const {
    lang,
    title,
    description,
    canonical,
    alternateUrl,
    ogImage,
    ogType,
    product,
    settings,
    categories,
    breadcrumbs
  } = Astro2.props;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const currentPath = new URL(canonical).pathname;
  const refToken = Astro2.url.searchParams.get("ref");
  if (refToken) {
    Astro2.cookies.set("nukba_ref", refToken, { maxAge: 3600, sameSite: "lax", path: "/" });
  }
  const activeRef = refToken ?? Astro2.cookies.get("nukba_ref")?.value;
  return renderTemplate`<html${addAttribute(lang, "lang")}${addAttribute(dir, "dir")}> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "lang": lang })}${renderComponent($$result, "SEOHead", $$SEOHead, { "title": title, "description": description, "canonical": canonical, "lang": lang, "alternateUrl": alternateUrl, "ogImage": ogImage, "ogType": ogType, "product": product, "settings": settings, "breadcrumbs": breadcrumbs })}${renderHead()}</head> <body> ${renderComponent($$result, "Nav", $$Nav, { "lang": lang, "currentPath": currentPath })} <main> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "lang": lang, "settings": settings, "categories": categories })} ${renderComponent($$result, "WhatsAppFAB", $$WhatsAppFAB, { "waNumber": settings.waNumber, "lang": lang })} <!-- Tracking pixel --> ${activeRef && product && renderTemplate`<img${addAttribute(`/api/track?token=${encodeURIComponent(activeRef)}&product=${encodeURIComponent(product.slug)}`, "src")} width="1" height="1" alt="" style="position:absolute;opacity:0;pointer-events:none;">`} <!-- Reveal on scroll --> ${renderScript($$result, "D:/Furniture/nukba/src/layouts/PublicLayout.astro?astro&type=script&index=0&lang.ts")} <div class="toast" id="toast"></div> ${renderScript($$result, "D:/Furniture/nukba/src/layouts/PublicLayout.astro?astro&type=script&index=1&lang.ts")} </body> </html>`;
}, "D:/Furniture/nukba/src/layouts/PublicLayout.astro", void 0);

const $$WhatsAppCTA = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$WhatsAppCTA;
  const { waNumber, messageAr, messageEn, lang, refToken, variant = "card" } = Astro2.props;
  const t = useT(lang);
  const msg = lang === "ar" ? messageAr : messageEn;
  const url = buildWAUrl(waNumber, msg, refToken);
  const WA_ICON = `<svg class="wa-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  return renderTemplate`${variant === "card" && renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")} target="_blank" rel="noopener" class="pwa">${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(WA_ICON)}` })}${t.product.orderNow}</a>`}${variant === "detail" && renderTemplate`<a${addAttribute(url, "href")} target="_blank" rel="noopener" class="pd-wa-btn">${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(WA_ICON)}` })}${t.product.waLabel}</a>`}${variant === "strip" && renderTemplate`<a${addAttribute(url, "href")} target="_blank" rel="noopener" class="btn-wa">${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(WA_ICON)}` })}${t.sections.ctaBtn}</a>`}`;
}, "D:/Furniture/nukba/src/components/product/WhatsAppCTA.astro", void 0);

const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProductCard;
  const { product, lang, globalWaNumber, refToken } = Astro2.props;
  const t = useT(lang);
  const waNumber = resolveWANumber(product.waNumber, globalWaNumber);
  const prefix = lang === "en" ? "/en" : "";
  const productUrl = `${prefix}/products/${product.slug}`;
  const name = lang === "ar" ? product.nameAr : product.nameEn;
  const badgeLabels = t.product.badges;
  return renderTemplate`${maybeRenderHead()}<div class="pcard"${addAttribute(product.category, "data-cat")} data-r> <div class="pimg"> ${product.images[0] ? renderTemplate`<img${addAttribute(product.images[0], "src")}${addAttribute(name, "alt")} loading="lazy">` : renderTemplate`<div style="width:100%;height:100%;background:var(--sand);display:flex;align-items:center;justify-content:center;"> <i class="ph ph-couch" style="font-size:2.5rem;color:var(--muted);"></i> </div>`} ${product.badge && renderTemplate`<span${addAttribute(`pbadge ${product.badge}`, "class")}>${badgeLabels[product.badge]}</span>`} ${renderComponent($$result, "WhatsAppCTA", $$WhatsAppCTA, { "waNumber": waNumber, "messageAr": product.waTextAr, "messageEn": product.waTextEn, "lang": lang, "refToken": refToken, "variant": "card" })} </div> <div class="pinfo"> <div class="pcat">${lang === "ar" ? "— " : "— "}${product.category.toUpperCase()}</div> <div class="pname"><a${addAttribute(productUrl, "href")}>${name}</a></div> <div class="pfoot"> <div> <div class="pprice">${product.price || "—"}</div> </div> <div class="pstars">★★★★★</div> </div> </div> </div>`;
}, "D:/Furniture/nukba/src/components/product/ProductCard.astro", void 0);

export { $$PublicLayout as $, $$ProductCard as a, $$WhatsAppCTA as b, buildWAUrl as c, resolveWANumber as r, useT as u };
