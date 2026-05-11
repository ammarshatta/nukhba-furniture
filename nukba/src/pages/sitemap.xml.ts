import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildSitemapXml } from '../lib/seo';

export const GET: APIRoute = async () => {
  const [products, categories, blog, locations] = await Promise.all([
    getCollection('products', p => p.data.active),
    getCollection('categories'),
    getCollection('blog'),
    getCollection('locations'),
  ]);

  const baseUrl = import.meta.env.PUBLIC_SITE_URL || 'https://nukhba.com';
  const xml = buildSitemapXml(
    products.map(p => p.data.slug),
    categories.map(c => c.data.slug),
    blog.map(b => b.data.slug),
    locations.map(l => l.data.slug),
    baseUrl,
  );

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
