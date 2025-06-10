import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For GitHub Pages deployment: static export
  // Note: API routes don't work with static export - they're development-only
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
