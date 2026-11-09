import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/cart", "/login", "/signup", "/forgot-password"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}

