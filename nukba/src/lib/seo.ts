import type { CollectionEntry } from 'astro:content';

const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://nukhba.com';
const BRAND = 'Nukhba';
const BRAND_AR = 'نُخبة';
const WA_NUMBER = import.meta.env.PUBLIC_WA_NUMBER || '201234567890';
const INSTAGRAM = import.meta.env.PUBLIC_INSTAGRAM_URL || 'https://instagram.com/nukhba.eg';

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND,
    alternateName: [BRAND_AR, 'Nukhba Furniture', 'نُخبة للأثاث'],
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    sameAs: [INSTAGRAM, `https://wa.me/${WA_NUMBER}`],
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
    name: `${BRAND} Luxury Furniture`,
    alternateName: `${BRAND_AR} للأثاث الفاخر`,
    description: "Egypt's premier luxury furniture brand. Premium modern furniture for bedrooms, living rooms, dining rooms and offices.",
    url: SITE_URL,
    telephone: `+${WA_NUMBER}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cairo',
      addressCountry: 'EG',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 30.0444, longitude: 31.2357 },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '10:00',
      closes: '22:00',
    },
    priceRange: 'EGP 5,000 – EGP 150,000',
    sameAs: [INSTAGRAM],
  };
}

export function buildProductSchema(product: CollectionEntry<'products'>) {
  const d = product.data;
  const url = `${SITE_URL}/products/${d.slug}`;
  return {
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

export function buildSitemapXml(
  productSlugs: string[],
  categorySlugs: string[],
  blogSlugs: string[],
  locationSlugs: string[],
  baseUrl: string,
): string {
  const now = new Date().toISOString().split('T')[0];
  const staticPages = [
    { url: baseUrl, p: '1.0', f: 'daily' },
    { url: `${baseUrl}/products`, p: '0.9', f: 'daily' },
    { url: `${baseUrl}/collections`, p: '0.9', f: 'weekly' },
    { url: `${baseUrl}/blog`, p: '0.8', f: 'weekly' },
    { url: `${baseUrl}/about`, p: '0.7', f: 'monthly' },
    { url: `${baseUrl}/contact`, p: '0.7', f: 'monthly' },
    { url: `${baseUrl}/faq`, p: '0.7', f: 'monthly' },
    { url: `${baseUrl}/locations`, p: '0.8', f: 'monthly' },
    { url: `${baseUrl}/ar`, p: '0.9', f: 'daily' },
  ];
  const all = [
    ...staticPages,
    ...productSlugs.map(s => ({ url: `${baseUrl}/products/${s}`, p: '0.8', f: 'weekly' })),
    ...categorySlugs.map(s => ({ url: `${baseUrl}/collections/${s}`, p: '0.8', f: 'weekly' })),
    ...blogSlugs.map(s => ({ url: `${baseUrl}/blog/${s}`, p: '0.7', f: 'monthly' })),
    ...locationSlugs.map(s => ({ url: `${baseUrl}/locations/${s}`, p: '0.7', f: 'monthly' })),
  ];
  const urls = all.map(({ url, p, f }) => `
  <url><loc>${url}</loc><lastmod>${now}</lastmod><changefreq>${f}</changefreq><priority>${p}</priority></url>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}\n</urlset>`;
}
