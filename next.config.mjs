/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/src/lib/:path*',
        destination: '/lib/:path*',
      },
    ];
  },
};

export default nextConfig;
