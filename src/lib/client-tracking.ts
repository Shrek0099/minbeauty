type ContactChannel = "phone" | "zalo" | "booking";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackContactClick(channel: ContactChannel, label: string) {
  window.dataLayer?.push({
    event: "contact_click",
    contact_channel: channel,
    contact_label: label,
  });

  window.gtag?.("event", "contact_click", {
    event_category: "engagement",
    event_label: label,
    contact_channel: channel,
  });

  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const contactLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_LABEL;
  if (adsId && contactLabel && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: `${adsId}/${contactLabel}`,
      event_callback: () => undefined,
    });
  }

  window.fbq?.("trackCustom", "ContactClick", {
    channel,
    label,
  });
}
