import type { APIRoute } from 'astro';

export const prerender = false;

const CLIENT_ID = 'Ov23liaz269sMqpDOK2c';

export const GET: APIRoute = ({ url, cookies }) => {
  try {
    const state = crypto.randomUUID();

    cookies.set('github_oauth_state', state, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    const callbackUrl = new URL('/api/callback', url.origin);

    const githubUrl = new URL(
      'https://github.com/login/oauth/authorize'
    );

    githubUrl.searchParams.set('client_id', CLIENT_ID);
    githubUrl.searchParams.set('redirect_uri', callbackUrl.toString());
    githubUrl.searchParams.set('scope', 'repo,user');
    githubUrl.searchParams.set('state', state);

    return Response.redirect(githubUrl.toString(), 302);
  } catch (err) {
    console.error('AUTH ERROR:', err);
    return new Response('Auth route crashed', { status: 500 });
  }
};