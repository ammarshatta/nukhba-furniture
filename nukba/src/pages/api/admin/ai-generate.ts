import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import { requireAuth } from '../../../lib/auth';
import { env } from 'cloudflare:workers';

interface GenerateRequest {
  image: { data: string; mimeType: string };
  category?: string;
  price?: string;
  badge?: string;
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try { await requireAuth(cookies); } catch { return new Response('Unauthorized', { status: 401 }); }

  const body: GenerateRequest = await request.json();
  const { image, category, price } = body;

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  const model = env.AI_MODEL ?? 'claude-sonnet-4-6';

  const catInstruction = category && category !== 'auto'
    ? `This product belongs to category: "${category}". Use this as the category_code.`
    : 'Determine the category automatically from the image.';

  const systemPrompt = `You are an expert in luxury Arabic furniture. Your task is to analyze a product image and provide bilingual marketing information.
Respond ONLY with valid JSON (no backticks, no extra text):
{
  "nameAr": "Arabic product name (max 15 words)",
  "nameEn": "English product name (max 15 words)",
  "category_ar": "Arabic category name",
  "category_code": "one of: bed, liv, din, sof, kit, dec",
  "descAr": "Attractive Arabic marketing description (2 sentences, max 30 words)",
  "descEn": "Attractive English marketing description (2 sentences, max 30 words)",
  "waTextAr": "Short Arabic WhatsApp inquiry message about this product",
  "waTextEn": "Short English WhatsApp inquiry message about this product"
}`;

  const userText = category && category !== 'auto'
    ? `Analyze this furniture image and provide product info. ${catInstruction}`
    : 'Analyze this furniture image and provide product info in the required JSON format.';

  try {
    const response = await client.messages.create({
      model,
      max_tokens: 800,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: image.mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
              data: image.data,
            },
          },
          { type: 'text', text: userText },
        ],
      }],
    });

    const text = response.content.map(c => (c.type === 'text' ? c.text : '')).join('');
    const clean = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);

    // Inject price if provided
    if (price) result.price = price;

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
