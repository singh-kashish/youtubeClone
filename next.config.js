/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:['www.youtube.com'],
  },
  swcMinify: true,
}

module.exports = nextConfig
