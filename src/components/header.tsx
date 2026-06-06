"use client";

import { useState } from "react";
import { Menu, Phone, MapPin, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "#dich-vu", label: "Dịch vụ" },
  { href: "#cam-ket", label: "Cam kết" },
  { href: "#hinh-anh", label: "Hình ảnh" },
  { href: "#gioi-thieu", label: "Giới thiệu" },
  { href: "#tin-tuc", label: "Tin tức" },
  { href: "#tu-van", label: "Tư vấn" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="bg-primary text-white text-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {siteConfig.address}, {siteConfig.city}
            </span>
          </div>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="flex items-center gap-1.5 font-semibold hover:underline"
          >
            <Phone className="h-3.5 w-3.5" />
            Hotline: {siteConfig.phone}
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-primary-light/60 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <a href="#" className="flex flex-col">
            <span className="section-title text-2xl font-bold tracking-wide text-primary">
              Min Beauty
            </span>
            <span className="text-xs tracking-widest text-gold uppercase">
              Thẩm mỹ viện
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#tu-van"
              className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:inline-block"
            >
              Đặt lịch hẹn
            </a>
            <button
              type="button"
              className="rounded-lg p-2 text-foreground lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="border-t border-primary-light/60 bg-white px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="py-2 text-sm font-medium text-foreground hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#tu-van"
                className="mt-2 rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Đặt lịch hẹn
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
