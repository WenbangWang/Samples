'use strict'

const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const dllConfig = require('./webpack.dll.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const nodeModulesPath = dllConfig.nodeModulesPath
const rootPath = dllConfig.rootPath
const tmpHtmlFilePath = path.resolve(rootPath, '.tmp/index.html')
// TODO use webpack config merge

module.exports = {
  // This is resolved from the root path of the project
  entry: './app/app.js',
  resolve: {
    alias: dllConfig.resolve.alias
  },
  output: {
    path: 'dist',
    publicPath: 'dist',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [],
    loaders: [
      {
        // TODO hook editing to browser see https://github.com/webpack/css-loader and https://medium.com/@toolmantim/getting-started-with-css-sourcemaps-and-in-browser-sass-editing-b4daab987fb0#.1tmdpau2c
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          'css-loader?sourceMap!less-loader?sourceMap'
        )
      },
      // {
      //   test: /\.less$/,
      //   loader: "style-loader!css-loader!less-loader"
      // },
      {
        test: /\.html$/,
        exclude: tmpHtmlFilePath,
        // In order to use requireAngular as a query, a non-published ng-template-loader version has to be used until it is published.
        loader: 'ngtemplate?requireAngular!html'
      },
      {
        test: /\.js$/,
        excludes: nodeModulesPath,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: rootPath,
      manifest: require('../dist/dll/vendors-manifest.json')
    }),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: tmpHtmlFilePath,
      filename: path.resolve(rootPath, 'index.html')
    })
  ],
  devtool: '#source-map'
}
