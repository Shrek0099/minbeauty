import { getHomepageServices } from "@/lib/cms-content";
import { getCmsData } from "@/lib/cms-store";
import { buildGlobalSchemaGraph } from "@/lib/schema";

export async function JsonLd() {
  const cms = await getCmsData();
  const services = (await getHomepageServices()).map((service) => ({
    title: service.title,
    description: service.shortDescription,
    image: service.homeImage,
    slug: service.slug,
  }));

  const faqs = cms.faqs
    .filter((item) => item.isActive)
    .map((item) => ({ question: item.question, answer: item.answer }));

  const schema = buildGlobalSchemaGraph(cms.seo.description, services, faqs);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
