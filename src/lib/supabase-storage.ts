import { createClient } from "@supabase/supabase-js";

const CMS_PREFIX = "cms/";

function readPositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
}

export function getSupabaseServiceKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";
}

export function getStorageBucket() {
  return process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET?.trim() || "images";
}

export function isSupabaseStorageConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseServiceKey());
}

export function createSupabaseAdmin() {
  return createClient(getSupabaseUrl(), getSupabaseServiceKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function getPublicStorageUrl(storagePath: string) {
  const path = storagePath.replace(/^\/+/, "");
  return `${getSupabaseUrl()}/storage/v1/object/public/${getStorageBucket()}/${path}`;
}

export function getSupabaseMaxTotalBytes() {
  const mb = readPositiveInt(process.env.SUPABASE_MAX_TOTAL_MB, 1024);
  return mb * 1024 * 1024;
}

export function getSupabaseMaxFileBytes() {
  const mb = readPositiveInt(process.env.SUPABASE_MAX_FILE_MB, 5);
  return mb * 1024 * 1024;
}

export function getSupabaseMaxFiles() {
  return readPositiveInt(process.env.SUPABASE_MAX_FILES, 500);
}

export type SupabaseStorageUsage = {
  enabled: true;
  usedBytes: number;
  maxBytes: number;
  fileCount: number;
  maxFiles: number;
  percentUsed: number;
};

type ListedFile = {
  name: string;
  size: number;
};

async function listFolderFiles(folder: string): Promise<ListedFile[]> {
  const supabase = createSupabaseAdmin();
  const bucket = getStorageBucket();
  const files: ListedFile[] = [];
  const queue = [folder.replace(/^\/+|\/+$/g, "")];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const { data, error } = await supabase.storage.from(bucket).list(current, {
      limit: 1000,
      sortBy: { column: "name", order: "asc" },
    });

    if (error || !data) continue;

    for (const item of data) {
      if (!item.name || item.name === ".emptyFolderPlaceholder") continue;

      const path = current ? `${current}/${item.name}` : item.name;
      const metadata = item.metadata as { size?: number } | null;

      if (item.id) {
        files.push({
          name: path,
          size: metadata?.size ?? 0,
        });
      } else {
        queue.push(path);
      }
    }
  }

  return files;
}

export async function getSupabaseStorageUsage(): Promise<SupabaseStorageUsage | { enabled: false }> {
  if (!isSupabaseStorageConfigured()) {
    return { enabled: false };
  }

  try {
    const files = await listFolderFiles("");
    const usedBytes = files.reduce((total, file) => total + file.size, 0);
    const maxBytes = getSupabaseMaxTotalBytes();
    const maxFiles = getSupabaseMaxFiles();

    return {
      enabled: true,
      usedBytes,
      maxBytes,
      fileCount: files.length,
      maxFiles,
      percentUsed: Math.min(100, Math.round((usedBytes / maxBytes) * 100)),
    };
  } catch {
    return { enabled: false };
  }
}

export type SupabaseUploadGuardResult =
  | { ok: true; usage: SupabaseStorageUsage }
  | { ok: false; error: string; code: string };

export async function assertSupabaseUploadAllowed(fileSize: number): Promise<SupabaseUploadGuardResult> {
  if (!isSupabaseStorageConfigured()) {
    return { ok: false, error: "Chưa cấu hình Supabase Storage.", code: "SUPABASE_NOT_CONFIGURED" };
  }

  const maxFileBytes = getSupabaseMaxFileBytes();
  if (fileSize > maxFileBytes) {
    const maxMb = Math.round(maxFileBytes / (1024 * 1024));
    return {
      ok: false,
      error: `Ảnh quá lớn. Tối đa ${maxMb}MB mỗi file.`,
      code: "FILE_TOO_LARGE",
    };
  }

  const usageResult = await getSupabaseStorageUsage();
  if (!usageResult.enabled) {
    return { ok: false, error: "Không đọc được dung lượng Supabase.", code: "SUPABASE_USAGE_UNAVAILABLE" };
  }

  if (usageResult.fileCount >= usageResult.maxFiles) {
    return {
      ok: false,
      error: `Đã đạt giới hạn ${usageResult.maxFiles} ảnh trên Supabase.`,
      code: "SUPABASE_FILE_LIMIT",
    };
  }

  if (usageResult.usedBytes + fileSize > usageResult.maxBytes) {
    const usedMb = (usageResult.usedBytes / (1024 * 1024)).toFixed(1);
    const maxMb = (usageResult.maxBytes / (1024 * 1024)).toFixed(0);
    return {
      ok: false,
      error: `Sắp vượt quota Supabase (${usedMb}/${maxMb} MB).`,
      code: "SUPABASE_QUOTA_EXCEEDED",
    };
  }

  return { ok: true, usage: usageResult };
}

export function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export function getCmsUploadPrefix() {
  return CMS_PREFIX;
}
