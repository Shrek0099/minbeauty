import { footerNavLinks, footerServiceLinks, siteConfig } from "@/lib/site-config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-container py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary shadow-[var(--shadow-card)] ring-2 ring-gold/35">
                <span className="section-title text-base font-semibold text-white">M</span>
              </div>
              <p className="section-title text-xl text-white">Min Beauty</p>
            </div>
            <p className="site-footer-text">
              Cơ sở làm đẹp nhỏ, tập trung vào tư vấn rõ ràng và dịch vụ phù hợp với từng
              gương mặt.
            </p>
          </div>

          <div>
            <h3 className="site-footer-heading mb-4">Menu</h3>
            <ul className="space-y-2.5">
              {footerNavLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="site-footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="site-footer-heading mb-4">Dịch vụ</h3>
            <ul className="space-y-2.5">
              {footerServiceLinks.map((link) => (
                <li key={link}>
                  <a href="#dich-vu" className="site-footer-link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="site-footer-heading mb-4">Liên hệ</h3>
            <ul className="site-footer-text space-y-2.5">
              <li>{siteConfig.fullAddress}</li>
              <li>
                <a href={`tel:${siteConfig.phoneRaw}`} className="site-footer-link">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://zalo.me/${siteConfig.zalo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer-link"
                >
                  Zalo tư vấn
                </a>
              </li>
              <li>{siteConfig.hours}</li>
            </ul>
          </div>
        </div>

        <div className="site-footer-divider mt-10 pt-6 text-center text-xs text-[rgba(255,255,255,0.6)]">
          Copyright {currentYear} © {siteConfig.name}
        </div>
      </div>
    </footer>
  );
}
