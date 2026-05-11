import './page-ssr_rziONU8Q.mjs';
import { c as createComponent } from './astro-component_fXe-XK7e.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead, a3 as addAttribute } from './params-and-props_C-Av644s.mjs';
import { r as renderComponent } from './entrypoint_i2FeS_sn.mjs';
import { $ as $$AdminLayout } from './AdminLayout_Cw9asGDX.mjs';
import { a as getProducts, g as getCategories } from './storyblok_CRWm8KNY.mjs';
import { getTokens } from './data_Bas0h_CV.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const [products, categories, tokens] = await Promise.all([
    getProducts(),
    getCategories(),
    getTokens()
  ]);
  const activeProducts = products.filter((p) => p.active).length;
  const totalHits = tokens.reduce((sum, t) => sum + (t.hits ?? 0), 0);
  const recentProducts = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard", "subtitle": "Overview of your store" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="stat-grid"> <div class="stat-card"> <div class="icon">🛋️</div> <div class="num">${products.length}</div> <div class="lbl">Total Products</div> </div> <div class="stat-card"> <div class="icon">✅</div> <div class="num">${activeProducts}</div> <div class="lbl">Active Products</div> </div> <div class="stat-card"> <div class="icon">📂</div> <div class="num">${categories.length}</div> <div class="lbl">Categories</div> </div> <div class="stat-card"> <div class="icon">🔗</div> <div class="num">${totalHits}</div> <div class="lbl">Total Link Hits</div> </div> </div> <div class="a-card"> <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;"> <h3 style="font-size:1rem;color:var(--walnut);">Recent Products</h3> <div style="display:flex;gap:8px;"> <a href="/admin/ai-generator" class="btn-primary">✨ AI Generator</a> <a href="https://app.storyblok.com" target="_blank" rel="noopener" class="btn-sm">Edit in Storyblok ↗</a> </div> </div> ${recentProducts.length === 0 ? renderTemplate`<p style="color:var(--muted);font-size:.88rem;text-align:center;padding:24px 0;">
No products yet. <a href="/admin/ai-generator" style="color:var(--gold);">Generate your first product with AI →</a> </p>` : renderTemplate`<table class="a-table"> <thead> <tr> <th>Image</th> <th>Name (AR)</th> <th>Category</th> <th>Price</th> <th>Status</th> <th>Actions</th> </tr> </thead> <tbody> ${recentProducts.map((p) => renderTemplate`<tr> <td> ${p.images[0] ? renderTemplate`<img${addAttribute(p.images[0], "src")} class="td-img"${addAttribute(p.nameAr, "alt")}>` : renderTemplate`<div style="width:48px;height:36px;background:var(--sand);border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:.8rem;">📷</div>`} </td> <td class="td-name">${p.nameAr}</td> <td>${p.category}</td> <td>${p.price || "—"}</td> <td> <span${addAttribute(`badge ${p.active ? "badge-green" : "badge-muted"}`, "class")}> ${p.active ? "Active" : "Hidden"} </span> </td> <td> <div class="actions"> <a${addAttribute(`/products/${p.slug}`, "href")} target="_blank" class="btn-sm">View</a> </div> </td> </tr>`)} </tbody> </table>`} </div> ` })}`;
}, "D:/Furniture/nukba/src/pages/admin/index.astro", void 0);

const $$file = "D:/Furniture/nukba/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
