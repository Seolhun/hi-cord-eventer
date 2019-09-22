const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');
const utils = require('./utils');

Object.keys(baseWebpackConfig.entry).forEach((name) => {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(
    baseWebpackConfig.entry[name],
  );
});

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
    }),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.dev.index,
      inject: true,
    }),
    new FriendlyErrorsPlugin(),
  ],
});
