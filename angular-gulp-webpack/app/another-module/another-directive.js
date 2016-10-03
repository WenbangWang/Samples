'use strict'

import BaseDirective from '../core/BaseDirective'
import tamplateUrl from './another-template.html'

export default class AnotherDirective extends BaseDirective {
  constructor () {
    super()
    this.templateUrl = tamplateUrl
  }
}
