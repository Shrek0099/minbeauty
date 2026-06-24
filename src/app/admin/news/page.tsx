import type { Metadata } from "next";
import { PostManager } from "@/components/cms-content-admin";
import { MijuAdminShell } from "@/components/miju-admin";

export const metadata: Metadata = {
  title: { absolute: "Quản lý tin tức — Min Beauty Admin" },
  robots: { index: false, follow: false },
};

export default function AdminNewsPage() {
  return (
    <MijuAdminShell
      title="Quản lý tin tức"
      description="Thêm, sửa, xóa và xuất bản bài viết tin tức trên Min Beauty."
    >
      <PostManager />
    </MijuAdminShell>
  );
}
