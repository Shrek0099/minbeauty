import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getCmsPage } from "@/lib/cms-content";
import { buildPageMetadata } from "@/lib/seo";
import { getActiveServices, serviceHasHeroImage } from "@/lib/services-data";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("services");
  return buildPageMetadata({
    path: "/services",
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: ["dịch vụ làm đẹp Tây Ninh", "môi baby", "filler", "meso", "thẩm mỹ Hòa Thành"],
  });
}

export default async function ServicesIndexPage() {
  const page = await getCmsPage("services");
  const services = getActiveServices();

  return (
    <>
      <Header />
      <main>
        <section className="site-section">
          <div className="site-container">
            <div className="section-header-center mb-10 text-center">
              <p className="section-label mb-3">Dịch vụ</p>
              <h1 className="section-heading">{page.h1}</h1>
              <div className="section-heading-accent" />
              <p className="section-subtitle mx-auto max-w-xl">{page.intro}</p>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="service-card service-card-link">
                  {serviceHasHeroImage(service.heroImage) ? (
                    <Image
                      src={service.heroImage}
                      alt={service.title}
                      width={720}
                      height={960}
                      className="boutique-card-image service-card-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="service-card-image service-card-image--empty" aria-hidden="true" />
                  )}
                  <h2 className="boutique-card-title service-card-title">{service.title}</h2>
                  <p className="service-card-description">{service.shortDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
