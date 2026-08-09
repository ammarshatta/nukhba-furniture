import { defineCollection, z } from 'astro:content';

// See src/content.config.ts — same normalisation for optional CMS numbers and
// for `dimensions` written either as a mapping or as a single-item list.
const optionalNumber = z.preprocess(
  (v) => (v === '' || v === null ? undefined : v),
  z.coerce.number().optional(),
);

const dimensionEntry = z.object({
  label: z.string().optional(),
  labelAr: z.string().optional(),
  width: optionalNumber,
  depth: optionalNumber,
  height: optionalNumber,
  unit: z.string().default('cm'),
});

const dimensionsSchema = z.preprocess(
  (v) => (v == null ? [] : Array.isArray(v) ? v : [v]),
  z.array(dimensionEntry),
);

const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleAr: z.string(),
    slug: z.string(),
    category: z.string(),
    excerpt: z.string().max(200),
    excerptAr: z.string().max(200),
    materials: z.array(z.string()).default([]),
    dimensions: dimensionsSchema,
    price: z.string(),
    priceValue: z.number(),
    currency: z.string().default('EGP'),
    images: z.array(z.string()),
    featured: z.boolean().default(false),
    badge: z.enum(['', 'new', 'sale', 'bestseller']).default(''),
    tags: z.array(z.string()).default([]),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).default([]),
    bodyAr: z.string().optional(),
    waText: z.string(),
    waTextAr: z.string(),
    relatedProducts: z.array(z.string()).default([]),
    active: z.boolean().default(true),
    publishDate: z.date(),
  }),
});

const categories = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    nameAr: z.string(),
    slug: z.string(),
    description: z.string(),
    descriptionAr: z.string(),
    image: z.string(),
    order: z.number().default(99),
    featuredProducts: z.array(z.string()).default([]),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleAr: z.string().optional(),
    slug: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Shatta Editorial'),
    category: z.enum(['guide', 'trends', 'tips', 'materials', 'spaces']),
    excerpt: z.string().max(200),
    coverImage: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    readingTime: z.number().optional(),
    relatedProducts: z.array(z.string()).default([]),
    relatedCollections: z.array(z.string()).default([]),
    bodyAr: z.string().optional(),
    hasAr: z.boolean().default(false),
  }),
});

const faqs = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    questionAr: z.string().optional(),
    answer: z.string(),
    answerAr: z.string().optional(),
    category: z.string().default('general'),
    order: z.number().default(99),
  }),
});

const locations = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    nameAr: z.string(),
    slug: z.string(),
    city: z.string(),
    cityAr: z.string(),
    area: z.string(),
    areaAr: z.string(),
    address: z.string(),
    addressAr: z.string(),
    phone: z.string(),
    whatsapp: z.string(),
    googleMapsUrl: z.string(),
    mapEmbedSrc: z.string().optional(),
    hours: z.string(),
    hoursAr: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { products, categories, blog, faqs, locations };
