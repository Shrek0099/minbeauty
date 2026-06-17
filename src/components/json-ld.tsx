import { getCmsData } from "@/lib/cms-store";
import { faqItems } from "@/lib/faq";
import { siteConfig } from "@/lib/site-config";

export async function JsonLd() {
  const cms = await getCmsData();
  const visibleServices = cms.services
    .filter((service) => service.visible)
    .sort((a, b) => a.group.localeCompare(b.group) || a.sortOrder - b.sortOrder);
  const businessId = `${siteConfig.url}/#business`;
  const websiteId = `${siteConfig.url}/#website`;
  const servicesId = `${siteConfig.url}/#services`;
  const faqId = `${siteConfig.url}/#faq`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BeautySalon",
        "@id": businessId,
        name: siteConfig.name,
        description: cms.seo.description || siteConfig.description,
        url: siteConfig.url,
        telephone: siteConfig.phoneRaw,
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address,
          addressLocality: "Hòa Thành",
          addressRegion: "Tây Ninh",
          addressCountry: "VN",
        },
        areaServed: ["Hòa Thành", "Tây Ninh"],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "08:00",
          closes: "20:00",
        },
        priceRange: "$$",
        image: new URL(cms.seo.ogImage || siteConfig.ogImage, siteConfig.url).toString(),
        sameAs: [siteConfig.facebook, siteConfig.instagram],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": businessId },
        inLanguage: "vi-VN",
      },
      {
        "@type": "ItemList",
        "@id": servicesId,
        name: "Dịch vụ tại Min Beauty",
        itemListElement: visibleServices.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            image: new URL(service.image, siteConfig.url).toString(),
            provider: { "@id": businessId },
            areaServed: "Tây Ninh",
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
