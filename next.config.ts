import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable export mode for GitHub Pages deployment
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Configure base path for GitHub Pages if needed
  // basePath: '/your-repo-name',
  // assetPrefix: '/your-repo-name/',
};

export default nextConfig;
