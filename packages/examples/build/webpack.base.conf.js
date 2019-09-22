const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const postCssFlexBugsFixed = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer');

const utils = require('./utils');
const config = require('../config');

const isProduction = !!process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    index: resolve('src/index.js'),
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('[name].js'),
    chunkFilename: utils.assetsPath('[id].js'),
    publicPath: isProduction
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules'),
      resolve('../../node_modules'),
    ],
    alias: {
      containers: resolve('src/containers'),
      components: resolve('src/components'),
      assets: resolve('src/assets'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(config.dev.env),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'styleTag',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: isProduction,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postCssFlexBugsFixed,
                autoprefixer({
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          ecma: 8,
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    namedModules: true,
    ...(isProduction && {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 6,
            },
            compress: {
              ecma: 6,
              warnings: false,
              comparisons: false,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 6,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
          cache: true,
          sourceMap: isProduction,
        }),
      ],
    }),
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 550000,
    maxEntrypointSize: 550000,
    assetFilter(assetFilename) {
      return (
        assetFilename.endsWith('.css')
        || assetFilename.endsWith('.scss')
        || assetFilename.endsWith('.js')
        || assetFilename.endsWith('.ts')
      );
    },
  },
};
