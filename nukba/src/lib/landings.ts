import type { CollectionEntry } from 'astro:content';

/**
 * Minimum real products a landing page must surface to be indexable.
 * Below this, the page renders with `noindex` to avoid thin-content penalties.
 */
export const LANDING_MIN_PRODUCTS = 3;

/**
 * Resolves the products a landing page should display from its filter.
 * Filter parts are OR-combined (category match OR tag match OR explicit slug).
 * An empty filter means "all active products" (used by broad thematic pages).
 */
export function resolveLandingProducts(
  landing: CollectionEntry<'landings'>,
  products: CollectionEntry<'products'>[],
): CollectionEntry<'products'>[] {
  const f = landing.data.filter;
  const slugs = f.productSlugs ?? [];
  const cats = f.categories ?? [];
  const tags = f.tags ?? [];
  const active = products.filter(p => p.data.active);

  const noFilter = slugs.length === 0 && cats.length === 0 && tags.length === 0;
  if (noFilter) return active;

  return active.filter(p =>
    slugs.includes(p.data.slug) ||
    cats.includes(p.data.category) ||
    p.data.tags.some(t => tags.includes(t)),
  );
}

/** Whether a landing has enough real products to be indexed. */
export function isLandingIndexable(
  landing: CollectionEntry<'landings'>,
  products: CollectionEntry<'products'>[],
): boolean {
  return resolveLandingProducts(landing, products).length >= LANDING_MIN_PRODUCTS;
}
