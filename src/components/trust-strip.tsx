import { siteConfig } from "@/lib/site-config";

const trustItems = [
  "Tư vấn trực tiếp theo từng gương mặt",
  "Phản hồi nhanh qua điện thoại & Zalo",
  "Minh bạch trước khi thực hiện dịch vụ",
  `Phục vụ ${siteConfig.serviceAreaText}`,
];

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Cam kết dịch vụ">
      <div className="site-container">
        <ul className="trust-strip-list">
          {trustItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
