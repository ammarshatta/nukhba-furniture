import type { APIRoute } from 'astro';

// TODO: reconnect to new admin flow — re-implement token hit tracking with new data store

export const GET: APIRoute = async () => {
  // Return 1x1 transparent GIF
  const gif = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
  return new Response(gif, { headers: { 'Content-Type': 'image/gif', 'Cache-Control': 'no-cache' } });
};
