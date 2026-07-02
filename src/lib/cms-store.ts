import { promises as fs } from "node:fs";
import path from "node:path";
import { defaultCmsData, buildCatalogCmsServices, mergeCatalogCmsServices } from "@/lib/cms-defaults";
import type {
  AnalyticsData,
  AnalyticsPageView,
  AnalyticsSummary,
  CmsData,
  CmsFaqItem,
  CmsPage,
  CmsPost,
  CmsService,
  CmsServiceMediaItem,
} from "@/lib/cms-types";
import { resolveStorageUrl } from "@/lib/image-url";
import { getYoutubeEmbedUrl } from "@/lib/youtube";

const cmsDir = path.join(process.cwd(), ".cms");
const cmsPath = path.join(cmsDir, "cms-store.json");
const analyticsPath = path.join(cmsDir, "analytics-store.json");

const maxStoredPageViews = 5000;

function isWritableRuntime() {
  return process.env.NODE_ENV !== "production" || process.env.CMS_ALLOW_FILE_WRITES === "true";
}

async function ensureCmsDir() {
  await fs.mkdir(cmsDir, { recursive: true });
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(filePath: string, data: T) {
  if (!isWritableRuntime()) return;
  await ensureCmsDir();
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function normalizeServiceMediaItem(item: CmsServiceMediaItem): CmsServiceMediaItem | null {
  const now = new Date().toISOString();
  const type = item.type === "youtube" ? "youtube" : "image";
  const url = item.url.trim();

  if (!url) return null;
  if (type === "youtube" && !getYoutubeEmbedUrl(url)) return null;

  return {
    id: item.id || crypto.randomUUID(),
    type,
    url: type === "image" ? resolveStorageUrl(url) : url,
    caption: item.caption.trim(),
    sortOrder: Number.isFinite(item.sortOrder) ? Number(item.sortOrder) : 999,
    updatedAt: item.updatedAt || now,
  };
}

function normalizeServiceMedia(
  stored: Record<string, CmsServiceMediaItem[]> | undefined,
): Record<string, CmsServiceMediaItem[]> {
  const result: Record<string, CmsServiceMediaItem[]> = {};

  for (const [serviceId, items] of Object.entries(stored || {})) {
    const normalized = (items || [])
      .map(normalizeServiceMediaItem)
      .filter((item): item is CmsServiceMediaItem => Boolean(item))
      .sort((a, b) => a.sortOrder - b.sortOrder);

    if (normalized.length > 0) {
      result[serviceId] = normalized;
    }
  }

  return result;
}

function normalizeService(service: CmsService & { image?: string }): CmsService {
  const now = new Date().toISOString();

  return {
    id: service.id || crypto.randomUUID(),
    title: service.title.trim(),
    group: "cosmetic",
    homeImage: resolveStorageUrl((service.homeImage || service.image || "").trim()),
    description: service.description.trim(),
    visible: Boolean(service.visible),
    sortOrder: Number.isFinite(service.sortOrder) ? Number(service.sortOrder) : 999,
    updatedAt: service.updatedAt || now,
  };
}

function normalizePost(post: CmsPost): CmsPost {
  const now = new Date().toISOString();

  return {
    id: post.id || crypto.randomUUID(),
    slug: post.slug.trim().toLowerCase().replace(/\s+/g, "-"),
    title: post.title.trim(),
    excerpt: post.excerpt.trim(),
    category: post.category.trim(),
    date: post.date.trim(),
    readTime: post.readTime.trim(),
    tags: (post.tags || []).map((tag) => tag.trim()).filter(Boolean),
    image: post.image.trim(),
    sections: (post.sections || []).map((section) => ({
      heading: section.heading.trim(),
      body: (section.body || []).map((line) => line.trim()).filter(Boolean),
    })),
    seoTitle: post.seoTitle.trim(),
    seoDescription: post.seoDescription.trim(),
    status: post.status === "draft" ? "draft" : "published",
    updatedAt: post.updatedAt || now,
  };
}

function normalizePage(page: CmsPage): CmsPage {
  const now = new Date().toISOString();
  const defaults = defaultCmsData.pages.find((item) => item.key === page.key);

  return {
    key: page.key,
    label: (page.label || defaults?.label || page.key).trim(),
    path: (page.path || defaults?.path || "/").trim(),
    seoTitle: page.seoTitle.trim(),
    seoDescription: page.seoDescription.trim(),
    h1: page.h1.trim(),
    intro: page.intro.trim(),
    sections: (page.sections || []).map((section) => ({
      heading: section.heading.trim(),
      paragraphs: (section.paragraphs || []).map((line) => line.trim()).filter(Boolean),
    })),
    updatedAt: page.updatedAt || now,
  };
}

function normalizeFaq(item: CmsFaqItem): CmsFaqItem {
  const now = new Date().toISOString();

  return {
    id: item.id || crypto.randomUUID(),
    question: item.question.trim(),
    answer: item.answer.trim(),
    order: Number.isFinite(item.order) ? Number(item.order) : 999,
    isActive: item.isActive !== false,
    updatedAt: item.updatedAt || now,
  };
}

function mergePages(stored: CmsPage[] | undefined): CmsPage[] {
  const storedMap = new Map((stored || []).map((page) => [page.key, page]));

  return defaultCmsData.pages.map((defaultPage) => {
    const saved = storedMap.get(defaultPage.key);
    return normalizePage(saved ? { ...defaultPage, ...saved } : defaultPage);
  });
}

export async function getCmsData(): Promise<CmsData> {
  const stored = await readJson<Partial<CmsData>>(cmsPath, defaultCmsData);

  return {
    ...defaultCmsData,
    ...stored,
    seo: {
      ...defaultCmsData.seo,
      ...stored.seo,
    },
    services: mergeCatalogCmsServices(stored.services),
    serviceMedia: normalizeServiceMedia(stored.serviceMedia),
    posts: (stored.posts?.length ? stored.posts : defaultCmsData.posts)
      .map(normalizePost)
      .sort((a, b) => b.date.localeCompare(a.date)),
    pages: mergePages(stored.pages),
    faqs: (stored.faqs?.length ? stored.faqs : defaultCmsData.faqs)
      .map(normalizeFaq)
      .sort((a, b) => a.order - b.order),
  };
}

export async function saveCmsData(data: CmsData): Promise<CmsData> {
  const now = new Date().toISOString();
  const normalized: CmsData = {
    services: data.services.map((service) => ({
      ...normalizeService(service),
      updatedAt: service.updatedAt || now,
    })),
    serviceMedia: normalizeServiceMedia(data.serviceMedia),
    seo: {
      ...defaultCmsData.seo,
      ...data.seo,
      title: data.seo.title.trim(),
      description: data.seo.description.trim(),
      keywords: data.seo.keywords.trim(),
      ogImage: data.seo.ogImage.trim(),
      canonicalUrl: data.seo.canonicalUrl.trim(),
      updatedAt: now,
    },
    posts: data.posts.map((post) => ({
      ...normalizePost(post),
      updatedAt: post.updatedAt || now,
    })),
    pages: mergePages(data.pages).map((page) => ({
      ...page,
      updatedAt: page.updatedAt || now,
    })),
    faqs: data.faqs.map((item) => ({
      ...normalizeFaq(item),
      updatedAt: item.updatedAt || now,
    })),
    updatedAt: now,
  };

  await writeJson(cmsPath, normalized);
  return normalized;
}

export async function getAnalyticsData(): Promise<AnalyticsData> {
  return readJson<AnalyticsData>(analyticsPath, { pageViews: [] });
}

export async function recordPageView(view: Omit<AnalyticsPageView, "id" | "createdAt">) {
  const analytics = await getAnalyticsData();
  const pageView: AnalyticsPageView = {
    ...view,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const pageViews = [pageView, ...analytics.pageViews].slice(0, maxStoredPageViews);
  await writeJson(analyticsPath, { pageViews });

  return pageView;
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const { pageViews } = await getAnalyticsData();
  const today = new Date().toISOString().slice(0, 10);
  const uniqueVisitors = new Set(pageViews.map((view) => view.visitorId)).size;
  const pageCounts = new Map<string, number>();

  for (const view of pageViews) {
    pageCounts.set(view.path, (pageCounts.get(view.path) || 0) + 1);
  }

  return {
    totalViews: pageViews.length,
    uniqueVisitors,
    todayViews: pageViews.filter((view) => view.createdAt.startsWith(today)).length,
    topPages: Array.from(pageCounts.entries())
      .map(([pathName, views]) => ({ path: pathName, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 8),
    recentViews: pageViews.slice(0, 20),
  };
}

export function canPersistCmsData() {
  return isWritableRuntime();
}
