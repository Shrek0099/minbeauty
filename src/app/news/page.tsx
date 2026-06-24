import type { Metadata } from "next";
import { MijuBlogIndex } from "@/components/miju-blog";
import { buildPageMetadata } from "@/lib/seo";
import { getCategory } from "@/lib/blog";

type PageProps = { searchParams: Promise<{ category?: string }> };

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await searchParams;
  const category = categorySlug ? getCategory(categorySlug) : undefined;

  if (category) {
    return buildPageMetadata({
      path: `/news?category=${categorySlug}`,
      title: `${category.title} — Tin tức Min Beauty`,
      description: category.description,
    });
  }

  return buildPageMetadata({
    path: "/news",
    title: "Tin tức làm đẹp — Min Beauty",
    description:
      "Tin tức và kiến thức về môi baby, filler, meso, chăm sóc da tại Min Beauty, Tây Ninh.",
    keywords: ["tin tức làm đẹp", "môi baby", "filler", "chăm sóc da Tây Ninh"],
  });
}

export default async function NewsPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  return <MijuBlogIndex categorySlug={category} />;
}
