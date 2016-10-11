'use strict'

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const rootPath = path.resolve(__dirname, '..')
const buildConfig = require('../build.config')

// TODO module.exports output.path and vendors' dependencies to check if the vendors' dependencies changed or not.

const config = module.exports = {
  entry: {
    vendors: buildConfig.vendors.names
  },
  resolve: {
    alias: buildConfig.vendors.filePaths
  },
  output: {
    // TODO change name to [name]_[hash].dll.js and upload to CDN if necessary.
    filename: 'vendors.dll.js',
    path: buildConfig.dll.path,
    publicPath: buildConfig.dll.directory,
    // To avoid variable naming collision due to the vendor is exposed to global.
    library: 'vendors_[hash]'
  },
  module: {
    loaders: [
      {
        test: /[\/]angular(\.min)?\.js$/,
        loader: 'exports?angular'
      }
    ],
    noParse: Object.keys(buildConfig.vendors.filePaths)
      .map(key => buildConfig.vendors.filePaths[key])
  },
  plugins: [
    new webpack.DllPlugin({
      path: buildConfig.dll.manifest.path,
      name: 'vendors_[hash]'
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(rootPath, '.tmp/index.html'),
      template: path.resolve(rootPath, 'templates/index.html')
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     unused: false,
    //     dead_code: false
    //   }
    // })
  ]
}
