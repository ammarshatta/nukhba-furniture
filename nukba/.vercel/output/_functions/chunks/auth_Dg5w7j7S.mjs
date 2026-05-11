const COOKIE_NAME = "nukba_session";
const MAX_AGE = 60 * 60 * 24 * 7;
function getSecret() {
  return "dev-secret-32-chars-change-in-prod";
}
async function hmac(secret, data) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function createSessionToken() {
  const ts = Date.now().toString();
  const sig = await hmac(getSecret(), ts);
  return `${ts}.${sig}`;
}
async function isValidSession(token) {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [ts, sig] = parts;
  const age = Date.now() - parseInt(ts, 10);
  if (age > MAX_AGE * 1e3) return false;
  const expected = await hmac(getSecret(), ts);
  return expected === sig;
}
async function requireAuth(cookies) {
  const token = cookies.get(COOKIE_NAME)?.value;
  if (!token || !await isValidSession(token)) {
    throw new Error("UNAUTHORIZED");
  }
}
function setSessionCookie(cookies, token) {
  cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/admin",
    maxAge: MAX_AGE
  });
}
function clearSessionCookie(cookies) {
  cookies.delete(COOKIE_NAME, { path: "/admin" });
}

export { clearSessionCookie as a, createSessionToken as c, isValidSession as i, requireAuth as r, setSessionCookie as s };
