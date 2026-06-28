import { blogPosts } from "@/lib/blog";
import { faqItems as defaultFaqItems } from "@/lib/faq";
import { getActiveServices, localPageData } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";
import type { CmsData, CmsFaqItem, CmsPage, CmsPost, CmsService } from "@/lib/cms-types";

const now = "2026-06-24T00:00:00.000Z";

export const serviceGroupLabels = {
  cosmetic: "Dịch vụ thẩm mỹ",
} as const;

export const defaultCmsServices: CmsService[] = getActiveServices().map((service) => ({
  id: service.id,
  title: service.title,
  group: "cosmetic",
  image: service.heroImage,
  description: service.shortDescription,
  visible: true,
  sortOrder: service.order,
  updatedAt: now,
}));

export const defaultCmsPosts: CmsPost[] = blogPosts.map((post) => ({
  id: `post-${post.slug}`,
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
  updatedAt: now,
}));

export const defaultCmsFaqs: CmsFaqItem[] = defaultFaqItems.map((item, index) => ({
  id: `faq-${index + 1}`,
  question: item.question,
  answer: item.answer,
  order: index + 1,
  isActive: true,
  updatedAt: now,
}));

export const defaultCmsPages: CmsPage[] = [
  {
    key: "home",
    label: "Trang chủ",
    path: "/",
    seoTitle: `${siteConfig.name} - ${siteConfig.tagline}`,
    seoDescription: siteConfig.description,
    h1: siteConfig.name,
    intro: siteConfig.description,
    sections: [],
    updatedAt: now,
  },
  {
    key: "contact",
    label: "Liên hệ",
    path: "/contact",
    seoTitle: "Liên hệ & đặt lịch — Min Beauty",
    seoDescription: `Liên hệ Min Beauty tại ${siteConfig.fullAddress}. Hotline ${siteConfig.phone}.`,
    h1: "Đặt lịch tư vấn",
    intro: "Gửi hình hoặc nhắn Zalo để Min Beauty tư vấn trước khi đặt lịch.",
    sections: [],
    updatedAt: now,
  },
  {
    key: "faq",
    label: "FAQ",
    path: "/faq",
    seoTitle: "Câu hỏi thường gặp — Min Beauty",
    seoDescription:
      "Giải đáp câu hỏi về dịch vụ môi baby, filler, meso và chăm sóc da tại Min Beauty, Hòa Thành, Tây Ninh.",
    h1: "Câu hỏi thường gặp",
    intro: `Những thắc mắc phổ biến trước khi đặt lịch tại Min Beauty, ${siteConfig.city}.`,
    sections: [],
    updatedAt: now,
  },
  {
    key: "news",
    label: "Tin tức",
    path: "/news",
    seoTitle: "Tin tức làm đẹp — Min Beauty",
    seoDescription:
      "Tin tức và kiến thức về môi baby, filler, meso, chăm sóc da tại Min Beauty, Tây Ninh.",
    h1: "Kiến thức làm đẹp trước khi chọn dịch vụ",
    intro:
      "Tổng hợp các bài viết về môi baby, filler, meso, chăm sóc da và chăm sóc sau dịch vụ tại Min Beauty.",
    sections: [],
    updatedAt: now,
  },
  {
    key: "services",
    label: "Dịch vụ",
    path: "/services",
    seoTitle: "Dịch vụ làm đẹp tại Min Beauty, Tây Ninh",
    seoDescription:
      "Dịch vụ môi baby, filler, meso, chăm sóc da tại Min Beauty, Hòa Thành, Tây Ninh. Tư vấn miễn phí theo từng gương mặt.",
    h1: "Dịch vụ tại Min Beauty",
    intro: `Các dịch vụ được tư vấn theo tình trạng thực tế tại ${siteConfig.serviceAreaText}.`,
    sections: [],
    updatedAt: now,
  },
  {
    key: "local-seo",
    label: "Thẩm mỹ viện Tây Ninh",
    path: `/${localPageData.slug}`,
    seoTitle: localPageData.seoTitle,
    seoDescription: localPageData.seoDescription,
    h1: localPageData.h1,
    intro: localPageData.intro,
    sections: localPageData.sections,
    updatedAt: now,
  },
];

export const defaultCmsData: CmsData = {
  services: defaultCmsServices,
  seo: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    keywords: [
      "Min Beauty",
      "môi baby Tây Ninh",
      "filler Tây Ninh",
      "meso",
      "chăm sóc da",
      "thẩm mỹ Hòa Thành",
    ].join(", "),
    ogImage: siteConfig.ogImage,
    canonicalUrl: siteConfig.url,
    updatedAt: now,
  },
  posts: defaultCmsPosts,
  pages: defaultCmsPages,
  faqs: defaultCmsFaqs,
  updatedAt: now,
};

export const cmsMenuGroups = [
  {
    title: "Tổng quan",
    items: [
      {
        href: "/admin",
        label: "Dashboard",
        description: "Tổng quan CMS, tin tức và trang tĩnh.",
      },
    ],
  },
  {
    title: "Nội dung trang",
    items: [
      {
        href: "/admin/pages",
        label: "Trang tĩnh",
        description: "Chỉnh SEO và nội dung các trang chính.",
      },
      {
        href: "/admin/services",
        label: "Dịch vụ",
        description: "Quản lý dịch vụ hiển thị trên landing page.",
      },
    ],
  },
  {
    title: "Tin tức",
    items: [
      {
        href: "/admin/news",
        label: "Bài viết",
        description: "Thêm, sửa, xóa và xuất bản bài viết tin tức.",
      },
    ],
  },
  {
    title: "SEO & Quảng cáo",
    items: [
      {
        href: "/admin/seo",
        label: "SEO metadata",
        description: "Title, description, keywords và OG image toàn site.",
      },
      {
        href: "/admin/seo/google-ads",
        label: "Google Ads",
        description: "Hướng dẫn cấu hình tracking và conversion.",
      },
    ],
  },
  {
    title: "Phân tích",
    items: [
      {
        href: "/admin/analytics",
        label: "Visitor",
        description: "Theo dõi lượt truy cập và trang được xem nhiều.",
      },
    ],
  },
];

export const cmsPageKeys = defaultCmsPages.map((page) => page.key);
