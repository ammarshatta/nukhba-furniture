import './page-ssr_rziONU8Q.mjs';
import { c as createComponent } from './astro-component_fXe-XK7e.mjs';
import 'piccolore';
import { Q as renderTemplate, bg as defineScriptVars, z as maybeRenderHead, a3 as addAttribute } from './params-and-props_C-Av644s.mjs';
import { r as renderComponent } from './entrypoint_i2FeS_sn.mjs';
import { $ as $$AdminLayout } from './AdminLayout_Cw9asGDX.mjs';
import { g as getCategories } from './storyblok_CRWm8KNY.mjs';
import { getSettings } from './data_Bas0h_CV.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$AiGenerator = createComponent(async ($$result, $$props, $$slots) => {
  const [categories, settings] = await Promise.all([getCategories(), getSettings()]);
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", `
  const catMap = Object.fromEntries(categories.map(c => [c.slug, { ar: c.nameAr, en: c.nameEn }]));
  let images = [];
  let results = [];

  const drop = document.getElementById('aiDrop');
  const input = document.getElementById('aiFileInput');
  const previews = document.getElementById('aiPreviews');
  const options = document.getElementById('aiOptions');
  const genBtn = document.getElementById('aiGenerateBtn');
  const spinner = document.getElementById('aiSpinner');
  const resultsDiv = document.getElementById('aiResults');
  const resultsContainer = document.getElementById('aiResultsContainer');
  const errorDiv = document.getElementById('aiError');
  const resultTitle = document.getElementById('aiResultTitle');

  function renderPreviews() {
    if (!previews) return;
    previews.innerHTML = images.map((img, i) => \`
      <div class="img-prev">
        <img src="\${img.url}" alt="" />
        <button type="button" class="rm-img" onclick="removeImg(\${i})">×</button>
      </div>\`).join('');
    if (options) options.style.display = images.length ? 'block' : 'none';
  }

  window.removeImg = (i) => { URL.revokeObjectURL(images[i].url); images.splice(i,1); renderPreviews(); };

  function addFiles(files) {
    const arr = Array.from(files).filter(f => f.type.startsWith('image/')).slice(0, 5 - images.length);
    arr.forEach(f => images.push({ file: f, url: URL.createObjectURL(f), name: f.name }));
    renderPreviews();
  }

  drop?.addEventListener('click', () => input?.click());
  drop?.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('over'); });
  drop?.addEventListener('dragleave', () => drop.classList.remove('over'));
  drop?.addEventListener('drop', e => { e.preventDefault(); drop.classList.remove('over'); addFiles(e.dataTransfer?.files ?? []); });
  input?.addEventListener('change', () => { addFiles((input).files ?? []); (input).value = ''; });

  function toBase64(file) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result.split(',')[1]);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
  }

  genBtn?.addEventListener('click', async () => {
    if (!images.length) return;
    errorDiv.style.display = 'none';
    genBtn.disabled = true;
    spinner.style.display = 'inline-block';
    results = [];
    resultsDiv.style.display = 'none';

    const catVal = document.getElementById('aiCat').value;
    const price = document.getElementById('aiPrice').value.trim();
    const badge = document.getElementById('aiBadge').value;

    try {
      for (let i = 0; i < images.length; i++) {
        const b64 = await toBase64(images[i].file);
        const res = await fetch('/api/admin/ai-generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: { data: b64, mimeType: images[i].file.type }, category: catVal, price, badge }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(err.error ?? \`HTTP \${res.status}\`);
        }
        const info = await res.json();
        results.push({ info, imageFile: images[i].file, imageUrl: images[i].url, price, badge });
      }
      renderResults();
    } catch (e) {
      errorDiv.textContent = 'Error: ' + e.message;
      errorDiv.style.display = 'block';
    } finally {
      genBtn.disabled = false;
      spinner.style.display = 'none';
    }
  });

  function renderResults() {
    resultsDiv.style.display = 'block';
    resultTitle.textContent = \`✅ Generated \${results.length} product\${results.length > 1 ? 's' : ''}\`;
    resultsContainer.innerHTML = results.map((r, i) => \`
      <div class="ai-result" id="result-\${i}">
        <div class="ai-result-top">
          <div class="ai-result-img"><img src="\${r.imageUrl}" alt="" /></div>
          <div class="ai-result-info">
            <div style="font-size:.7rem;color:var(--gold);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;">\${r.info.category_ar ?? r.info.category_code}</div>
            <div style="font-family:'Amiri',serif;font-size:1.1rem;color:var(--walnut);margin-bottom:6px;" dir="rtl">\${r.info.nameAr}</div>
            <div style="font-size:.85rem;color:var(--warm);margin-bottom:6px;">\${r.info.nameEn}</div>
            <div style="font-size:.82rem;color:var(--muted);" dir="rtl">\${r.info.descAr}</div>
            \${r.price ? \`<div style="font-weight:700;margin-top:8px;color:var(--walnut);">\${r.price}</div>\` : ''}
            <div class="ai-result-actions">
              <button class="btn-primary" onclick="saveResult(\${i})" id="save-btn-\${i}">💾 Save to CMS</button>
              <button class="btn-sm" onclick="editResult(\${i})">✏️ Edit First</button>
            </div>
            <div id="save-status-\${i}" style="font-size:.78rem;margin-top:6px;"></div>
          </div>
        </div>
      </div>\`).join('');
  }

  window.saveResult = async (i) => {
    const r = results[i];
    const btn = document.getElementById(\`save-btn-\${i}\`);
    const status = document.getElementById(\`save-status-\${i}\`);
    btn.disabled = true; btn.textContent = 'Uploading...';

    try {
      // Upload image to Storyblok
      const fd = new FormData();
      fd.append('file', r.imageFile);
      const upRes = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      if (!upRes.ok) throw new Error('Image upload failed');
      const { url: imageUrl } = await upRes.json();

      // Create product story in Storyblok
      btn.textContent = 'Saving to Storyblok...';
      const catCode = r.info.category_code ?? 'liv';
      const slug = r.info.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString().slice(-4);
      const product = {
        nameAr: r.info.nameAr,
        nameEn: r.info.nameEn,
        descAr: r.info.descAr,
        descEn: r.info.descEn,
        category: catCode,
        price: r.price ?? '',
        badge: r.badge ?? '',
        waTextAr: r.info.waTextAr,
        waTextEn: r.info.waTextEn,
        imageUrl,
        slug,
      };

      const pRes = await fetch('/api/admin/storyblok/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!pRes.ok) {
        const err = await pRes.json().catch(() => ({ error: \`HTTP \${pRes.status}\` }));
        throw new Error(err.error ?? 'Failed to save product');
      }
      const saved = await pRes.json();

      btn.textContent = '✅ Saved!';
      status.innerHTML = \`<a href="/products/\${saved.slug}" target="_blank" style="color:var(--gold);">View on site →</a> | <a href="https://app.storyblok.com" target="_blank" style="color:var(--gold);">Edit in Storyblok →</a>\`;
      window.showToast('Product saved to Storyblok!');
    } catch (e) {
      btn.disabled = false; btn.textContent = '💾 Save to CMS';
      status.textContent = 'Error: ' + e.message;
      window.showToast('Save failed', 'error');
    }
  };

  window.editResult = async (i) => {
    // Save first, then open Storyblok
    await window.saveResult(i);
    window.open('https://app.storyblok.com', '_blank');
  };
})();<\/script>`], ["", " <script>(function(){", `
  const catMap = Object.fromEntries(categories.map(c => [c.slug, { ar: c.nameAr, en: c.nameEn }]));
  let images = [];
  let results = [];

  const drop = document.getElementById('aiDrop');
  const input = document.getElementById('aiFileInput');
  const previews = document.getElementById('aiPreviews');
  const options = document.getElementById('aiOptions');
  const genBtn = document.getElementById('aiGenerateBtn');
  const spinner = document.getElementById('aiSpinner');
  const resultsDiv = document.getElementById('aiResults');
  const resultsContainer = document.getElementById('aiResultsContainer');
  const errorDiv = document.getElementById('aiError');
  const resultTitle = document.getElementById('aiResultTitle');

  function renderPreviews() {
    if (!previews) return;
    previews.innerHTML = images.map((img, i) => \\\`
      <div class="img-prev">
        <img src="\\\${img.url}" alt="" />
        <button type="button" class="rm-img" onclick="removeImg(\\\${i})">×</button>
      </div>\\\`).join('');
    if (options) options.style.display = images.length ? 'block' : 'none';
  }

  window.removeImg = (i) => { URL.revokeObjectURL(images[i].url); images.splice(i,1); renderPreviews(); };

  function addFiles(files) {
    const arr = Array.from(files).filter(f => f.type.startsWith('image/')).slice(0, 5 - images.length);
    arr.forEach(f => images.push({ file: f, url: URL.createObjectURL(f), name: f.name }));
    renderPreviews();
  }

  drop?.addEventListener('click', () => input?.click());
  drop?.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('over'); });
  drop?.addEventListener('dragleave', () => drop.classList.remove('over'));
  drop?.addEventListener('drop', e => { e.preventDefault(); drop.classList.remove('over'); addFiles(e.dataTransfer?.files ?? []); });
  input?.addEventListener('change', () => { addFiles((input).files ?? []); (input).value = ''; });

  function toBase64(file) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result.split(',')[1]);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
  }

  genBtn?.addEventListener('click', async () => {
    if (!images.length) return;
    errorDiv.style.display = 'none';
    genBtn.disabled = true;
    spinner.style.display = 'inline-block';
    results = [];
    resultsDiv.style.display = 'none';

    const catVal = document.getElementById('aiCat').value;
    const price = document.getElementById('aiPrice').value.trim();
    const badge = document.getElementById('aiBadge').value;

    try {
      for (let i = 0; i < images.length; i++) {
        const b64 = await toBase64(images[i].file);
        const res = await fetch('/api/admin/ai-generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: { data: b64, mimeType: images[i].file.type }, category: catVal, price, badge }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(err.error ?? \\\`HTTP \\\${res.status}\\\`);
        }
        const info = await res.json();
        results.push({ info, imageFile: images[i].file, imageUrl: images[i].url, price, badge });
      }
      renderResults();
    } catch (e) {
      errorDiv.textContent = 'Error: ' + e.message;
      errorDiv.style.display = 'block';
    } finally {
      genBtn.disabled = false;
      spinner.style.display = 'none';
    }
  });

  function renderResults() {
    resultsDiv.style.display = 'block';
    resultTitle.textContent = \\\`✅ Generated \\\${results.length} product\\\${results.length > 1 ? 's' : ''}\\\`;
    resultsContainer.innerHTML = results.map((r, i) => \\\`
      <div class="ai-result" id="result-\\\${i}">
        <div class="ai-result-top">
          <div class="ai-result-img"><img src="\\\${r.imageUrl}" alt="" /></div>
          <div class="ai-result-info">
            <div style="font-size:.7rem;color:var(--gold);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;">\\\${r.info.category_ar ?? r.info.category_code}</div>
            <div style="font-family:'Amiri',serif;font-size:1.1rem;color:var(--walnut);margin-bottom:6px;" dir="rtl">\\\${r.info.nameAr}</div>
            <div style="font-size:.85rem;color:var(--warm);margin-bottom:6px;">\\\${r.info.nameEn}</div>
            <div style="font-size:.82rem;color:var(--muted);" dir="rtl">\\\${r.info.descAr}</div>
            \\\${r.price ? \\\`<div style="font-weight:700;margin-top:8px;color:var(--walnut);">\\\${r.price}</div>\\\` : ''}
            <div class="ai-result-actions">
              <button class="btn-primary" onclick="saveResult(\\\${i})" id="save-btn-\\\${i}">💾 Save to CMS</button>
              <button class="btn-sm" onclick="editResult(\\\${i})">✏️ Edit First</button>
            </div>
            <div id="save-status-\\\${i}" style="font-size:.78rem;margin-top:6px;"></div>
          </div>
        </div>
      </div>\\\`).join('');
  }

  window.saveResult = async (i) => {
    const r = results[i];
    const btn = document.getElementById(\\\`save-btn-\\\${i}\\\`);
    const status = document.getElementById(\\\`save-status-\\\${i}\\\`);
    btn.disabled = true; btn.textContent = 'Uploading...';

    try {
      // Upload image to Storyblok
      const fd = new FormData();
      fd.append('file', r.imageFile);
      const upRes = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      if (!upRes.ok) throw new Error('Image upload failed');
      const { url: imageUrl } = await upRes.json();

      // Create product story in Storyblok
      btn.textContent = 'Saving to Storyblok...';
      const catCode = r.info.category_code ?? 'liv';
      const slug = r.info.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString().slice(-4);
      const product = {
        nameAr: r.info.nameAr,
        nameEn: r.info.nameEn,
        descAr: r.info.descAr,
        descEn: r.info.descEn,
        category: catCode,
        price: r.price ?? '',
        badge: r.badge ?? '',
        waTextAr: r.info.waTextAr,
        waTextEn: r.info.waTextEn,
        imageUrl,
        slug,
      };

      const pRes = await fetch('/api/admin/storyblok/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!pRes.ok) {
        const err = await pRes.json().catch(() => ({ error: \\\`HTTP \\\${pRes.status}\\\` }));
        throw new Error(err.error ?? 'Failed to save product');
      }
      const saved = await pRes.json();

      btn.textContent = '✅ Saved!';
      status.innerHTML = \\\`<a href="/products/\\\${saved.slug}" target="_blank" style="color:var(--gold);">View on site →</a> | <a href="https://app.storyblok.com" target="_blank" style="color:var(--gold);">Edit in Storyblok →</a>\\\`;
      window.showToast('Product saved to Storyblok!');
    } catch (e) {
      btn.disabled = false; btn.textContent = '💾 Save to CMS';
      status.textContent = 'Error: ' + e.message;
      window.showToast('Save failed', 'error');
    }
  };

  window.editResult = async (i) => {
    // Save first, then open Storyblok
    await window.saveResult(i);
    window.open('https://app.storyblok.com', '_blank');
  };
})();<\/script>`])), renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "AI Product Generator", "subtitle": "Upload product photos and let Claude generate bilingual content", "data-astro-cid-dmpuadde": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="a-card" style="margin-bottom:20px;" data-astro-cid-dmpuadde> <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;" data-astro-cid-dmpuadde> ${[
    ["1", "📤", "Upload Images", "Drag & drop product photos"],
    ["2", "⚙️", "Set Options", "Choose category, price, badge"],
    ["3", "✨", "Generate", "Claude AI writes the content"],
    ["4", "💾", "Save to CMS", "One click to add to your store"]
  ].map(([num, icon, title, sub]) => renderTemplate`<div style="display:flex;align-items:flex-start;gap:10px;" data-astro-cid-dmpuadde> <div style="width:26px;height:26px;background:var(--gold);color:var(--walnut);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;flex-shrink:0;" data-astro-cid-dmpuadde>${num}</div> <div data-astro-cid-dmpuadde> <div style="font-weight:600;font-size:.85rem;color:var(--walnut);" data-astro-cid-dmpuadde>${icon} ${title}</div> <div style="font-size:.78rem;color:var(--muted);" data-astro-cid-dmpuadde>${sub}</div> </div> </div>`)} </div> </div>  <div class="a-card" style="margin-bottom:20px;" data-astro-cid-dmpuadde> <h3 style="font-size:.9rem;color:var(--walnut);margin-bottom:14px;" data-astro-cid-dmpuadde>Upload Product Images</h3> <div class="ai-upload-zone" id="aiDrop" data-astro-cid-dmpuadde> <div style="font-size:2rem;" data-astro-cid-dmpuadde>📷</div> <p style="margin-top:8px;" data-astro-cid-dmpuadde><strong data-astro-cid-dmpuadde>Drop images here</strong> or click to browse</p> <p style="font-size:.75rem;opacity:.6;margin-top:4px;" data-astro-cid-dmpuadde>JPG · PNG · WebP — up to 5 images</p> <input type="file" id="aiFileInput" accept="image/*" multiple style="display:none;" data-astro-cid-dmpuadde> </div> <div class="ai-prev-grid" id="aiPreviews" data-astro-cid-dmpuadde></div> <!-- Options --> <div id="aiOptions" style="display:none;margin-top:20px;" data-astro-cid-dmpuadde> <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;" data-astro-cid-dmpuadde> <div class="form-group" data-astro-cid-dmpuadde> <label class="form-label" data-astro-cid-dmpuadde>Category (optional override)</label> <select class="form-select" id="aiCat" data-astro-cid-dmpuadde> <option value="auto" data-astro-cid-dmpuadde>🤖 Auto-detect from image</option> ${categories.map((cat) => renderTemplate`<option${addAttribute(cat.slug, "value")} data-astro-cid-dmpuadde>${cat.nameAr} / ${cat.nameEn}</option>`)} </select> </div> <div class="form-group" data-astro-cid-dmpuadde> <label class="form-label" data-astro-cid-dmpuadde>Price (optional)</label> <input class="form-input" id="aiPrice" placeholder="١٥,٠٠٠" data-astro-cid-dmpuadde> </div> <div class="form-group" data-astro-cid-dmpuadde> <label class="form-label" data-astro-cid-dmpuadde>Badge</label> <select class="form-select" id="aiBadge" data-astro-cid-dmpuadde> <option value="" data-astro-cid-dmpuadde>No badge</option> <option value="new-" data-astro-cid-dmpuadde>New</option> <option value="sale" data-astro-cid-dmpuadde>Sale</option> <option value="top" data-astro-cid-dmpuadde>Best Seller</option> </select> </div> </div> <button class="btn-primary" id="aiGenerateBtn" style="margin-top:16px;" data-astro-cid-dmpuadde> <span id="aiSpinner" style="display:none;width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;" data-astro-cid-dmpuadde></span>
✨ Generate with AI
</button> </div> </div>  <div id="aiResults" style="display:none;" data-astro-cid-dmpuadde> <h3 style="font-size:1rem;color:var(--walnut);margin-bottom:16px;" id="aiResultTitle" data-astro-cid-dmpuadde>Generated Products</h3> <div id="aiResultsContainer" data-astro-cid-dmpuadde></div> </div> <div id="aiError" style="display:none;background:#fdf0f0;border:1px solid #f5c6c6;border-radius:6px;padding:12px 16px;color:#a33;font-size:.85rem;margin-top:12px;" data-astro-cid-dmpuadde></div> ` }), defineScriptVars({ categories, settings }));
}, "D:/Furniture/nukba/src/pages/admin/ai-generator.astro", void 0);

const $$file = "D:/Furniture/nukba/src/pages/admin/ai-generator.astro";
const $$url = "/admin/ai-generator";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AiGenerator,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
