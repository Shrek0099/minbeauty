"use client";

import { useState } from "react";
import { cosmeticServices, spaServices } from "@/lib/site-config";

type Tab = "cosmetic" | "spa";

const tabs: { id: Tab; label: string }[] = [
  { id: "cosmetic", label: "Dịch vụ thẩm mỹ" },
  { id: "spa", label: "Dịch vụ Spa" },
];

export function Services() {
  const [activeTab, setActiveTab] = useState<Tab>("cosmetic");
  const items = activeTab === "cosmetic" ? cosmeticServices : spaServices;

  return (
    <section id="dich-vu" className="site-section section-reveal services-section">
      <div className="site-container">
        <div className="section-header-center mb-10 text-center md:mb-12">
          <p className="section-label mb-3">Dịch vụ</p>
          <h2 className="section-heading">Dịch vụ tại Min Beauty</h2>
          <div className="section-heading-accent" />
          <p className="section-subtitle mx-auto max-w-xl">
            Các dịch vụ được nhiều khách hàng quan tâm
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`service-tab ${isActive ? "service-tab-active" : "service-tab-inactive"}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="service-grid">
          {items.map((service) => (
            <article key={service.id} className="service-card">
              <img
                src={service.image}
                alt={service.title}
                className="boutique-card-image service-card-image"
                loading="lazy"
                decoding="async"
              />
              <h3 className="boutique-card-title service-card-title">{service.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
