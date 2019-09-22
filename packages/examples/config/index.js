const path = require('path');

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    productionSourceMap: true,
    productionGzip: true,
    productionGzipExtensions: ['js', 'ts', 'css', 'scss', 'html'],
    bundleAnalyzerReport: process.env.npm_config_report,
  },
  dev: {
    env: require('./dev.env'),
    index: path.resolve(__dirname, '../static/index.html'),
    port: 8080,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false,
  },
};
