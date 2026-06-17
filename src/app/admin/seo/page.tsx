import type { Metadata } from "next";
import { SeoManager } from "@/components/cms-admin";
import { MijuAdminShell, SeoSectionOverview } from "@/components/miju-admin";

export const metadata: Metadata = {
  title: {
    absolute: "SEO | Min Beauty Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminSeoPage() {
  return (
    <MijuAdminShell
      title="SEO"
      description="Quản lý các công cụ SEO và quảng cáo giúp Min Beauty tăng trưởng traffic chất lượng."
    >
      <SeoSectionOverview />
      <div className="mt-5">
        <SeoManager />
      </div>
    </MijuAdminShell>
  );
}
