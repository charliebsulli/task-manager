import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  output: "standalone" /* means we don't need node_modules in production */,
};

export default nextConfig;
