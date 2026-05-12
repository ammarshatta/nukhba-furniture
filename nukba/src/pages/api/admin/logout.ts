import type { APIRoute } from 'astro';
import { clearSessionCookie } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = ({ cookies }) => {
  clearSessionCookie(cookies);

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/admin/login',
    },
  });
};