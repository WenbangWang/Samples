'use strict'

const webpack = require('webpack')
const path = require('path')

const nodeModules = path.resolve(__dirname, './node_modules')
const pathToAngular = path.resolve(nodeModules, 'angular/angular.min.js')

module.exports = {
  entry: {
    main: './app/app.js',
    vendors: []
  },
  resolve: {
    alias: {
      'angular': pathToAngular
    }
  },
  output: {
    filename: 'dist/bundle.js'
  },
  module: {
    preLoaders: [],
    loaders: [
      {
        test: /[\/]angular(\.min)?\.js$/,
        loader: 'exports?angular'
      },
      {
        test: /\.html$/,
        loader: 'ngtemplate?requireAngular!html'
      },
      {
        test: /\.js$/,
        excludes: nodeModules,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ],
    noParse: [pathToAngular]
  },
  plugins: [],
  devtool: '#source-map'
}
