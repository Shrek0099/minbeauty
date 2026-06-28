import Image from "next/image";
import Link from "next/link";
import { getActiveServices, serviceHasHeroImage } from "@/lib/services-data";

export function Services() {
  const services = getActiveServices();

  return (
    <section id="dich-vu" className="site-section section-reveal services-section">
      <div className="site-container">
        <div className="section-header-center mb-10 text-center md:mb-12">
          <p className="section-label mb-3">Dịch vụ</p>
          <h2 className="section-heading">Dịch vụ tại Min Beauty</h2>
          <div className="section-heading-accent" />
          <p className="section-subtitle mx-auto max-w-xl">
            Các dịch vụ được nhiều khách hàng quan tâm
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="service-card service-card-link"
            >
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
              <h3 className="boutique-card-title service-card-title">{service.title}</h3>
              <p className="service-card-description">{service.shortDescription}</p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/services" className="news-link">
            Xem tất cả dịch vụ
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
