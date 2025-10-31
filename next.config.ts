import type { NextConfig } from "next";
import dotenv from "dotenv";
dotenv.config();

const nextConfig: NextConfig = {
  // next.config.js
  async rewrites() {
    const apiBase = process.env.NEXT_PUBLIC_API_URL;

    if (!apiBase) {
      console.warn("❌ NEXT_PUBLIC_API_URL is missing");
      return [];
    }

    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
