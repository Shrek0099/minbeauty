"use client";

import { useEffect, useState } from "react";
import { ChevronDown, MapPin, Menu, Phone, Search, X } from "lucide-react";
import { headerNavItems, siteConfig, type HeaderNavItem } from "@/lib/site-config";
import { Logo } from "@/components/logo";

type DropdownKey = "dich-vu" | "tin-tuc";

function hasDropdown(
  item: HeaderNavItem,
): item is { label: string; dropdown: { href: string; label: string }[] } {
  return "dropdown" in item;
}

function NavDropdown({
  label,
  items,
  menuKey,
  openMenu,
  setOpenMenu,
  onNavigate,
}: {
  label: string;
  items: readonly { href: string; label: string }[];
  menuKey: DropdownKey;
  openMenu: DropdownKey | null;
  setOpenMenu: (key: DropdownKey | null) => void;
  onNavigate?: () => void;
}) {
  const isOpen = openMenu === menuKey;

  return (
    <div
      className="site-nav-dropdown"
      onMouseEnter={() => setOpenMenu(menuKey)}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <button
        type="button"
        className="site-main-nav-link site-main-nav-link-dropdown"
        aria-expanded={isOpen}
        onClick={() => setOpenMenu(isOpen ? null : menuKey)}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="site-nav-dropdown-panel">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="site-nav-dropdown-item"
              onClick={onNavigate}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<DropdownKey | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<DropdownKey | null>(null);

  useEffect(() => {
    if (!mobileOpen) {
      setMobileDropdown(null);
    }
  }, [mobileOpen]);

  return (
    <header className="site-header">
      <div className="site-header-topbar">
        <div className="site-container site-header-topbar-inner">
          <label className="site-header-search hidden md:flex">
            <Search className="site-header-search-icon h-4 w-4" />
            <input type="search" placeholder="Tìm kiếm Dịch vụ..." aria-label="Tìm kiếm dịch vụ" />
          </label>

          <p className="site-header-address hidden items-center gap-1.5 lg:flex">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            {siteConfig.fullAddress}
          </p>

          <div className="site-header-topbar-actions">
            <a href={`tel:${siteConfig.phoneRaw}`} className="site-header-hotline">
              <Phone className="h-4 w-4 shrink-0" />
              {siteConfig.phone}
            </a>
            <a href="#lien-he" className="site-header-booking">
              Đặt lịch hẹn
            </a>
          </div>
        </div>
      </div>

      <div className="site-header-main">
        <div className="site-container site-header-main-inner">
          <a href="#" className="group flex shrink-0 items-center">
            <Logo variant="nav" />
          </a>

          <nav className="site-main-nav hidden lg:flex">
            {headerNavItems.map((item) => {
              if (hasDropdown(item)) {
                const menuKey: DropdownKey = item.label === "Dịch vụ" ? "dich-vu" : "tin-tuc";
                return (
                  <NavDropdown
                    key={item.label}
                    label={item.label}
                    items={item.dropdown}
                    menuKey={menuKey}
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                  />
                );
              }

              return (
                <a key={item.label} href={item.href} className="site-main-nav-link">
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`https://zalo.me/${siteConfig.zalo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="site-zalo-btn hidden sm:inline-flex"
            >
              Nhắn Zalo
            </a>

            <button
              type="button"
              className="site-mobile-menu-btn lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav className="site-mobile-nav lg:hidden">
          <div className="site-container py-4">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-border/70 pb-4 sm:hidden">
              <a href={`tel:${siteConfig.phoneRaw}`} className="site-header-hotline text-sm">
                <Phone className="h-4 w-4 shrink-0" />
                {siteConfig.phone}
              </a>
              <a href="#lien-he" className="site-header-booking text-sm" onClick={() => setMobileOpen(false)}>
                Đặt lịch hẹn
              </a>
            </div>

            <div className="flex flex-col gap-1">
              {headerNavItems.map((item) => {
                if (hasDropdown(item)) {
                  const menuKey: DropdownKey = item.label === "Dịch vụ" ? "dich-vu" : "tin-tuc";
                  const expanded = mobileDropdown === menuKey;

                  return (
                    <div key={item.label} className="site-mobile-nav-group">
                      <button
                        type="button"
                        className="site-mobile-nav-link"
                        onClick={() => setMobileDropdown(expanded ? null : menuKey)}
                      >
                        {item.label}
                        <ChevronDown className={`h-4 w-4 ${expanded ? "rotate-180" : ""}`} />
                      </button>
                      {expanded && (
                        <div className="site-mobile-nav-sub">
                          {item.dropdown.map((sub) => (
                            <a
                              key={sub.href}
                              href={sub.href}
                              className="site-mobile-nav-sub-link"
                              onClick={() => setMobileOpen(false)}
                            >
                              {sub.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="site-mobile-nav-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              })}

              <a
                href={`https://zalo.me/${siteConfig.zalo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="site-zalo-btn mt-3 w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Nhắn Zalo
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
