import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every route is static, so export plain HTML — Netlify serves it directly
  // with no Next runtime. `npm run build` writes ./out.
  output: "export",
  // Pin the workspace root — otherwise Next walks up and picks the lockfile in ~.
  turbopack: { root: __dirname },
};

export default nextConfig;
