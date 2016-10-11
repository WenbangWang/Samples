'use strict'

import angular from 'angular'
import TestDirective from './directive'
import anotherModule from '../another-module/another-module'
import config from './config'
import uiRouter from 'angular-ui-router'

export default angular
  .module('module', [anotherModule, uiRouter])
  .config(config)
  .directive('testDirective', () => new TestDirective())
  .name
