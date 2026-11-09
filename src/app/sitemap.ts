import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { fetchCatalog } from "@/lib/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await fetchCatalog();
  const currentDate = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE.url}/shop`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE.url}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => {
    // Give flagship search targets maximum priority
    const isPriorityProduct = [
      "katarni-chura",
      "gaya-tilkut",
      "chana-sattu",
      "roasted-makhana",
    ].includes(product.slug);

    return {
      url: `${SITE.url}/shop/${product.slug}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: isPriorityProduct ? 0.95 : 0.85,
    };
  });

  const categoryRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE.url}/shop?category=tilkut`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/shop?category=sattu`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/shop?category=makhana`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/shop?category=chura`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}

