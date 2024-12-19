import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Approve all HTTPS domains
      },
      {
        protocol: "http",
        hostname: "**", // Approve all HTTP domains
      },
    ],
  },
};

export default nextConfig;
