import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/cms-content";
import { getActiveServices } from "@/lib/services-data";
import {
  absoluteSiteUrl,
  servicesCatalogUpdated,
  staticSitemapEntries,
} from "@/lib/sitemap-config";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publishedPosts = await getPublishedBlogPosts();

  const staticRoutes: MetadataRoute.Sitemap = staticSitemapEntries.map((entry) => ({
    url: absoluteSiteUrl(siteConfig.url, entry.path),
    lastModified: entry.lastModified ?? servicesCatalogUpdated,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = getActiveServices().map((service) => ({
    url: absoluteSiteUrl(siteConfig.url, `/services/${service.slug}`),
    lastModified: servicesCatalogUpdated,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const newsRoutes: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: absoluteSiteUrl(siteConfig.url, `/news/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...newsRoutes];
}
