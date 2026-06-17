export type CmsServiceGroup = "cosmetic" | "spa";

export type CmsService = {
  id: string;
  title: string;
  group: CmsServiceGroup;
  image: string;
  description: string;
  visible: boolean;
  sortOrder: number;
  updatedAt: string;
};

export type CmsSeoSettings = {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
  updatedAt: string;
};

export type CmsMenuGroup = {
  title: string;
  items: {
    href: string;
    label: string;
    description: string;
  }[];
};

export type CmsData = {
  services: CmsService[];
  seo: CmsSeoSettings;
  updatedAt: string;
};

export type AnalyticsPageView = {
  id: string;
  path: string;
  referrer: string;
  visitorId: string;
  userAgent: string;
  createdAt: string;
};

export type AnalyticsData = {
  pageViews: AnalyticsPageView[];
};

export type AnalyticsSummary = {
  totalViews: number;
  uniqueVisitors: number;
  todayViews: number;
  topPages: { path: string; views: number }[];
  recentViews: AnalyticsPageView[];
};
