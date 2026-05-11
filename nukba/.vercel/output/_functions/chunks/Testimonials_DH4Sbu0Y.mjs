import { c as createComponent } from './astro-component_fXe-XK7e.mjs';
import 'piccolore';
import { z as maybeRenderHead, Q as renderTemplate, a3 as addAttribute, F as Fragment } from './params-and-props_C-Av644s.mjs';
import 'clsx';
import { c as buildWAUrl, u as useT, a as $$ProductCard } from './ProductCard_C8j1Jkpv.mjs';
import { r as renderComponent } from './entrypoint_i2FeS_sn.mjs';
import { r as renderScript } from './global_6FqtibVT.mjs';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Hero;
  const { lang, settings, heroImage } = Astro2.props;
  const t = useT(lang);
  const h = t.hero;
  const waUrl = buildWAUrl(settings.waNumber, lang === "ar" ? "مرحباً، أريد الاستفسار عن منتجاتكم" : "Hello, I would like to inquire about your products");
  return renderTemplate`${maybeRenderHead()}<section id="hero"> <div class="hero-content"> <div class="hero-badge"> <span></span> ${h.badge} </div> <h1 class="hero-h1"> ${h.h1.map((line, i) => renderTemplate`<span class="line"><span>${line}</span></span>`)} </h1> <p class="hero-p">${h.subtitle}</p> <div class="hero-btns"> <a${addAttribute(lang === "en" ? "/en/#products" : "/#products", "href")} class="btn-fill"> <i class="ph ph-couch"></i> ${h.btnBrowse} </a> <a${addAttribute(waUrl, "href")} target="_blank" rel="noopener" class="btn-outline"> <i class="ph ph-whatsapp-logo"></i> ${h.btnWA} </a> </div> <div class="hero-stats"> ${h.stats.map((stat) => renderTemplate`<div class="hero-stat"> <strong>${stat.num}</strong> <span>${stat.label}</span> </div>`)} </div> </div> <div class="hero-img-wrap"> <div class="hero-img-frame"> ${heroImage ? renderTemplate`<img${addAttribute(heroImage, "src")}${addAttribute(lang === "ar" ? "أثاث فاخر نُخبة" : "Nukba Luxury Furniture", "alt")} loading="eager">` : renderTemplate`<div class="hero-placeholder"> <svg viewBox="0 0 44 44" fill="none"> <path d="M8 38 L8 20 Q8 8 22 8 Q36 8 36 20 L36 38" stroke="#B8922A" stroke-width="2" fill="none" stroke-linecap="round"></path> <line x1="5" y1="38" x2="39" y2="38" stroke="#B8922A" stroke-width="2" stroke-linecap="round"></line> </svg> </div>`} </div> <div class="hero-tag"> <div class="hero-tag-icon">⭐</div> <div> <strong>${lang === "ar" ? "تقييم ممتاز" : "Excellent Rating"}</strong> <span>${lang === "ar" ? "+٥٠٠ عميل سعيد" : "+500 Happy Clients"}</span> </div> </div> </div> </section>`;
}, "D:/Furniture/nukba/src/components/home/Hero.astro", void 0);

const $$Marquee = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Marquee;
  const { lang } = Astro2.props;
  const t = useT(lang);
  t.marquee.repeat(4);
  const items = t.marquee.split(" · ").filter(Boolean);
  return renderTemplate`${maybeRenderHead()}<div class="marquee-bar" aria-hidden="true"> <div class="marquee-track"> ${[...items, ...items, ...items, ...items].map((item, i) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <span class="mi">${item}</span> <span class="mi gem">◆</span> ` })}`)} </div> </div>`;
}, "D:/Furniture/nukba/src/components/home/Marquee.astro", void 0);

const $$CategoryGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CategoryGrid;
  const { lang, categories, products } = Astro2.props;
  const t = useT(lang);
  const s = t.sections;
  function countProducts(slug) {
    return products.filter((p) => p.category === slug && p.active).length;
  }
  const prefix = lang === "en" ? "/en" : "";
  return renderTemplate`${maybeRenderHead()}<section id="cats" style="padding:var(--sec-pad);"> <div class="cats-head" data-r> <div class="s-eyebrow">${s.categoriesEyebrow}</div> <h2 class="s-heading">${s.categoriesTitle}</h2> <p class="s-sub">${s.categoriesSub}</p> </div> <div class="cat-grid"> ${categories.map((cat, i) => renderTemplate`<a${addAttribute(`${prefix}/category/${cat.slug}`, "href")} class="cat-card" data-r${addAttribute(String(Math.min(i + 1, 4)), "data-d")}> ${cat.image ? renderTemplate`<img class="cat-img"${addAttribute(cat.image, "src")}${addAttribute(lang === "ar" ? cat.nameAr : cat.nameEn, "alt")} loading="lazy">` : renderTemplate`<div class="cat-img" style="background:var(--sand);min-height:160px;display:flex;align-items:center;justify-content:center;"> <i class="ph ph-couch" style="font-size:2rem;color:var(--muted);"></i> </div>`} <div class="cat-ov"> <div class="cat-n">${lang === "ar" ? cat.nameAr : cat.nameEn}</div> <div class="cat-c"> ${countProducts(cat.slug)}${lang === "ar" ? " منتج" : " products"} </div> <span class="cat-line"></span> </div> </a>`)} </div> </section>`;
}, "D:/Furniture/nukba/src/components/home/CategoryGrid.astro", void 0);

