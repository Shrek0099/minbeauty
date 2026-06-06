import { siteConfig } from "@/lib/site-config";

export function About() {
  return (
    <section id="gioi-thieu" className="site-section section-reveal about-section">
      <div className="site-container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="section-label mb-3">Giới thiệu</p>
            <h2 className="section-heading mb-0">Về Min Beauty</h2>
            <div className="section-heading-accent" />
            <p className="section-subtitle">
              Min Beauty là cơ sở làm đẹp nhỏ, tập trung vào sự chỉn chu trong từng dịch vụ.
              Chúng tôi ưu tiên tư vấn rõ ràng, thực hiện phù hợp với gương mặt và mong muốn
              của từng khách hàng.
            </p>
          </div>

          <div className="relative">
            <div className="about-image-card">
              <img
                src="/images/about/facility.jpg"
                alt={`Không gian ${siteConfig.name}`}
                className="boutique-card-image aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
