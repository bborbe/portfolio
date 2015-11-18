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
