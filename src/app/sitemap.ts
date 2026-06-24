import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/cms-content";
import { getActiveServices, localPageSlug } from "@/lib/services-data";
import { siteLastUpdated } from "@/lib/sitemap-config";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = siteLastUpdated;
  const publishedPosts = await getPublishedBlogPosts();

  const serviceRoutes: MetadataRoute.Sitemap = getActiveServices().map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const newsRoutes: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `${siteConfig.url}/news/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...serviceRoutes,
    {
      url: `${siteConfig.url}/news`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...newsRoutes,
    {
      url: `${siteConfig.url}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/${localPageSlug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
