import { Calendar } from "lucide-react";
import { newsArticles } from "@/lib/site-config";

export function News() {
  return (
    <section id="tin-tuc" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="section-title mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Tin Tức
          </h2>
          <p className="text-muted">
            Cập nhật kiến thức làm đẹp và xu hướng mới nhất
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newsArticles.map((article) => (
            <article
              key={article.slug}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center gap-1.5 text-xs text-muted">
                  <Calendar className="h-3.5 w-3.5" />
                  {article.date}
                </div>
                <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-muted">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
