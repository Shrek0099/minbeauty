const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export const ADMIN_SESSION_COOKIE = "minbeauty_admin_session";

type SessionPayload = {
  exp: number;
  user: string;
};

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET?.trim() || "";
}

export function getAdminUser() {
  return process.env.ADMIN_USER?.trim() || "";
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() || "";
}

export function isAdminConfigured() {
  return Boolean(getSecret() && getAdminUser() && getAdminPassword());
}

function toBase64Url(value: string) {
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  return atob(padded + pad);
}

function toSigBase64Url(bytes: ArrayBuffer) {
  const view = new Uint8Array(bytes);
  let binary = "";
  for (const byte of view) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(message: string) {
  const secret = getSecret();
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return toSigBase64Url(sig);
}

export function verifyAdminCredentials(username: string, password: string) {
  const expectedUser = getAdminUser();
  const expectedPassword = getAdminPassword();
  if (!expectedUser || !expectedPassword) return false;

  return username === expectedUser && password === expectedPassword;
}

export async function createSessionToken(user: string) {
  const payload = JSON.stringify({
    exp: Date.now() + SESSION_TTL_MS,
    user,
  } satisfies SessionPayload);
  const payloadB64 = toBase64Url(payload);
  const signature = await sign(payloadB64);
  return `${payloadB64}.${signature}`;
}

export async function verifySessionToken(token: string | undefined | null) {
  if (!token || !isAdminConfigured()) return false;

  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return false;

  const expected = await sign(payloadB64);
  if (signature !== expected) return false;

  try {
    const payload = JSON.parse(fromBase64Url(payloadB64)) as SessionPayload;
    return (
      typeof payload.exp === "number" &&
      payload.exp > Date.now() &&
      typeof payload.user === "string" &&
      payload.user === getAdminUser()
    );
  } catch {
    return false;
  }
}

export async function getSessionUserFromRequest(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(new RegExp(`(?:^|; )${ADMIN_SESSION_COOKIE}=([^;]*)`));
  const token = match ? decodeURIComponent(match[1]) : undefined;

  if (!(await verifySessionToken(token))) return null;

  const [payloadB64] = token!.split(".");
  try {
    const payload = JSON.parse(fromBase64Url(payloadB64)) as SessionPayload;
    return payload.user;
  } catch {
    return null;
  }
}

export async function verifySessionFromRequest(request: Request) {
  return Boolean(await getSessionUserFromRequest(request));
}

export function adminSessionCookieOptions(maxAge = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}
