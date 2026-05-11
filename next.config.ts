import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["res.cloudinary.com"], // Cloudinary hostname allow karo
  },
};

export default nextConfig;
