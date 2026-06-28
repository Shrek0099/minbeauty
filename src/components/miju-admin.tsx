"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cmsMenuGroups } from "@/lib/cms-defaults";

type AdminShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function AdminLogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button type="button" className="miju-admin-plain-button" onClick={logout}>
      Đăng xuất
    </button>
  );
}

function MijuAdminNav() {
  const pathname = usePathname();

  return (
    <nav className="miju-admin-nav">
      {cmsMenuGroups.map((group) => (
        <div key={group.title} className="miju-admin-nav-group">
          <p>{group.title}</p>
          {group.items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.description}
                className={isActive ? "is-active" : undefined}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export function MijuAdminShell({ title, description, children }: AdminShellProps) {
  return (
    <div className="miju-admin-page">
      <aside className="miju-admin-sidebar" aria-label="Điều hướng admin">
        <Link href="/admin" className="miju-admin-brand">
          Min Beauty <span>Admin</span>
        </Link>

        <MijuAdminNav />
      </aside>

      <main className="miju-admin-main">
        <header className="miju-admin-topbar">
          <div>
            <p className="miju-admin-eyebrow">Quản trị Min Beauty</p>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <AdminLogoutButton />
        </header>

        {children}
      </main>
    </div>
  );
}

export function SeoSectionOverview() {
  return (
    <section className="miju-admin-grid">
      {cmsMenuGroups
        .flatMap((group) => group.items)
        .filter((link) => link.href.startsWith("/admin/seo") || link.href === "/admin/analytics")
        .map((link) => (
          <Link key={link.href} href={link.href} className="miju-admin-card miju-admin-card-link">
            <span className="miju-admin-card-kicker">Growth</span>
            <h2>{link.label}</h2>
            <p>{link.description}</p>
            <span className="miju-admin-card-action">Mở trang quản lý →</span>
          </Link>
        ))}
    </section>
  );
}

export function GoogleAdsManager() {
  const envVars = [
    { name: "ADMIN_USER", desc: "Tên đăng nhập /admin (bắt buộc, không mặc định admin)" },
    { name: "ADMIN_PASSWORD", desc: "Mật khẩu đăng nhập /admin" },
    { name: "ADMIN_SESSION_SECRET", desc: "Chuỗi bí mật ký session admin (random, ≥32 ký tự)" },
    { name: "BLOB_READ_WRITE_TOKEN", desc: "Token Vercel Blob — upload ảnh CMS trên production" },
    { name: "BLOB_MAX_TOTAL_MB", desc: "Giới hạn tổng dung lượng CMS (mặc định 800MB)" },
    { name: "BLOB_MAX_FILE_MB", desc: "Giới hạn mỗi ảnh (mặc định 2MB)" },
    { name: "BLOB_MAX_FILES", desc: "Giới hạn số ảnh CMS (mặc định 150)" },
    { name: "CMS_ALLOW_FILE_WRITES", desc: "true trên local để lưu CMS; false trên Vercel production" },
    { name: "NEXT_PUBLIC_SITE_URL", desc: "Domain production (https://www.minbeauty.com.vn)" },
    { name: "NEXT_PUBLIC_GSC_VERIFICATION", desc: "Mã xác minh Google Search Console" },
    { name: "NEXT_PUBLIC_GTM_ID", desc: "Google Tag Manager container ID (GTM-XXXX)" },
    { name: "NEXT_PUBLIC_GA_ID", desc: "Google Analytics 4 measurement ID (G-XXXX)" },
    { name: "NEXT_PUBLIC_GOOGLE_ADS_ID", desc: "Google Ads conversion ID (AW-XXXX)" },
    { name: "NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL", desc: "Nhãn conversion cho form lead" },
    { name: "NEXT_PUBLIC_META_PIXEL_ID", desc: "Meta Pixel ID cho Facebook/Instagram Ads" },
    { name: "LEAD_WEBHOOK_URL", desc: "Webhook nhận lead từ form tư vấn" },
  ];

  const launchChecklist = [
    "Xác minh domain trên Google Search Console, submit sitemap.xml",
    "Tạo Google Business Profile, thêm link vào footer và schema sameAs",
    "Tạo conversion action trên Google Ads, copy label vào env",
    "Cấu hình GTM: trigger form submit (generate_lead) và click phone/Zalo",
    "Kiểm tra Pixel trên Meta Events Manager",
    "Đặt landing page chính: /services/moi-baby hoặc /contact",
  ];

  const landingPages = [
    { href: "/services", label: "Danh sách dịch vụ" },
    { href: "/services/moi-baby", label: "Môi baby" },
    { href: "/contact", label: "Liên hệ & đặt lịch" },
    { href: "/tham-my-vien-hoa-thanh-tay-ninh", label: "Local SEO page" },
    { href: "/news", label: "Tin tức" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <div className="miju-admin-stack">
      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">Google Ads & Tracking</p>
            <h2>Hướng dẫn cấu hình quảng cáo</h2>
          </div>
          <span className="miju-admin-status">Tracking-only (không API)</span>
        </div>
        <p>
          Website đã tích hợp sẵn GTM, GA4, Google Ads conversion và Meta Pixel. Cấu hình các biến
          môi trường trên Vercel để kích hoạt tracking khi chạy quảng cáo.
        </p>
      </section>

      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">Biến môi trường</p>
            <h2>Cần cấu hình trên Vercel</h2>
          </div>
        </div>
        <div className="miju-admin-table-wrap">
          <table className="miju-admin-table">
            <thead>
              <tr>
                <th>Biến</th>
                <th>Mô tả</th>
              </tr>
            </thead>
            <tbody>
              {envVars.map((item) => (
                <tr key={item.name}>
                  <td>
                    <code>{item.name}</code>
                  </td>
                  <td>{item.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">Conversion events</p>
            <h2>Sự kiện đã tích hợp</h2>
          </div>
        </div>
        <ul className="miju-admin-checklist">
          <li>
            <strong>generate_lead</strong> — Form tư vấn gửi thành công (Google Ads conversion nếu có label)
          </li>
          <li>
            <strong>contact_click</strong> — Click gọi điện hoặc Zalo (engagement event)
          </li>
          <li>
            <strong>PageView</strong> — Meta Pixel tự động khi có NEXT_PUBLIC_META_PIXEL_ID
          </li>
        </ul>
      </section>

      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">Trang đích quảng cáo</p>
            <h2>Landing pages đề xuất</h2>
          </div>
          <Link href="/admin/seo" className="miju-admin-inline-link">
            Về SEO
          </Link>
        </div>
        <div className="miju-admin-grid">
          {landingPages.map((page) => (
            <Link key={page.href} href={page.href} className="miju-admin-card miju-admin-card-link" target="_blank">
              <span className="miju-admin-card-kicker">Preview</span>
              <h2>{page.label}</h2>
              <p>{page.href}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">Checklist</p>
            <h2>Trước khi chạy quảng cáo</h2>
          </div>
        </div>
        <ol className="miju-admin-checklist">
          {launchChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
