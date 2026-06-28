import { put } from "@vercel/blob";
import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { verifySessionFromRequest } from "@/lib/admin-auth";
import {
  ALLOWED_IMAGE_TYPES,
  assertBlobUploadAllowed,
  getBlobMaxFileBytes,
  isBlobStorageConfigured,
} from "@/lib/blob-storage";

function canUploadOnServer() {
  return process.env.NODE_ENV !== "production" || isBlobStorageConfigured();
}

function safeFileName(name: string) {
  const ext = path.extname(name).toLowerCase() || ".jpg";
  const base = path
    .basename(name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);

  return `${base || "service-photo"}-${Date.now()}${ext}`;
}

export async function POST(request: Request) {
  if (!(await verifySessionFromRequest(request))) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  if (!canUploadOnServer()) {
    return NextResponse.json(
      {
        ok: false,
        error: "UPLOAD_DISABLED",
        message: "Chưa cấu hình BLOB_READ_WRITE_TOKEN. Thêm token Vercel Blob trên Vercel hoặc upload trên local.",
      },
      { status: 403 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "MISSING_FILE" }, { status: 400 });
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return NextResponse.json(
      {
        ok: false,
        error: "INVALID_FILE_TYPE",
        message: "Chỉ chấp nhận JPG, PNG hoặc WebP để tiết kiệm dung lượng.",
      },
      { status: 400 },
    );
  }

  const maxFileBytes = isBlobStorageConfigured()
    ? getBlobMaxFileBytes()
    : 4 * 1024 * 1024;

  if (file.size > maxFileBytes) {
    return NextResponse.json({ ok: false, error: "FILE_TOO_LARGE" }, { status: 400 });
  }

  const fileName = safeFileName(file.name);

  if (isBlobStorageConfigured()) {
    const guard = await assertBlobUploadAllowed(file.size);
    if (!guard.ok) {
      return NextResponse.json(
        { ok: false, error: guard.code, message: guard.error },
        { status: 403 },
      );
    }

    try {
      const blob = await put(`cms/${fileName}`, file, {
        access: "public",
        addRandomSuffix: false,
      });

      return NextResponse.json({
        ok: true,
        url: blob.url,
        persisted: true,
        storage: "blob",
        usage: guard.usage,
      });
    } catch {
      return NextResponse.json({ ok: false, error: "BLOB_UPLOAD_FAILED" }, { status: 500 });
    }
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadPath = `/uploads/cms/${fileName}`;

  try {
    const diskPath = path.join(process.cwd(), "public", uploadPath);
    await fs.mkdir(path.dirname(diskPath), { recursive: true });
    await fs.writeFile(diskPath, buffer);

    return NextResponse.json({
      ok: true,
      url: uploadPath,
      persisted: true,
      storage: "local",
    });
  } catch {
    const base64 = buffer.toString("base64");
    return NextResponse.json({
      ok: true,
      url: `data:${file.type};base64,${base64}`,
      persisted: false,
      storage: "inline",
    });
  }
}
