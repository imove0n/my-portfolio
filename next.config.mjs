/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Security & Source Code Protection
  productionBrowserSourceMaps: false, // Disable source maps in production (hide original code)

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console.logs in production

    // Styled JSX minification (removes whitespace, comments)
    styledComponents: true,
  },

  // Additional optimizations
  swcMinify: true, // Use SWC minifier (faster, better compression)

  // Compress and minify CSS
  compress: true,

  // Optimize CSS - Remove comments, minify
  experimental: {
    optimizeCss: true, // Experimental CSS optimization
  },

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
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
