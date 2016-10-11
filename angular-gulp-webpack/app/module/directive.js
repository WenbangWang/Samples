'use strict'

import BaseDirective from '../core/BaseDirective'
import TestController from './controller'
import templateUrl from './template.html'
import './style.less'

export default class TestDirective extends BaseDirective {
  constructor () {
    super()
    this.templateUrl = templateUrl
    this.controller = TestController
  }
}
