import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  // GitHub denied access
  if (error || !code) {
    return postMessageResponse('error', { error: error ?? 'access_denied' });
  }

  const clientId = import.meta.env.GITHUB_CLIENT_ID;
  const clientSecret = import.meta.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return postMessageResponse('error', { error: 'OAuth not configured on server' });
  }

  // Exchange code for access token
  let token: string;
  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
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
    });

    const data = await res.json() as { access_token?: string; error?: string };

    if (!data.access_token) {
      return postMessageResponse('error', { error: data.error ?? 'no_token' });
    }

    token = data.access_token;
  } catch (e) {
    return postMessageResponse('error', { error: 'token_exchange_failed' });
  }

  return postMessageResponse('success', { token, provider: 'github' });
};

/**
 * Returns an HTML page that posts a message to the opener window
 * (the Decap CMS tab) and then closes itself.
 * Decap CMS listens for: { token, provider } on success
 *                        { error }           on failure
 */
function postMessageResponse(status: 'success' | 'error', data: Record<string, string>) {
  const content = status === 'success'
    ? JSON.stringify({ token: data.token, provider: data.provider })
    : JSON.stringify({ error: data.error });

  // Decap CMS expects the message in the format:
  // "authorization:github:success:{"token":"...","provider":"github"}"
  // or
  // "authorization:github:error:{"error":"..."}"
  const message = `authorization:github:${status}:${content}`;

  const html = `<!doctype html>
<html>
<head><meta charset="utf-8"><title>Authenticating…</title></head>
<body>
<p style="font-family:sans-serif;text-align:center;margin-top:4rem;color:#555;">
  ${status === 'success' ? 'Authentication successful. This window will close.' : `Authentication failed: ${data.error}`}
</p>
<script>
  (function() {
    function receiveMessage(e) {
      window.opener.postMessage(${JSON.stringify(message)}, e.origin);
    }
    if (window.opener) {
      window.opener.postMessage(${JSON.stringify(message)}, '*');
      setTimeout(function() { window.close(); }, 1000);
    } else {
      // Fallback: opened directly, not as popup
      document.body.innerHTML = '<p style="font-family:sans-serif;text-align:center;margin-top:4rem;">You can close this window.</p>';
    }
  })();
</script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
