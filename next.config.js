// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable static export for Cloudflare Pages compatibility
    output: 'export',

    reactStrictMode: true,

    images: {
        // Use unoptimized images for static export
        unoptimized: true,
        domains: [],
    },

    // Trailing slashes for static hosting compatibility
    trailingSlash: true,

    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "img-src 'self' data: https: blob:",
                            "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
                            "style-src 'self' 'unsafe-inline'",
                            "frame-src https://www.youtube.com https://itch.io https://*.itch.zone",
                            "connect-src 'self' https:",
                        ].join('; '),
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
