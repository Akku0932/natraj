import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ['https://*.space.z.ai', 'http://*.space.z.ai', '*.space.z.ai'],
};

export default nextConfig;
