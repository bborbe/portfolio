'use strict';

angular.module('portfolioApp', [
  'ngRoute',
  'portfolioControllers',
  'portfolioDirectives',
  'portfolioFilters',
  'portfolioServices'
]);

angular.module('portfolioApp').config(['$routeProvider', function ($routeProvider) {
  $routeProvider.
    when('/start', {
      templateUrl: 'partials/start.html',
      controller: 'StartCtrl'
    }).
    otherwise({
      redirectTo: '/start'
    });
}]);

angular.module('portfolioApp').run(['$rootScope', '$location', '$window', '$log', 'ConfigService', function ($rootScope, $location, $window, $log, ConfigService) {
  ConfigService.get().then(function successCallback(config) {
    var id = config['google-analytics-tracking-id'];
    //$log.debug('tracking id = ' + id);
    if ($window.ga) {
      $window.ga('create', id);
    }
  });
  $rootScope.$on('$locationChangeSuccess', function (event) {
    //$log.debug('$locationChangeSuccess: ' + $location.path());
    if ($window.ga) {
      // $log.debug('send pageview to google');
      $window.ga('send', 'pageview', {page: $location.path()});
    }
  });
}]);
