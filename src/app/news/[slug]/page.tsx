import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MijuArticlePage } from "@/components/miju-blog";
import { PageSchema } from "@/components/page-schema";
import { getBlogPost, getPublishedBlogPosts, getRelatedBlogPosts } from "@/lib/cms-content";
import { getCategory } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo";
import { buildBlogPostSchema } from "@/lib/schema";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Bài viết không tồn tại" };

  return buildPageMetadata({
    path: `/news/${slug}`,
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.tags,
    ogImage: post.image,
    ogType: "article",
  });
}

export default async function NewsPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const category = getCategory(post.category);
  const relatedPosts = await getRelatedBlogPosts(post);

  return (
    <>
      <PageSchema data={buildBlogPostSchema(post, category?.title ?? "Tin tức")} />
      <MijuArticlePage post={post} relatedPosts={relatedPosts} />
    </>
  );
}
