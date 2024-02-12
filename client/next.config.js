/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.tiktokcdn.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: '*.tiktokcdn-us.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: '*.fbcdn.net',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: '*.cdninstagram.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
