'use strict';

angular.module('portfolioServices', ['ngResource', 'ngCookies']);


angular.module('portfolioServices').factory('ConfigService', ['$log', '$http', '$q', function ($log, $http, $q) {
  var service = {};
  service.get = function () {
    $log.debug('get config');
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'config.json'
    }).then(function successCallback(response) {
      $log.debug('get config sucess');
      deferred.resolve(response.data);
    }, function errorCallback(response) {
      $log.debug('get config failed');
      deferred.reject(error);
    });
    return deferred.promise;
  };
  return service;
}]);