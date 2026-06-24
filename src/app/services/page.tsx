import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { buildPageMetadata } from "@/lib/seo";
import { getActiveServices } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  path: "/services",
  title: "Dịch vụ làm đẹp tại Min Beauty, Tây Ninh",
  description:
    "Dịch vụ môi baby, filler, meso, chăm sóc da tại Min Beauty, Hòa Thành, Tây Ninh. Tư vấn miễn phí theo từng gương mặt.",
  keywords: ["dịch vụ làm đẹp Tây Ninh", "môi baby", "filler", "meso", "spa Hòa Thành"],
});

export default function ServicesIndexPage() {
  const services = getActiveServices();

  return (
    <>
      <Header />
      <main>
        <section className="site-section">
          <div className="site-container">
            <div className="section-header-center mb-10 text-center">
              <p className="section-label mb-3">Dịch vụ</p>
              <h1 className="section-heading">Dịch vụ tại Min Beauty</h1>
              <div className="section-heading-accent" />
              <p className="section-subtitle mx-auto max-w-xl">
                Các dịch vụ được tư vấn theo tình trạng thực tế tại {siteConfig.serviceAreaText}.
              </p>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="service-card service-card-link">
                  <Image
                    src={service.heroImage}
                    alt={service.title}
                    width={720}
                    height={960}
                    className="boutique-card-image service-card-image"
                    loading="lazy"
                  />
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
