require('./check-versions')();
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const historyApiFallback = require('connect-history-api-fallback');

const IS_PRODUCTION = !!process.env.NODE_ENV === 'production';
const webpackConfig = IS_PRODUCTION
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf');

const config = require('../config');

const port = process.env.PORT || config.dev.port;
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
const { proxyTable } = config.dev;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
});

const hotMiddleware = webpackHotMiddleware(compiler, {
  log: false,
  heartbeat: 2000,
});

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = config.dev.env.NODE_ENV;
}

compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({
      action: 'reload',
    });
    cb();
  });
});

// proxy api requests
Object.keys(proxyTable).forEach((context) => {
  let options = proxyTable[context];
  if (typeof options === 'string') {
    options = {
      target: options,
    };
  }
  app.use(proxyMiddleware(options.filter || context, options));
});

// handle fallback for HTML5 history API
app.use(historyApiFallback());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
const staticPath = path.posix.join(
  config.dev.assetsPublicPath,
  config.dev.assetsSubDirectory
);
app.use(staticPath, express.static('./static'));

const uri = `http://localhost:${port}`;

let resolveFn;
const readyPromise = new Promise((resolve) => {
  resolveFn = resolve;
});

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
  console.log('###########################');
  console.log(`> Listening at ${uri}`);
  console.log('###########################');
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri);
  }
  resolveFn();
});

const server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  },
};
