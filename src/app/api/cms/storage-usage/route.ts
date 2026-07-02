import { NextResponse } from "next/server";
import { verifySessionFromRequest } from "@/lib/admin-auth";
import { formatBytes, getSupabaseStorageUsage } from "@/lib/supabase-storage";

export async function GET(request: Request) {
  if (!(await verifySessionFromRequest(request))) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const usage = await getSupabaseStorageUsage();

  return NextResponse.json({
    ok: true,
    usage,
    formatted: usage.enabled
      ? {
          used: formatBytes(usage.usedBytes),
          max: formatBytes(usage.maxBytes),
        }
      : null,
  });
}
