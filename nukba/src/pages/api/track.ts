import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

// 1x1 transparent GIF
const gif = Uint8Array.from(
  atob('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'),
  (c) => c.charCodeAt(0),
);

const gifResponse = () =>
  new Response(gif, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-cache, no-store, max-age=0',
    },
  });

// Email-open pixel. Embed in outreach emails:
//   <img src="https://shattafurniture.com/api/track?cid=..&seg=..&campaign=..">
// When GA4_MP_SECRET is configured, the open is logged to GA4 via the
// Measurement Protocol as an `email_open` event. Always returns the 1x1 GIF.
// NOTE: email-open tracking is unreliable (Apple Mail Privacy pre-fetch, Gmail
// image proxy) — treat the link click + session as the real signal.
export const GET: APIRoute = async ({ url }) => {
  try {
    const secret = env.GA4_MP_SECRET;
    const measurementId = env.PUBLIC_GA4_ID || 'G-XBFR0B2XBK';
    const cid = url.searchParams.get('cid') || undefined;

    if (secret && cid) {
      const body = {
        client_id: cid,
        events: [
          {
            name: 'email_open',
            params: {
              campaign: url.searchParams.get('campaign') || '(none)',
              segment: url.searchParams.get('seg') || '(none)',
              recipient: cid,
              channel: 'email',
            },
          },
        ],
      };
      await fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(secret)}`,
        { method: 'POST', body: JSON.stringify(body) },
      ).catch(() => {});
    }
  } catch {
    /* never let tracking break the pixel */
  }

  return gifResponse();
};
