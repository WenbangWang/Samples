'use strict'

import angular from 'angular'
import module from './module'
import domready from 'domready'

angular.module('app', [
  module
])

domready(() => angular.bootstrap(document, ['app']))
