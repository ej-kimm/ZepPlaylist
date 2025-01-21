/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['hvpvszjjvqaoimyjinuo.supabase.co'],
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
