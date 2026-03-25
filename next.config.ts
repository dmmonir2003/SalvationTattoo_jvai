import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  /* Add this section below */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
