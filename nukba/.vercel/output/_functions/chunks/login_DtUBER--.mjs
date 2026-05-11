import { c as createSessionToken, s as setSessionCookie } from './auth_Dg5w7j7S.mjs';

const POST = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const password = form.get("password")?.toString() ?? "";
  if (password !== "admin123") {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login?error=1" }
    });
  }
  const token = await createSessionToken();
  setSessionCookie(cookies, token);
  return new Response(null, {
    status: 302,
    headers: { Location: "/admin" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
