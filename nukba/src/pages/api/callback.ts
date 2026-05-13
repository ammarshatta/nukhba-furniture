import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ url, cookies, locals }) => {
  try {
    const CLIENT_ID =
      import.meta.env.GITHUB_CLIENT_ID ||
      locals.runtime?.env?.GITHUB_CLIENT_ID;

    const CLIENT_SECRET =
      import.meta.env.GITHUB_CLIENT_SECRET ||
      locals.runtime?.env?.GITHUB_CLIENT_SECRET;

    if (!CLIENT_ID || !CLIENT_SECRET) {
      return new Response('GitHub OAuth not configured', { status: 500 });
    }

    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const savedState = cookies.get('github_oauth_state')?.value;

    if (!code) {
      return errorPage('Missing code from GitHub');
    }

    if (!state || state !== savedState) {
      return errorPage('Invalid state — possible CSRF');
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
        body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
      }
    );

    const text = await tokenRes.text();

    let tokenData: { access_token?: string };
    try {
      tokenData = JSON.parse(text);
    } catch {
      console.error('GitHub response not JSON:', text);
      return errorPage('Invalid response from GitHub');
    }

    if (!tokenData.access_token) {
      console.error('No access_token in response:', text);
      return errorPage('GitHub did not return an access token');
    }

    // Return an HTML page that posts the token back to the Decap CMS popup opener
    return new Response(successPage(tokenData.access_token), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    console.error('CALLBACK ERROR:', err);
    return errorPage('OAuth callback crashed');
  }
};

function successPage(token: string): string {
  // Build the exact message string Decap CMS expects, then JSON.stringify it
  // so it can be safely embedded in a JS literal without any XSS risk.
  const message = `authorization:github:success:${JSON.stringify({ token, provider: 'github' })}`;
  const msgLiteral = JSON.stringify(message);
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Authorizing...</title></head>
<body>
<p>Authorizing, please wait...</p>
<script>
  (function () {
    function receiveMessage(e) {
      window.opener.postMessage(${msgLiteral}, e.origin);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>
</body>
</html>`;
}

function errorPage(message: string): Response {
  const escaped = message.replace(/[\\'"<>]/g, (c) => `&#${c.charCodeAt(0)};`);
  return new Response(
    `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Auth Error</title></head>
<body>
<p>Authorization failed: ${escaped}</p>
<script>
  (function () {
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:error:${escaped}',
        e.origin
      );
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>
</body>
</html>`,
    { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}
