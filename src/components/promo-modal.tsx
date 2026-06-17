"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { promoModalServices, siteConfig } from "@/lib/site-config";

const SESSION_KEY = "minbeauty-promo-modal-dismissed";

export function PromoModal() {
  const { promoModal } = siteConfig;
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    if (promoModal.showOncePerSession) {
      sessionStorage.setItem(SESSION_KEY, "1");
    }
  }, [promoModal.showOncePerSession]);

  useEffect(() => {
    if (!promoModal.enabled) return;
    if (promoModal.showOncePerSession && sessionStorage.getItem(SESSION_KEY)) return;

    const timer = window.setTimeout(() => setOpen(true), 800);
    return () => window.clearTimeout(timer);
  }, [promoModal.enabled, promoModal.showOncePerSession]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("[PromoModal] consultation signup:", data);
    setSubmitted(true);
    window.setTimeout(close, 1200);
  }

  if (!promoModal.enabled || !open) return null;

  const imageSrc = promoModal.image || "/images/hero/min-beauty-hero.jpg";

  return (
    <div className="promo-modal-root" role="presentation">
      <button
        type="button"
        className="promo-modal-overlay"
        aria-label="Đóng modal"
        onClick={close}
      />

      <div
        className="promo-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-modal-title"
      >
        <button type="button" className="promo-modal-close" onClick={close} aria-label="Đóng">
          <X className="h-5 w-5" strokeWidth={2.25} />
        </button>

        <div className="promo-modal-grid">
          <div className="promo-modal-media">
            <Image
              src={imageSrc}
              alt={promoModal.title}
              width={720}
              height={900}
              className="promo-modal-image"
            />
            <div className="promo-modal-media-overlay" aria-hidden="true" />
          </div>

          <div className="promo-modal-content">
            <p className="promo-modal-brand">{promoModal.title}</p>
            <h2 id="promo-modal-title" className="promo-modal-headline">
              Đăng ký tư vấn dịch vụ phù hợp
            </h2>
            <p className="promo-modal-subtitle">{promoModal.subtitle}</p>
            <p className="promo-modal-description">
              Để lại thông tin, Min Beauty sẽ liên hệ tư vấn theo tình trạng thực tế của bạn.
            </p>

            {submitted ? (
              <p className="promo-modal-success">Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.</p>
            ) : (
              <form className="promo-modal-form" onSubmit={handleSubmit}>
                <label className="promo-modal-field">
                  <span>Họ tên *</span>
                  <input name="name" type="text" required placeholder="Nguyễn Thị A" />
                </label>
                <label className="promo-modal-field">
                  <span>Điện thoại *</span>
                  <input name="phone" type="tel" required placeholder="0971.700.952" />
                </label>
                <label className="promo-modal-field">
                  <span>Chọn dịch vụ muốn tư vấn</span>
                  <select name="service" defaultValue="">
                    <option value="" disabled>
                      Chọn dịch vụ
                    </option>
                    {promoModalServices.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="submit" className="promo-modal-submit">
                  Đăng ký ngay
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
