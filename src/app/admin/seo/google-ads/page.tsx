import type { Metadata } from "next";
import { GoogleAdsManager, MijuAdminShell } from "@/components/miju-admin";

export const metadata: Metadata = {
  title: {
    absolute: "Google Ads | Min Beauty Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminGoogleAdsPage() {
  return (
    <MijuAdminShell
      title="Quản lý Google Ads"
      description="Theo dõi tài khoản quảng cáo, ngân sách, landing page và các chiến dịch Google Ads của Min Beauty."
    >
      <GoogleAdsManager />
    </MijuAdminShell>
  );
}
