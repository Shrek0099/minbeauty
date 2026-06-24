"use client";
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultCmsServices, serviceGroupLabels } from "@/lib/cms-defaults";
import type { CmsData, CmsService } from "@/lib/cms-types";

type Tab = "cosmetic" | "spa";

const tabs: { id: Tab; label: string }[] = [
  { id: "cosmetic", label: "Dịch vụ thẩm mỹ" },
  { id: "spa", label: "Dịch vụ Spa" },
];

export function Services() {
  const [activeTab, setActiveTab] = useState<Tab>("cosmetic");
  const [services, setServices] = useState<CmsService[]>(defaultCmsServices);
  const items = services
    .filter((service) => service.visible && service.group === activeTab)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  useEffect(() => {
    fetch("/api/cms")
      .then((response) => response.json())
      .then((payload: { data?: CmsData }) => {
        if (payload.data?.services) setServices(payload.data.services);
      })
      .catch(() => {
        setServices(defaultCmsServices);
      });
  }, []);

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
                {serviceGroupLabels[tab.id]}
              </button>
            );
          })}
        </div>

        <div className="service-grid">
          {items.map((service) => (
            <Link key={service.id} href={`/services/${service.id}`} className="service-card service-card-link">
              {service.image.startsWith("/") ? (
                <Image
                  src={service.image}
                  alt={service.title}
                  width={720}
                  height={960}
                  className="boutique-card-image service-card-image"
                  loading="lazy"
                />
              ) : (
                <img
                  src={service.image}
                  alt={service.title}
                  className="boutique-card-image service-card-image"
                  loading="lazy"
                />
              )}
              <h3 className="boutique-card-title service-card-title">{service.title}</h3>
              {service.description ? <p className="service-card-description">{service.description}</p> : null}
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/services" className="news-link">
            Xem tất cả dịch vụ
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
