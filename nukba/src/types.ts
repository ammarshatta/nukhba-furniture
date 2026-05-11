// ─── App types ────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  category: string;
  price: string;
  badge: '' | 'new-' | 'sale' | 'top';
  images: string[];
  waNumber?: string;
  waTextAr: string;
  waTextEn: string;
  createdAt: string;
  active: boolean;
}

export interface Category {
  slug: string;
  nameAr: string;
  nameEn: string;
  image: string;
  order: number;
}

export interface Settings {
  waNumber: string;
  siteTitleAr: string;
  siteTitleEn: string;
}

export interface TrackingToken {
  token: string;
  label: string;
  hits: number;
  createdAt: string;
}

export interface SettingsBlob {
  settings: Settings;
  tokens: TrackingToken[];
}

// ─── Storyblok content shapes ─────────────────────────────────────────────────

export interface SbAsset {
  filename: string;
  alt?: string;
}

export interface SbProductContent {
  name_ar: string;
  name_en: string;
  desc_ar: string;
  desc_en: string;
  category: string;
  price: string;
  badge: '' | 'new-' | 'sale' | 'top';
  images: SbAsset[];
  wa_number?: string;
  wa_text_ar: string;
  wa_text_en: string;
  active: boolean;
}

export interface SbCategoryContent {
  name_ar: string;
  name_en: string;
  image: SbAsset;
  order: number;
}

export interface SbStory<T> {
  id: number;
  uuid: string;
  slug: string;
  full_slug: string;
  created_at: string;
  published_at: string | null;
  content: T;
}

// ─── Mapper functions ──────────────────────────────────────────────────────────

export function storyToProduct(story: SbStory<SbProductContent>): Product {
  const c = story.content;
  return {
    id: story.uuid,
    slug: story.slug,
    nameAr: c.name_ar ?? '',
    nameEn: c.name_en ?? '',
    descAr: c.desc_ar ?? '',
    descEn: c.desc_en ?? '',
    category: c.category ?? '',
    price: c.price ?? '',
    badge: c.badge ?? '',
    images: (c.images ?? []).map((img) => (typeof img === 'string' ? img : img.filename)).filter(Boolean),
    waNumber: c.wa_number || undefined,
    waTextAr: c.wa_text_ar ?? '',
    waTextEn: c.wa_text_en ?? '',
    createdAt: story.created_at,
    active: c.active !== false,
  };
}

export function storyToCategory(story: SbStory<SbCategoryContent>): Category {
  const c = story.content;
  return {
    slug: story.slug,
    nameAr: c.name_ar ?? '',
    nameEn: c.name_en ?? '',
    image: typeof c.image === 'string' ? c.image : (c.image?.filename ?? ''),
    order: c.order ?? 0,
  };
}
