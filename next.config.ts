import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["lightningcss", "lightningcss-darwin-x64", "@tailwindcss/postcss"],
  allowedDevOrigins: ["192.168.1.120"],
};

export default nextConfig;
