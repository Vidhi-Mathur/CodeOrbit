/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.leetcode.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'leetcode.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
