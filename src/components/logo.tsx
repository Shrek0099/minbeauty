import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

type LogoProps = {
  variant?: "header" | "footer" | "nav" | "topbar";
  className?: string;
};

export function Logo({ variant = "header", className = "" }: LogoProps) {
  const isTopbar = variant === "topbar";
  const isNav = variant === "nav";
  const isFooter = variant === "footer";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${
        isTopbar
          ? "logo-mark-topbar h-11 w-11 sm:h-12 sm:w-12"
          : isNav
            ? "shadow-[var(--shadow-soft)] h-11 w-11 md:h-12 md:w-12"
            : isFooter
              ? "shadow-[var(--shadow-soft)] h-14 w-14"
              : "shadow-[var(--shadow-soft)] h-14 w-14 md:h-16 md:w-16"
      } ${className}`}
    >
      <Image
        src={siteConfig.logo}
        alt={siteConfig.name}
        width={512}
        height={512}
        priority={variant === "header" || variant === "nav" || variant === "topbar"}
        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </span>
  );
}
