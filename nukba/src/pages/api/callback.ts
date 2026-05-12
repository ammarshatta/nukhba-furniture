import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ url, locals }) => {
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error || !code) {
    return postMessageResponse('error', {
      error: error ?? 'access_denied',
    });
  }

  const clientId =
    import.meta.env.GITHUB_CLIENT_ID ||
    locals.runtime?.env?.GITHUB_CLIENT_ID;

  const clientSecret =
    import.meta.env.GITHUB_CLIENT_SECRET ||
    locals.runtime?.env?.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return postMessageResponse('error', {
      error: 'OAuth not configured',
    });
  }

  try {
    const res = await fetch(
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

    const data = await res.json() as {
      access_token?: string;
      error?: string;
    };

    if (!data.access_token) {
      return postMessageResponse('error', {
        error: data.error ?? 'no_token',
      });
    }

    return postMessageResponse('success', {
      token: data.access_token,
      provider: 'github',
    });
  } catch {
    return postMessageResponse('error', {
      error: 'token_exchange_failed',
    });
  }
};

function postMessageResponse(
  status: 'success' | 'error',
  data: Record<string, string>,
) {
  const content =
    status === 'success'
      ? JSON.stringify({
          token: data.token,
          provider: data.provider,
        })
      : JSON.stringify({
          error: data.error,
        });

  const message = `authorization:github:${status}:${content}`;

  return new Response(
    `<!doctype html>
<html>
<body>
<script>
  window.opener?.postMessage(${JSON.stringify(message)}, '*');
  window.close();
</script>
</body>
</html>`,
    {
      headers: { 'Content-Type': 'text/html' },
    },
  );
}