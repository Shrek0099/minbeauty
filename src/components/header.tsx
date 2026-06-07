"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, MapPin, Menu, Phone, Search, X } from "lucide-react";
import { headerNavItems, siteConfig, type HeaderNavItem } from "@/lib/site-config";
import { Logo } from "@/components/logo";

const PHONE_NAV_QUERY = "(max-width: 767px)";

type DropdownKey = "dich-vu" | "tin-tuc";
type MobileDropdownKey = DropdownKey | null;

function usePhoneNav() {
  const [isPhoneNav, setIsPhoneNav] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(PHONE_NAV_QUERY);
    const update = () => setIsPhoneNav(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isPhoneNav;
}

function hasDropdown(
  item: HeaderNavItem,
): item is { label: string; dropdown: { href: string; label: string }[] } {
  return "dropdown" in item;
}

function AddressLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={siteConfig.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`Xem địa chỉ ${siteConfig.name} trên Google Maps`}
    >
      <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
      <span>{siteConfig.fullAddress}</span>
    </a>
  );
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

function MobileNav({
  open,
  onClose,
  mobileDropdown,
  setMobileDropdown,
}: {
  open: boolean;
  onClose: () => void;
  mobileDropdown: MobileDropdownKey;
  setMobileDropdown: (key: MobileDropdownKey) => void;
}) {
  if (!open) return null;

  return (
    <div className="site-mobile-nav">
      <button
        type="button"
        className="site-mobile-nav-backdrop"
        aria-label="Đóng menu"
        onClick={onClose}
      />
      <nav className="site-mobile-nav-panel" aria-label="Menu di động">
        <div className="site-mobile-nav-header">
          <p className="site-mobile-nav-title">Danh mục</p>
          <button
            type="button"
            className="site-mobile-nav-close"
            aria-label="Đóng menu"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ul className="site-mobile-nav-list">
          {headerNavItems.map((item) => {
            if (hasDropdown(item)) {
              const menuKey: DropdownKey = item.label === "Dịch vụ" ? "dich-vu" : "tin-tuc";
              const isOpen = mobileDropdown === menuKey;

              return (
                <li key={item.label} className="site-mobile-nav-item">
                  <button
                    type="button"
                    className="site-mobile-nav-link site-mobile-nav-link-dropdown"
                    aria-expanded={isOpen}
                    onClick={() => setMobileDropdown(isOpen ? null : menuKey)}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <ul className="site-mobile-nav-sublist">
                      {item.dropdown.map((subItem) => (
                        <li key={subItem.href}>
                          <a
                            href={subItem.href}
                            className="site-mobile-nav-sublink"
                            onClick={onClose}
                          >
                            {subItem.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={item.label} className="site-mobile-nav-item">
                <a href={item.href} className="site-mobile-nav-link" onClick={onClose}>
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function Header() {
  const isPhoneNav = usePhoneNav();
  const [openMenu, setOpenMenu] = useState<DropdownKey | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<MobileDropdownKey>(null);
  const headerRef = useRef<HTMLElement>(null);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdown(null);
  };

  useEffect(() => {
    if (!isPhoneNav) closeMobileMenu();
  }, [isPhoneNav]);

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

  useEffect(() => {
    if (!mobileMenuOpen || !isPhoneNav) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, isPhoneNav]);

  return (
    <header ref={headerRef} className="site-header">
      <div className="site-header-topbar">
        <div className="site-container">
          <div className="site-header-topbar-inner">
            <a href="#" className="site-header-logo group shrink-0" onClick={closeMobileMenu}>
              <Logo variant="topbar" />
            </a>

            <label className="site-header-search hidden md:flex">
              <Search className="site-header-search-icon h-4 w-4" />
              <input type="search" placeholder="Tìm kiếm Dịch vụ..." aria-label="Tìm kiếm dịch vụ" />
            </label>

            <AddressLink className="site-header-address hidden lg:inline-flex" />

            <div className="site-header-topbar-actions">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="site-header-hotline hidden md:inline-flex"
                aria-label={`Gọi hotline ${siteConfig.phone}`}
              >
                <Phone className="h-4 w-4 shrink-0" />
                <span>{siteConfig.phone}</span>
              </a>
              <a href="#lien-he" className="site-header-booking" onClick={closeMobileMenu}>
                Đặt lịch hẹn
              </a>
              {isPhoneNav && (
                <button
                  type="button"
                  className="site-header-menu-btn"
                  aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
                  aria-expanded={mobileMenuOpen}
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              )}
            </div>
          </div>

          {isPhoneNav && (
            <div className="site-header-address-mobile">
              <AddressLink className="site-header-address-mobile-link" />
            </div>
          )}
        </div>
      </div>

      {!isPhoneNav && (
        <div className="site-header-main">
          <div className="site-container site-header-main-inner">
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
      )}

      {isPhoneNav && (
        <MobileNav
          open={mobileMenuOpen}
          onClose={closeMobileMenu}
          mobileDropdown={mobileDropdown}
          setMobileDropdown={setMobileDropdown}
        />
      )}
    </header>
  );
}
