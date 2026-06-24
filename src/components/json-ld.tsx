import { getCmsData } from "@/lib/cms-store";
import { buildGlobalSchemaGraph } from "@/lib/schema";
import { getActiveServices } from "@/lib/services-data";

export async function JsonLd() {
  const cms = await getCmsData();
  const services = getActiveServices().map((service) => ({
    title: service.title,
    description: service.shortDescription,
    image: service.heroImage,
    slug: service.slug,
  }));

  const schema = buildGlobalSchemaGraph(cms.seo.description, services);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
