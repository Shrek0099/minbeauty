import Image from "next/image";

const heroPetals = [
  { top: "18%", left: "11%", size: 20, duration: 21, delay: -2, color: "#FBE8E7", opacity: 0.12, rotate: -16 },
  { top: "28%", left: "84%", size: 26, duration: 24, delay: -8, color: "#EFC3C8", opacity: 0.1, rotate: 14 },
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

        <div className="hero-luxury-petals" aria-hidden="true">
          {heroPetals.map((petal, i) => (
            <span
              key={i}
              className="luxury-sakura-petal"
              style={{
                top: petal.top,
                left: petal.left,
                width: `${petal.size}px`,
                height: `${petal.size * 1.12}px`,
                backgroundColor: petal.color,
                opacity: petal.opacity,
                ["--luxury-duration" as string]: `${petal.duration}s`,
                ["--luxury-delay" as string]: `${petal.delay}s`,
                ["--luxury-rotate" as string]: `${petal.rotate}deg`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="hero-divider" aria-hidden="true" />
    </section>
  );
}
