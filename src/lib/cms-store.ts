import { promises as fs } from "node:fs";
import path from "node:path";
import { defaultCmsData } from "@/lib/cms-defaults";
import type {
  AnalyticsData,
  AnalyticsPageView,
  AnalyticsSummary,
  CmsData,
  CmsService,
} from "@/lib/cms-types";

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

function normalizeService(service: CmsService): CmsService {
  const now = new Date().toISOString();

  return {
    id: service.id || crypto.randomUUID(),
    title: service.title.trim(),
    group: service.group === "spa" ? "spa" : "cosmetic",
    image: service.image.trim(),
    description: service.description.trim(),
    visible: Boolean(service.visible),
    sortOrder: Number.isFinite(service.sortOrder) ? Number(service.sortOrder) : 999,
    updatedAt: service.updatedAt || now,
  };
}

export async function getCmsData(): Promise<CmsData> {
  const stored = await readJson<CmsData>(cmsPath, defaultCmsData);

  return {
    ...defaultCmsData,
    ...stored,
    seo: {
      ...defaultCmsData.seo,
      ...stored.seo,
    },
    services: (stored.services?.length ? stored.services : defaultCmsData.services)
      .map(normalizeService)
      .sort((a, b) => a.group.localeCompare(b.group) || a.sortOrder - b.sortOrder),
  };
}

export async function saveCmsData(data: CmsData): Promise<CmsData> {
  const now = new Date().toISOString();
  const normalized: CmsData = {
    services: data.services.map((service) => ({
      ...normalizeService(service),
      updatedAt: service.updatedAt || now,
    })),
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
