import type { Metadata } from "next";
import { PageListManager } from "@/components/cms-content-admin";
import { MijuAdminShell } from "@/components/miju-admin";

export const metadata: Metadata = {
  title: { absolute: "Trang tĩnh — Min Beauty Admin" },
  robots: { index: false, follow: false },
};

export default function AdminPagesPage() {
  return (
    <MijuAdminShell
      title="Trang tĩnh"
      description="Chỉnh SEO, tiêu đề và nội dung các trang chính của website."
    >
      <PageListManager />
    </MijuAdminShell>
  );
}
