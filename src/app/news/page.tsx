import type { Metadata } from "next";
import { MijuBlogIndex } from "@/components/miju-blog";
import { getCategoryPosts, getCmsPage, getPublishedBlogPosts } from "@/lib/cms-content";
import { buildPageMetadata } from "@/lib/seo";
import { getCategory } from "@/lib/blog";

type PageProps = { searchParams: Promise<{ category?: string }> };

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await searchParams;
  const category = categorySlug ? getCategory(categorySlug) : undefined;
  const page = await getCmsPage("news");

  if (category) {
    return buildPageMetadata({
      path: `/news?category=${categorySlug}`,
      title: `${category.title} — Tin tức Min Beauty`,
      description: category.description,
    });
  }

  return buildPageMetadata({
    path: "/news",
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: ["tin tức làm đẹp", "môi baby", "filler", "chăm sóc da Tây Ninh"],
  });
}

export default async function NewsPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const page = await getCmsPage("news");
  const posts = category ? await getCategoryPosts(category) : await getPublishedBlogPosts();

  return (
    <MijuBlogIndex
      categorySlug={category}
      posts={posts}
      heroTitle={page.h1}
      heroDescription={page.intro}
    />
  );
}
