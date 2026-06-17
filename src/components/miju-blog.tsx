import Link from "next/link";
import { blogCategories, blogPosts, getCategory, getRelatedPosts, type BlogPost } from "@/lib/blog";

function BlogHeader() {
  return (
    <header className="miju-blog-header">
      <div className="site-container">
        <div className="miju-blog-nav">
          <Link href="/blog" className="miju-blog-brand" aria-label="Min Beauty Blog">
            Min Beauty <span>Blog</span>
          </Link>
          <nav className="miju-blog-nav-links" aria-label="Chuyên mục blog">
            {blogCategories.map((category) => (
              <Link key={category.slug} href={`/${category.slug}`}>
                {category.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function BlogHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="miju-blog-hero">
      <div className="site-container">
        <div className="miju-blog-hero-card">
          <p className="miju-blog-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}

function CategoryPills() {
  return (
    <div className="miju-category-pills" aria-label="Danh sách chuyên mục">
      {blogCategories.map((category) => (
        <Link key={category.slug} href={`/${category.slug}`}>
          {category.title}
        </Link>
      ))}
    </div>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  const category = getCategory(post.category);

  return (
    <article className="miju-post-card">
      <div className="miju-post-card-accent" aria-hidden="true" />
      <div className="miju-post-meta">
        <span>{category?.title}</span>
        <span>{post.readTime}</span>
      </div>
      <h2>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p>{post.excerpt}</p>
      <div className="miju-post-tags">
        {post.tags.slice(0, 3).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <Link href={`/blog/${post.slug}`} className="miju-read-link">
        Đọc bài viết
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

export function MijuBlogIndex() {
  return (
    <div className="miju-blog-page">
      <BlogHeader />
      <main>
        <BlogHero
          eyebrow="Min Beauty Blog"
          title="Kiến thức làm đẹp trước khi chọn dịch vụ"
          description="Tổng hợp các bài viết về môi baby, filler, meso, chăm sóc da và chăm sóc sau dịch vụ tại Min Beauty."
        />

        <section className="miju-blog-section">
          <div className="site-container">
            <CategoryPills />
            <div className="miju-blog-section-heading">
              <p className="miju-blog-eyebrow">Bài viết mới</p>
              <h2>Nên đọc trước khi tư vấn</h2>
            </div>
            <div className="miju-post-grid">
              {blogPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export function MijuCategoryPage({ categorySlug }: { categorySlug: string }) {
  const category = getCategory(categorySlug);
  const posts = blogPosts.filter((post) => post.category === categorySlug);

  if (!category) return null;

  return (
    <div className="miju-blog-page">
      <BlogHeader />
      <main>
        <BlogHero eyebrow="Chuyên mục" title={category.title} description={category.description} />

        <section className="miju-blog-section">
          <div className="site-container">
            <CategoryPills />
            <div className="miju-post-grid">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export function MijuArticlePage({ post }: { post: BlogPost }) {
  const category = getCategory(post.category);
  const relatedPosts = getRelatedPosts(post);

  return (
    <div className="miju-blog-page">
      <BlogHeader />
      <main>
        <article className="miju-article">
          <div className="site-container">
            <div className="miju-article-shell">
              <Link href={category ? `/${category.slug}` : "/blog"} className="miju-back-link">
                ← {category?.title ?? "Blog"}
              </Link>
              <div className="miju-post-meta">
                <span>{category?.title}</span>
                <span>{post.readTime}</span>
              </div>
              <h1>{post.title}</h1>
              <p className="miju-article-excerpt">{post.excerpt}</p>
              <div className="miju-post-tags">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="miju-article-body">
                {post.sections.map((section) => (
                  <section key={section.heading}>
                    <h2>{section.heading}</h2>
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="miju-blog-section">
            <div className="site-container">
              <div className="miju-blog-section-heading">
                <p className="miju-blog-eyebrow">Đọc thêm</p>
                <h2>Cùng chuyên mục</h2>
              </div>
              <div className="miju-post-grid miju-post-grid-related">
                {relatedPosts.map((item) => (
                  <PostCard key={item.slug} post={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
