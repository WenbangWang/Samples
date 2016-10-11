'use strict'

const gulp = require('gulp')
const gulpUtil = require('gulp-util')
const webpack = require('webpack')
const fs = require('fs')
const webpackAppConfig = require('./webpack/webpack.config')
const webpackDllConfig = require('./webpack/webpack.dll.config')
const buildConfig = require('./build.config')

const PACKAGE = 'package'
const PACKAGE_APP = `${PACKAGE}:app`
const PACKAGE_DLL = `${PACKAGE}:dll`

gulp.task(PACKAGE_DLL, callback => {
  webpack(webpackDllConfig, packageCallback(PACKAGE_DLL, callback))
})

gulp.task(PACKAGE_APP, callback => {
  webpack(webpackAppConfig, packageCallback(PACKAGE_APP, callback))
})

gulp.task(PACKAGE, [PACKAGE_DLL, PACKAGE_APP])

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
