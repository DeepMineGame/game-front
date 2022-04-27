const { overrideDevServer, watchAll, override } = require('customize-cra');

function devServerConfig(config) {
    return {
        ...config,
        proxy: {
            '/ubs': {
                target: 'https://api1.deepmine.world',
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
    devServer: overrideDevServer(devServerConfig, watchAll()),
    webpack: override(ignoreSourceMapWarnings),
};
