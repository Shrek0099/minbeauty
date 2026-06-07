"use client";

import { useState } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { consultationServices, siteConfig } from "@/lib/site-config";

export function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
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
          <div className="luxury-card p-6 md:p-8 lg:col-span-3">
            {submitted ? (
              <div className="py-8 text-center">
                <p className="section-heading mb-2 text-2xl">Cảm ơn bạn!</p>
                <p className="text-muted">
                  Chúng tôi sẽ liên hệ tư vấn trong thời gian sớm nhất.
                </p>
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
                    {consultationServices.map((s) => (
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
                <button type="submit" className="submit-button">
                  Gửi thông tin
                </button>
              </form>
            )}
          </div>

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
                  <p className="text-sm text-muted">{siteConfig.fullAddress}</p>
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
