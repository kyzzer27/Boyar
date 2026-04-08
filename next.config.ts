/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    "lightningcss",
    "lightningcss-darwin-x64",
    "@tailwindcss/postcss",
  ],
  allowedDevOrigins: [
    "192.168.1.120",
    "192.168.1.130",
    "192.168.1.137",
    "192.168.1.140",
    "192.168.1.150",
    "192.168.1.155",
    "192.168.1.160",
    "192.168.1.170",
    "192.168.1.180",
    "192.168.1.190",
    "192.168.1.200",
    "10.177.180.17",
    "10.23.220.17",
  ],
};

export default nextConfig;
