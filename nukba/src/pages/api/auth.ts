import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ url }) => {
  const clientId = import.meta.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new Response('GITHUB_CLIENT_ID not configured', { status: 500 });
  }

  const callbackUrl = `${url.origin}/api/callback`;
  const scope = 'repo,user';

  // Pass the provider in state so the callback knows what to do
  const state = btoa(JSON.stringify({ provider: 'github' }));

  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', clientId);
  githubAuthUrl.searchParams.set('redirect_uri', callbackUrl);
  githubAuthUrl.searchParams.set('scope', scope);
  githubAuthUrl.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: { Location: githubAuthUrl.toString() },
  });
};
