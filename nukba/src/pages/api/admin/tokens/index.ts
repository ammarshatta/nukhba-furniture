import type { APIRoute } from 'astro';
import { requireAuth } from '../../../../lib/auth';

export const prerender = false;

// TODO: reconnect to new admin flow — re-implement token CRUD with new data store

export const GET: APIRoute = async ({ cookies }) => {
  try {
    await requireAuth(cookies);
  } catch {
    return new Response('Unauthorized', { status: 401 });
  }

  return new Response(JSON.stringify([]), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const POST: APIRoute = async ({ cookies }) => {
  try {
    await requireAuth(cookies);
  } catch {
    return new Response('Unauthorized', { status: 401 });
  }

  return new Response(
    JSON.stringify({
      error: 'Token management not yet configured for new stack',
    }),
    {
      status: 501,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};