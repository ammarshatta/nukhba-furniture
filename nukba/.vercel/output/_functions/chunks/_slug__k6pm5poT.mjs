import './page-ssr_rziONU8Q.mjs';
import { c as createComponent } from './astro-component_fXe-XK7e.mjs';
import 'piccolore';
import { Q as renderTemplate } from './params-and-props_C-Av644s.mjs';
import { r as renderComponent } from './entrypoint_i2FeS_sn.mjs';
import { $ as $$PublicLayout } from './ProductCard_C8j1Jkpv.mjs';
import { $ as $$ProductDetail } from './ProductDetail_DkB7wU3w.mjs';
import { d as getProductBySlug, a as getProducts, g as getCategories } from './storyblok_CRWm8KNY.mjs';
import { getSettings } from './data_Bas0h_CV.mjs';

const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) return Astro2.redirect("/");
  const [product, products, categories, settings] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
    getCategories(),
    getSettings()
  ]);
  if (!product) return Astro2.redirect("/");
  const lang = "ar";
  const baseUrl = "http://localhost:4321";
  const refToken = Astro2.url.searchParams.get("ref") ?? Astro2.cookies.get("nukba_ref")?.value ?? void 0;
  const relatedProducts = products.filter((p) => p.active && p.id !== product.id && p.category === product.category);
  const cat = categories.find((c) => c.slug === product.category);
  return renderTemplate`${renderComponent($$result, "PublicLayout", $$PublicLayout, { "lang": lang, "title": product.nameAr, "description": product.descAr.slice(0, 160), "canonical": `${baseUrl}/products/${slug}`, "alternateUrl": `${baseUrl}/en/products/${slug}`, "ogImage": product.images[0], "ogType": "product", "product": product, "settings": settings, "categories": categories, "breadcrumbs": [
    { name: "الرئيسية", url: `${baseUrl}/` },
    ...cat ? [{ name: cat.nameAr, url: `${baseUrl}/category/${cat.slug}` }] : [],
    { name: product.nameAr, url: `${baseUrl}/products/${slug}` }
  ] }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ProductDetail", $$ProductDetail, { "product": product, "lang": lang, "globalWaNumber": settings.waNumber, "relatedProducts": relatedProducts, "refToken": refToken })} ` })}`;
}, "D:/Furniture/nukba/src/pages/products/[slug].astro", void 0);
const $$file = "D:/Furniture/nukba/src/pages/products/[slug].astro";
const $$url = "/products/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
