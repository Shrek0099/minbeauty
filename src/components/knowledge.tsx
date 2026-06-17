import Image from "next/image";
import Link from "next/link";
import { knowledgeArticles } from "@/lib/site-config";

export function Knowledge() {
  return (
    <section id="kien-thuc" className="site-section section-reveal knowledge-section">
      <div className="site-container">
        <div className="section-header-center mb-12 max-w-2xl md:mx-auto md:text-center">
          <p className="section-label mb-3">Kiến thức</p>
          <h2 className="section-heading">Kiến thức làm đẹp</h2>
          <div className="section-heading-accent" />
          <p className="section-subtitle mx-auto max-w-xl">
            Một vài thông tin tham khảo giúp bạn hiểu hơn trước khi lựa chọn dịch vụ
          </p>
        </div>

        <div className="knowledge-grid">
          {knowledgeArticles.map((article) => (
            <article key={article.id} className="news-card">
              <div className="news-card-media">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={480}
                  height={360}
                  className="boutique-card-image news-card-image"
                  loading="lazy"
                />
                <span className="news-category">{article.category}</span>
              </div>
              <div className="news-card-content boutique-card-body">
                <h3 className="news-title">{article.title}</h3>
                <p className="news-excerpt">{article.excerpt}</p>
                <Link href={`/blog/${article.slug}`} className="news-link">
                  Đọc thêm
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
