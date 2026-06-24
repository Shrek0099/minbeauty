import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageEditor } from "@/components/cms-content-admin";
import { MijuAdminShell } from "@/components/miju-admin";
import { cmsPageKeys } from "@/lib/cms-defaults";
import type { CmsPageKey } from "@/lib/cms-types";

type PageProps = { params: Promise<{ key: string }> };

export function generateStaticParams() {
  return cmsPageKeys.map((key) => ({ key }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { key } = await params;
  return {
    title: { absolute: `Chỉnh sửa ${key} — Min Beauty Admin` },
    robots: { index: false, follow: false },
  };
}

export default async function AdminPageEditor({ params }: PageProps) {
  const { key } = await params;
  if (!cmsPageKeys.includes(key as CmsPageKey)) notFound();

  return (
    <MijuAdminShell
      title="Chỉnh sửa trang"
      description="Cập nhật SEO metadata, tiêu đề và nội dung hiển thị trên trang công khai."
    >
      <PageEditor pageKey={key as CmsPageKey} />
    </MijuAdminShell>
  );
}
