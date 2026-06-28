import type { MetadataRoute } from "next";
import { localPageSlug } from "@/lib/services-data";

/** Bump when static pages or route structure changes materially. */
export const siteLastUpdated = new Date("2026-06-28T00:00:00.000Z");

/** Last time the public service catalog changed (menu, slugs, landing pages). */
export const servicesCatalogUpdated = new Date("2026-06-28T00:00:00.000Z");

type StaticSitemapEntry = {
  path: string;
  lastModified?: Date;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

export const staticSitemapEntries: StaticSitemapEntry[] = [
  {
    path: "/",
    lastModified: siteLastUpdated,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/services",
    lastModified: servicesCatalogUpdated,
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/news",
    lastModified: siteLastUpdated,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/faq",
    lastModified: siteLastUpdated,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/contact",
    lastModified: siteLastUpdated,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: `/${localPageSlug}`,
    lastModified: siteLastUpdated,
    changeFrequency: "monthly",
    priority: 0.8,
  },
];

export const crawlerDisallowPaths = ["/admin", "/api/", "/_next/"] as const;

export function absoluteSiteUrl(baseUrl: string, path: string) {
  if (path === "/") return baseUrl;
  return `${baseUrl}${path}`;
}
