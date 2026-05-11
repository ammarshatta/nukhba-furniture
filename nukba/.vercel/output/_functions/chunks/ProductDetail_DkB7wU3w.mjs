import { c as createComponent } from './astro-component_fXe-XK7e.mjs';
import 'piccolore';
import { z as maybeRenderHead, a3 as addAttribute, Q as renderTemplate } from './params-and-props_C-Av644s.mjs';
import { r as renderComponent } from './entrypoint_i2FeS_sn.mjs';
import { r as renderScript } from './global_6FqtibVT.mjs';
import { r as resolveWANumber, b as $$WhatsAppCTA, a as $$ProductCard, u as useT } from './ProductCard_C8j1Jkpv.mjs';

const $$ProductDetail = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProductDetail;
  const { product, lang, globalWaNumber, relatedProducts, refToken } = Astro2.props;
  const t = useT(lang);
  const waNumber = resolveWANumber(product.waNumber, globalWaNumber);
  const name = lang === "ar" ? product.nameAr : product.nameEn;
  const desc = lang === "ar" ? product.descAr : product.descEn;
  const prefix = lang === "en" ? "/en" : "";
  const baseUrl = "http://localhost:4321";
  const pageUrl = `${baseUrl}${prefix}/products/${product.slug}`;
  return renderTemplate`${maybeRenderHead()}<div class="pd-wrap"> <div class="pd-grid"> <!-- Gallery --> <div class="pd-gallery"> <div class="pd-main-img" id="mainImg"> ${product.images[0] ? renderTemplate`<img${addAttribute(product.images[0], "src")}${addAttribute(name, "alt")} id="mainImgEl">` : renderTemplate`<div style="width:100%;height:100%;background:var(--sand);display:flex;align-items:center;justify-content:center;"> <i class="ph ph-couch" style="font-size:4rem;color:var(--muted);"></i> </div>`} </div> ${product.images.length > 1 && renderTemplate`<div class="pd-thumbs"> ${product.images.map((img, i) => renderTemplate`<div${addAttribute(`pd-thumb${i === 0 ? " active" : ""}`, "class")}${addAttribute(img, "data-src")}${addAttribute(String(i), "data-idx")}> <img${addAttribute(img, "src")}${addAttribute(`${name} ${i + 1}`, "alt")} loading="lazy"> </div>`)} </div>`} </div> <!-- Info --> <div class="pd-info"> <div class="pd-cat">${product.category.toUpperCase()}</div> <h1 class="pd-name">${name}</h1> <p class="pd-desc">${desc}</p> <div class="pd-price-row"> ${product.badge && renderTemplate`<span${addAttribute(`pbadge ${product.badge}`, "class")}>${t.product.badges[product.badge]}</span>`} <span class="pd-price">${product.price || "—"}</span> </div> ${renderComponent($$result, "WhatsAppCTA", $$WhatsAppCTA, { "waNumber": waNumber, "messageAr": product.waTextAr, "messageEn": product.waTextEn, "lang": lang, "refToken": refToken, "variant": "detail" })} <div class="pd-share"> <span>${t.product.share}:</span> <a${addAttribute(`https://wa.me/?text=${encodeURIComponent(pageUrl)}`, "href")} target="_blank">WhatsApp</a> <a${addAttribute(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, "href")} target="_blank">Facebook</a> <a${addAttribute(`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}`, "href")} target="_blank">X</a> </div> </div> </div> </div> ${relatedProducts.length > 0 && renderTemplate`<div class="related"> <h2 class="s-heading" style="margin-bottom:4px;">${t.product.related}</h2> <div class="related-grid"> ${relatedProducts.slice(0, 3).map((p) => renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, { "product": p, "lang": lang, "globalWaNumber": globalWaNumber, "refToken": refToken })}`)} </div> </div>`} ${renderScript($$result, "D:/Furniture/nukba/src/components/product/ProductDetail.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Furniture/nukba/src/components/product/ProductDetail.astro", void 0);

export { $$ProductDetail as $ };
