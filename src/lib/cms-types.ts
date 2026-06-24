export type CmsServiceGroup = "cosmetic";

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

export type CmsPostSection = {
  heading: string;
  body: string[];
};

export type CmsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  sections: CmsPostSection[];
  seoTitle: string;
  seoDescription: string;
  status: "draft" | "published";
  updatedAt: string;
};

export type CmsPageSection = {
  heading: string;
  paragraphs: string[];
};

export type CmsPageKey = "home" | "contact" | "faq" | "news" | "services" | "local-seo";

export type CmsPage = {
  key: CmsPageKey;
  label: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  sections: CmsPageSection[];
  updatedAt: string;
};

export type CmsFaqItem = {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
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
  posts: CmsPost[];
  pages: CmsPage[];
  faqs: CmsFaqItem[];
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
