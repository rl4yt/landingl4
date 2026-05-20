/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/api/**': ['./agents/**/*.md'],
    },
  },
}

export default nextConfig
