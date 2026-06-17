import type { Metadata } from "next";
import { AnalyticsDashboard } from "@/components/cms-admin";
import { MijuAdminShell } from "@/components/miju-admin";

export const metadata: Metadata = {
  title: {
    absolute: "Visitor Analytics | Min Beauty Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminAnalyticsPage() {
  return (
    <MijuAdminShell
      title="Visitor analytics"
      description="Theo dõi số lượt xem, khách truy cập duy nhất, trang được xem nhiều và lượt truy cập gần đây."
    >
      <AnalyticsDashboard />
    </MijuAdminShell>
  );
}
