import { list } from "@vercel/blob";

const CMS_PREFIX = "cms/";

function readPositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

export function isBlobStorageConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

export function getBlobStoreId() {
  return process.env.BLOB_STORE_ID?.trim() || "";
}

/** Tổng dung lượng store (bytes). Mặc định 800MB — để buffer dưới free tier 1GB. */
export function getBlobMaxTotalBytes() {
  const mb = readPositiveInt(process.env.BLOB_MAX_TOTAL_MB, 800);
  return mb * 1024 * 1024;
}

/** Một file tối đa (bytes). Mặc định 2MB. */
export function getBlobMaxFileBytes() {
  const mb = readPositiveInt(process.env.BLOB_MAX_FILE_MB, 2);
  return mb * 1024 * 1024;
}

/** Số file tối đa trong prefix cms/. Mặc định 150. */
export function getBlobMaxFiles() {
  return readPositiveInt(process.env.BLOB_MAX_FILES, 150);
}

export type BlobUsage = {
  enabled: true;
  usedBytes: number;
  maxBytes: number;
  fileCount: number;
  maxFiles: number;
  percentUsed: number;
};

export async function getBlobUsage(): Promise<BlobUsage | { enabled: false }> {
  if (!isBlobStorageConfigured()) {
    return { enabled: false };
  }

  let usedBytes = 0;
  let fileCount = 0;
  let cursor: string | undefined;

  do {
    const result = await list({
      prefix: CMS_PREFIX,
      cursor,
      limit: 1000,
    });

    for (const blob of result.blobs) {
      usedBytes += blob.size;
      fileCount += 1;
    }

    cursor = result.hasMore ? result.cursor : undefined;
  } while (cursor);

  const maxBytes = getBlobMaxTotalBytes();
  const maxFiles = getBlobMaxFiles();
  const percentUsed = Math.min(100, Math.round((usedBytes / maxBytes) * 100));

  return {
    enabled: true,
    usedBytes,
    maxBytes,
    fileCount,
    maxFiles,
    percentUsed,
  };
}

export type BlobUploadGuardResult =
  | { ok: true; usage: BlobUsage }
  | { ok: false; error: string; code: string };

export async function assertBlobUploadAllowed(fileSize: number): Promise<BlobUploadGuardResult> {
  if (!isBlobStorageConfigured()) {
    return { ok: false, error: "Chưa cấu hình Blob.", code: "BLOB_NOT_CONFIGURED" };
  }

  const maxFileBytes = getBlobMaxFileBytes();
  if (fileSize > maxFileBytes) {
    const maxMb = Math.round(maxFileBytes / (1024 * 1024));
    return {
      ok: false,
      error: `Ảnh quá lớn. Tối đa ${maxMb}MB mỗi file để tiết kiệm dung lượng.`,
      code: "FILE_TOO_LARGE",
    };
  }

  const usageResult = await getBlobUsage();
  if (!usageResult.enabled) {
    return { ok: false, error: "Không đọc được dung lượng Blob.", code: "BLOB_USAGE_UNAVAILABLE" };
  }

  if (usageResult.fileCount >= usageResult.maxFiles) {
    return {
      ok: false,
      error: `Đã đạt giới hạn ${usageResult.maxFiles} ảnh CMS. Xóa ảnh cũ trên Vercel Blob hoặc dùng ảnh trong public/images/.`,
      code: "BLOB_FILE_LIMIT",
    };
  }

  if (usageResult.usedBytes + fileSize > usageResult.maxBytes) {
    const usedMb = (usageResult.usedBytes / (1024 * 1024)).toFixed(1);
    const maxMb = (usageResult.maxBytes / (1024 * 1024)).toFixed(0);
    return {
      ok: false,
      error: `Sắp vượt quota Blob (${usedMb}/${maxMb} MB). Upload bị chặn để tránh phí phát sinh.`,
      code: "BLOB_QUOTA_EXCEEDED",
    };
  }

  return { ok: true, usage: usageResult };
}

export function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
