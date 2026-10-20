import type { NextConfig } from "next";

const staticExport = process.env["STORY_STATIC_EXPORT"] === "1";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export" } : {}),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/favicons/**',
      },
    ],
  },
};

export default nextConfig;
