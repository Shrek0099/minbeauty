import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { siteConfig, beautyServices, spaServices } from "@/lib/site-config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="section-title mb-3 text-2xl font-bold text-primary-light">
              Min Beauty
            </p>
            <p className="mb-4 text-sm leading-relaxed text-gray-400">
              {siteConfig.description}
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary-light" />
                {siteConfig.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary-light" />
                {siteConfig.email}
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
                {siteConfig.fullAddress}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-primary-light" />
                {siteConfig.hours}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
              Dịch vụ thẩm mỹ
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {beautyServices.map((s) => (
                <li key={s.id}>
                  <a href="#dich-vu" className="hover:text-primary-light">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
              Dịch vụ Spa
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {spaServices.map((s) => (
                <li key={s.id}>
                  <a href="#dich-vu" className="hover:text-primary-light">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
              Giấy phép
            </h3>
            <div className="space-y-4 text-sm text-gray-400">
              <div>
                <p className="font-medium text-gray-300">
                  Giấy chứng nhận đăng ký doanh nghiệp
                </p>
                <p>Mã số: {siteConfig.businessLicense}</p>
              </div>
              <div>
                <p className="font-medium text-gray-300">
                  Giấy phép hoạt động khám bệnh, chữa bệnh
                </p>
                <p>Số: {siteConfig.medicalLicense}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-700 pt-8 text-sm text-gray-500">
          <p>Copyright {currentYear} © {siteConfig.name}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-light">
              Chính sách bảo mật
            </a>
            <a href="#" className="hover:text-primary-light">
              Chính sách bảo hành
            </a>
            <a href="#" className="hover:text-primary-light">
              Miễn trừ trách nhiệm
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
