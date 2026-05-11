import './page-ssr_rziONU8Q.mjs';
import { c as createComponent } from './astro-component_fXe-XK7e.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_C-Av644s.mjs';
import { r as renderComponent } from './entrypoint_i2FeS_sn.mjs';
import { $ as $$PublicLayout, a as $$ProductCard } from './ProductCard_C8j1Jkpv.mjs';
import { b as getCategoryBySlug, a as getProducts, g as getCategories } from './storyblok_CRWm8KNY.mjs';
import { getSettings } from './data_Bas0h_CV.mjs';

const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) return Astro2.redirect("/en");
  const [cat, products, categories, settings] = await Promise.all([
    getCategoryBySlug(slug),
    getProducts(),
    getCategories(),
    getSettings()
  ]);
  if (!cat) return Astro2.redirect("/en");
  const lang = "en";
  const baseUrl = "http://localhost:4321";
  const refToken = Astro2.url.searchParams.get("ref") ?? Astro2.cookies.get("nukba_ref")?.value ?? void 0;
  const catProducts = products.filter((p) => p.active && p.category === slug);
  return renderTemplate`${renderComponent($$result, "PublicLayout", $$PublicLayout, { "lang": lang, "title": cat.nameEn, "description": `Browse our premium ${cat.nameEn} collection from Nukba — ${catProducts.length} products available`, "canonical": `${baseUrl}/en/category/${slug}`, "alternateUrl": `${baseUrl}/category/${slug}`, "settings": settings, "categories": categories, "breadcrumbs": [
    { name: "Home", url: `${baseUrl}/en` },
    { name: cat.nameEn, url: `${baseUrl}/en/category/${slug}` }
  ] }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="cat-page"> <div class="cat-page-head" data-r> <div class="s-eyebrow">${cat.nameEn}</div> <h1 class="s-heading">${cat.nameEn}</h1> <p class="s-sub"> ${catProducts.length === 0 ? "No products in this category yet" : `${catProducts.length} products available`} </p> </div> <div class="pgrid"> ${catProducts.map((product) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": product, "lang": lang, "globalWaNumber": settings.waNumber, "refToken": refToken })}`)} </div> ${catProducts.length === 0 && renderTemplate`<p style="text-align:center;color:var(--muted);padding:60px 0;">No products in this category yet</p>`} </div> ` })}`;
}, "D:/Furniture/nukba/src/pages/en/category/[slug].astro", void 0);
const $$file = "D:/Furniture/nukba/src/pages/en/category/[slug].astro";
const $$url = "/en/category/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
