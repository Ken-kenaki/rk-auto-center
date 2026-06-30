import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "fra.cloud.appwrite.io",
        pathname: "/v1/storage/**",
      },
    ],
  },
};

export default nextConfig;
