/** @type {import('next').NextConfig} */
const nextConfig = {
     experimental: {
    allowedDevOrigins: ["http://192.168.1.4:3000"],
  },
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
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
