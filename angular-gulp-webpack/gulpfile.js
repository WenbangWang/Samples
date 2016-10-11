'use strict'

const gulp = require('gulp')
const gulpUtil = require('gulp-util')
const gulpSync = require('gulp-sync')(gulp)
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const fs = require('fs')
const webpackAppConfig = require('./webpack/webpack.config')
const webpackDllConfig = require('./webpack/webpack.dll.config')

const PACKAGE = 'package'
const PACKAGE_APP = `${PACKAGE}:app`
const PACKAGE_DLL = `${PACKAGE}:dll`

gulp.task(PACKAGE_DLL, callback => {
  webpack(webpackDllConfig, packageCallback(PACKAGE_DLL, callback))
})

gulp.task(PACKAGE_APP, callback => {
  webpack(webpackAppConfig, packageCallback(PACKAGE_APP, callback))
})

gulp.task(PACKAGE, gulpSync.sync([PACKAGE_DLL, PACKAGE_APP]))

gulp.task('dev', [PACKAGE_DLL], () => {
  const dist = webpackAppConfig.output.publicPath
  webpackAppConfig.output.publicPath = `http://localhost:9090/${dist}/`
  // To enable dev server auto refresh.
  webpackAppConfig.entry.unshift('webpack-dev-server/client?http://localhost:9090/')

  const compiler = webpack(webpackAppConfig)

  new WebpackDevServer(compiler, {
    publicPath: `/${dist}`,
    stats: {
      color: true
    }
  }).listen(9090, err => {
    if (err) {
      throw new gulpUtil.PluginError('dev', err)
    }
  })
})

function packageCallback (taskName, callback) {
  return (err, stats) => {
    if (err) {
      throw new gulpUtil.PluginError(taskName, err)
    }

    gulpUtil.log(taskName, stats.toString({
      colors: true
    }))
    callback()
  }
}
