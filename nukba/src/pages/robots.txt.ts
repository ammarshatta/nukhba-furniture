import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://shattafurniture.com';
  return new Response(
    `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /studio/
Disallow: /api/admin/
Disallow: /preview/

Sitemap: ${siteUrl}/sitemap.xml
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
};
