import type { APIRoute } from 'astro';
import { createSessionToken, setSessionCookie } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const password = form.get('password')?.toString() ?? '';

  if (password !== import.meta.env.ADMIN_PASSWORD) {
    return new Response(null, {
      status: 302,
      headers: { Location: '/admin/login?error=1' },
    });
  }

  const token = await createSessionToken();
  setSessionCookie(cookies, token);

  return new Response(null, {
    status: 302,
    headers: { Location: '/admin' },
  });
};
