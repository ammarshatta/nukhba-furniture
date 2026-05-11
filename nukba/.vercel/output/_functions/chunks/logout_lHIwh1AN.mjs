import { a as clearSessionCookie } from './auth_Dg5w7j7S.mjs';

const POST = ({ cookies }) => {
  clearSessionCookie(cookies);
  return new Response(null, {
    status: 302,
    headers: { Location: "/admin/login" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
