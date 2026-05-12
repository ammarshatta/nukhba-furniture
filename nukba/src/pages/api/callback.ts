// src/pages/api/callback.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url, locals }) => {
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing code', {
      status: 400,
    });
  }

  const clientId =
    locals.runtime?.env?.GITHUB_CLIENT_ID ??
    import.meta.env.GITHUB_CLIENT_ID;

  const clientSecret =
    locals.runtime?.env?.GITHUB_CLIENT_SECRET ??
    import.meta.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response('OAuth not configured', {
      status: 500,
    });
  }

  const response = await fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${url.origin}/api/callback`,
      }),
    },
  );

  const data = await response.json();

  return Response.json(data);
};