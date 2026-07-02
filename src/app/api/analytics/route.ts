import { NextResponse } from "next/server";
import { verifySessionFromRequest } from "@/lib/admin-auth";
import { isSupabaseStorageConfigured } from "@/lib/supabase-storage";
import { canPersistCmsData, getAnalyticsSummary } from "@/lib/cms-store";

export async function GET(request: Request) {
  if (!(await verifySessionFromRequest(request))) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const summary = await getAnalyticsSummary();
  return NextResponse.json({
    summary,
    canPersist: canPersistCmsData(),
    storageUploadEnabled: isSupabaseStorageConfigured(),
  });
}
