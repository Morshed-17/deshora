import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        // protocol: "https",
        hostname: "res.cloudinary.com",
        // port: "",
        // pathname: "/my-bucket/**",
        // search: "",
      },
    ],

  },
};

export default nextConfig;
