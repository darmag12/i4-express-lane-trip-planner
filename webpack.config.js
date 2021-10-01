// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const Dotenv = require('dotenv-webpack');

// // defined our entry point to be app.js
// module.exports = {
//   entry: './src/app.js',
//   output: {
//     filename: 'bundle.js',
//   },
//   // source-maps not quite important thus can be omitted
//   devtool: 'source-maps',
//   module: {
//     //setting test rules to look for js, png, and css files
//     rules: [
//       { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
//       {
//         test: /\.png$/,
//         use: [
//           {
//             loader: 'url-loader',
//             options: {
//               mimetype: 'image/png',
//             },
//           },
//         ],
//       },
//       { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
//     ],
//   },
//   // we define our server content base aand location
//   devServer: {
//     contentBase: 'src',
//     hot: true,
//     open: true,
//     port: 8000,
//     watchContentBase: true,
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//     new HtmlWebpackPlugin({
//       template: 'src/index.html',
//       filename: 'index.html',
//       inject: 'body',
//     }),
//     // used to store sensitive info like api keys
//     new Dotenv(),
//   ],
// };

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
  },
  devtool: 'source-maps',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      {
        test: /\.s(a|c)ss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    contentBase: 'src',
    hot: true,
    open: true,
    port: 8000,
    watchContentBase: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new Dotenv(),
  ],
};
