const Path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin');
const WebpackNodeExternals = require('webpack-node-externals');

module.exports = {
  resolve: {
    extensions: ['.js']
  },
  entry: {
    app: './src/app.js',
  },
  output: {
    path: Path.join(__dirname, './dist'),
    filename: '[name].js',
  },
  target: 'node',
  externals: [WebpackNodeExternals()],
  plugins: [
    new HtmlWebpackplugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      }, {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          }
        }]
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
};
