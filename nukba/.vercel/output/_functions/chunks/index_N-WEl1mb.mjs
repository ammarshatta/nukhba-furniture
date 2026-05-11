import './page-ssr_rziONU8Q.mjs';
import { c as createComponent } from './astro-component_fXe-XK7e.mjs';
import 'piccolore';
import { Q as renderTemplate, bg as defineScriptVars, z as maybeRenderHead, a3 as addAttribute } from './params-and-props_C-Av644s.mjs';
import { r as renderComponent } from './entrypoint_i2FeS_sn.mjs';
import { $ as $$AdminLayout } from './AdminLayout_Cw9asGDX.mjs';
import { getTokens } from './data_Bas0h_CV.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const tokens = await getTokens();
  const baseUrl = "http://localhost:4321";
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", "\n  document.getElementById('addBtn')?.addEventListener('click', async () => {\n    const token = (document.getElementById('tokenInput') as HTMLInputElement).value.trim();\n    const label = (document.getElementById('labelInput') as HTMLInputElement).value.trim();\n    if (!token || !label) return window.showToast('Fill in both fields', 'error');\n    const res = await fetch('/api/admin/tokens', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, label }) });\n    if (res.ok) { window.showToast('Token created!'); setTimeout(() => location.reload(), 600); }\n    else window.showToast(res.status === 409 ? 'Token already exists' : 'Error', 'error');\n  });\n\n  async function deleteToken(token: string) {\n    if (!confirm(`Delete token \"${token}\"?`)) return;\n    const res = await fetch(`/api/admin/tokens/${encodeURIComponent(token)}`, { method: 'DELETE' });\n    if (res.ok) { window.showToast('Deleted'); setTimeout(() => location.reload(), 600); }\n    else window.showToast('Error', 'error');\n  }\n\n  function copyUrl(url: string) {\n    navigator.clipboard.writeText(url).then(() => window.showToast('Copied!'));\n  }\n\n  (window as any).deleteToken = deleteToken;\n  (window as any).copyUrl = copyUrl;\n})();</script>"], ["", " <script>(function(){", "\n  document.getElementById('addBtn')?.addEventListener('click', async () => {\n    const token = (document.getElementById('tokenInput') as HTMLInputElement).value.trim();\n    const label = (document.getElementById('labelInput') as HTMLInputElement).value.trim();\n    if (!token || !label) return window.showToast('Fill in both fields', 'error');\n    const res = await fetch('/api/admin/tokens', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, label }) });\n    if (res.ok) { window.showToast('Token created!'); setTimeout(() => location.reload(), 600); }\n    else window.showToast(res.status === 409 ? 'Token already exists' : 'Error', 'error');\n  });\n\n  async function deleteToken(token: string) {\n    if (!confirm(\\`Delete token \"\\${token}\"?\\`)) return;\n    const res = await fetch(\\`/api/admin/tokens/\\${encodeURIComponent(token)}\\`, { method: 'DELETE' });\n    if (res.ok) { window.showToast('Deleted'); setTimeout(() => location.reload(), 600); }\n    else window.showToast('Error', 'error');\n  }\n\n  function copyUrl(url: string) {\n    navigator.clipboard.writeText(url).then(() => window.showToast('Copied!'));\n  }\n\n  (window as any).deleteToken = deleteToken;\n  (window as any).copyUrl = copyUrl;\n})();</script>"])), renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Tracking Links", "subtitle": "Create tokens to track traffic sources" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="a-card" style="margin-bottom:20px;"> <h3 style="font-size:.9rem;color:var(--walnut);margin-bottom:14px;">Add New Token</h3> <div style="display:grid;grid-template-columns:1fr 1fr auto;gap:10px;align-items:end;"> <div class="form-group"> <label class="form-label">Token (URL-safe, no spaces)</label> <input class="form-input" id="tokenInput" placeholder="instagram-story"> </div> <div class="form-group"> <label class="form-label">Label</label> <input class="form-input" id="labelInput" placeholder="Instagram Story Ad"> </div> <button class="btn-primary" id="addBtn">Add Token</button> </div> </div> <div class="a-card"> <h3 style="font-size:.9rem;color:var(--walnut);margin-bottom:14px;">
Tokens (${tokens.length})
<span style="font-size:.75rem;color:var(--muted);font-weight:normal;margin-inline-start:6px;">
Shareable URL format: ${baseUrl}/products/[slug]?ref=TOKEN
</span> </h3> ${tokens.length === 0 ? renderTemplate`<p style="color:var(--muted);text-align:center;padding:24px;">No tokens yet. Create one above to start tracking.</p>` : renderTemplate`<table class="a-table" id="tokensTable"> <thead> <tr> <th>Token</th> <th>Label</th> <th>Hits</th> <th>Created</th> <th>Shareable URL (homepage)</th> <th></th> </tr> </thead> <tbody> ${tokens.map((t) => renderTemplate`<tr> <td><code style="background:#f5f0e8;padding:3px 7px;border-radius:3px;font-size:.8rem;">${t.token}</code></td> <td>${t.label}</td> <td><strong>${t.hits ?? 0}</strong></td> <td style="font-size:.75rem;">${new Date(t.createdAt).toLocaleDateString()}</td> <td> <span class="token-url">${baseUrl}/?ref=${t.token}</span> <button class="copy-btn"${addAttribute(`copyUrl('${baseUrl}/?ref=${t.token}')`, "onclick")}>Copy</button> </td> <td> <button class="btn-danger"${addAttribute(`deleteToken('${t.token}')`, "onclick")}>🗑</button> </td> </tr>`)} </tbody> </table>`} </div> <div class="a-card" style="margin-top:20px;"> <h3 style="font-size:.9rem;color:var(--walnut);margin-bottom:8px;">How to use tracking links</h3> <ol style="color:var(--muted);font-size:.83rem;line-height:2;padding-inline-start:20px;"> <li>Create a token above (e.g. <code>instagram-story</code>)</li> <li>Copy a shareable URL: <code>${baseUrl}/products/[slug]?ref=instagram-story</code></li> <li>Share the URL in your ad, post, or QR code</li> <li>When customers click WhatsApp, their message will include <code>[ref:instagram-story]</code></li> <li>You can see hit counts in the table above</li> </ol> </div> ` }), defineScriptVars({ baseUrl }));
}, "D:/Furniture/nukba/src/pages/admin/tokens/index.astro", void 0);
const $$file = "D:/Furniture/nukba/src/pages/admin/tokens/index.astro";
const $$url = "/admin/tokens";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
