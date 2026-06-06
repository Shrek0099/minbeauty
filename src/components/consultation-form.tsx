"use client";

import { useState } from "react";
import { Phone, MapPin, Clock, Send } from "lucide-react";
import { consultationServices, siteConfig } from "@/lib/site-config";

export function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="tu-van" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark shadow-2xl">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 text-white md:p-12">
              <h2 className="section-title mb-4 text-3xl font-bold md:text-4xl">
                Bạn cần tư vấn?
              </h2>
              <p className="mb-8 text-primary-light">
                Để lại thông tin, chúng tôi sẽ liên hệ tư vấn miễn phí trong
                thời gian sớm nhất
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-semibold">Hotline 24/7</p>
                    <a
                      href={`tel:${siteConfig.phoneRaw}`}
                      className="text-primary-light hover:underline"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-semibold">Địa chỉ</p>
                    <p className="text-primary-light">{siteConfig.fullAddress}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-semibold">Thời gian hoạt động</p>
                    <p className="text-primary-light">{siteConfig.hours}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 md:p-12">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
                    <Send className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    Cảm ơn bạn!
                  </h3>
                  <p className="text-muted">
                    Chúng tôi sẽ liên hệ tư vấn trong thời gian sớm nhất.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                      Họ và tên *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
                      Số điện thoại *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="0901 234 567"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="mb-1.5 block text-sm font-medium">
                      Chọn dịch vụ muốn tư vấn
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      {consultationServices.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                      Ghi chú
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Nội dung cần tư vấn..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                  >
                    <Send className="h-4 w-4" />
                    Gửi yêu cầu tư vấn
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
