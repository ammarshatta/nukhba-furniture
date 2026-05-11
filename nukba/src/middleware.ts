import { defineMiddleware } from 'astro:middleware';
import { isValidSession } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.url.pathname;

  // Protect all /admin/* routes except /admin/login
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const token = context.cookies.get('nukba_session')?.value;
    const authed = token ? await isValidSession(token) : false;
    if (!authed) {
      return context.redirect('/admin/login');
    }
  }

  return next();
});
