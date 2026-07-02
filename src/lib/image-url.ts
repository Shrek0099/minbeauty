import { getPublicStorageUrl, isSupabaseStorageConfigured } from "@/lib/supabase-storage";

export function toStoragePath(pathOrUrl: string): string | null {
  const trimmed = pathOrUrl.trim();
  if (!trimmed || trimmed.startsWith("data:")) return null;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    const supabaseMarker = "/storage/v1/object/public/";
    const markerIndex = trimmed.indexOf(supabaseMarker);
    if (markerIndex === -1) return null;

    const afterMarker = trimmed.slice(markerIndex + supabaseMarker.length);
    const slashIndex = afterMarker.indexOf("/");
    if (slashIndex === -1) return null;

    return afterMarker.slice(slashIndex + 1);
  }

  if (trimmed.startsWith("/images/")) {
    return trimmed.slice("/images/".length);
  }

  if (trimmed.startsWith("/uploads/cms/")) {
    return `cms/${trimmed.slice("/uploads/cms/".length)}`;
  }

  if (trimmed.startsWith("/")) {
    return trimmed.slice(1);
  }

  return trimmed;
}

export function resolveStorageUrl(pathOrUrl: string): string {
  const trimmed = pathOrUrl.trim();
  if (!trimmed) return trimmed;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) {
    return trimmed;
  }

  if (isSupabaseStorageConfigured()) {
    const storagePath = toStoragePath(trimmed);
    if (storagePath) return getPublicStorageUrl(storagePath);
  }

  return trimmed;
}

export function isResolvableStoragePath(pathOrUrl: string) {
  return Boolean(toStoragePath(pathOrUrl) || pathOrUrl.startsWith("http"));
}
