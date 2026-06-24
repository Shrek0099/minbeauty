import { faqItems } from "@/lib/faq";
import type { ServiceData } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";
import type { BlogPost } from "@/lib/blog";

export function getBusinessId() {
  return `${siteConfig.url}/#business`;
}

export function buildGlobalSchemaGraph(
  cmsDescription: string,
  services: { title: string; description: string; image: string; slug: string }[],
  faqs: { question: string; answer: string }[] = faqItems,
) {
  const businessId = getBusinessId();
  const websiteId = `${siteConfig.url}/#website`;
  const servicesId = `${siteConfig.url}/#services`;
  const faqId = `${siteConfig.url}/#faq`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["BeautySalon", "LocalBusiness", "Organization"],
        "@id": businessId,
        name: siteConfig.name,
        description: cmsDescription || siteConfig.description,
        url: siteConfig.url,
        telephone: siteConfig.phoneRaw,
        email: siteConfig.email,
        logo: {
          "@type": "ImageObject",
          url: new URL(siteConfig.logoSquare, siteConfig.url).toString(),
          width: 512,
          height: 512,
        },
        image: [
          new URL(siteConfig.logoSquare, siteConfig.url).toString(),
          new URL(siteConfig.ogImage, siteConfig.url).toString(),
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address,
          addressLocality: "Hòa Thành",
          addressRegion: "Tây Ninh",
          postalCode: siteConfig.postalCode,
          addressCountry: "VN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        },
        hasMap: siteConfig.mapsUrl,
        areaServed: siteConfig.serviceAreaText,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "08:00",
          closes: "20:00",
        },
        priceRange: "$$",
        sameAs: [siteConfig.facebook, siteConfig.instagram],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": businessId },
        inLanguage: "vi-VN",
        image: new URL(siteConfig.logoSquare, siteConfig.url).toString(),
      },
      {
        "@type": "ItemList",
        "@id": servicesId,
        name: "Dịch vụ tại Min Beauty",
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            url: `${siteConfig.url}/services/${service.slug}`,
            image: new URL(service.image, siteConfig.url).toString(),
            provider: { "@id": businessId },
            areaServed: siteConfig.serviceAreaText,
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildCanonicalPath(item.path),
    })),
  };
}

export function buildServicePageSchema(service: ServiceData) {
  const pageUrl = `${siteConfig.url}/services/${service.slug}`;
  const businessId = getBusinessId();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: service.seoTitle,
        description: service.seoDescription,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": `${pageUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.title,
        description: service.shortDescription,
        url: pageUrl,
        image: new URL(service.heroImage, siteConfig.url).toString(),
        provider: { "@id": businessId },
        areaServed: siteConfig.serviceAreaText,
      },
      ...(service.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: service.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
          ]
        : []),
    ],
  };
}

export function buildBlogPostSchema(post: BlogPost, categoryTitle: string) {
  const pageUrl = `${siteConfig.url}/news/${post.slug}`;
  const businessId = getBusinessId();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        headline: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
        image: new URL(post.image, siteConfig.url).toString(),
        datePublished: post.date,
        dateModified: post.date,
        author: { "@type": "Organization", name: siteConfig.name, "@id": businessId },
        publisher: { "@type": "Organization", name: siteConfig.name, "@id": businessId },
        mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
        articleSection: categoryTitle,
        keywords: post.tags.join(", "),
        inLanguage: "vi-VN",
      },
      buildBreadcrumbSchema([
        { name: "Trang chủ", path: "/" },
        { name: "Tin tức", path: "/news" },
        { name: post.title, path: `/news/${post.slug}` },
      ]),
    ],
  };
}

export function buildFaqPageSchema(faqs: { question: string; answer: string }[] = faqItems) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function buildCanonicalPath(path: string) {
  if (path === "/") return siteConfig.url;
  return `${siteConfig.url}${path}`;
}
