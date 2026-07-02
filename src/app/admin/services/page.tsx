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
      description="Tạo, sửa, cập nhật thứ tự, hình ảnh và thêm hình ảnh/video YouTube cho từng trang dịch vụ."
    >
      <ServiceManager />
    </MijuAdminShell>
  );
}
