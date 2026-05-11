import './page-ssr_rziONU8Q.mjs';
import { c as createComponent } from './astro-component_fXe-XK7e.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead, a3 as addAttribute } from './params-and-props_C-Av644s.mjs';
import { r as renderComponent } from './entrypoint_i2FeS_sn.mjs';
import { $ as $$AdminLayout } from './AdminLayout_Cw9asGDX.mjs';
import { getSettings } from './data_Bas0h_CV.mjs';

const $$Settings = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Settings;
  const settings = await getSettings();
  let saved = false;
  let error = "";
  if (Astro2.request.method === "POST") {
    try {
      const form = await Astro2.request.formData();
      const { saveSettings } = await import('./data_Bas0h_CV.mjs');
      await saveSettings({
        waNumber: (form.get("waNumber") ?? "").trim(),
        siteTitleAr: (form.get("siteTitleAr") ?? "").trim(),
        siteTitleEn: (form.get("siteTitleEn") ?? "").trim()
      });
      saved = true;
    } catch (e) {
      error = e instanceof Error ? e.message : "Failed to save";
    }
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Settings", "subtitle": "Global store configuration" }, { "default": async ($$result2) => renderTemplate`${saved && renderTemplate`${maybeRenderHead()}<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:12px 16px;margin-bottom:20px;color:#166534;font-size:.88rem;">✅ Settings saved</div>`}${error && renderTemplate`<div style="background:#fdf0f0;border:1px solid #f5c6c6;border-radius:6px;padding:12px 16px;margin-bottom:20px;color:#a33;font-size:.88rem;">Error: ${error}</div>`}<div class="a-card"> <form method="POST"> <div class="form-group"> <label class="form-label">WhatsApp Number (global default)</label> <input class="form-input" name="waNumber"${addAttribute(settings.waNumber, "value")} placeholder="201112007555"> <small style="color:var(--muted);font-size:.75rem;">International format without + or spaces, e.g. 201112007555</small> </div> <div class="form-group" style="margin-top:16px;"> <label class="form-label">Site Title (Arabic)</label> <input class="form-input" name="siteTitleAr"${addAttribute(settings.siteTitleAr, "value")} placeholder="نُخبة للأثاث الفاخر"> </div> <div class="form-group" style="margin-top:16px;"> <label class="form-label">Site Title (English)</label> <input class="form-input" name="siteTitleEn"${addAttribute(settings.siteTitleEn, "value")} placeholder="Nukba Luxury Furniture"> </div> <button type="submit" class="btn-primary" style="margin-top:24px;">Save Settings</button> </form> </div> ` })}`;
}, "D:/Furniture/nukba/src/pages/admin/settings.astro", void 0);

const $$file = "D:/Furniture/nukba/src/pages/admin/settings.astro";
const $$url = "/admin/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Settings,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
