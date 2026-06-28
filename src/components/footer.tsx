import { footerNavLinks, footerServiceLinks, siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-container py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-5">
              <a href="/" className="group inline-flex" aria-label="Về trang chủ Min Beauty">
                <Logo variant="footer" />
              </a>
            </div>
            <p className="site-footer-text mt-3">
              Khu vực phục vụ: {siteConfig.serviceAreaText}
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
                <li key={link.label}>
                  <a href={link.href} className="site-footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="site-footer-heading mb-4">Liên hệ</h3>
            <ul className="site-footer-text space-y-2.5">
              <li>
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer-link"
                >
                  {siteConfig.fullAddress}
                </a>
              </li>
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
