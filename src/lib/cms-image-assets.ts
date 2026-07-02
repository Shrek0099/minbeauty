import { getActiveServices } from "@/lib/services-data";
import { resolveStorageUrl } from "@/lib/image-url";

/** Đường dẫn ảnh gốc (public/images/...) cho từng dịch vụ — map sang Supabase khi đã cấu hình. */
export const serviceHomeImagePaths: Record<string, string> = Object.fromEntries(
  getActiveServices().map((service) => [service.id, service.heroImage]),
);

export function getDefaultServiceHomeImage(serviceId: string, fallback = "") {
  return serviceHomeImagePaths[serviceId] || fallback;
}

export function getResolvedServiceHomeImage(serviceId: string, fallback = "") {
  return resolveStorageUrl(getDefaultServiceHomeImage(serviceId, fallback));
}
