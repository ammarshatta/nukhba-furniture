import type { APIRoute } from 'astro';
import { requireAuth } from '../../../../lib/auth';

export const prerender = false;

// TODO: reconnect to new admin flow — re-implement token deletion with new data store

export const DELETE: APIRoute = async ({ cookies }) => {
  try {
    await requireAuth(cookies);
  } catch {
    return new Response('Unauthorized', { status: 401 });
  }

  // TODO: delete resource here (DB / KV / session / token store)

  return new Response(null, {
    status: 204,
  });
};