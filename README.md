# Min Beauty

Website thẩm mỹ viện **Min Beauty** — trang landing page chuẩn SEO, thiết kế theo phong cách thẩm mỹ viện chuyên nghiệp.

## Tính năng

- Trang chủ đầy đủ: Hero, Dịch vụ, Cam kết, Gallery trước/sau, Thống kê, Giới thiệu, Tin tức, Form tư vấn
- SEO: metadata, Open Graph, JSON-LD (Schema.org BeautySalon), sitemap.xml, robots.txt
- Responsive mobile-first
- Nút liên hệ nổi (Hotline + Zalo)

## Công nghệ

- Next.js 15 (App Router)
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

## Deploy

Deploy lên [Vercel](https://vercel.com) hoặc bất kỳ nền tảng hỗ trợ Next.js.
