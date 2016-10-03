'use strict'

import angular from 'angular'
import TestDirective from './directive'
import anotherModule from '../another-module/another-module'

export default angular
  .module('module', [anotherModule])
  .directive('testDirective', () => new TestDirective())
  .name
