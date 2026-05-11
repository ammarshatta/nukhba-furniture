import StoryblokClient from 'storyblok-js-client';

function storyToProduct(story) {
  const c = story.content;
  return {
    id: story.uuid,
    slug: story.slug,
    nameAr: c.name_ar ?? "",
    nameEn: c.name_en ?? "",
    descAr: c.desc_ar ?? "",
    descEn: c.desc_en ?? "",
    category: c.category ?? "",
    price: c.price ?? "",
    badge: c.badge ?? "",
    images: (c.images ?? []).map((img) => typeof img === "string" ? img : img.filename).filter(Boolean),
    waNumber: c.wa_number || void 0,
    waTextAr: c.wa_text_ar ?? "",
    waTextEn: c.wa_text_en ?? "",
    createdAt: story.created_at,
    active: c.active !== false
  };
}
function storyToCategory(story) {
  const c = story.content;
  return {
    slug: story.slug,
    nameAr: c.name_ar ?? "",
    nameEn: c.name_en ?? "",
    image: typeof c.image === "string" ? c.image : c.image?.filename ?? "",
    order: c.order ?? 0
  };
}

function getClient() {
  return new StoryblokClient({
    accessToken: "your-preview-token",
    region: ""
  });
}
function getMgmtClient() {
  return new StoryblokClient({
    oauthToken: "your-management-token",
    region: ""
  });
}
const spaceId = () => "your-space-id";
async function getProducts() {
  try {
    const sb = getClient();
    const res = await sb.get("cdn/stories", {
      starts_with: "products/",
      content_type: "product",
      version: "published",
      per_page: 100
    });
    return res.data.stories.map(storyToProduct).filter((p) => p.active);
  } catch {
    return [];
  }
}
async function getProductBySlug(slug) {
  try {
    const sb = getClient();
    const res = await sb.get(`cdn/stories/products/${slug}`, {
      version: "published"
    });
    return storyToProduct(res.data.story);
  } catch {
    return null;
  }
}
async function getCategories() {
  try {
    const sb = getClient();
    const res = await sb.get("cdn/stories", {
      starts_with: "categories/",
      content_type: "category",
      version: "published",
      per_page: 100
    });
    const cats = res.data.stories.map(storyToCategory);
    return cats.sort((a, b) => a.order - b.order);
  } catch {
    return [];
  }
}
async function getCategoryBySlug(slug) {
  try {
    const sb = getClient();
    const res = await sb.get(`cdn/stories/categories/${slug}`, {
      version: "published"
    });
    return storyToCategory(res.data.story);
  } catch {
    return null;
  }
}
async function createProductStory(input) {
  const sb = getMgmtClient();
  const id = spaceId();
  const res = await sb.post(`spaces/${id}/stories`, {
    story: {
      name: input.nameEn || input.nameAr,
      slug: input.slug,
      parent_id: 0,
      path: `products/${input.slug}`,
      content: {
        component: "product",
        name_ar: input.nameAr,
        name_en: input.nameEn,
        desc_ar: input.descAr,
        desc_en: input.descEn,
        category: input.category,
        price: input.price,
        badge: input.badge,
        images: input.imageUrl ? [{ filename: input.imageUrl, alt: input.nameEn }] : [],
        wa_number: input.waNumber ?? "",
        wa_text_ar: input.waTextAr,
        wa_text_en: input.waTextEn,
        active: true
      }
    },
    publish: 1
  });
  return { slug: res.data.story.slug };
}
async function uploadAssetToStoryblok(filename, fileData, mimeType) {
  const sb = getMgmtClient();
  const id = spaceId();
  const signRes = await sb.post(`spaces/${id}/assets`, {
    filename,
    size: fileData.byteLength,
    content_type: mimeType
  });
  const { post_url, fields, id: assetId } = signRes.data;
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    form.append(key, value);
  }
  form.append("file", new Blob([fileData], { type: mimeType }), filename);
  const uploadRes = await fetch(post_url, { method: "POST", body: form });
  if (!uploadRes.ok) {
    const text = await uploadRes.text();
    throw new Error(`S3 upload failed: ${uploadRes.status} ${text}`);
  }
  await sb.get(`spaces/${id}/assets/${assetId}/finish_upload`);
  return signRes.data.pretty_url;
}

export { getProducts as a, getCategoryBySlug as b, createProductStory as c, getProductBySlug as d, getCategories as g, uploadAssetToStoryblok as u };
