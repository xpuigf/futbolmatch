import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NEXT_PUBLIC_EXPORT === "true" ? "export" : undefined,
  basePath: process.env.NEXT_PUBLIC_EXPORT === "true" ? "/futbolmatch" : undefined,
  trailingSlash: process.env.NEXT_PUBLIC_EXPORT === "true",
  images: { unoptimized: process.env.NEXT_PUBLIC_EXPORT === "true" },
};

export default nextConfig;