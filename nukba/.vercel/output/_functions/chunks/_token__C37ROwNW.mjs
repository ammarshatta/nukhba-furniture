import { r as requireAuth } from './auth_Dg5w7j7S.mjs';
import { getTokens, saveTokens } from './data_Bas0h_CV.mjs';

const DELETE = async ({ params, cookies }) => {
  try {
    await requireAuth(cookies);
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
  const tokens = await getTokens();
  await saveTokens(tokens.filter((t) => t.token !== params.token));
  return new Response(null, { status: 204 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
