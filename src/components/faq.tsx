import Link from "next/link";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section id="faq" className="site-section section-reveal faq-section">
      <div className="site-container">
        <div className="section-header-center mb-12 max-w-2xl md:mx-auto md:text-center">
          <p className="section-label mb-3">Câu hỏi thường gặp</p>
          <h2 className="section-heading">Thông tin cần biết trước khi tư vấn</h2>
          <div className="section-heading-accent" />
          <p className="section-subtitle">
            Những câu trả lời ngắn giúp khách hàng từ Facebook và Google Ads hiểu rõ hơn trước khi liên hệ.
          </p>
        </div>

        <div className="faq-grid">
          {items.map((item) => (
            <article key={item.id} className="faq-card">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/faq" className="news-link">
            Xem tất cả câu hỏi
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
