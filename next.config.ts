import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/news", permanent: true },
      { source: "/blog/:slug", destination: "/news/:slug", permanent: true },
      { source: "/moi-baby", destination: "/news?category=moi-baby", permanent: true },
      { source: "/filler", destination: "/news?category=filler", permanent: true },
      { source: "/cham-soc-da", destination: "/news?category=cham-soc-da", permanent: true },
      { source: "/services/cham-soc-da", destination: "/services", permanent: true },
      { source: "/services/phuc-hoi-da", destination: "/services", permanent: true },
      {
        source: "/cham-soc-sau-dich-vu",
        destination: "/news?category=cham-soc-sau-dich-vu",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
