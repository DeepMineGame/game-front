// eslint-disable-next-line import/no-extraneous-dependencies
const CracoLessPlugin = require('craco-less');
const { darkTheme } = require('@ant-design/dark-theme');
const customTheme = require('./src/theme');

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
        },
    };
}

function ignoreSourceMapWarnings(config) {
    config.ignoreWarnings = [/Failed to parse source map/];
    return config;
}

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { ...darkTheme, ...customTheme },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    devServer: (config) => devServerConfig(config),
    webpack: {
        configure: {
            ignoreWarnings: [ignoreSourceMapWarnings],
        },
    },
};
