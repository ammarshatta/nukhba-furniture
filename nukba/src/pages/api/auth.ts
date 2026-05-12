import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = ({ url, locals }) => {
  const clientId =
    import.meta.env.GITHUB_CLIENT_ID ||
    locals.runtime?.env?.GITHUB_CLIENT_ID || 'Ov23liaz269sMqpDOK2c';

  if (!clientId) {
    return new Response('GITHUB_CLIENT_ID not configured', {
      status: 500,
    });
  }

  const callbackUrl = `${url.origin}/api/callback`;

  const githubAuthUrl = new URL(
    'https://github.com/login/oauth/authorize',
  );

  githubAuthUrl.searchParams.set('client_id', clientId);
  githubAuthUrl.searchParams.set('redirect_uri', callbackUrl);
  githubAuthUrl.searchParams.set('scope', 'repo,user');

  return Response.redirect(githubAuthUrl.toString(), 302);
};