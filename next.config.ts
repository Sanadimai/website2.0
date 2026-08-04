import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — otherwise Next walks up and picks the lockfile in ~.
  turbopack: { root: __dirname },
};

export default nextConfig;
