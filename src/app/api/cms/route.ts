import { NextResponse } from "next/server";
import { canPersistCmsData, getCmsData, saveCmsData } from "@/lib/cms-store";
import type { CmsData } from "@/lib/cms-types";

export async function GET() {
  const data = await getCmsData();
  return NextResponse.json({ data, canPersist: canPersistCmsData() });
}

export async function PUT(request: Request) {
  let data: CmsData;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  if (!Array.isArray(data.services) || !data.seo || !Array.isArray(data.posts) || !Array.isArray(data.pages) || !Array.isArray(data.faqs)) {
    return NextResponse.json({ ok: false, error: "INVALID_CMS_DATA" }, { status: 400 });
  }

  const saved = await saveCmsData(data);
  return NextResponse.json({
    ok: true,
    data: saved,
    canPersist: canPersistCmsData(),
  });
}
