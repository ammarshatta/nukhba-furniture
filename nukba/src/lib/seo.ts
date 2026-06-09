import type { CollectionEntry } from 'astro:content';

const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://shattafurniture.com';
const BRAND = 'Shatta Furniture';
const BRAND_AR = 'شطا';
const WA_NUMBER = import.meta.env.PUBLIC_WA_NUMBER || '201112007555';
const INSTAGRAM = import.meta.env.PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/shatta_furniture';
const FACEBOOK = import.meta.env.PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/citymodern';

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND,
    alternateName: [BRAND_AR, 'Shatta Furniture', 'شطا للأثاث'],
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    sameAs: [INSTAGRAM, FACEBOOK, `https://wa.me/${WA_NUMBER}`],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Arabic', 'English'],
    },
    areaServed: ['Egypt', 'Saudi Arabia', 'UAE', 'Middle East'],
    knowsAbout: ['Luxury Furniture', 'Modern Furniture', 'Custom Furniture', 'أثاث فاخر', 'أثاث مودرن'],
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: `${BRAND} — Luxury Furniture Egypt`,
    url: SITE_URL,
    description: 'Premium luxury furniture brand in Egypt. Modern European-inspired designs.',
    inLanguage: ['en', 'ar'],
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/products?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildFurnitureStoreSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['FurnitureStore', 'LocalBusiness'],
    '@id': `${SITE_URL}/#store`,
    name: BRAND,
    alternateName: `${BRAND_AR} للأثاث الفاخر`,
    description: "Egypt's premier luxury furniture brand. Premium modern furniture for bedrooms, living rooms, dining rooms and offices.",
    url: SITE_URL,
    telephone: `+${WA_NUMBER}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Damietta',
      addressRegion: 'Damietta',
      addressCountry: 'EG',
    },
    hasMap: 'https://maps.app.goo.gl/k2mEkseUowytqMVb8',
    geo: { '@type': 'GeoCoordinates', latitude: 31.4165, longitude: 31.8133 },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '10:00',
      closes: '22:00',
    },
    priceRange: 'EGP 5,000 – EGP 150,000',
    sameAs: [INSTAGRAM, FACEBOOK],
  };
}

export function buildProductSchema(
  product: CollectionEntry<'products'>,
  lang: 'en' | 'ar' = 'ar',
) {
  const d = product.data;
  // Language-aware canonical: English lives under /en, Arabic at the root.
  const url = lang === 'en'
    ? `${SITE_URL}/en/products/${d.slug}`
    : `${SITE_URL}/products/${d.slug}`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: d.title,
    alternateName: d.titleAr,
    description: d.excerpt,
    sku: d.slug,
    brand: { '@type': 'Brand', name: BRAND },
    material: d.materials.join(', '),
    image: d.images.map(img => img.startsWith('http') ? img : `${SITE_URL}${img}`),
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: d.currency || 'EGP',
      price: d.priceValue,
      priceValidUntil: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': `${SITE_URL}/#organization` },
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Width', value: `${d.dimensions.width}${d.dimensions.unit}` },
      { '@type': 'PropertyValue', name: 'Depth', value: `${d.dimensions.depth}${d.dimensions.unit}` },
      { '@type': 'PropertyValue', name: 'Height', value: `${d.dimensions.height}${d.dimensions.unit}` },
    ],
  };

  // Review / AggregateRating — emitted ONLY when real review data exists.
  // Never fabricate ratings: fake reviews violate Google's guidelines.
  const reviews = d.reviews ?? [];
  if (d.rating && d.reviewCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: d.rating,
      reviewCount: d.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }
  if (reviews.length > 0) {
    schema.review = reviews.map(r => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      datePublished: r.date,
      reviewRating: { '@type': 'Rating', ratingValue: r.stars, bestRating: 5, worstRating: 1 },
      reviewBody: r.text,
    }));
  }

  return schema;
}

