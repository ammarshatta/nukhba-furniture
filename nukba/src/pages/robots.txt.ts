import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://nukhba.com';
  return new Response(
    `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/admin/

Sitemap: ${siteUrl}/sitemap.xml
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
};
