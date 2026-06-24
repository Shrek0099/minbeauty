# SEO Launch Checklist — Min Beauty

Chạy checklist này sau khi deploy production.

## Indexing

- [ ] `NEXT_PUBLIC_SITE_URL=https://minbeauty.vn` đã cấu hình trên Vercel
- [ ] Truy cập `/robots.txt` — allow `/`, disallow `/admin` và `/api/`
- [ ] Truy cập `/sitemap.xml` — có homepage, services, news, faq, contact, local page
- [ ] Google Search Console: xác minh domain (dùng `NEXT_PUBLIC_GSC_VERIFICATION`)
- [ ] Submit sitemap: `https://minbeauty.vn/sitemap.xml`
- [ ] Kiểm tra Rich Results: https://search.google.com/test/rich-results

## Canonical & metadata

- [ ] Mỗi trang chính có title/description riêng (View Page Source)
- [ ] Canonical URL đúng từng trang (không trỏ về homepage)
- [ ] `/blog` redirect 301 → `/news`

## Local SEO

- [ ] Google Business Profile đã tạo/cập nhật với địa chỉ chính xác
- [ ] Link GBP trong footer và `sameAs` schema
- [ ] Trang local: `/tham-my-vien-hoa-thanh-tay-ninh` index được

## Quảng cáo & tracking

- [ ] `NEXT_PUBLIC_GTM_ID` — container hoạt động
- [ ] `NEXT_PUBLIC_GA_ID` — GA4 nhận pageview
- [ ] `NEXT_PUBLIC_GOOGLE_ADS_ID` + `CONVERSION_LABEL` — form lead fire conversion
- [ ] `NEXT_PUBLIC_META_PIXEL_ID` — Pixel verified trên Events Manager
- [ ] Test form tư vấn → event `generate_lead` trên GTM/GA4
- [ ] Test click phone/Zalo → event `contact_click`

## Landing pages đề xuất cho Ads

| Chiến dịch | URL |
|------------|-----|
| Môi baby | `/services/moi-baby` |
| Filler | `/services/nang-tang-mat-giua` |
| Meso / Spa | `/services/meso` |
| Tổng quát | `/contact` |
| Local | `/tham-my-vien-hoa-thanh-tay-ninh` |

## Nội dung

- [ ] 8 trang dịch vụ có nội dung unique
- [ ] Internal links: homepage → services → news → contact
- [ ] Không có broken links trên nav/footer
