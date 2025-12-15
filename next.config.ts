import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // === Blog posts with matching new pages ===
      {
        source: '/how-much-does-a-videographer-cost-per-hour',
        destination: '/blog/how-much-does-a-wedding-videographer-cost-per-hour',
        permanent: true,
      },
      {
        source: '/should-you-hire-a-wedding-videographer-for-your-wedding',
        destination: '/blog/should-you-hire-a-wedding-videographer',
        permanent: true,
      },
      {
        source: '/what-should-my-wedding-video-budget-be',
        destination: '/blog/what-should-my-wedding-video-budget-be',
        permanent: true,
      },
      {
        source: '/how-many-hours-of-wedding-videography-do-you-need',
        destination: '/blog/how-many-hours-of-wedding-videography-do-you-need',
        permanent: true,
      },
      {
        source: '/how-many-videographers-are-needed-for-a-wedding',
        destination: '/blog/how-many-videographers-are-needed-for-a-wedding',
        permanent: true,
      },
      // === Blog posts without direct match → /blog ===
      {
        source: '/how-to-set-your-wedding-videography-budget',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/is-a-wedding-videographer-worth-it',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/questions-to-ask-your-wedding-videographer',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/5-ways-to-make-your-wedding-videographers-job-easier',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/how-long-is-the-average-wedding-video',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/should-a-wedding-videographer-be-paid-in-full-before-the-wedding',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/a-guide-to-choosing-the-right-wedding-videographer-in-brisbane',
        destination: '/blog',
        permanent: true,
      },
      // === Pricing pages → /pricing ===
      {
        source: '/pricing-guide',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/investment',
        destination: '/pricing',
        permanent: true,
      },
      // === Promotional pages → /promotion ===
      {
        source: '/wedding-videographer-promotion',
        destination: '/promotion',
        permanent: true,
      },
      {
        source: '/regional-qld-wedding-video-promotion',
        destination: '/promotion',
        permanent: true,
      },
      {
        source: '/win-a-discounted-wedding-collection',
        destination: '/promotion',
        permanent: true,
      },
      // === Other pages ===
      {
        source: '/wedding-guide',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.flarefilms.com.au',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images-pw.pixieset.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.guestsnapper.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'old.flarefilms.com.au',
        pathname: '/wp-content/uploads/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    optimizeCss: true,
  },
};

export default nextConfig;
