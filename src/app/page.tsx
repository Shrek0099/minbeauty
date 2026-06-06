import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Commitments } from "@/components/commitments";
import { Gallery } from "@/components/gallery";
import { Stats } from "@/components/stats";
import { About } from "@/components/about";
import { News } from "@/components/news";
import { ConsultationForm } from "@/components/consultation-form";
import { Footer } from "@/components/footer";
import { FloatingContact } from "@/components/floating-contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Commitments />
        <Gallery />
        <Stats />
        <About />
        <News />
        <ConsultationForm />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
