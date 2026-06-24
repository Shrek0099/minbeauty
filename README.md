# Min Beauty

Website thẩm mỹ viện **Min Beauty** — trang landing page chuẩn SEO, thiết kế theo phong cách thẩm mỹ viện chuyên nghiệp.

## Tính năng

- Trang chủ: Hero, Trust strip, Dịch vụ, Gallery, Quy trình, Video, Kiến thức, FAQ, Form tư vấn
- SEO: metadata per-page, canonical, Open Graph, JSON-LD (LocalBusiness, Service, FAQPage, BlogPosting, BreadcrumbList), sitemap.xml, robots.txt
- Trang dịch vụ: `/services`, `/services/[slug]` (8 landing pages)
- Tin tức: `/news`, `/news/[slug]` (redirect 301 từ `/blog`)
- FAQ: `/faq` | Liên hệ: `/contact`
- Local SEO: `/tham-my-vien-hoa-thanh-tay-ninh`
- Tracking: GTM, GA4, Google Ads conversion, Meta Pixel
- Responsive mobile-first

## Công nghệ

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS + CSS custom properties
- Lucide React (icons)

## Chạy dự án

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

## Build production

```bash
npm run build
npm start
```

## Tùy chỉnh

Chỉnh thông tin viện tại `src/lib/site-config.ts` và nội dung dịch vụ tại `src/lib/services-data.ts`.

## Biến môi trường khi deploy

```bash
NEXT_PUBLIC_SITE_URL=https://minbeauty.vn
NEXT_PUBLIC_GSC_VERIFICATION=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=
NEXT_PUBLIC_GOOGLE_ADS_CONTACT_LABEL=
NEXT_PUBLIC_META_PIXEL_ID=
LEAD_WEBHOOK_URL=
CMS_ALLOW_FILE_WRITES=false
```

- Đổi `NEXT_PUBLIC_SITE_URL` sang domain production sau khi DNS trỏ xong.
- `NEXT_PUBLIC_GSC_VERIFICATION`: mã xác minh Google Search Console.
- `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`: conversion cho form lead (`generate_lead`).
- `NEXT_PUBLIC_GOOGLE_ADS_CONTACT_LABEL`: conversion tùy chọn cho click phone/Zalo.
- Cấu hình `LEAD_WEBHOOK_URL` tới webhook/CRM để lưu lead.

## Checklist sau deploy (indexing & quảng cáo)

1. **Google Search Console**: xác minh domain, submit `https://minbeauty.vn/sitemap.xml`
2. **Google Business Profile**: tạo/cập nhật hồ sơ, thêm link website
3. **Google Ads**: tạo conversion action, copy ID + label vào env
4. **GTM**: container + trigger `generate_lead` (form) và `contact_click` (phone/Zalo)
5. **Meta Events Manager**: verify Pixel hoạt động
6. **Landing pages đề xuất**: `/services/moi-baby`, `/contact`, `/tham-my-vien-hoa-thanh-tay-ninh`

## CMS

Admin CMS tại `/admin`:

- Nội dung: quản lý dịch vụ
- Tăng trưởng: SEO metadata, hướng dẫn Google Ads/tracking, visitor analytics

Visitor tracker ghi page view qua `/api/analytics/track`; xem tại `/admin/analytics`.

## Cấu trúc URL

| Route | Mô tả |
|-------|-------|
| `/` | Trang chủ |
| `/services` | Danh sách dịch vụ |
| `/services/[slug]` | Landing page dịch vụ |
| `/news` | Tin tức |
| `/news/[slug]` | Bài viết |
| `/faq` | Câu hỏi thường gặp |
| `/contact` | Liên hệ & đặt lịch |
| `/tham-my-vien-hoa-thanh-tay-ninh` | Local SEO page |

Redirect 301: `/blog` → `/news`, `/blog/:slug` → `/news/:slug`

## Deploy

Deploy lên [Vercel](https://vercel.com) hoặc nền tảng hỗ trợ Next.js.
