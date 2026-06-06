import { siteConfig } from "@/lib/site-config";

export function About() {
  return (
    <section id="gioi-thieu" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b0a?w=500&h=600&fit=crop"
              alt="Cơ sở vật chất Min Beauty"
              className="rounded-2xl object-cover shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&h=600&fit=crop"
              alt="Phòng điều trị Min Beauty"
              className="mt-8 rounded-2xl object-cover shadow-lg"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold tracking-widest text-gold uppercase">
              Về chúng tôi
            </p>
            <h2 className="section-title mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Thẩm mỹ viện{" "}
              <span className="text-primary">Min Beauty</span>
            </h2>
            <h3 className="section-title mb-6 text-xl text-gold md:text-2xl">
              Cơ sở vật chất chuẩn 5 sao
            </h3>
            <p className="mb-4 leading-relaxed text-muted">
              Tọa lạc tại trung tâm {siteConfig.city}, Min Beauty sở hữu không
              gian sang trọng – hiện đại – chuẩn y khoa. Hệ thống máy móc công
              nghệ cao được đầu tư đồng bộ, mang đến trải nghiệm làm đẹp an
              toàn, đẳng cấp và thoải mái cho mỗi khách hàng.
            </p>
            <p className="mb-8 leading-relaxed text-muted">
              Với đội ngũ bác sĩ giàu kinh nghiệm và quy trình chăm sóc chu
              đáo, chúng tôi tự hào là địa chỉ làm đẹp được tin tưởng bởi hàng
              nghìn khách hàng.
            </p>
            <a
              href="#tu-van"
              className="inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Liên hệ tư vấn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
