import { r as requireAuth } from './auth_Dg5w7j7S.mjs';
import { getTokens, saveTokens } from './data_Bas0h_CV.mjs';

const GET = async ({ cookies }) => {
  try {
    await requireAuth(cookies);
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
  const tokens = await getTokens();
  return new Response(JSON.stringify(tokens), { headers: { "Content-Type": "application/json" } });
};
const POST = async ({ request, cookies }) => {
  try {
    await requireAuth(cookies);
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
  const { token, label } = await request.json();
  if (!token || !label) return new Response("Missing fields", { status: 400 });
  const tokens = await getTokens();
  if (tokens.find((t) => t.token === token)) return new Response("Token exists", { status: 409 });
  const newToken = { token, label, hits: 0, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  await saveTokens([...tokens, newToken]);
  return new Response(JSON.stringify(newToken), { status: 201, headers: { "Content-Type": "application/json" } });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
