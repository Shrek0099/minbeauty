import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceManager } from "@/components/cms-admin";
import { MijuAdminShell } from "@/components/miju-admin";
import { adminServiceIds } from "@/lib/cms-defaults";
import { getService } from "@/lib/services-data";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return adminServiceIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const service = getService(id);

  return {
    title: { absolute: service ? `${service.title} | Min Beauty Admin` : "Dịch vụ | Min Beauty Admin" },
    robots: { index: false, follow: false },
  };
}

export default async function AdminServiceEditPage({ params }: PageProps) {
  const { id } = await params;
  if (!adminServiceIds.includes(id)) notFound();

  const service = getService(id);
  if (!service) notFound();

  return (
    <MijuAdminShell
      title={service.title}
      description="Chỉnh sửa thông tin dịch vụ, hình ảnh và video YouTube cho trang dịch vụ này."
    >
      <ServiceManager initialServiceId={id} showServiceList={false} />
    </MijuAdminShell>
  );
}
