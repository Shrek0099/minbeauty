# Min Beauty

Website thẩm mỹ viện **Min Beauty** — trang landing page chuẩn SEO, thiết kế theo phong cách thẩm mỹ viện chuyên nghiệp.

## Tính năng

- Trang chủ đầy đủ: Hero, Dịch vụ, Cam kết, Gallery trước/sau, Thống kê, Giới thiệu, Tin tức, Form tư vấn
- SEO: metadata, Open Graph, JSON-LD (Schema.org BeautySalon), sitemap.xml, robots.txt
- Responsive mobile-first
- Nút liên hệ nổi (Hotline + Zalo)

## Công nghệ

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
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

Chỉnh thông tin viện (số điện thoại, địa chỉ, dịch vụ...) tại `src/lib/site-config.ts`.

## Biến môi trường khi deploy

Các biến dưới đây giúp SEO, form khách hàng và quảng cáo hoạt động đúng trên production:

```bash
NEXT_PUBLIC_SITE_URL=https://minbeauty.vercel.app
LEAD_WEBHOOK_URL=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=
NEXT_PUBLIC_META_PIXEL_ID=
CMS_ALLOW_FILE_WRITES=false
```

- Đổi `NEXT_PUBLIC_SITE_URL` sang `https://minbeauty.vn` sau khi domain đã trỏ DNS thành công.
- Cấu hình `LEAD_WEBHOOK_URL` tới webhook/CRM/Zapier/Make để lưu lead từ form tư vấn.
- Điền các mã tracking sau khi tạo Google Tag Manager, Google Ads conversion hoặc Meta Pixel.
- CMS hiện dùng JSON storage cục bộ cho development. Trên production, nên nối database hoặc Vercel Blob/Marketplace storage trước khi dùng chỉnh sửa nội dung lâu dài.
- `CMS_ALLOW_FILE_WRITES=true` chỉ nên dùng trong môi trường server có filesystem ghi bền vững, không nên bật mặc định trên Vercel serverless.

## CMS

Admin CMS nằm tại `/admin`, với các nhóm menu rõ ràng:

- Nội dung: tổng quan, quản lý dịch vụ, tạo/sửa/ẩn dịch vụ và đổi hình.
- Tăng trưởng: SEO metadata, Google Ads notes và visitor analytics.

Visitor tracker nội bộ ghi nhận page view qua `/api/analytics/track`; xem số liệu tại `/admin/analytics`.

## Deploy

Deploy lên [Vercel](https://vercel.com) hoặc bất kỳ nền tảng hỗ trợ Next.js.
