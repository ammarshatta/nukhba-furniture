import type { APIRoute } from 'astro';

export const prerender = false;

// CLIENT_ID is a public value — fine to keep as fallback
const FALLBACK_CLIENT_ID = 'Ov23liaz269sMqpDOK2c';

export const GET: APIRoute = ({ url, cookies, locals }) => {
  try {
    const CLIENT_ID =
      locals.runtime?.env?.GITHUB_CLIENT_ID ||
      import.meta.env.GITHUB_CLIENT_ID ||
      FALLBACK_CLIENT_ID;

    const state = crypto.randomUUID();

    cookies.set('github_oauth_state', state, {
      httpOnly: true,
      secure: url.protocol === 'https:',
      sameSite: 'lax',
      path: '/',
    });

    const callbackUrl = new URL('/api/callback', url.origin);

    const githubUrl = new URL('https://github.com/login/oauth/authorize');
    githubUrl.searchParams.set('client_id', CLIENT_ID);
    githubUrl.searchParams.set('redirect_uri', callbackUrl.toString());
    githubUrl.searchParams.set('scope', 'repo,user');
    githubUrl.searchParams.set('state', state);

    // Use explicit headers instead of Response.redirect() — more compatible with
    // Cloudflare Pages edge runtime where Response.redirect() can throw.
    return new Response(null, {
      status: 302,
      headers: { Location: githubUrl.toString() },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('AUTH ERROR:', message);
    return new Response(`Auth error: ${message}`, { status: 500 });
  }
};