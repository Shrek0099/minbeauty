import { NextResponse } from "next/server";
import { verifySessionFromRequest } from "@/lib/admin-auth";
import { isSupabaseStorageConfigured } from "@/lib/supabase-storage";
import { canPersistCmsData, getCmsData, saveCmsData } from "@/lib/cms-store";
import type { CmsData } from "@/lib/cms-types";

export async function GET() {
  const data = await getCmsData();
  return NextResponse.json({
    data,
    canPersist: canPersistCmsData(),
    storageUploadEnabled: isSupabaseStorageConfigured(),
  });
}

export async function PUT(request: Request) {
  if (!(await verifySessionFromRequest(request))) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  if (!canPersistCmsData()) {
    return NextResponse.json(
      {
        ok: false,
        error: "READ_ONLY",
        message: "Production chỉ xem được CMS. Sửa trên máy local rồi commit và deploy.",
      },
      { status: 503 },
    );
  }
  let data: CmsData;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  if (!Array.isArray(data.services) || !data.seo || !Array.isArray(data.posts) || !Array.isArray(data.pages) || !Array.isArray(data.faqs)) {
    return NextResponse.json({ ok: false, error: "INVALID_CMS_DATA" }, { status: 400 });
  }

  if (data.serviceMedia && typeof data.serviceMedia !== "object") {
    return NextResponse.json({ ok: false, error: "INVALID_CMS_DATA" }, { status: 400 });
  }

  const saved = await saveCmsData(data);
  return NextResponse.json({
    ok: true,
    data: saved,
    canPersist: canPersistCmsData(),
  });
}
