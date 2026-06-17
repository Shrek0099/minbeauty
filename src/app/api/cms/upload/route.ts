import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const maxUploadBytes = 4 * 1024 * 1024;

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
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "MISSING_FILE" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ ok: false, error: "INVALID_FILE_TYPE" }, { status: 400 });
  }

  if (file.size > maxUploadBytes) {
    return NextResponse.json({ ok: false, error: "FILE_TOO_LARGE" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = safeFileName(file.name);
  const uploadPath = `/uploads/cms/${fileName}`;

  try {
    const diskPath = path.join(process.cwd(), "public", uploadPath);
    await fs.mkdir(path.dirname(diskPath), { recursive: true });
    await fs.writeFile(diskPath, buffer);

    return NextResponse.json({ ok: true, url: uploadPath, persisted: true });
  } catch {
    const base64 = buffer.toString("base64");
    return NextResponse.json({
      ok: true,
      url: `data:${file.type};base64,${base64}`,
      persisted: false,
    });
  }
}
