import { i as isValidSession } from './auth_Dg5w7j7S.mjs';
import { c as createProductStory } from './storyblok_CRWm8KNY.mjs';

const POST = async ({ request, cookies }) => {
  const token = cookies.get("nukba_session")?.value;
  if (!token || !await isValidSession(token)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }
  const required = ["nameAr", "nameEn", "slug"];
  for (const key of required) {
    if (!body[key]) {
      return new Response(JSON.stringify({ error: `Missing field: ${key}` }), { status: 400 });
    }
  }
  try {
    const result = await createProductStory(body);
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
