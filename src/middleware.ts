import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  isAdminConfigured,
  verifySessionToken,
} from "@/lib/admin-auth";

function isPublicAdminPath(pathname: string) {
  return pathname === "/admin/login";
}

function isProtectedApiPath(pathname: string, method: string) {
  if (pathname === "/api/cms" && method === "GET") return false;
  if (pathname.startsWith("/api/cms/")) return true;
  if (pathname === "/api/cms" && method !== "GET") return true;
  if (pathname === "/api/analytics" && method === "GET") return true;
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  const needsAuth =
    (pathname.startsWith("/admin") && !isPublicAdminPath(pathname)) ||
    isProtectedApiPath(pathname, method);

  if (!needsAuth) return NextResponse.next();

  if (!isAdminConfigured()) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { ok: false, error: "ADMIN_NOT_CONFIGURED" },
        { status: 503 },
      );
    }

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "setup");
    return NextResponse.redirect(loginUrl);
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const valid = await verifySessionToken(token);

  if (!valid) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
    }

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/api/cms", "/api/cms/:path*", "/api/analytics"],
};
