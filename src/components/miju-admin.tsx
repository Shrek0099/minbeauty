import Link from "next/link";
import { cmsMenuGroups } from "@/lib/cms-defaults";

type AdminShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function MijuAdminShell({ title, description, children }: AdminShellProps) {
  return (
    <div className="miju-admin-page">
      <aside className="miju-admin-sidebar" aria-label="Điều hướng admin">
        <Link href="/admin" className="miju-admin-brand">
          Min Beauty <span>Admin</span>
        </Link>

        <nav className="miju-admin-nav">
          {cmsMenuGroups.map((group) => (
            <div key={group.title} className="miju-admin-nav-group">
              <p>{group.title}</p>
              {group.items.map((item) => (
                <Link key={item.href} href={item.href} title={item.description}>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <main className="miju-admin-main">
        <header className="miju-admin-topbar">
          <div>
            <p className="miju-admin-eyebrow">Quản trị Min Beauty</p>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
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
  const campaigns = [
    {
      name: "Search - Môi baby Tây Ninh",
      status: "Đang chạy",
      budget: "350.000đ/ngày",
      conversions: "28",
    },
    {
      name: "Performance Max - Dịch vụ làm đẹp",
      status: "Tạm dừng",
      budget: "500.000đ/ngày",
      conversions: "16",
    },
    {
      name: "Remarketing - Khách đã xem dịch vụ",
      status: "Nháp",
      budget: "180.000đ/ngày",
      conversions: "-",
    },
  ];

  return (
    <div className="miju-admin-stack">
      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">Google Ads</p>
            <h2>Cấu hình tài khoản quảng cáo</h2>
          </div>
          <span className="miju-admin-status">Chưa kết nối API</span>
        </div>

        <div className="miju-admin-form-grid">
          <label className="miju-admin-field">
            <span>Google Ads Customer ID</span>
            <input type="text" placeholder="123-456-7890" />
          </label>
          <label className="miju-admin-field">
            <span>Tài khoản quản lý</span>
            <input type="text" placeholder="Min Beauty Ads" />
          </label>
          <label className="miju-admin-field">
            <span>Ngân sách mặc định/ngày</span>
            <input type="text" placeholder="300.000đ" />
          </label>
          <label className="miju-admin-field">
            <span>Landing page chính</span>
            <input type="text" placeholder="https://minbeauty.vercel.app" />
          </label>
        </div>

        <div className="miju-admin-actions">
          <button type="button">Lưu cấu hình</button>
          <button type="button" className="miju-admin-secondary-button">
            Kiểm tra kết nối
          </button>
        </div>
      </section>

      <section className="miju-admin-panel">
        <div className="miju-admin-panel-header">
          <div>
            <p className="miju-admin-eyebrow">Chiến dịch</p>
            <h2>Theo dõi nhanh</h2>
          </div>
          <Link href="/admin/seo" className="miju-admin-inline-link">
            Về SEO
          </Link>
        </div>

        <div className="miju-admin-table-wrap">
          <table className="miju-admin-table">
            <thead>
              <tr>
                <th>Chiến dịch</th>
                <th>Trạng thái</th>
                <th>Ngân sách</th>
                <th>Chuyển đổi</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.name}>
                  <td>{campaign.name}</td>
                  <td>
                    <span>{campaign.status}</span>
                  </td>
                  <td>{campaign.budget}</td>
                  <td>{campaign.conversions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="miju-admin-grid">
        <div className="miju-admin-card">
          <span className="miju-admin-card-kicker">Tracking</span>
          <h2>Conversion ID</h2>
          <p>Quản lý mã chuyển đổi dùng cho form đăng ký, click gọi điện và click Zalo.</p>
        </div>
        <div className="miju-admin-card">
          <span className="miju-admin-card-kicker">Landing page</span>
          <h2>Nhóm trang đích</h2>
          <p>Theo dõi hiệu quả các trang như môi baby, filler, meso và chăm sóc da.</p>
        </div>
        <div className="miju-admin-card">
          <span className="miju-admin-card-kicker">Gợi ý</span>
          <h2>Từ khóa nên ưu tiên</h2>
          <p>Môi baby Tây Ninh, filler Tây Ninh, meso chăm sóc da và spa Hòa Thành.</p>
        </div>
      </section>
    </div>
  );
}
