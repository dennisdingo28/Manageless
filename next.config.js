/** @type {import('next').NextConfig} */
const securityHeaders = [
    {
      key: 'X-XSS-Protection',
      value: '1; mode=block',
    },
    {
      key: 'X-Frame-Options',
      value: 'SAMEORIGIN',
    },
]
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"images.unsplash.com",
            },
            {
                protocol:"https",
                hostname:"lh3.googleusercontent.com",
            }
        ]
    },
    async headers(){
        return [
            {
                source:"/:path*",
                headers:securityHeaders,
            }
        ]
    }
}

module.exports = nextConfig
