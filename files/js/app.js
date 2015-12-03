'use strict';

angular.module('portfolioApp', [
  'ngRoute',
  'portfolioControllers',
  'portfolioDirectives',
  'portfolioFilters',
  'portfolioServices',
  'portfolioConfig'
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

angular.module('portfolioApp').run(['$rootScope', '$location', '$window', '$log', 'config', function ($rootScope, $location, $window, $log, config) {
  angular.element(window.document)[0].title = config.title + ' - ' + config.subtitle + ' ' + config.subtext;
  var id = config['google-analytics-tracking-id'];
  if ($window.ga) {
    $log.debug('tracking id = ' + id);
    $window.ga('create', id);
  }
  $rootScope.$on('$locationChangeSuccess', function (event) {
    //$log.debug('$locationChangeSuccess: ' + $location.path());
    if ($window.ga) {
      $log.debug('send pageview to google: ' + $location.path());
      $window.ga('send', 'pageview', {page: $location.path()});
    }
  });
}]);
