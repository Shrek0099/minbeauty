import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { AdTracking } from "@/components/ad-tracking";
import { GtmNoscript } from "@/components/gtm-noscript";
import { JsonLd } from "@/components/json-ld";
import { VisitorTracker } from "@/components/visitor-tracker";
import { getCmsData } from "@/lib/cms-store";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsData();
  const keywords = cms.seo.keywords
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
  const canonicalUrl =
    cms.seo.canonicalUrl && cms.seo.canonicalUrl !== "NEXT_PUBLIC_SITE_URL"
      ? cms.seo.canonicalUrl.replace(/\/$/, "")
      : siteConfig.url;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: cms.seo.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: cms.seo.description,
    keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: cms.seo.title,
      description: cms.seo.description,
      images: [
        {
          url: cms.seo.ogImage || siteConfig.ogImage,
          width: 1024,
          height: 512,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: cms.seo.title,
      description: cms.seo.description,
      images: [cms.seo.ogImage || siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: siteConfig.favicon, sizes: "48x48", type: "image/png" },
        { url: "/images/logo/min-beauty-icon-96.png", sizes: "96x96", type: "image/png" },
        { url: "/images/logo/min-beauty-icon-192.png", sizes: "192x192", type: "image/png" },
        { url: siteConfig.logoSquare, sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/images/logo/min-beauty-icon-192.png", sizes: "192x192", type: "image/png" }],
      shortcut: siteConfig.favicon,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <AdTracking />
        <JsonLd />
      </head>
      <body className="min-h-screen antialiased pb-[env(safe-area-inset-bottom)]">
        <GtmNoscript />
        {children}
        <VisitorTracker />
      </body>
    </html>
  );
}
