import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildSitemapXml, type SitemapPair } from '../lib/seo';
import { GOVERNORATES } from '../lib/governorates';
import { isLandingIndexable } from '../lib/landings';

// Must match MIN_PRODUCTS_FOR_INDEX in the landing-page routes.
const MIN_PRODUCTS_FOR_INDEX = 1;

export const GET: APIRoute = async () => {
  const [products, categories, blog, locations, landings] = await Promise.all([
    getCollection('products', p => p.data.active),
    getCollection('categories'),
    getCollection('blog'),
    getCollection('locations'),
    getCollection('landings'),
  ]);

  const baseUrl = import.meta.env.PUBLIC_SITE_URL || 'https://shattafurniture.com';

  // Programmatic category × governorate pairs — only included when the category
  // has enough products to make the page indexable (avoids thin-content URLs).
  const countByCategory = new Map<string, number>();
  for (const p of products) {
    countByCategory.set(p.data.category, (countByCategory.get(p.data.category) ?? 0) + 1);
  }
  const govPairs: SitemapPair[] = [];
  for (const cat of categories) {
    const count = countByCategory.get(cat.data.slug) ?? 0;
    if (count < MIN_PRODUCTS_FOR_INDEX) continue;
    for (const gov of GOVERNORATES) {
      govPairs.push({
        ar: `/collections/${cat.data.slug}/${gov.slug}`,
        en: `/en/collections/${cat.data.slug}/${gov.slug}`,
        p: '0.6',
        f: 'weekly',
      });
    }
  }

  // SEO landing pages (clean root URLs) — only indexable ones (≥ threshold of
  // real products) are listed, so thin-content pages stay out of the sitemap.
  const landingPairs: SitemapPair[] = landings
    .filter(l => isLandingIndexable(l, products))
    .map(l => ({
      ar: `/${l.data.slug}`,
      en: `/en/${l.data.slug}`,
      p: '0.8',
      f: 'weekly',
    }));

  const xml = buildSitemapXml(
    products.map(p => p.data.slug),
    categories.map(c => c.data.slug),
    blog.map(b => b.data.slug),
    locations.map(l => l.data.slug),
    baseUrl,
    [...govPairs, ...landingPairs],
  );

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