const $$ProductGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProductGrid;
  const { lang, products, categories, globalWaNumber, refToken, initialFilter } = Astro2.props;
  const t = useT(lang);
  const s = t.sections;
  const activeProducts = products.filter((p) => p.active);
  return renderTemplate`${maybeRenderHead()}<section id="products" style="padding:var(--sec-pad);background:var(--white);"> <div class="prod-head" data-r> <div class="s-eyebrow">${s.productsEyebrow}</div> <h2 class="s-heading">${s.productsTitle}</h2> <p class="s-sub">${s.productsSub}</p> <div class="filter-row" id="filterRow"> <button class="filt-btn on" data-filter="all"> ${lang === "ar" ? "الكل" : "All"} </button> ${categories.map((cat) => renderTemplate`<button class="filt-btn"${addAttribute(cat.slug, "data-filter")}> ${lang === "ar" ? cat.nameAr : cat.nameEn} </button>`)} </div> </div> <div class="pgrid" id="productGrid"> ${activeProducts.map((product) => renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, { "product": product, "lang": lang, "globalWaNumber": globalWaNumber, "refToken": refToken })}`)} </div> ${activeProducts.length === 0 && renderTemplate`<p style="text-align:center;color:var(--muted);padding:40px 0;"> ${lang === "ar" ? "لا توجد منتجات بعد" : "No products yet"} </p>`} </section> ${renderScript($$result, "D:/Furniture/nukba/src/components/home/ProductGrid.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Furniture/nukba/src/components/home/ProductGrid.astro", void 0);

const $$VideoSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$VideoSection;
  const { lang, videoId } = Astro2.props;
  const t = useT(lang);
  const s = t.sections;
  const icons = ["🌲", "🎨", "🚚", "🛡️"];
  return renderTemplate`${maybeRenderHead()}<section id="vid"> <div class="vid-txt" data-r> <div class="s-eyebrow">${s.videoEyebrow}</div> <h2 class="s-heading">${s.videoTitle}</h2> <p class="s-sub">${s.videoSub}</p> <ul class="vid-features"> ${s.videoFeatures.map((feat, i) => renderTemplate`<li class="vf"> <div class="vficon">${icons[i]}</div> <span>${feat}</span> </li>`)} </ul> </div> <div class="vid-box" data-r data-d="2" id="vidBox"> ${videoId ? renderTemplate`<iframe id="vidFrame" width="100%" height="100%"${addAttribute(`https://www.youtube.com/embed/${videoId}`, "src")} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="display:none;border-radius:16px;"></iframe>` : null} <button class="play" id="playBtn" aria-label="Play video"> <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg> </button> </div> </section> ${videoId && renderTemplate`${renderScript($$result, "D:/Furniture/nukba/src/components/home/VideoSection.astro?astro&type=script&index=0&lang.ts")}`}`;
}, "D:/Furniture/nukba/src/components/home/VideoSection.astro", void 0);

const $$Testimonials = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Testimonials;
  const { lang } = Astro2.props;
  const t = useT(lang);
  const testimonials = lang === "ar" ? [
    { text: "جودة الأثاث فاقت توقعاتي تماماً. التصميم راقي جداً والتركيب كان محترف.", name: "أحمد محمد", city: "القاهرة", initial: "أ" },
    { text: "تعاملت معهم لغرفة نوم ابنتي، الخامات عالية جداً والألوان طلعت بالظبط زي ما طلبنا.", name: "منى السيد", city: "الإسكندرية", initial: "م" },
    { text: "أنصح بهم بشدة. الديليفري في المعاد والتركيب نظيف جداً. عملت صالون وسفرة كاملة.", name: "خالد إبراهيم", city: "الجيزة", initial: "خ" }
  ] : [
    { text: "The furniture quality exceeded my expectations completely. The design is elegant and installation was professional.", name: "Ahmed Mohamed", city: "Cairo", initial: "A" },
    { text: "I ordered a bedroom set for my daughter. The materials are high quality and the colors came out exactly as requested.", name: "Mona El-Sayed", city: "Alexandria", initial: "M" },
    { text: "Highly recommend. Delivery was on time and installation was clean. Ordered a full living and dining set.", name: "Khaled Ibrahim", city: "Giza", initial: "K" }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="testimonials" style="padding:var(--sec-pad);background:var(--cream);"> <div data-r> <div class="s-eyebrow">${t.sections.testimonials}</div> <h2 class="s-heading">${t.sections.testimonials}</h2> </div> <div class="tgrid"> ${testimonials.map((item, i) => renderTemplate`<div class="tcard" data-r${addAttribute(String(i + 1), "data-d")}> <div class="tq">"</div> <p class="ttxt">${item.text}</p> <div class="tau"> <div class="tav">${item.initial}</div> <div class="tau-info"> <strong>${item.name}</strong> <span>${item.city}</span> <div class="tstars">★★★★★</div> </div> </div> </div>`)} </div> </section>`;
}, "D:/Furniture/nukba/src/components/home/Testimonials.astro", void 0);

export { $$Hero as $, $$Marquee as a, $$CategoryGrid as b, $$ProductGrid as c, $$VideoSection as d, $$Testimonials as e };
