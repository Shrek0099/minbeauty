"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/admin";
  const setupError = searchParams.get("error") === "setup";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    setupError ? "Chưa cấu hình ADMIN_USER, ADMIN_PASSWORD và ADMIN_SESSION_SECRET trên server." : "",
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        if (payload?.error === "ADMIN_NOT_CONFIGURED") {
          setError("Chưa cấu hình ADMIN_USER, ADMIN_PASSWORD và ADMIN_SESSION_SECRET trên Vercel.");
        } else {
          setError("Tên đăng nhập hoặc mật khẩu không đúng.");
        }
        return;
      }

      router.replace(nextPath.startsWith("/admin") ? nextPath : "/admin");
      router.refresh();
    } catch {
      setError("Không đăng nhập được. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="miju-admin-login-page">
      <div className="miju-admin-login-card">
        <p className="miju-admin-eyebrow">Min Beauty</p>
        <h1>Đăng nhập admin</h1>
        <p className="miju-admin-login-lead">
          Khu vực quản trị nội dung, SEO và phân tích. Chỉ dành cho quản trị viên.
        </p>

        <form className="miju-admin-login-form" onSubmit={onSubmit}>
          <label className="miju-admin-field">
            <span>Tên đăng nhập</span>
            <input
              type="text"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>
          <label className="miju-admin-field">
            <span>Mật khẩu</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error ? <p className="miju-admin-note miju-admin-note-warning">{error}</p> : null}

          <button type="submit" className="miju-admin-button" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginClient() {
  return (
    <Suspense fallback={<div className="miju-admin-login-page" />}>
      <LoginForm />
    </Suspense>
  );
}
