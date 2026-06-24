import type { BlogPost } from "@/lib/blog";
import { getCmsData } from "@/lib/cms-store";
import type { CmsFaqItem, CmsPage, CmsPageKey, CmsPost } from "@/lib/cms-types";

export function cmsPostToBlogPost(post: CmsPost): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    tags: post.tags,
    image: post.image,
    sections: post.sections,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    status: post.status,
  };
}

export async function getCmsPosts(): Promise<CmsPost[]> {
  const cms = await getCmsData();
  return cms.posts;
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getCmsPosts();
  return posts.filter((post) => post.status === "published").map(cmsPostToBlogPost);
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getPublishedBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getRelatedBlogPosts(post: BlogPost): Promise<BlogPost[]> {
  const posts = await getPublishedBlogPosts();
  return posts.filter((item) => item.category === post.category && item.slug !== post.slug).slice(0, 3);
}

export async function getCategoryPosts(categorySlug: string): Promise<BlogPost[]> {
  const posts = await getPublishedBlogPosts();
  return posts.filter((post) => post.category === categorySlug);
}

export async function getCmsPage(key: CmsPageKey): Promise<CmsPage> {
  const cms = await getCmsData();
  const page = cms.pages.find((item) => item.key === key);
  if (!page) {
    throw new Error(`CMS page not found: ${key}`);
  }
  return page;
}

export async function getCmsFaqs(): Promise<CmsFaqItem[]> {
  const cms = await getCmsData();
  return cms.faqs.filter((item) => item.isActive);
}
