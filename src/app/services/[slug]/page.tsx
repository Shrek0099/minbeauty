import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageSchema } from "@/components/page-schema";
import { ServicePageContent } from "@/components/service-page";
import { buildPageMetadata } from "@/lib/seo";
import { buildServicePageSchema } from "@/lib/schema";
import { getActiveServices, getService } from "@/lib/services-data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getActiveServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Dịch vụ không tồn tại" };

  return buildPageMetadata({
    path: `/services/${slug}`,
    title: service.seoTitle,
    description: service.seoDescription,
    ogImage: service.heroImage,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <PageSchema data={buildServicePageSchema(service)} />
      <Header />
      <main>
        <ServicePageContent service={service} />
      </main>
      <Footer />
    </>
  );
}
