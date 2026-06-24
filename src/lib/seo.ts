import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
};

export function buildCanonical(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return siteConfig.url;
  return `${siteConfig.url}${normalized}`;
}

export function buildPageMetadata({
  path,
  title,
  description,
  keywords,
  ogImage,
  ogType = "website",
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = buildCanonical(path);
  const image = ogImage || siteConfig.ogImage;

  const metadata: Metadata = {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      type: ogType,
      locale: "vi_VN",
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: image, width: 1024, height: 512, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };

  if (noIndex) {
    metadata.robots = { index: false, follow: false };
  }

  const gscVerification = siteConfig.googleSiteVerification;
  if (gscVerification) {
    metadata.verification = { google: gscVerification };
  }

  return metadata;
}

export function buildHomeMetadata(title: string, description: string, keywords: string[]): Metadata {
  return buildPageMetadata({
    path: "/",
    title,
    description,
    keywords,
  });
}
