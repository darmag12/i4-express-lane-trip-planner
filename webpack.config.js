const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },

  resolve: {
    fallback: { console: false },
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),

    new MiniCssExtractPlugin(),
    new Dotenv(),

    new NodePolyfillPlugin({
      excludeAliases: ['console'],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },

      {
        test: /\.html$/,
        use: ['html-loader'],
      },

      {
        test: /\.(svg|png|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },

      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  devtool: 'source-map',
};
