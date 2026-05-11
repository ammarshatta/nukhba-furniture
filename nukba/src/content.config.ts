import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    titleAr: z.string(),
    slug: z.string(),
    category: z.string(),
    excerpt: z.string().max(200),
    excerptAr: z.string().max(200),
    materials: z.array(z.string()),
    dimensions: z.object({
      width: z.number(),
      depth: z.number(),
      height: z.number(),
      unit: z.string().default('cm'),
    }),
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
    waText: z.string(),
    waTextAr: z.string(),
    relatedProducts: z.array(z.string()).default([]),
    active: z.boolean().default(true),
    publishDate: z.date(),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/categories' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    titleAr: z.string().optional(),
    slug: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Nukhba Editorial'),
    category: z.enum(['guide', 'trends', 'tips', 'materials', 'spaces']),
    excerpt: z.string().max(200),
    coverImage: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    relatedProducts: z.array(z.string()).default([]),
    relatedCollections: z.array(z.string()).default([]),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faqs' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
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
