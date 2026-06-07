import { galleryItems } from "@/lib/site-config";

export function Gallery() {
  return (
    <section id="hinh-anh" className="site-section section-reveal section-glow-light">
      <div className="site-container">
        <div className="section-header-center mb-12 max-w-2xl md:mx-auto md:text-center">
          <p className="section-label mb-3">Thực tế</p>
          <h2 className="section-heading">Hình ảnh thực tế</h2>
          <div className="section-heading-accent" />
          <p className="section-subtitle">
            Một số kết quả khách hàng tại Min Beauty
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <article key={item.id} className="before-after-card group">
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={`Kết quả ${item.service}`}
                  className="boutique-card-image aspect-[3/4]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="boutique-card-title">{item.service}</h3>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          Kết quả tùy thuộc tình trạng từng khách hàng.
        </p>
      </div>
    </section>
  );
}
