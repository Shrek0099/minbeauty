import type { Metadata } from "next";
import { AdminDashboard } from "@/components/cms-admin";
import { MijuAdminShell } from "@/components/miju-admin";

export const metadata: Metadata = {
  title: {
    absolute: "Min Beauty Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <MijuAdminShell
      title="Tổng quan admin"
      description="Khu vực quản trị nội dung, SEO và các công cụ tăng trưởng cho Min Beauty."
    >
      <AdminDashboard />
    </MijuAdminShell>
  );
}
