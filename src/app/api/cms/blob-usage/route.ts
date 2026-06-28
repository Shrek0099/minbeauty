import { NextResponse } from "next/server";
import { verifySessionFromRequest } from "@/lib/admin-auth";
import { getBlobUsage } from "@/lib/blob-storage";

export async function GET(request: Request) {
  if (!(await verifySessionFromRequest(request))) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const usage = await getBlobUsage();
  return NextResponse.json({ usage });
}
