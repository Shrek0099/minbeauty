import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageSchema } from "@/components/page-schema";
import { getCmsFaqs, getCmsPage } from "@/lib/cms-content";
import { buildPageMetadata } from "@/lib/seo";
import { buildFaqPageSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("faq");
  return buildPageMetadata({
    path: "/faq",
    title: page.seoTitle,
    description: page.seoDescription,
  });
}

export default async function FaqPage() {
  const page = await getCmsPage("faq");
  const faqs = await getCmsFaqs();

  return (
    <>
      <PageSchema data={buildFaqPageSchema(faqs)} />
      <Header />
      <main>
        <section className="site-section faq-section">
          <div className="site-container">
            <div className="section-header-center mb-10 text-center">
              <p className="section-label mb-3">FAQ</p>
              <h1 className="section-heading">{page.h1}</h1>
              <div className="section-heading-accent" />
              <p className="section-subtitle mx-auto max-w-xl">{page.intro}</p>
            </div>
            <div className="faq-grid">
              {faqs.map((item) => (
                <article key={item.id} className="faq-card">
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
