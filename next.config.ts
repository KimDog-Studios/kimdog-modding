import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.discordapp.com", "raw.githubusercontent.com"], // Add the hostname here
  },
};

export default nextConfig;
