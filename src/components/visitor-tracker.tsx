"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        path: pathname || "/",
        referrer: document.referrer,
      }),
      keepalive: true,
      signal: controller.signal,
    }).catch(() => {
      // Visitor tracking should never block the page experience.
    });

    return () => controller.abort();
  }, [pathname]);

  return null;
}
