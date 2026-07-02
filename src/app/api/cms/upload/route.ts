import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { verifySessionFromRequest } from "@/lib/admin-auth";
import {
  ALLOWED_IMAGE_TYPES,
  assertSupabaseUploadAllowed,
  createSupabaseAdmin,
  getCmsUploadPrefix,
  getPublicStorageUrl,
  getSupabaseMaxFileBytes,
  getStorageBucket,
  isSupabaseStorageConfigured,
} from "@/lib/supabase-storage";

function canUploadOnServer() {
  return process.env.NODE_ENV !== "production" || isSupabaseStorageConfigured();
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
        message:
          "Chưa cấu hình Supabase Storage. Thêm NEXT_PUBLIC_SUPABASE_URL và SUPABASE_SERVICE_ROLE_KEY trên Vercel hoặc upload trên local.",
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
        message: "Chỉ chấp nhận JPG, PNG hoặc WebP.",
      },
      { status: 400 },
    );
  }

  const maxFileBytes = isSupabaseStorageConfigured()
    ? getSupabaseMaxFileBytes()
    : 4 * 1024 * 1024;

  if (file.size > maxFileBytes) {
    return NextResponse.json({ ok: false, error: "FILE_TOO_LARGE" }, { status: 400 });
  }

  const fileName = safeFileName(file.name);
  const buffer = Buffer.from(await file.arrayBuffer());

  if (isSupabaseStorageConfigured()) {
    const guard = await assertSupabaseUploadAllowed(file.size);
    if (!guard.ok) {
      return NextResponse.json(
        { ok: false, error: guard.code, message: guard.error },
        { status: 403 },
      );
    }

    const storagePath = `${getCmsUploadPrefix()}${fileName}`;

    try {
      const supabase = createSupabaseAdmin();
      const { error } = await supabase.storage.from(getStorageBucket()).upload(storagePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

      if (error) {
        return NextResponse.json(
          { ok: false, error: "SUPABASE_UPLOAD_FAILED", message: error.message },
          { status: 500 },
        );
      }

      return NextResponse.json({
        ok: true,
        url: getPublicStorageUrl(storagePath),
        persisted: true,
        storage: "supabase",
        usage: guard.usage,
      });
    } catch {
      return NextResponse.json({ ok: false, error: "SUPABASE_UPLOAD_FAILED" }, { status: 500 });
    }
  }

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
