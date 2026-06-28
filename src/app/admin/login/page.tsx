import type { Metadata } from "next";
import AdminLoginClient from "./login-client";

export const metadata: Metadata = {
  title: {
    absolute: "Đăng nhập | Min Beauty Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}
