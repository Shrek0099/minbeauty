"use client";

import { useState } from "react";
import { beautyServices, spaServices } from "@/lib/site-config";

type Tab = "beauty" | "spa";

export function Services() {
  const [activeTab, setActiveTab] = useState<Tab>("beauty");
  const services = activeTab === "beauty" ? beautyServices : spaServices;

  return (
    <section id="dich-vu" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="section-title mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Các dịch vụ nổi bật tại{" "}
            <span className="text-primary">Min Beauty</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted">
            Đa dạng dịch vụ thẩm mỹ và spa cao cấp, đáp ứng mọi nhu cầu làm đẹp
            của bạn
          </p>
        </div>

        <div className="mb-10 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("beauty")}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === "beauty"
                ? "bg-primary text-white"
                : "bg-primary-light text-primary hover:bg-primary/20"
            }`}
          >
            Dịch vụ thẩm mỹ
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("spa")}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === "spa"
                ? "bg-primary text-white"
                : "bg-primary-light text-primary hover:bg-primary/20"
            }`}
          >
            Dịch vụ Spa
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.id}
              className="group overflow-hidden rounded-2xl border border-primary-light/50 bg-cream transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h3 className="section-title absolute bottom-4 left-4 text-xl font-bold text-white">
                  {service.title}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <a
                  href="#tu-van"
                  className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  Tư vấn ngay →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