export function buildCollectionPageSchema(
  category: CollectionEntry<'categories'>,
  products: CollectionEntry<'products'>[],
) {
  const url = `${SITE_URL}/collections/${category.data.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.data.name} — ${BRAND}`,
    description: category.data.description,
    url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.slice(0, 10).map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/products/${p.data.slug}`,
        name: p.data.title,
      })),
    },
  };
}

/**
 * Schema for a programmatic category × governorate landing page.
 * Returns [CollectionPage, LocalBusiness] — the LocalBusiness narrows
 * areaServed to the specific governorate so Google reads it as a local page.
 */
export function buildGovernorateLandingSchema(opts: {
  categoryName: string;
  governorateNameEn: string;
  governorateNameAr: string;
  url: string;
  products: CollectionEntry<'products'>[];
  lang: 'en' | 'ar';
}) {
  const { categoryName, governorateNameEn, governorateNameAr, url, products, lang } = opts;
  const productUrl = (slug: string) =>
    lang === 'en' ? `${SITE_URL}/en/products/${slug}` : `${SITE_URL}/products/${slug}`;

  const collectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: lang === 'ar'
      ? `${categoryName} في ${governorateNameAr}`
      : `${categoryName} in ${governorateNameEn}`,
    url,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.slice(0, 20).map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: productUrl(p.data.slug),
        name: lang === 'ar' ? (p.data.titleAr || p.data.title) : p.data.title,
      })),
    },
  };

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['FurnitureStore', 'LocalBusiness'],
    name: `${BRAND} — ${governorateNameEn}`,
    alternateName: `${BRAND_AR} — ${governorateNameAr}`,
    url,
    telephone: `+${WA_NUMBER}`,
    priceRange: 'EGP 5,000 – EGP 150,000',
    address: { '@type': 'PostalAddress', addressRegion: governorateNameEn, addressCountry: 'EG' },
    areaServed: { '@type': 'AdministrativeArea', name: governorateNameEn },
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
  };

  return [collectionPage, localBusiness];
}

export function buildArticleSchema(post: CollectionEntry<'blog'>) {
  const d = post.data;
  const url = `${SITE_URL}/blog/${d.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: d.title,
    description: d.excerpt,
    image: d.coverImage.startsWith('http') ? d.coverImage : `${SITE_URL}${d.coverImage}`,
    url,
    datePublished: d.publishDate.toISOString(),
    dateModified: (d.updatedDate ?? d.publishDate).toISOString(),
    author: { '@type': 'Organization', name: d.author, '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    articleSection: d.category,
    keywords: d.tags.join(', '),
    mainEntityOfPage: url,
  };
}

export function buildFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildLocalBusinessSchema(location: CollectionEntry<'locations'>) {
  const d = location.data;
  return {
    '@context': 'https://schema.org',
    '@type': ['FurnitureStore', 'LocalBusiness'],
    name: `${BRAND} — ${d.area}`,
    alternateName: d.nameAr,
    url: `${SITE_URL}/locations/${d.slug}`,
    telephone: `+${d.phone.replace(/\D/g, '')}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: d.address,
      addressLocality: d.city,
      addressCountry: 'EG',
    },
    openingHours: d.hours,
    hasMap: d.googleMapsUrl,
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
  };
}

/**
 * A sitemap entry as a bilingual pair. `ar` is the Arabic (root) path and `en`
 * is the English (/en) path — both relative to baseUrl, starting with '/'.
 * Each pair emits two <url> blocks cross-linked with hreflang alternates so
 * Google understands the language relationship (requires ABSOLUTE URLs).
 */
export interface SitemapPair {
  ar: string;
  en: string;
  p: string;
  f: string;
}

export function buildSitemapXml(
  productSlugs: string[],
  categorySlugs: string[],
  blogSlugs: string[],
  locationSlugs: string[],
  baseUrl: string,
  /** Extra programmatic pairs, e.g. category×governorate landing pages. */
  extraPairs: SitemapPair[] = [],
): string {
  const now = new Date().toISOString().split('T')[0];

  const pairs: SitemapPair[] = [
    { ar: '/', en: '/en', p: '1.0', f: 'daily' },
    { ar: '/products', en: '/en/products', p: '0.9', f: 'daily' },
    { ar: '/collections', en: '/en/collections', p: '0.9', f: 'weekly' },
    { ar: '/blog', en: '/en/blog', p: '0.8', f: 'weekly' },
    { ar: '/locations', en: '/en/locations', p: '0.8', f: 'monthly' },
    { ar: '/about', en: '/en/about', p: '0.7', f: 'monthly' },
    { ar: '/contact', en: '/en/contact', p: '0.7', f: 'monthly' },
    { ar: '/faq', en: '/en/faq', p: '0.7', f: 'monthly' },
    ...productSlugs.map(s => ({ ar: `/products/${s}`, en: `/en/products/${s}`, p: '0.8', f: 'weekly' })),
    ...categorySlugs.map(s => ({ ar: `/collections/${s}`, en: `/en/collections/${s}`, p: '0.8', f: 'weekly' })),
    ...blogSlugs.map(s => ({ ar: `/blog/${s}`, en: `/en/blog/${s}`, p: '0.7', f: 'monthly' })),
    ...locationSlugs.map(s => ({ ar: `/locations/${s}`, en: `/en/locations/${s}`, p: '0.7', f: 'monthly' })),
    ...extraPairs,
  ];

  const abs = (path: string) => (path === '/' ? `${baseUrl}/` : `${baseUrl}${path}`);

  // Each bilingual pair becomes two <url> entries, both carrying the same set
  // of hreflang alternates. x-default always resolves to the Arabic (root) URL.
  const entry = (self: string, ar: string, en: string, p: string, f: string) => `
  <url>
    <loc>${abs(self)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${f}</changefreq>
    <priority>${p}</priority>
    <xhtml:link rel="alternate" hreflang="ar" href="${abs(ar)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${abs(en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(ar)}"/>
  </url>`;

  const urls = pairs
    .map(({ ar, en, p, f }) => entry(ar, ar, en, p, f) + entry(en, ar, en, p, f))
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}\n</urlset>`;
}
