import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

const FALLBACK_CLIENT_ID = 'Ov23liaz269sMqpDOK2c';

export const GET: APIRoute = async ({ url, cookies }) => {
  const log: string[] = [];

  const step = (msg: string) => {
    console.log('[callback]', msg);
    log.push(msg);
  };

  try {
    step('Callback hit — reading env vars');
    const CLIENT_ID = env.GITHUB_CLIENT_ID || FALLBACK_CLIENT_ID;
    const CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;

    step(`CLIENT_ID present: ${Boolean(CLIENT_ID)} | CLIENT_SECRET present: ${Boolean(CLIENT_SECRET)}`);

    if (!CLIENT_SECRET) {
      return statusPage(log, 'error', 'GITHUB_CLIENT_SECRET not set — add it as an encrypted secret in the Cloudflare Workers dashboard, then redeploy.');
    }

    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const savedState = cookies.get('github_oauth_state')?.value;

    step(`code present: ${Boolean(code)} | state: ${state?.slice(0, 8)}... | savedState: ${savedState?.slice(0, 8)}...`);

    if (!code) {
      return statusPage(log, 'error', 'Missing code param from GitHub — did GitHub deny the app?');
    }

    if (!state || state !== savedState) {
      return statusPage(log, 'error', `State mismatch — received "${state?.slice(0, 12)}..." but cookie had "${savedState?.slice(0, 12)}...". Cookie may have been lost (check SameSite/Secure settings).`);
    }

    cookies.delete('github_oauth_state', { path: '/' });
    step('State validated ✓ — exchanging code for token');

    const tokenRes = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
      }
    );

    step(`GitHub token endpoint responded: ${tokenRes.status} ${tokenRes.statusText}`);

    const text = await tokenRes.text();
    step(`Raw GitHub response (first 80 chars): ${text.slice(0, 80)}`);

    let tokenData: { access_token?: string; error?: string; error_description?: string };
    try {
      tokenData = JSON.parse(text);
    } catch {
      return statusPage(log, 'error', `GitHub response was not JSON: ${text.slice(0, 200)}`);
    }

    if (tokenData.error) {
      return statusPage(log, 'error', `GitHub OAuth error: ${tokenData.error} — ${tokenData.error_description ?? ''}`);
    }

    if (!tokenData.access_token) {
      return statusPage(log, 'error', `No access_token in response. Full response: ${text.slice(0, 300)}`);
    }

    step('Access token received ✓ — sending to Decap CMS');

    return new Response(successPage(tokenData.access_token, log), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[callback] CRASH:', message);
    log.push(`CRASH: ${message}`);
    return statusPage(log, 'error', message);
  }
};

function html(body: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>GitHub Auth</title>
  <style>
    body{font-family:monospace;background:#0d1117;color:#c9d1d9;padding:24px;margin:0}
    .step{padding:4px 0;font-size:13px;color:#8b949e}
    .step::before{content:"› ";color:#58a6ff}
    .ok{color:#3fb950}
    .err{color:#f85149}
    h3{margin:0 0 12px;font-size:14px;color:#e6edf3}
    .box{background:#161b22;border:1px solid #30363d;border-radius:6px;padding:16px;margin-bottom:12px}
  </style>
</head>
<body>${body}</body>
</html>`;
}

function logLines(log: string[]): string {
  return log.map(l => `<div class="step">${escHtml(l)}</div>`).join('');
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function successPage(token: string, log: string[]): string {
  const message = `authorization:github:success:${JSON.stringify({ token, provider: 'github' })}`;
  const msgLiteral = JSON.stringify(message);

  return html(`
<div class="box">
  <h3>Steps</h3>
  ${logLines(log)}
  <div class="step ok">✓ Sending token to Decap CMS...</div>
</div>
<div class="box">
  <span class="ok">✓ Login successful — this window will close automatically.</span>
</div>
<script>
  (function () {
    function receiveMessage(e) {
      window.opener.postMessage(${msgLiteral}, e.origin);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>`);
}

function statusPage(log: string[], type: 'error', message: string): Response {
  const body = html(`
<div class="box">
  <h3>Steps</h3>
  ${logLines(log)}
</div>
<div class="box">
  <h3 class="err">✗ ${type === 'error' ? 'Error' : 'Info'}</h3>
  <div class="err">${escHtml(message)}</div>
</div>
<div class="box" style="color:#8b949e;font-size:12px">
  Check Cloudflare Workers logs: <code>npx wrangler tail</code>
</div>
<script>
  (function () {
    const msg = ${JSON.stringify(`authorization:github:error:${message}`)};
    function receiveMessage(e) {
      window.opener.postMessage(msg, e.origin);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>`);

  return new Response(body, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
