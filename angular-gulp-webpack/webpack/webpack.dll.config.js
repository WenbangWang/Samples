'use strict'

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const rootPath = path.resolve(__dirname, '..')
const nodeModulesPath = path.resolve(rootPath, './node_modules')
// TODO use min version for prod
const pathToAngular = path.resolve(nodeModulesPath, 'angular/angular.js')
const pathToAngularRouter = path.resolve(nodeModulesPath, 'angular-ui-router/release/angular-ui-router.js')

// TODO module.exports output.path and vendors' dependencies to check if the vendors' dependencies changed or not.

const config = module.exports = {
  entry: {
    vendors: [
      'angular',
      'angular-ui-router'
    ]
  },
  resolve: {
    alias: {
      'angular': pathToAngular,
      'angular-ui-router': pathToAngularRouter
    }
  },
  output: {
    // TODO change name to [name]_[hash].dll.js and upload to CDN if necessary.
    filename: '[name].dll.js',
    path: path.resolve(rootPath, './dist/dll'),
    publicPath: 'dist/dll',
    // To avoid variable naming collision due to the vendor is exposed to global.
    library: '[name]_[hash]'
  },
  module: {
    loaders: [
      {
        test: /[\/]angular(\.min)?\.js$/,
        loader: 'exports?angular'
      }
    ],
    noParse: [pathToAngular, pathToAngularRouter]
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(rootPath, './dist/dll/[name]-manifest.json'),
      name: '[name]_[hash]'
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(rootPath, '.tmp/index.html'),
      template: path.resolve(rootPath, 'templates/index.html')
    })
  ]
}

// TODO extract to a config js file
config.nodeModulesPath = nodeModulesPath
config.rootPath = rootPath
