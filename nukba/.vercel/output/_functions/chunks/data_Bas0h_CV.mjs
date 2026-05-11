import { put, list } from '@vercel/blob';
import { v4 } from 'uuid';

const PRODUCTS_KEY = "nukba/products.json";
const CATEGORIES_KEY = "nukba/categories.json";
const SETTINGS_KEY = "nukba/settings.json";
const DEFAULT_SETTINGS = {
  settings: {
    waNumber: "201112007555",
    siteTitleAr: "نُخبة للأثاث الفاخر",
    siteTitleEn: "Nukba Luxury Furniture"
  },
  tokens: []
};
const DEFAULT_CATEGORIES = [
  { slug: "bed", nameAr: "غرف نوم", nameEn: "Bedrooms", image: "", order: 1 },
  { slug: "liv", nameAr: "أنتريهات وصالونات", nameEn: "Living Rooms", image: "", order: 2 },
  { slug: "din", nameAr: "غرف سفرة", nameEn: "Dining Rooms", image: "", order: 3 },
  { slug: "sof", nameAr: "ركنات", nameEn: "Sofas", image: "", order: 4 },
  { slug: "kit", nameAr: "مطابخ", nameEn: "Kitchens", image: "", order: 5 },
  { slug: "dec", nameAr: "ديكور وإكسسوار", nameEn: "Decor & Accessories", image: "", order: 6 }
];
const cache = /* @__PURE__ */ new Map();
async function readBlob(key, fallback) {
  if (cache.has(key)) return cache.get(key).data;
  try {
    const { blobs } = await list({ prefix: key });
    if (!blobs.length) return fallback;
    const url = blobs[0].url;
    const res = await fetch(url);
    if (!res.ok) return fallback;
    const data = await res.json();
    cache.set(key, { url, data });
    return data;
  } catch {
    return fallback;
  }
}
async function writeBlob(key, data) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const result = await put(key, blob, { access: "public", allowOverwrite: true });
  cache.set(key, { url: result.url, data });
}
async function getProducts() {
  return readBlob(PRODUCTS_KEY, []);
}
async function getProduct(id) {
  const all = await getProducts();
  return all.find((p) => p.id === id) ?? null;
}
async function getProductBySlug(slug) {
  const all = await getProducts();
  return all.find((p) => p.slug === slug && p.active) ?? null;
}
async function saveProducts(products) {
  await writeBlob(PRODUCTS_KEY, products);
}
async function createProduct(data) {
  const product = { ...data, id: v4(), createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  const all = await getProducts();
  await saveProducts([...all, product]);
  return product;
}
async function updateProduct(id, data) {
  const all = await getProducts();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Product not found");
  const updated = { ...all[idx], ...data };
  all[idx] = updated;
  await saveProducts(all);
  return updated;
}
async function deleteProduct(id) {
  const all = await getProducts();
  await saveProducts(all.filter((p) => p.id !== id));
}
async function getCategories() {
  const cats = await readBlob(CATEGORIES_KEY, DEFAULT_CATEGORIES);
  return cats.sort((a, b) => a.order - b.order);
}
async function getCategory(slug) {
  const all = await getCategories();
  return all.find((c) => c.slug === slug) ?? null;
}
async function saveCategories(categories) {
  await writeBlob(CATEGORIES_KEY, categories);
}
async function createCategory(data) {
  const all = await getCategories();
  if (all.find((c) => c.slug === data.slug)) throw new Error("Slug already exists");
  await saveCategories([...all, data]);
  return data;
}
async function updateCategory(slug, data) {
  const all = await getCategories();
  const idx = all.findIndex((c) => c.slug === slug);
  if (idx === -1) throw new Error("Category not found");
  const updated = { ...all[idx], ...data };
  all[idx] = updated;
  await saveCategories(all);
  return updated;
}
async function deleteCategory(slug) {
  const all = await getCategories();
  await saveCategories(all.filter((c) => c.slug !== slug));
}
async function getSettingsBlob() {
  return readBlob(SETTINGS_KEY, DEFAULT_SETTINGS);
}
async function getSettings() {
  const blob = await getSettingsBlob();
  return blob.settings;
}
async function saveSettings(settings) {
  const blob = await getSettingsBlob();
  await writeBlob(SETTINGS_KEY, { ...blob, settings });
}
async function getTokens() {
  const blob = await getSettingsBlob();
  return blob.tokens;
}
async function saveTokens(tokens) {
  const blob = await getSettingsBlob();
  await writeBlob(SETTINGS_KEY, { ...blob, tokens });
}
async function incrementTokenHits(token) {
  const blob = await getSettingsBlob();
  const tokens = blob.tokens.map(
    (t) => t.token === token ? { ...t, hits: (t.hits ?? 0) + 1 } : t
  );
  await writeBlob(SETTINGS_KEY, { ...blob, tokens });
}

export { createCategory, createProduct, deleteCategory, deleteProduct, getCategories, getCategory, getProduct, getProductBySlug, getProducts, getSettings, getSettingsBlob, getTokens, incrementTokenHits, saveCategories, saveProducts, saveSettings, saveTokens, updateCategory, updateProduct };
