import { c as createComponent } from './astro-component_fXe-XK7e.mjs';
import 'piccolore';
import { z as maybeRenderHead, a3 as addAttribute, Q as renderTemplate, bh as renderHead, C as renderSlot } from './params-and-props_C-Av644s.mjs';
import { r as renderComponent } from './entrypoint_i2FeS_sn.mjs';
import { r as renderScript } from './global_6FqtibVT.mjs';
import 'clsx';

const $$AdminNav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$AdminNav;
  const { currentPath } = Astro2.props;
  function active(path) {
    return currentPath.startsWith(path) ? "active" : "";
  }
  return renderTemplate`${maybeRenderHead()}<aside class="admin-sidebar"> <div class="admin-logo"> <div class="logo-ar">نُخبة</div> <small>ADMIN PANEL</small> </div> <ul class="admin-nav"> <li> <a href="/admin"${addAttribute(currentPath === "/admin" ? "active" : "", "class")}> <span class="icon">📊</span> Dashboard
</a> </li> <li> <a href="/admin/ai-generator"${addAttribute(active("/admin/ai-generator"), "class")}> <span class="icon">✨</span> AI Generator
</a> </li> <li> <a href="/admin/tokens"${addAttribute(active("/admin/tokens"), "class")}> <span class="icon">🔗</span> Tracking Links
</a> </li> <li> <a href="/admin/settings"${addAttribute(active("/admin/settings"), "class")}> <span class="icon">⚙️</span> Settings
</a> </li> <div class="admin-nav-divider"></div> <li> <a href="https://app.storyblok.com" target="_blank" rel="noopener"> <span class="icon">📝</span> Storyblok CMS ↗
</a> </li> <li> <form method="POST" action="/api/admin/logout" style="margin:0;"> <button type="submit" style="width:100%;background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:10px;padding:10px 20px;color:rgba(237,228,214,.6);font-size:.85rem;font-family:inherit;transition:all .2s;" onmouseover="this.style.color='#EDE4D6'" onmouseout="this.style.color='rgba(237,228,214,.6)'"> <span class="icon">🚪</span> Sign Out
</button> </form> </li> </ul> </aside>`;
}, "D:/Furniture/nukba/src/components/admin/AdminNav.astro", void 0);

const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title = "Admin", subtitle } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  return renderTemplate`<html lang="en" dir="ltr"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} — Nukba Admin</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet"><meta name="robots" content="noindex,nofollow">${renderHead()}</head> <body class="admin-body"> <div class="admin-shell"> ${renderComponent($$result, "AdminNav", $$AdminNav, { "currentPath": currentPath })} <div class="admin-main"> <div class="admin-topbar"> <div> <div class="admin-page-title">${title}</div> ${subtitle && renderTemplate`<div class="admin-page-sub">${subtitle}</div>`} </div> ${renderSlot($$result, $$slots["topbar-actions"])} </div> ${renderSlot($$result, $$slots["default"])} </div> </div> <div class="toast" id="toast"></div> ${renderScript($$result, "D:/Furniture/nukba/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "D:/Furniture/nukba/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
