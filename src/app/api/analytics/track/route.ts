import { NextResponse } from "next/server";
import { recordPageView } from "@/lib/cms-store";

const visitorCookieName = "mb_visitor_id";

function getVisitorId(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(new RegExp(`${visitorCookieName}=([^;]+)`));
  return match?.[1] || crypto.randomUUID();
}

export async function POST(request: Request) {
  const visitorId = getVisitorId(request);
  const payload = await request.json().catch(() => ({}));
  const path = typeof payload.path === "string" ? payload.path.slice(0, 180) : "/";
  const referrer = typeof payload.referrer === "string" ? payload.referrer.slice(0, 300) : "";
  const userAgent = request.headers.get("user-agent") || "";

  await recordPageView({
    path,
    referrer,
    visitorId,
    userAgent,
  });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(visitorCookieName, visitorId, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return response;
}
