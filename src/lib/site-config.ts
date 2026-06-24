const fullAddress =
  "61A, hẻm 24 Trịnh Phong Đáng, Trường Giang, Trường Tây, Hòa Thành, Tây Ninh";

const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  vercelProductionUrl ||
  "https://minbeauty.vercel.app"
).replace(/\/$/, "");

export const siteConfig = {
  name: "Min Beauty",
  tagline: "Làm đẹp tự nhiên, nhẹ nhàng",
  description:
    "Min Beauty tập trung vào các dịch vụ môi, filler, trẻ hóa da và chăm sóc da. Mỗi khách hàng được tư vấn theo tình trạng thực tế trước khi thực hiện.",
  url: siteUrl,
  logo: "/images/logo/min-beauty-logo.png",
  ogImage: "/images/hero/min-beauty-hero.jpg",
  phone: "0971.700.952",
  phoneRaw: "+84971700952",
  email: "info@minbeauty.vn",
  address: "61A, hẻm 24 Trịnh Phong Đáng",
  city: "Hòa Thành, Tây Ninh",
  fullAddress,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
  hours: "8:00 - 20:00, Thứ Hai đến Chủ nhật",
  zalo: "0971700952",
  facebook: "https://facebook.com/minbeauty",
  instagram: "https://instagram.com/minbeauty",
  serviceAreaText: "Hòa Thành, Tây Ninh và khu vực lân cận",
  postalCode: "80000",
  geo: {
    latitude: 11.3105,
    longitude: 106.0973,
  },
  googleSiteVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
  localPageSlug: "tham-my-vien-hoa-thanh-tay-ninh",
  promoModal: {
    enabled: false,
    showOncePerSession: true,
    image: "/images/promo/promo-modal.jpg",
    title: "Min Beauty",
    subtitle: "Tư vấn dịch vụ phù hợp với từng gương mặt",
    buttonText: "Đăng ký tư vấn",
  },
};

export const promoModalServices = [
  "Môi baby",
  "Nâng tầng mặt giữa",
  "Bọng mắt cười",
  "Làm đầy trán hóm",
  "Meso",
  "Trẻ hóa vùng mắt",
  "Chăm sóc da",
];

type HeaderNavLink = { href: string; label: string };
type HeaderNavDropdown = { label: string; dropdown: HeaderNavLink[] };
export type HeaderNavItem = HeaderNavLink | HeaderNavDropdown;

