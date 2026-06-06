import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function FloatingContact() {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3">
      <a
        href={`https://zalo.me/${siteConfig.zalo}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0068FF] text-xs font-bold text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Chat Zalo"
      >
        Zalo
      </a>
      <a
        href={`tel:${siteConfig.phoneRaw}`}
        className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Gọi hotline"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}
