function buildProductJsonLd(product, lang, baseUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: lang === "ar" ? product.nameAr : product.nameEn,
    description: lang === "ar" ? product.descAr : product.descEn,
    image: product.images,
    sku: product.id,
    url: `${baseUrl}${lang === "en" ? "/en" : ""}/products/${product.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      price: product.price.replace(/[^\d.]/g, "") || "0",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "نُخبة للأثاث الفاخر"
      }
    }
  };
}
function buildOrganizationJsonLd(settings, baseUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: settings.siteTitleAr,
    alternateName: settings.siteTitleEn,
    url: baseUrl,
    telephone: `+${settings.waNumber}`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Arabic", "English"]
    }
  };
}
function buildBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url
    }))
  };
}
function buildSitemapXml(products, categories, baseUrl) {
  const urls = [
    baseUrl,
    `${baseUrl}/en`,
    `${baseUrl}/products`,
    `${baseUrl}/en/products`
  ];
  for (const cat of categories) {
    urls.push(`${baseUrl}/category/${cat.slug}`);
    urls.push(`${baseUrl}/en/category/${cat.slug}`);
  }
  for (const p of products.filter((p2) => p2.active)) {
    urls.push(`${baseUrl}/products/${p.slug}`);
    urls.push(`${baseUrl}/en/products/${p.slug}`);
  }
  const entries = urls.map((u) => `  <url><loc>${u}</loc><changefreq>weekly</changefreq></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}

export { buildProductJsonLd as a, buildSitemapXml as b, buildOrganizationJsonLd as c, buildBreadcrumbJsonLd as d };
