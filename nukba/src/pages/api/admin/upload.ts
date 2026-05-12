import type { APIRoute } from 'astro';
import { isValidSession } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const token = cookies.get('nukba_session')?.value;

  if (!token || !(await isValidSession(token))) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid form data' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const file = formData.get('file') as File | null;

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
  ];

  if (!allowedTypes.includes(file.type)) {
    return new Response(JSON.stringify({ error: 'Invalid file type' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const cloudName =
    import.meta.env.CLOUDINARY_CLOUD_NAME ||
    locals.runtime?.env?.CLOUDINARY_CLOUD_NAME;

  const uploadPreset =
    import.meta.env.CLOUDINARY_UPLOAD_PRESET ||
    locals.runtime?.env?.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return new Response(
      JSON.stringify({ error: 'Cloudinary not configured' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const cloudFormData = new FormData();
  cloudFormData.append('file', file);
  cloudFormData.append('upload_preset', uploadPreset);
  cloudFormData.append('folder', 'nukhba/products');

  const cloudRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: cloudFormData,
    },
  );

  if (!cloudRes.ok) {
    const err = await cloudRes.text();

    return new Response(
      JSON.stringify({ error: `Cloudinary error: ${err}` }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const data = (await cloudRes.json()) as {
    secure_url: string;
    public_id: string;
  };

  return new Response(
    JSON.stringify({
      url: data.secure_url,
      publicId: data.public_id,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
};