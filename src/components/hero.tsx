import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-2 md:py-24 lg:py-32">
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-gold uppercase">
            Thẩm mỹ viện uy tín
          </p>
          <h1 className="section-title mb-4 text-4xl leading-tight font-bold text-foreground md:text-5xl lg:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="section-title mb-6 text-2xl text-primary md:text-3xl">
            {siteConfig.tagline}
          </p>
          <p className="mb-8 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            {siteConfig.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#tu-van"
              className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Bạn cần tư vấn
            </a>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="rounded-full border-2 border-primary px-8 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-light"
            >
              Gọi ngay: {siteConfig.phone}
            </a>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=1000&fit=crop"
              alt="Không gian thẩm mỹ viện Min Beauty"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-xl bg-white p-4 shadow-lg">
            <p className="section-title text-3xl font-bold text-primary">5+</p>
            <p className="text-sm text-muted">Năm kinh nghiệm</p>
          </div>
        </div>
      </div>
    </section>
  );
}
