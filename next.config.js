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
            },{
                source: "/api/:path*",
                headers: [
                  { key: "Access-Control-Allow-Credentials", value: "true" },
                  { key: "Access-Control-Allow-Origin", value: "*" },
                  {
                    key: "Access-Control-Allow-Methods",
                    value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                  },
                  {
                    key: "Access-Control-Allow-Headers",
                    value:
                      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig
