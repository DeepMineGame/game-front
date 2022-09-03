// eslint-disable-next-line import/no-extraneous-dependencies
const CracoLessPlugin = require('craco-less');
const theme = require('./src/theme');

function devServerConfig(config) {
    return {
        ...config,
        https: true,
        host: 'local.deepmine.world',
        proxy: {
            '/ubs': {
                // target: 'http://localhost:3001',
                target: 'https://rc.deepmine.world',
                changeOrigin: true,
                withCredentials: true,
            },
            '/statistic': {
                target: 'https://rc.deepmine.world',
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
                        modifyVars: theme,
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
