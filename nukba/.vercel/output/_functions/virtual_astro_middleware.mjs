import { d as defineMiddleware, ae as sequence } from './chunks/params-and-props_C-Av644s.mjs';
import 'piccolore';
import 'clsx';
import { i as isValidSession } from './chunks/auth_Dg5w7j7S.mjs';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const path = context.url.pathname;
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const token = context.cookies.get("nukba_session")?.value;
    const authed = token ? await isValidSession(token) : false;
    if (!authed) {
      return context.redirect("/admin/login");
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
