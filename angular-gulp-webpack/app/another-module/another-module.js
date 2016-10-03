'use strict'

import angular from 'angular'
import AnotherDirective from './another-directive'

export default angular
  .module('another.module', [])
  .directive('anotherDirective', () => new AnotherDirective())
  .name
