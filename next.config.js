/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ['codeforces-stats.vercel.app','localhost'],
  },
}

export default nextConfig
