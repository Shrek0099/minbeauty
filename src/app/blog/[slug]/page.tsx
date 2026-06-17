import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MijuArticlePage } from "@/components/miju-blog";
import { blogPosts, getCategory, getPost } from "@/lib/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {
      title: {
        absolute: "Bài viết không tồn tại | Min Beauty Blog",
      },
    };
  }

  const category = getCategory(post.category);

  return {
    title: {
      absolute: `${post.title} | Min Beauty Blog`,
    },
    description: post.excerpt,
    keywords: [...post.tags, category?.title ?? "Min Beauty Blog"],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return <MijuArticlePage post={post} />;
}
