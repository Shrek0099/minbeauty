import type { Metadata } from "next";
import { ServiceManager } from "@/components/cms-admin";
import { MijuAdminShell } from "@/components/miju-admin";

export const metadata: Metadata = {
  title: {
    absolute: "Dịch vụ | Min Beauty Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminServicesPage() {
  return (
    <MijuAdminShell
      title="Quản lý dịch vụ"
      description="Tạo, sửa, cập nhật thứ tự và thay đổi hình ảnh cho từng dịch vụ trên landing page."
    >
      <ServiceManager />
    </MijuAdminShell>
  );
}
