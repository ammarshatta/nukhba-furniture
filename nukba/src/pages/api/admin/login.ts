import type { APIRoute } from 'astro';
import { createSessionToken, setSessionCookie } from '../../../lib/auth';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const form = await request.formData();
  const password = form.get('password')?.toString() ?? '';

  const adminPassword = env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return new Response('ADMIN_PASSWORD not configured', {
      status: 500,
    });
  }

  if (password !== adminPassword) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/studio/login?error=1',
      },
    });
  }

  const token = await createSessionToken();
  setSessionCookie(cookies, token);

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/studio',
    },
  });
};