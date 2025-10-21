/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Security & Source Code Protection
  productionBrowserSourceMaps: false, // Disable source maps in production (hide original code)

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console.logs in production
  },

  // Additional optimizations
  swcMinify: true, // Use SWC minifier (faster, better compression)

  // Headers for additional security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
