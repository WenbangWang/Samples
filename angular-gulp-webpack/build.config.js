'use strict'

const path = require('path')

const config = module.exports
const projectPath = __dirname
const nodeModulesPath = path.resolve(projectPath, './node_modules')
const pathToAngular = path.resolve(nodeModulesPath, 'angular')
const pathToAngularRouter = path.resolve(nodeModulesPath, 'angular-ui-router/release')

config.isProduction = () => (process.env.NODE_ENV || '').toLowerCase().startsWith('p')

config.distribution = {
  directory: 'dist'
}
config.distribution.path = path.resolve(projectPath, config.distribution.directory)

config.dll = {
  directory: `${config.distribution.directory}/dll`,
  manifest: {
    name: 'vendors-manifest.json'
  }
}
config.dll.path = path.resolve(projectPath, config.dll.directory)
config.dll.manifest.path = path.resolve(config.dll.path, config.dll.manifest.name)

config.vendors = {
  paths: {
    'angular': pathToAngular,
    'angular-ui-router': pathToAngularRouter
  },
  filePaths: {}
}
config.vendors.names = Object.keys(config.vendors.paths)
config.vendors.names.forEach(name => {
  config.vendors.filePaths[name] = path.resolve(config.vendors.paths[name], `${name}.js`)
})

config.path = {
  project: projectPath,
  nodeModules: nodeModulesPath
}
