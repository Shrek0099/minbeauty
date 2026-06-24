import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import type { ServiceData } from "@/lib/services-data";
import { getPost } from "@/lib/blog";

type ServicePageContentProps = {
  service: ServiceData;
};

export function ServicePageContent({ service }: ServicePageContentProps) {
  const relatedPosts = service.relatedPostSlugs
    .map((slug) => getPost(slug))
    .filter(Boolean);

  return (
    <article className="service-lp">
      <section className="service-lp-hero">
        <div className="site-container">
          <nav className="service-lp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services">Dịch vụ</Link>
            <span aria-hidden="true">/</span>
            <span>{service.title}</span>
          </nav>
          <div className="service-lp-hero-grid">
            <div>
              <p className="section-label mb-3">Dịch vụ tại {siteConfig.city}</p>
              <h1>{service.title}</h1>
              <p className="service-lp-intro">{service.intro}</p>
              <div className="service-lp-cta-row">
                <a href={`tel:${siteConfig.phoneRaw}`} className="service-lp-cta-primary">
                  Gọi {siteConfig.phone}
                </a>
                <a
                  href={`https://zalo.me/${siteConfig.zalo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-lp-cta-secondary"
                >
                  Tư vấn Zalo
                </a>
              </div>
            </div>
            <div className="service-lp-hero-image">
              <Image
                src={service.heroImage}
                alt={service.title}
                width={720}
                height={960}
                className="boutique-card-image"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container service-lp-content">
          {service.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ))}

          <section>
            <h2>Ai nên xem xét dịch vụ này</h2>
            <ul>
              {service.whoFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Quy trình tại Min Beauty</h2>
            <ol>
              {service.process.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section>
            <h2>Chăm sóc sau dịch vụ</h2>
            <ul>
              {service.aftercare.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {service.faqs.length > 0 && (
            <section>
              <h2>Câu hỏi thường gặp</h2>
              <div className="faq-grid">
                {service.faqs.map((faq) => (
                  <article key={faq.question} className="faq-card">
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {relatedPosts.length > 0 && (
            <section>
              <h2>Bài viết liên quan</h2>
              <ul className="service-lp-related">
                {relatedPosts.map((post) => (
                  <li key={post!.slug}>
                    <Link href={`/news/${post!.slug}`}>{post!.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="service-lp-bottom-cta">
            <h2>Đặt lịch tư vấn miễn phí</h2>
            <p>
              Min Beauty — {siteConfig.fullAddress}. Khu vực phục vụ: {siteConfig.serviceAreaText}.
            </p>
            <Link href="/contact" className="service-lp-cta-primary">
              Liên hệ đặt lịch
            </Link>
          </section>
        </div>
      </section>
    </article>
  );
}
