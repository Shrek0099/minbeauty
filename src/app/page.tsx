import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { LuxuryAtmosphere } from "@/components/luxury-atmosphere";
import { Services } from "@/components/services";
import { Gallery } from "@/components/gallery";
import { Process } from "@/components/process";
import { Videos } from "@/components/videos";
import { About } from "@/components/about";
import { Knowledge } from "@/components/knowledge";
import { ConsultationForm } from "@/components/consultation-form";
import { Footer } from "@/components/footer";
import { FloatingContact } from "@/components/floating-contact";

export default function Home() {
  return (
    <>
      <LuxuryAtmosphere />
      <div className="relative z-[2]">
        <Header />
        <main>
          <Hero />
          <Services />
          <Gallery />
          <Process />
          <Videos />
          <Knowledge />
          <About />
          <ConsultationForm />
        </main>
        <Footer />
      </div>
      <FloatingContact />
    </>
  );
}
