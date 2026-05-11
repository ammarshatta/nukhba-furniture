import { a as getProducts, g as getCategories } from './storyblok_CRWm8KNY.mjs';
import { b as buildSitemapXml } from './seo_CBJxIJPX.mjs';

const GET = async () => {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const baseUrl = "http://localhost:4321";
  const xml = buildSitemapXml(products, categories, baseUrl);
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
