import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

type LogoProps = {
  variant?: "header" | "footer";
  className?: string;
};

export function Logo({ variant = "header", className = "" }: LogoProps) {
  const isFooter = variant === "footer";

  return (
    <span
      className={`inline-flex items-center ${isFooter ? "rounded-2xl bg-white/95 p-2.5 shadow-[var(--shadow-soft)]" : ""} ${className}`}
    >
      <Image
        src={siteConfig.logo}
        alt={siteConfig.name}
        width={160}
        height={90}
        priority={!isFooter}
        className={
          isFooter
            ? "h-11 w-auto"
            : "h-12 w-auto transition-transform duration-300 group-hover:scale-[1.02] md:h-14"
        }
      />
    </span>
  );
}