export const headerNavItems: HeaderNavItem[] = [
  { href: "/", label: "Trang chủ" },
  {
    label: "Dịch vụ",
    dropdown: [
      { href: "/services", label: "Tất cả dịch vụ" },
      { href: "/services/moi-baby", label: "Môi baby" },
      { href: "/services/nang-tang-mat-giua", label: "Nâng tầng mặt giữa" },
      { href: "/services/meso", label: "Meso" },
      { href: "/services/cham-soc-da", label: "Chăm sóc da" },
    ],
  },
  { href: "/#hinh-anh", label: "Hình ảnh thực tế" },
  { href: "/#video", label: "Video" },
  { href: "/news", label: "Tin tức" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Liên hệ" },
];

export const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/services", label: "Dịch vụ" },
  { href: "/#hinh-anh", label: "Hình ảnh thực tế" },
  { href: "/#video", label: "Video" },
  { href: "/news", label: "Tin tức" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Liên hệ" },
];

export const cosmeticServices = [
  {
    id: "moi-baby",
    title: "Môi baby",
    image: "/images/services/moi-baby.jpg",
  },
  {
    id: "nang-tang-mat-giua",
    title: "Nâng tầng mặt giữa",
    image: "/images/services/nang-tang-mat-giua.jpg",
  },
  {
    id: "bong-mat-cuoi",
    title: "Bọng mắt cười",
    image: "/images/services/bong-mat-cuoi.jpg",
  },
  {
    id: "lam-day-tran-hom",
    title: "Làm đầy trán hóm",
    image: "/images/services/lam-day-tran-hom.jpg",
  },
];

export const spaServices = [
  {
    id: "meso",
    title: "Meso",
    image: "/images/services/meso.jpg",
  },
  {
    id: "tre-hoa-vung-mat",
    title: "Trẻ hóa vùng mắt",
    image: "/images/services/tre-hoa-vung-mat.jpg",
  },
  {
    id: "cham-soc-da",
    title: "Chăm sóc da",
    image: "/images/services/cham-soc-da.jpg",
  },
  {
    id: "phuc-hoi-da",
    title: "Phục hồi da",
    image: "/images/services/phuc-hoi-da.jpg",
  },
];

export const services = [...cosmeticServices, ...spaServices];

export const galleryItems = [
  {
    id: "1",
    service: "Môi baby",
    image: "/images/gallery/moi-baby.jpg",
  },
  {
    id: "2",
    service: "Nâng tầng mặt giữa",
    image: "/images/gallery/nang-tang-mat-giua.jpg",
  },
  {
    id: "3",
    service: "Trẻ hóa vùng mắt",
    image: "/images/gallery/tre-hoa-vung-mat.jpg",
  },
];

export const processSteps = [
  {
    step: 1,
    title: "Gửi hình hoặc đến trực tiếp",
    description: "Bạn có thể gửi hình qua Zalo hoặc đến cơ sở để trao đổi trực tiếp.",
  },
  {
    step: 2,
    title: "Tư vấn theo tình trạng thực tế",
    description: "Chúng tôi lắng nghe mong muốn và xem xét tình trạng hiện tại của bạn.",
  },
  {
    step: 3,
    title: "Thống nhất dịch vụ phù hợp",
    description: "Cùng thảo luận và chọn phương án phù hợp với gương mặt của bạn.",
  },
  {
    step: 4,
    title: "Thực hiện và hướng dẫn chăm sóc sau dịch vụ",
    description: "Sau khi thực hiện, bạn sẽ được hướng dẫn cách chăm sóc tại nhà.",
  },
];

export const knowledgeArticles = [
  {
    id: "1",
    slug: "moi-baby-la-gi",
    category: "Môi",
    title: "Môi Baby là gì? Những điều nên biết trước khi thực hiện",
    excerpt:
      "Môi Baby hướng đến dáng môi mềm mại, tự nhiên và hài hòa với gương mặt. Trước khi thực hiện, bạn nên được tư vấn kỹ về dáng môi, chất liệu và cách chăm sóc sau dịch vụ.",
    image: "/images/news/moi-baby-la-gi.jpg",
  },
  {
    id: "2",
    slug: "khi-nao-nen-lam-day-tang-mat-giua",
    category: "Filler",
    title: "Khi nào nên làm đầy tầng mặt giữa?",
    excerpt:
      "Vùng mặt giữa có thể trông thiếu đầy đặn do cơ địa hoặc thay đổi theo thời gian. Việc tư vấn trực tiếp giúp xác định phương án phù hợp với từng gương mặt.",
    image: "/images/news/lam-day-tang-mat-giua.jpg",
  },
  {
    id: "3",
    slug: "meso-ho-tro-cham-soc-da",
    category: "Da",
    title: "Meso hỗ trợ chăm sóc da như thế nào?",
    excerpt:
      "Meso thường được nhắc đến trong các liệu trình hỗ trợ cấp ẩm, làm sáng và cải thiện bề mặt da. Hiệu quả có thể khác nhau tùy tình trạng da và cách chăm sóc sau liệu trình.",
    image: "/images/news/meso-cham-soc-da.jpg",
  },
  {
    id: "4",
    slug: "cham-soc-sau-filler",
    category: "Chăm sóc sau dịch vụ",
    title: "Chăm sóc sau filler: những điều nên lưu ý",
    excerpt:
      "Sau khi thực hiện filler, bạn nên tuân thủ hướng dẫn chăm sóc, tránh tác động mạnh vào vùng vừa làm và theo dõi tình trạng theo lời dặn của chuyên viên.",
    image: "/images/news/cham-soc-sau-filler.jpg",
  },
  {
    id: "5",
    slug: "hieu-lam-ve-filler",
    category: "Filler",
    title: "Những hiểu lầm thường gặp về filler",
    excerpt:
      "Filler không phải lúc nào cũng cần làm nhiều mới đẹp. Kết quả tự nhiên thường đến từ việc lựa chọn lượng phù hợp và cân đối với tổng thể gương mặt.",
    image: "/images/news/hieu-lam-ve-filler.jpg",
  },
  {
    id: "6",
    slug: "duy-tri-da-khoe-manh",
    category: "Chăm sóc da",
    title: "Làm sao để duy trì làn da khỏe mạnh mỗi ngày?",
    excerpt:
      "Làm sạch, dưỡng ẩm, chống nắng và sinh hoạt điều độ là nền tảng quan trọng để duy trì làn da khỏe. Các liệu trình chăm sóc nên được lựa chọn theo tình trạng da thực tế.",
    image: "/images/news/duy-tri-lan-da-khoe.jpg",
  },
];

export const videos = [
  {
    id: "1",
    title: "Môi baby",
    service: "Môi baby",
    thumbnail: "/images/videos/moi-baby.jpg",
  },
  {
    id: "2",
    title: "Nâng tầng mặt giữa",
    service: "Nâng tầng mặt giữa",
    thumbnail: "/images/videos/nang-tang-mat-giua.jpg",
  },
  {
    id: "3",
    title: "Meso",
    service: "Meso",
    thumbnail: "/images/videos/meso.jpg",
  },
];

export const consultationServices = services.map((s) => s.title);

export const footerServiceLinks = services.map((s) => ({
  href: `/services/${s.id}`,
  label: s.title,
}));

export const footerNavLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/services", label: "Dịch vụ" },
  { href: "/news", label: "Tin tức" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Liên hệ" },
  { href: `/${siteConfig.localPageSlug}`, label: "Thẩm mỹ viện Tây Ninh" },
];
