"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, MapPin, Phone, Search } from "lucide-react";
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
  alignEnd = false,
}: {
  label: string;
  items: readonly { href: string; label: string }[];
  menuKey: DropdownKey;
  openMenu: DropdownKey | null;
  setOpenMenu: (key: DropdownKey | null) => void;
  alignEnd?: boolean;
}) {
  const isOpen = openMenu === menuKey;

  return (
    <div
      className="site-nav-dropdown shrink-0"
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
        <div className={`site-nav-dropdown-panel${alignEnd ? " site-nav-dropdown-panel--end" : ""}`}>
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="site-nav-dropdown-item"
              onClick={() => setOpenMenu(null)}
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
  const [openMenu, setOpenMenu] = useState<DropdownKey | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!openMenu) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu]);

  return (
    <header ref={headerRef} className="site-header">
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
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="site-header-hotline"
              aria-label={`Gọi hotline ${siteConfig.phone}`}
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span className="site-header-hotline-text">{siteConfig.phone}</span>
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

          <nav className="site-main-nav" aria-label="Menu chính">
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
                    alignEnd={item.label === "Tin tức"}
                  />
                );
              }

              return (
                <a key={item.label} href={item.href} className="site-main-nav-link shrink-0">
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
