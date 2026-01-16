import { NextConfig } from 'next';
const config: NextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.alias['@'] = __dirname + '/src';
        return config;
    }
}

export default config;