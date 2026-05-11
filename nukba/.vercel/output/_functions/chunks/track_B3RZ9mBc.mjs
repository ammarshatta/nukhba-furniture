import { getTokens, incrementTokenHits } from './data_Bas0h_CV.mjs';

const GET = async ({ url }) => {
  const token = url.searchParams.get("token");
  if (token) {
    const tokens = await getTokens();
    const exists = tokens.find((t) => t.token === token);
    if (exists) {
      await incrementTokenHits(token).catch(() => {
      });
    }
  }
  const gif = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");
  return new Response(gif, { headers: { "Content-Type": "image/gif", "Cache-Control": "no-cache" } });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
