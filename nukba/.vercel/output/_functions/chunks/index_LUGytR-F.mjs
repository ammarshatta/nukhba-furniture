import './page-ssr_rziONU8Q.mjs';
import { c as createComponent } from './astro-component_fXe-XK7e.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_C-Av644s.mjs';
import { r as renderComponent } from './entrypoint_i2FeS_sn.mjs';
import { $ as $$PublicLayout, b as $$WhatsAppCTA } from './ProductCard_C8j1Jkpv.mjs';
import { $ as $$Hero, a as $$Marquee, b as $$CategoryGrid, c as $$ProductGrid, d as $$VideoSection, e as $$Testimonials } from './Testimonials_DH4Sbu0Y.mjs';
import { a as getProducts, g as getCategories } from './storyblok_CRWm8KNY.mjs';
import { getSettings } from './data_Bas0h_CV.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const [products, categories, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    getSettings()
  ]);
  const lang = "ar";
  const baseUrl = "http://localhost:4321";
  const refToken = Astro2.url.searchParams.get("ref") ?? void 0;
  return renderTemplate`${renderComponent($$result, "PublicLayout", $$PublicLayout, { "lang": lang, "title": "أثاث فاخر — غرف نوم وصالونات وسفرة", "description": "نُخبة للأثاث الفاخر — تشكيلة واسعة من غرف النوم والصالونات والسفرة والمطابخ. جودة لا تُضاهى وتوصيل مجاني.", "canonical": `${baseUrl}/`, "alternateUrl": `${baseUrl}/en`, "settings": settings, "categories": categories }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "lang": lang, "settings": settings })} ${renderComponent($$result2, "Marquee", $$Marquee, { "lang": lang })} ${renderComponent($$result2, "CategoryGrid", $$CategoryGrid, { "lang": lang, "categories": categories, "products": products })} ${renderComponent($$result2, "ProductGrid", $$ProductGrid, { "lang": lang, "products": products, "categories": categories, "globalWaNumber": settings.waNumber, "refToken": refToken })} ${renderComponent($$result2, "VideoSection", $$VideoSection, { "lang": lang })} ${renderComponent($$result2, "Testimonials", $$Testimonials, { "lang": lang })} ${maybeRenderHead()}<section class="cta-strip"> <h2 class="s-heading">هل أنت مستعد لتحويل مساحتك؟</h2> <p class="s-sub">تحدث مع مستشارنا الآن وصمّم أثاثك المثالي</p> ${renderComponent($$result2, "WhatsAppCTA", $$WhatsAppCTA, { "waNumber": settings.waNumber, "messageAr": "مرحباً، أريد الاستفسار عن تصميم أثاث مخصص", "messageEn": "Hello, I would like to inquire about custom furniture design", "lang": lang, "refToken": refToken, "variant": "strip" })} </section> ` })}`;
}, "D:/Furniture/nukba/src/pages/index.astro", void 0);
const $$file = "D:/Furniture/nukba/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
