import type { APIRoute } from 'astro';

export const prerender = false;

const CLIENT_ID = 'Ov23liaz269sMqpDOK2c';
const CLIENT_SECRET = '4853ae967f06b30bb690d1cc37698b6e1094ee47';

export const GET: APIRoute = async ({ url, cookies }) => {
  try {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    const savedState = cookies.get('github_oauth_state')?.value;

    if (!code) {
      return new Response('Missing code', { status: 400 });
    }

    if (!state || state !== savedState) {
      return new Response('Invalid state', { status: 400 });
    }

    cookies.delete('github_oauth_state', { path: '/' });

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

    const text = await tokenRes.text();

    let tokenData;
    try {
      tokenData = JSON.parse(text);
    } catch {
      console.error('GitHub response not JSON:', text);
      return new Response('Invalid GitHub response', { status: 500 });
    }

    if (!tokenData.access_token) {
      return new Response(
        'No access token: ' + text,
        { status: 500 }
      );
    }

    cookies.set('github_token', tokenData.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    return new Response('Login successful ✅');
  } catch (err) {
    console.error('CALLBACK ERROR:', err);
    return new Response('Callback crashed', { status: 500 });
  }
};