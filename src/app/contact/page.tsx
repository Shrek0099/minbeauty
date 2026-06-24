import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ConsultationForm } from "@/components/consultation-form";
import { getCmsPage } from "@/lib/cms-content";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("contact");
  return buildPageMetadata({
    path: "/contact",
    title: page.seoTitle,
    description: page.seoDescription,
  });
}

export default async function ContactPage() {
  const page = await getCmsPage("contact");

  return (
    <>
      <Header />
      <main>
        <section className="site-section">
          <div className="site-container">
            <div className="section-header-center mb-10 text-center">
              <p className="section-label mb-3">Liên hệ</p>
              <h1 className="section-heading">{page.h1}</h1>
              <div className="section-heading-accent" />
            </div>
            <div className="contact-page-grid">
              <div className="contact-page-info">
                <h2>Thông tin liên hệ</h2>
                <ul className="contact-page-list">
                  <li>
                    <strong>Địa chỉ:</strong>{" "}
                    <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
                      {siteConfig.fullAddress}
                    </a>
                  </li>
                  <li>
                    <strong>Điện thoại:</strong>{" "}
                    <a href={`tel:${siteConfig.phoneRaw}`}>{siteConfig.phone}</a>
                  </li>
                  <li>
                    <strong>Zalo:</strong>{" "}
                    <a href={`https://zalo.me/${siteConfig.zalo}`} target="_blank" rel="noopener noreferrer">
                      {siteConfig.zalo}
                    </a>
                  </li>
                  <li>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                  </li>
                  <li>
                    <strong>Giờ làm việc:</strong> {siteConfig.hours}
                  </li>
                  <li>
                    <strong>Khu vực phục vụ:</strong> {siteConfig.serviceAreaText}
                  </li>
                </ul>
                <div className="contact-page-map">
                  <iframe
                    title="Bản đồ Min Beauty"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.fullAddress)}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="contact-page-form">
                <h2 className="contact-page-form-title">Gửi yêu cầu tư vấn</h2>
                <p className="contact-page-form-subtitle">{page.intro}</p>
                <ConsultationForm variant="embedded" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
