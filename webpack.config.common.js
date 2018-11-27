const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const generateHTMLPlugins = () =>
  glob.sync('./src/index.html').map((dir) =>
    new HTMLWebpackPlugin({
      filename: path.basename(dir), // Output
      template: dir, // Input
    }));

module.exports = {
  node: {
    fs: 'empty',
  },
  entry: ['./src/js/app.js', './src/style/main.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sass|scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
        loader: 'url-loader?limit=100000'},
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './src/static/',
      to: './static/',
    }]),
    ...generateHTMLPlugins(),
  ],
  stats: {
    colors: true,
  },
  devtool: 'source-map',
  // https://github.com/wycats/handlebars.js/issues/1174#issuecomment-229918935
  resolve: {
    alias: {
      'handlebars': 'handlebars/dist/handlebars.min.js',
    },
  },
};
