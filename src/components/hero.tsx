import Image from "next/image";

const floatingDots = [
  { top: "12%", left: "6%", delay: "0s" },
  { top: "22%", right: "8%", delay: "2s" },
  { top: "68%", left: "12%", delay: "4s" },
  { top: "78%", right: "14%", delay: "1s" },
  { top: "40%", left: "48%", delay: "3s" },
];

export function Hero() {
  return (
    <section className="hero hero-fade-in" aria-label="Min Beauty">
      <h1 className="sr-only">
        Min Beauty — Môi, filler, trẻ hóa và chăm sóc da tự nhiên, nhẹ nhàng.
      </h1>

      <div className="hero-banner">
        <Image
          src="/images/hero/min-beauty-hero.webp"
          alt="Min Beauty — Reveal Your Natural Beauty"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero-banner-img"
        />
      </div>

      {floatingDots.map((dot, i) => (
        <span
          key={i}
          className={i % 2 === 0 ? "floating-luxury-dot" : "floating-luxury-petal"}
          style={{
            top: dot.top,
            left: dot.left,
            right: dot.right,
            animationDelay: dot.delay,
          }}
          aria-hidden="true"
        />
      ))}

      <div className="hero-divider" aria-hidden="true" />
    </section>
  );
}
