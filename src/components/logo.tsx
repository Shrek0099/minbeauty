import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

type LogoProps = {
  variant?: "header" | "footer" | "nav";
  className?: string;
};

export function Logo({ variant = "header", className = "" }: LogoProps) {
  const isFooter = variant === "footer";
  const isNav = variant === "nav";

  return (
    <span
      className={`inline-flex items-center ${
        isFooter || isNav ? "rounded-2xl bg-white/95 p-2 shadow-[var(--shadow-soft)]" : ""
      } ${className}`}
    >
      <Image
        src={siteConfig.logo}
        alt={siteConfig.name}
        width={160}
        height={90}
        priority={variant === "header" || variant === "nav"}
        className={
          isFooter || isNav
            ? "h-10 w-auto md:h-11"
            : "h-12 w-auto transition-transform duration-300 group-hover:scale-[1.02] md:h-14"
        }
      />
    </span>
  );
}
