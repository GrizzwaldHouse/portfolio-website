import { NextConfig } from 'next';

const config: NextConfig = {
    reactStrictMode: true,
    images: {
        domains: [],
    },
    webpack: (config) => {
        config.resolve.alias['@'] = __dirname + '/src';
        return config;
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
                    }
                ],
            },
        ];
    },
};

export default config;
