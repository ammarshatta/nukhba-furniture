import type { AstroCookies } from 'astro';

const COOKIE_NAME = 'nukba_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  return import.meta.env.ADMIN_SESSION_SECRET ?? 'dev-secret-change-me';
}

async function hmac(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function createSessionToken(): Promise<string> {
  const ts = Date.now().toString();
  const sig = await hmac(getSecret(), ts);
  return `${ts}.${sig}`;
}

export async function isValidSession(token: string): Promise<boolean> {
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [ts, sig] = parts;
  const age = Date.now() - parseInt(ts, 10);
  if (age > MAX_AGE * 1000) return false;
  const expected = await hmac(getSecret(), ts);
  return expected === sig;
}

export async function requireAuth(cookies: AstroCookies): Promise<void> {
  const token = cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await isValidSession(token))) {
    throw new Error('UNAUTHORIZED');
  }
}

export function setSessionCookie(cookies: AstroCookies, token: string): void {
  cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export function clearSessionCookie(cookies: AstroCookies): void {
  cookies.delete(COOKIE_NAME, { path: '/' });
}

export const COOKIE_NAME_EXPORT = COOKIE_NAME;
