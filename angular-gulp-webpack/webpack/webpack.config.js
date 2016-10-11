'use strict'

const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const dllConfig = require('./webpack.dll.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const buildConfig = require('../build.config')

const rootPath = buildConfig.path.project
const tmpHtmlFilePath = path.resolve(rootPath, '.tmp/index.html')

module.exports = {
  // This is resolved from the root path of the project
  entry: ['./app/app.js'],
  resolve: {
    alias: dllConfig.resolve.alias
  },
  output: {
    path: buildConfig.distribution.path,
    publicPath: buildConfig.distribution.directory,
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
        excludes: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [
    new CustomDllReferencePlugin({
      context: rootPath,
      manifest: buildConfig.dll.manifest.path
    }),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: tmpHtmlFilePath,
      filename: path.resolve(rootPath, 'index.html')
    })
  ],
  devtool: '#source-map'
}

// To get rid of manifest json does not exist when init config.
function CustomDllReferencePlugin (options) {
  webpack.DllReferencePlugin.call(this, options)
}

CustomDllReferencePlugin.prototype.apply = function (compiler) {
  if (typeof this.options.manifest === 'string') {
    this.options.manifest = require(this.options.manifest)
  }

  webpack.DllReferencePlugin.prototype.apply.call(this, compiler)
}
