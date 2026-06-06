"use client";

import { useState } from "react";
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
}: {
  label: string;
  items: readonly { href: string; label: string }[];
  menuKey: DropdownKey;
  openMenu: DropdownKey | null;
  setOpenMenu: (key: DropdownKey | null) => void;
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
        <div className="site-nav-dropdown-panel">
          {items.map((item) => (
            <a key={item.href} href={item.href} className="site-nav-dropdown-item">
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

          <nav className="site-main-nav">
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
