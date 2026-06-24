import Image from "next/image";

export function Hero() {
  return (
    <section className="hero hero-fade-in" aria-label="Min Beauty">
      <h1 className="sr-only">
        Min Beauty — Môi, filler, trẻ hóa và chăm sóc da tự nhiên, nhẹ nhàng.
      </h1>

      <div className="hero-banner">
        <Image
          src="/images/hero/min-beauty-hero.jpg"
          alt="Min Beauty — Nâng tầm nhan sắc, tỏa sáng tự tin. Chuyên H.A, Filler, Botox, Meso, BAP"
          width={1024}
          height={512}
          priority
          unoptimized
          sizes="100vw"
          className="hero-banner-img"
        />
      </div>

      <div className="hero-divider" aria-hidden="true" />
    </section>
  );
}
