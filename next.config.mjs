/** @type {import('next').NextConfig} */
const nextConfig = {
  // compiler: {
  //   removeConsole: true,
  // },
  reactStrictMode: false,
  images: {
    domains: ['hvpvszjjvqaoimyjinuo.supabase.co'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'cdnimg.melon.co.kr',
      },
      {
        protocol: 'https',
        hostname: 'charts-static.billboard.com',
      },
    ],
  },
}

export default nextConfig
