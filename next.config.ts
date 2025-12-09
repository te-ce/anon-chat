import type { NextConfig } from "next";

const nextConfig: NextConfig & { eslint: { ignoreBuildErrors: boolean } } = {
  /* config options here */
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
