"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/logo";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-container site-header-inner">
        <a href="#" className="group flex shrink-0 items-center">
          <Logo variant="header" />
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="site-nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`https://zalo.me/${siteConfig.zalo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden sm:inline-flex"
          >
            Nhắn Zalo
          </a>

          <button
            type="button"
            className="rounded-full p-2 text-foreground transition-colors hover:bg-section-bg lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-[rgba(255,249,246,0.98)] px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="site-nav-link block rounded-xl px-3 py-3"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`https://zalo.me/${siteConfig.zalo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-2 w-full py-3 text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Nhắn Zalo
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
