import { siteConfig } from "@/lib/site-config";
import type { CmsData, CmsMenuGroup, CmsService } from "@/lib/cms-types";

const now = "2026-06-17T00:00:00.000Z";

export const serviceGroupLabels = {
  cosmetic: "Dịch vụ thẩm mỹ",
  spa: "Dịch vụ Spa",
} as const;

export const defaultCmsServices: CmsService[] = [
  {
    id: "moi-baby",
    title: "Môi baby",
    group: "cosmetic",
    image: "/images/services/moi-baby.jpg",
    description: "Tư vấn dáng môi mềm mại, tự nhiên và hài hòa với gương mặt.",
    visible: true,
    sortOrder: 1,
    updatedAt: now,
  },
  {
    id: "nang-tang-mat-giua",
    title: "Nâng tầng mặt giữa",
    group: "cosmetic",
    image: "/images/services/nang-tang-mat-giua.jpg",
    description: "Hỗ trợ gương mặt đầy đặn và cân đối hơn theo tình trạng thực tế.",
    visible: true,
    sortOrder: 2,
    updatedAt: now,
  },
  {
    id: "bong-mat-cuoi",
    title: "Bọng mắt cười",
    group: "cosmetic",
    image: "/images/services/bong-mat-cuoi.jpg",
    description: "Tạo điểm nhấn vùng mắt trẻ trung, phù hợp với nét mặt tự nhiên.",
    visible: true,
    sortOrder: 3,
    updatedAt: now,
  },
  {
    id: "lam-day-tran-hom",
    title: "Làm đầy trán hóm",
    group: "cosmetic",
    image: "/images/services/lam-day-tran-hom.jpg",
    description: "Tư vấn cải thiện vùng trán thiếu đầy để tổng thể gương mặt mềm hơn.",
    visible: true,
    sortOrder: 4,
    updatedAt: now,
  },
  {
    id: "meso",
    title: "Meso",
    group: "spa",
    image: "/images/services/meso.jpg",
    description: "Liệu trình hỗ trợ cấp ẩm, làm sáng và chăm sóc bề mặt da.",
    visible: true,
    sortOrder: 1,
    updatedAt: now,
  },
  {
    id: "tre-hoa-vung-mat",
    title: "Trẻ hóa vùng mắt",
    group: "spa",
    image: "/images/services/tre-hoa-vung-mat.jpg",
    description: "Chăm sóc vùng mắt theo tình trạng thực tế, ưu tiên vẻ tự nhiên.",
    visible: true,
    sortOrder: 2,
    updatedAt: now,
  },
  {
    id: "cham-soc-da",
    title: "Chăm sóc da",
    group: "spa",
    image: "/images/services/cham-soc-da.jpg",
    description: "Chăm sóc và phục hồi da theo nền da, thói quen và nhu cầu hiện tại.",
    visible: true,
    sortOrder: 3,
    updatedAt: now,
  },
  {
    id: "phuc-hoi-da",
    title: "Phục hồi da",
    group: "spa",
    image: "/images/services/phuc-hoi-da.jpg",
    description: "Hỗ trợ da nhạy cảm, thiếu ẩm hoặc cần phục hồi hàng rào bảo vệ.",
    visible: true,
    sortOrder: 4,
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
      "spa Hòa Thành",
    ].join(", "),
    ogImage: siteConfig.ogImage,
    canonicalUrl: siteConfig.url,
    updatedAt: now,
  },
  updatedAt: now,
};

export const cmsMenuGroups: CmsMenuGroup[] = [
  {
    title: "Nội dung",
    items: [
      {
        href: "/admin",
        label: "Tổng quan",
        description: "Tình trạng CMS và các thao tác nhanh.",
      },
      {
        href: "/admin/services",
        label: "Dịch vụ",
        description: "Tạo, sửa, sắp xếp và đổi hình dịch vụ.",
      },
    ],
  },
  {
    title: "Tăng trưởng",
    items: [
      {
        href: "/admin/seo",
        label: "SEO",
        description: "Quản lý title, description, keyword và ảnh chia sẻ.",
      },
      {
        href: "/admin/analytics",
        label: "Visitor",
        description: "Theo dõi số lượt truy cập và trang được xem nhiều.",
      },
      {
        href: "/admin/seo/google-ads",
        label: "Google Ads",
        description: "Theo dõi ngân sách, chiến dịch và trang đích quảng cáo.",
      },
    ],
  },
];
