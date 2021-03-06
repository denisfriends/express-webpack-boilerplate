const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    main: './src/js/index.js',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },

  target: 'web',

  devtool: 'source-map',

  module: {
    rules: [
      {
        // ES6-8 to ES5
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }]
      }, {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './src/html/index.html',
      filename: './index.html',
      excludeChunks: [ 'server' ]
    })
  ]

}
