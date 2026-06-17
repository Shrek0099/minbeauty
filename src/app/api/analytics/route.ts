import { NextResponse } from "next/server";
import { canPersistCmsData, getAnalyticsSummary } from "@/lib/cms-store";

export async function GET() {
  const summary = await getAnalyticsSummary();
  return NextResponse.json({ summary, canPersist: canPersistCmsData() });
}
