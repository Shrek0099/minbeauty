import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { SakuraPetals } from "@/components/sakura-petals";
import { Services } from "@/components/services";
import { Gallery } from "@/components/gallery";
import { Process } from "@/components/process";
import { Videos } from "@/components/videos";
import { About } from "@/components/about";
import { Knowledge } from "@/components/knowledge";
import { Faq } from "@/components/faq";
import { ConsultationForm } from "@/components/consultation-form";
import { Footer } from "@/components/footer";
import { FloatingContact } from "@/components/floating-contact";
import { PromoModal } from "@/components/promo-modal";
import { getCmsData } from "@/lib/cms-store";
import { buildHomeMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsData();
  const keywords = cms.seo.keywords
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  return buildHomeMetadata(cms.seo.title, cms.seo.description, keywords);
}

export default function Home() {
  return (
    <>
      <SakuraPetals />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <TrustStrip />
          <Services />
          <Gallery />
          <Process />
          <Videos />
          <Knowledge />
          <About />
          <Faq />
          <ConsultationForm />
        </main>
        <Footer />
      </div>
      <FloatingContact />
      <PromoModal />
    </>
  );
}
