import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageSchema } from "@/components/page-schema";
import { buildPageMetadata } from "@/lib/seo";
import { buildFaqPageSchema } from "@/lib/schema";
import { faqItems } from "@/lib/faq";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  path: "/faq",
  title: "Câu hỏi thường gặp — Min Beauty",
  description:
    "Giải đáp câu hỏi về dịch vụ môi baby, filler, meso và chăm sóc da tại Min Beauty, Hòa Thành, Tây Ninh.",
});

export default function FaqPage() {
  return (
    <>
      <PageSchema data={buildFaqPageSchema()} />
      <Header />
      <main>
        <section className="site-section faq-section">
          <div className="site-container">
            <div className="section-header-center mb-10 text-center">
              <p className="section-label mb-3">FAQ</p>
              <h1 className="section-heading">Câu hỏi thường gặp</h1>
              <div className="section-heading-accent" />
              <p className="section-subtitle mx-auto max-w-xl">
                Những thắc mắc phổ biến trước khi đặt lịch tại Min Beauty, {siteConfig.city}.
              </p>
            </div>
            <div className="faq-grid">
              {faqItems.map((item) => (
                <article key={item.question} className="faq-card">
                  <h2 className="faq-card-question">{item.question}</h2>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
            <p className="mt-10 text-center">
              Còn thắc mắc?{" "}
              <Link href="/contact" className="site-footer-link">
                Liên hệ tư vấn
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
