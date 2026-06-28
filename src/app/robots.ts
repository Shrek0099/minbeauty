import type { MetadataRoute } from "next";
import { crawlerDisallowPaths } from "@/lib/sitemap-config";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...crawlerDisallowPaths],
    },
    host: siteConfig.url,
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
