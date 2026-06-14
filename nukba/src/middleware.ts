import { defineMiddleware } from 'astro:middleware';
import { isValidSession } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.url.pathname;

  // Protect all /studio/* routes except /studio/login.
  // (Decap CMS lives at /admin and uses its own GitHub OAuth — not gated here.)
  if (path.startsWith('/studio') && path !== '/studio/login') {
    const token = context.cookies.get('nukba_session')?.value;
    const authed = token ? await isValidSession(token) : false;
    if (!authed) {
      return context.redirect('/studio/login');
    }
  }

  return next();
});
