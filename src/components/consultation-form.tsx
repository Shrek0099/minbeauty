"use client";

import { useState } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { trackContactClick } from "@/lib/client-tracking";
import { promoModalServices, siteConfig } from "@/lib/site-config";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const googleAdsConversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const googleAdsConversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

function trackLead(service: string) {
  window.dataLayer?.push({
    event: "lead_submit",
    lead_service: service,
  });

  window.gtag?.("event", "generate_lead", {
    event_category: "lead",
    event_label: service,
  });

  if (googleAdsConversionId && googleAdsConversionLabel) {
    window.gtag?.("event", "conversion", {
      send_to: `${googleAdsConversionId}/${googleAdsConversionLabel}`,
    });
  }

  window.fbq?.("track", "Lead", {
    content_name: service,
  });
}

export function ConsultationForm({ variant = "full" }: { variant?: "full" | "embedded" }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [serviceOptions] = useState(promoModalServices);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      service: String(formData.get("service") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Lead submission failed");
      }

      trackLead(payload.service);
      setSubmitted(true);
    } catch {
      setError("Chưa gửi được thông tin. Bạn vui lòng gọi hotline hoặc nhắn Zalo để được tư vấn ngay.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const formCard = (
    <div className="luxury-card p-6 md:p-8">
      {submitted ? (
        <div className="py-8 text-center">
          <p className="section-heading mb-2 text-2xl">Cảm ơn bạn!</p>
          <p className="text-muted">
            Chúng tôi sẽ liên hệ tư vấn trong thời gian sớm nhất.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="submit-button text-center"
              onClick={() => trackContactClick("phone", "thank-you-phone")}
            >
              Gọi hotline
            </a>
            <a
              href={`https://zalo.me/${siteConfig.zalo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button text-center"
              onClick={() => trackContactClick("zalo", "thank-you-zalo")}
            >
              Nhắn Zalo
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-foreground">
              Họ và tên
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="form-input"
              placeholder="Nguyễn Thị A"
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-foreground">
              Số điện thoại
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="form-input"
              placeholder="0971.700.952"
            />
          </div>
          <div>
            <label htmlFor="service" className="mb-2 block text-sm font-semibold text-foreground">
              Dịch vụ quan tâm
            </label>
            <select id="service" name="service" className="form-input">
              {serviceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-semibold text-foreground">
              Lời nhắn
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="form-input resize-none"
              placeholder="Bạn có thể mô tả tình trạng hoặc mong muốn của mình..."
            />
          </div>
          {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Đang gửi..." : "Gửi thông tin"}
          </button>
        </form>
      )}
    </div>
  );

  if (variant === "embedded") {
    return formCard;
  }

  return (
    <section id="lien-he" className="site-section section-reveal contact-section">
      <div className="site-container">
        <div className="section-header-center mb-12 max-w-2xl md:mx-auto md:text-center">
          <p className="section-label mb-3">Liên hệ</p>
          <h2 className="section-heading">Bạn muốn được tư vấn dịch vụ phù hợp?</h2>
          <div className="section-heading-accent" />
          <p className="section-subtitle">
            Gửi hình hoặc nhắn Zalo để Min Beauty tư vấn trước khi đặt lịch.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-3">{formCard}</div>

          <div className="luxury-card flex flex-col justify-center p-6 md:p-8 lg:col-span-2">
            <h3 className="mb-6 text-lg font-semibold text-foreground">Thông tin liên hệ</h3>
            <ul className="space-y-6">
              <li className="flex gap-3.5">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Hotline</p>
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-3.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-xs font-bold text-gold">
                  Z
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Zalo</p>
                  <a
                    href={`https://zalo.me/${siteConfig.zalo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    Nhắn tin tư vấn
                  </a>
                </div>
              </li>
              <li className="flex gap-3.5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Địa chỉ</p>
                  <a
                    href={siteConfig.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {siteConfig.fullAddress}
                  </a>
                </div>
              </li>
              <li className="flex gap-3.5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Thời gian làm việc</p>
                  <p className="text-sm text-muted">{siteConfig.hours}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
