import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "vintage-rides-usa.vercel.app" }],
        destination: "https://www.vintageridesusa.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "vintage-rides-usa-johannarias-projects.vercel.app" }],
        destination: "https://www.vintageridesusa.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
