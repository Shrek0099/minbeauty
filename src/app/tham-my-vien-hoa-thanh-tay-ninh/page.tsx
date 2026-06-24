import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { buildPageMetadata } from "@/lib/seo";
import { localPageData } from "@/lib/services-data";
import { getActiveServices } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  path: `/${localPageData.slug}`,
  title: localPageData.seoTitle,
  description: localPageData.seoDescription,
  keywords: [
    "thẩm mỹ viện Hòa Thành",
    "thẩm mỹ viện Tây Ninh",
    "Min Beauty",
    "môi baby Tây Ninh",
    "filler Tây Ninh",
  ],
});

export default function LocalSeoPage() {
  const services = getActiveServices();

  return (
    <>
      <Header />
      <main>
        <article className="site-section">
          <div className="site-container service-lp-content">
            <nav className="service-lp-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Trang chủ</Link>
              <span aria-hidden="true">/</span>
              <span>Thẩm mỹ viện Tây Ninh</span>
            </nav>
            <h1>{localPageData.h1}</h1>
            <p className="service-lp-intro">{localPageData.intro}</p>

            {localPageData.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))}

            <section>
              <h2>Xem chi tiết từng dịch vụ</h2>
              <ul className="service-lp-related">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`}>{service.title}</Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="service-lp-bottom-cta">
              <h2>Đặt lịch tư vấn</h2>
              <p>{siteConfig.fullAddress} — {siteConfig.phone}</p>
              <Link href="/contact" className="service-lp-cta-primary">
                Liên hệ ngay
              </Link>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
