import './page-ssr_rziONU8Q.mjs';
import { c as createComponent } from './astro-component_fXe-XK7e.mjs';
import 'piccolore';
import { bh as renderHead, Q as renderTemplate } from './params-and-props_C-Av644s.mjs';
import 'clsx';
import { i as isValidSession } from './auth_Dg5w7j7S.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  const sessionToken = Astro2.cookies.get("nukba_session")?.value;
  const authed = sessionToken ? await isValidSession(sessionToken) : false;
  if (authed) return Astro2.redirect("/admin");
  const hasError = Astro2.url.searchParams.get("error") === "1";
  return renderTemplate`<html lang="en" dir="ltr" data-astro-cid-rf56lckb> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Admin Login — Nukba</title><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="/_astro/admin.css">${renderHead()}</head> <body data-astro-cid-rf56lckb> <div class="login-page" data-astro-cid-rf56lckb> <div class="login-box" data-astro-cid-rf56lckb> <div class="login-logo" data-astro-cid-rf56lckb> <div class="logo-ar" style="font-family:'Amiri',serif;font-size:2rem;color:#2F1F0E;" data-astro-cid-rf56lckb>نُخبة</div> <small style="font-size:.75rem;color:#A08060;margin-top:4px;display:block;" data-astro-cid-rf56lckb>Admin Panel</small> </div> ${hasError && renderTemplate`<div class="login-err" data-astro-cid-rf56lckb>Incorrect password. Please try again.</div>`} <form method="POST" action="/api/admin/login" data-astro-cid-rf56lckb> <div style="display:flex;flex-direction:column;gap:14px;" data-astro-cid-rf56lckb> <div style="display:flex;flex-direction:column;gap:5px;" data-astro-cid-rf56lckb> <label style="font-size:.78rem;color:#A08060;" data-astro-cid-rf56lckb>Password</label> <input type="password" name="password" required autofocus placeholder="Enter admin password" style="padding:10px 12px;border:1px solid rgba(47,31,14,.15);border-radius:6px;font-family:inherit;font-size:.88rem;color:#2F1F0E;background:#FEFCF8;outline:none;transition:border-color .2s;" data-astro-cid-rf56lckb> </div> <button type="submit" style="background:#2F1F0E;color:#EDE4D6;padding:11px;border:none;border-radius:6px;font-family:inherit;font-size:.9rem;font-weight:700;cursor:pointer;transition:background .2s;margin-top:4px;" onmouseover="this.style.background='#B8922A';this.style.color='#2F1F0E';" onmouseout="this.style.background='#2F1F0E';this.style.color='#EDE4D6';" data-astro-cid-rf56lckb>
Sign In
</button> </div> </form> <div style="margin-top:20px;text-align:center;" data-astro-cid-rf56lckb> <a href="/" style="font-size:.78rem;color:#A08060;" data-astro-cid-rf56lckb>← Back to Website</a> </div> </div> </div> </body></html>`;
}, "D:/Furniture/nukba/src/pages/admin/login.astro", void 0);

const $$file = "D:/Furniture/nukba/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
