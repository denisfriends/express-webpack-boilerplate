const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {

  entry: {
    main: './src/index.js',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },

  target: 'web',

  devtool: 'source-map',

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  module: {
    rules: [
      {
        // ES6-8 to ES5
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        // Loads CSS into a file when you import it via JS
        // Rules are set in MiniCssExtractPlugin
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
      }, {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        // use: ['file-loader']
        use: [{ loader: 'url-loader' }]
      }
    ]
  },

  plugins: [
    new CopyPlugin([{
      from: './src/views',
      to: 'views'
    }]),
    new HtmlWebPackPlugin({
      title: 'index',
      template: './src/views/layouts/layout.pug',
      filename: './views/layouts/layout.pug',
      excludeChunks: [ 'server' ]
    }),
    new HtmlWebPackPugPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]

}
