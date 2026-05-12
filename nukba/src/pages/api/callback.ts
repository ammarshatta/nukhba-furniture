import type { APIRoute } from 'astro';

export const prerender = false;

// ⚠️ TEMP TEST VALUE ONLY (replace later with env vars)
const CLIENT_ID = 'Ov23liaz269sMqpDOK2c';
const CLIENT_SECRET = 'YOUR_GITHUB_CLIENT_SECRET_HERE';

export const GET: APIRoute = async ({ url, cookies }) => {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const savedState = cookies.get('github_oauth_state')?.value;

  // 🔐 CSRF check
  if (!state || state !== savedState) {
    return new Response('Invalid OAuth state', { status: 400 });
  }

  cookies.delete('github_oauth_state', { path: '/' });

  if (!code) {
    return new Response('Missing code', { status: 400 });
  }

  // 🔁 Exchange code for token
  const tokenRes = await fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    }
  );

  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    return new Response(
      `Failed to get access token: ${JSON.stringify(tokenData)}`,
      { status: 500 }
    );
  }

  cookies.set('github_token', tokenData.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });

  return new Response('GitHub login successful ✅');
};