import { i as isValidSession } from './auth_Dg5w7j7S.mjs';
import { u as uploadAssetToStoryblok } from './storyblok_CRWm8KNY.mjs';

const POST = async ({ request, cookies }) => {
  const token = cookies.get("nukba_session")?.value;
  if (!token || !await isValidSession(token)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid form data" }), { status: 400 });
  }
  const file = formData.get("file");
  if (!file) {
    return new Response(JSON.stringify({ error: "No file provided" }), { status: 400 });
  }
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return new Response(JSON.stringify({ error: "Invalid file type" }), { status: 400 });
  }
  const buffer = await file.arrayBuffer();
  const url = await uploadAssetToStoryblok(file.name, buffer, file.type);
  return new Response(JSON.stringify({ url }), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
