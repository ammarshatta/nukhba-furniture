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
    // Real customer reviews only — used for Product rich-result stars.
    rating: z.number().min(1).max(5).optional(),
    reviewCount: z.number().int().positive().optional(),
    reviews: z.array(z.object({
      name: z.string(),
      stars: z.number().min(1).max(5),
      text: z.string(),
      date: z.string().optional(),
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

// SEO landing pages served at clean root URLs (/modern-bedroom, /furniture-damietta…).
const landings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/landings' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),            // <title> / meta (English)
    titleAr: z.string(),
    h1: z.string(),
    h1Ar: z.string(),
    eyebrow: z.string().default('Shatta'),
    eyebrowAr: z.string().default('شطا'),
    metaDescription: z.string(),
    metaDescriptionAr: z.string(),
    intro: z.string(),
    introAr: z.string(),
    heroImage: z.string(),
    keywords: z.array(z.string()).default([]),
    // Long-form bilingual body sections (rendered language-aware below the grid).
    sections: z.array(z.object({
      heading: z.string(),
      headingAr: z.string(),
      body: z.string(),
      bodyAr: z.string(),
    })).default([]),
    // Product filter (OR-combined). Empty filter → all active products.
    filter: z.object({
      categories: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      productSlugs: z.array(z.string()).default([]),
    }).default({}),
    // When set, emits LocalBusiness schema for a city/governorate landing.
    local: z.object({
      governorateEn: z.string(),
      governorateAr: z.string(),
      country: z.enum(['EG', 'SA']).default('EG'),
      // Districts/neighbourhoods served — rendered as a chip list for local relevance.
      districts: z.array(z.string()).default([]),
      districtsAr: z.array(z.string()).default([]),
      // Delivery copy specific to this city (shipping time, customs, assembly…).
      deliveryNote: z.string().optional(),
      deliveryNoteAr: z.string().optional(),
    }).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      questionAr: z.string(),
      answer: z.string(),
      answerAr: z.string(),
    })).default([]),
    relatedLinks: z.array(z.object({
      label: z.string(),
      labelAr: z.string(),
      href: z.string(),
    })).default([]),
    order: z.number().default(99),
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
    author: z.string().default('Shatta Editorial'),
    category: z.enum(['guide', 'trends', 'tips', 'materials', 'spaces']),
    excerpt: z.string().max(200),
    excerptAr: z.string().optional(),
    coverImage: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    relatedProducts: z.array(z.string()).default([]),
    relatedCollections: z.array(z.string()).default([]),
    bodyAr: z.string().optional(),
    hasAr: z.boolean().default(false),
    readingTime: z.number().optional(),
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

export const collections = { products, categories, landings, blog, faqs, locations };
