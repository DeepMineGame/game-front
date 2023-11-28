function devServerConfig(config) {
    const proxyTarget = process.env.REACT_APP_MAINNET ? 'api' : 'rc';
    return {
        ...config,
        https: true,
        host: 'local.deepmine.world',
        proxy: {
            '/ubs': {
                // target: 'http://localhost:3001',
                target: `https://${proxyTarget}.deepmine.world`,
                changeOrigin: true,
                withCredentials: true,
            },
            '/statistic': {
                target: `https://${proxyTarget}.deepmine.world`,
                changeOrigin: true,
                withCredentials: true,
            },
            '/config': {
                target: `https://${proxyTarget}.deepmine.world`,
                changeOrigin: true,
                withCredentials: true,
            },
            '/rent-market-api': {
                target: `https://${proxyTarget}.deepmine.world`,
                changeOrigin: true,
                withCredentials: true,
            },
            '/game-api': {
                target: `https://${proxyTarget}.deepmine.world`,
                changeOrigin: true,
                withCredentials: true,
            },
        },
    };
}

function ignoreSourceMapWarnings(config) {
    config.ignoreWarnings = [/Failed to parse source map/];
    return config;
}

module.exports = {
    devServer: (config) => devServerConfig(config),
    webpack: {
        configure: {
            ignoreWarnings: [ignoreSourceMapWarnings],
        },
    },
};
