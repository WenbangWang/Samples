'use strict'

import templateUrl from './index.html'

config.$inject = ['$stateProvider']

// TODO URL routing: https://github.com/angular-ui/ui-router/wiki/URL-Routing http://angular-ui.github.io/ui-router/site/#/api/ui.router.router.$urlRouterProvider https://github.com/ui-router/sample-app-ng1/blob/master/app/bootstrap/ngmodule.js
function config ($stateProvider) {
  $stateProvider.state('base', {
    url: '',
    templateUrl: templateUrl
  })
}

export default config
