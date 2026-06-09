/**
 * Egyptian governorates (المحافظات) used to generate programmatic
 * category × governorate landing pages, e.g. /collections/bedroom/cairo
 * ("غرف نوم في القاهرة").
 *
 * IMPORTANT SEO NOTE — these are AGGREGATION/landing pages, not duplicates of
 * the product page. Each product keeps ONE canonical URL (/products/[slug]).
 * A product simply *appears* across the governorate pages of its category.
 * Each landing page carries unique content (localized H1, intro, delivery copy,
 * price range, LocalBusiness schema with areaServed) so it is not duplicate.
 */

export interface Governorate {
  /** URL slug (latin, stable). */
  slug: string;
  /** Arabic name with the definite article, as people search it. */
  nameAr: string;
  /** English name. */
  nameEn: string;
  /** Region grouping (Arabic) — used for delivery copy & internal grouping. */
  regionAr: string;
}

export const GOVERNORATES: Governorate[] = [
  { slug: 'cairo', nameAr: 'القاهرة', nameEn: 'Cairo', regionAr: 'القاهرة الكبرى' },
  { slug: 'giza', nameAr: 'الجيزة', nameEn: 'Giza', regionAr: 'القاهرة الكبرى' },
  { slug: 'qalyubia', nameAr: 'القليوبية', nameEn: 'Qalyubia', regionAr: 'القاهرة الكبرى' },
  { slug: 'alexandria', nameAr: 'الإسكندرية', nameEn: 'Alexandria', regionAr: 'الإسكندرية والساحل' },
  { slug: 'beheira', nameAr: 'البحيرة', nameEn: 'Beheira', regionAr: 'الدلتا' },
  { slug: 'dakahlia', nameAr: 'الدقهلية', nameEn: 'Dakahlia', regionAr: 'الدلتا' },
  { slug: 'damietta', nameAr: 'دمياط', nameEn: 'Damietta', regionAr: 'الدلتا' },
  { slug: 'gharbia', nameAr: 'الغربية', nameEn: 'Gharbia', regionAr: 'الدلتا' },
  { slug: 'kafr-el-sheikh', nameAr: 'كفر الشيخ', nameEn: 'Kafr El Sheikh', regionAr: 'الدلتا' },
  { slug: 'monufia', nameAr: 'المنوفية', nameEn: 'Monufia', regionAr: 'الدلتا' },
  { slug: 'sharqia', nameAr: 'الشرقية', nameEn: 'Sharqia', regionAr: 'الدلتا' },
  { slug: 'ismailia', nameAr: 'الإسماعيلية', nameEn: 'Ismailia', regionAr: 'القناة' },
  { slug: 'port-said', nameAr: 'بورسعيد', nameEn: 'Port Said', regionAr: 'القناة' },
  { slug: 'suez', nameAr: 'السويس', nameEn: 'Suez', regionAr: 'القناة' },
  { slug: 'fayoum', nameAr: 'الفيوم', nameEn: 'Fayoum', regionAr: 'مصر الوسطى' },
  { slug: 'beni-suef', nameAr: 'بني سويف', nameEn: 'Beni Suef', regionAr: 'مصر الوسطى' },
  { slug: 'minya', nameAr: 'المنيا', nameEn: 'Minya', regionAr: 'الصعيد' },
  { slug: 'assiut', nameAr: 'أسيوط', nameEn: 'Assiut', regionAr: 'الصعيد' },
  { slug: 'sohag', nameAr: 'سوهاج', nameEn: 'Sohag', regionAr: 'الصعيد' },
  { slug: 'qena', nameAr: 'قنا', nameEn: 'Qena', regionAr: 'الصعيد' },
  { slug: 'luxor', nameAr: 'الأقصر', nameEn: 'Luxor', regionAr: 'الصعيد' },
  { slug: 'aswan', nameAr: 'أسوان', nameEn: 'Aswan', regionAr: 'الصعيد' },
  { slug: 'red-sea', nameAr: 'البحر الأحمر', nameEn: 'Red Sea', regionAr: 'البحر الأحمر وسيناء' },
  { slug: 'south-sinai', nameAr: 'جنوب سيناء', nameEn: 'South Sinai', regionAr: 'البحر الأحمر وسيناء' },
  { slug: 'north-sinai', nameAr: 'شمال سيناء', nameEn: 'North Sinai', regionAr: 'البحر الأحمر وسيناء' },
  { slug: 'matrouh', nameAr: 'مطروح', nameEn: 'Matrouh', regionAr: 'الساحل الشمالي' },
  { slug: 'new-valley', nameAr: 'الوادي الجديد', nameEn: 'New Valley', regionAr: 'الوادي الجديد' },
];

export function getGovernorate(slug: string): Governorate | undefined {
  return GOVERNORATES.find(g => g.slug === slug);
}
