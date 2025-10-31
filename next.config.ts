import type { NextConfig } from "next";
import dotenv from "dotenv";
import withPWA from "next-pwa";

dotenv.config();

const apiBase = process.env.NEXT_PUBLIC_API_URL;

const baseConfig: NextConfig = {
  async rewrites() {
    if (!apiBase) {
      console.warn("❌ NEXT_PUBLIC_API_URL is missing");
      return [];
    }

    return [
      {
        source: "/api/:path*",
        destination: `${apiBase}/:path*`,
      },
    ];
  },
};

const wrappedConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(baseConfig);

// ✅ Add Turbopack hint outside the PWA wrapper
const nextConfig: NextConfig = {
  ...wrappedConfig,
  turbopack: {}, // ✅ silences warning without TypeScript error
};

export default nextConfig;
