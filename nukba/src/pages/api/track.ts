import type { APIRoute } from 'astro';

export const prerender = false;

// 1x1 transparent GIF
const gif = Uint8Array.from(
  atob('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'),
  (c) => c.charCodeAt(0),
);

export const GET: APIRoute = async () => {
  return new Response(gif, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-cache, no-store, max-age=0',
    },
  });
};