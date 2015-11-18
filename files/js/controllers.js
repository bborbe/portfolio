'use strict';

angular.module('portfolioControllers', []);

angular.module('portfolioControllers').controller('StartCtrl', ['$scope', '$q', '$log', '$interval', 'ConfigService', function ($scope, $q, $log, $interval, ConfigService) {
  $log.debug("started");

  $scope.init = function () {
    $log.debug('init');
    ConfigService.get().then(function successCallback(config) {
      $scope.config = config;
      $interval($scope.next, 5000);
      $scope.next();
    }, function errorCallback(response) {
      $log.error('log config failed');
    });
  };

  var current = 0;

  $scope.next = function () {
    var url = $scope.config.images[current];
    $scope.preload(url).then(function () {
      $scope.image = 'url("' + url + '")';
      $log.debug("image = " + $scope.image);
      current = (current + 1) % $scope.config.images.length;
    });
  };

  $scope.preload = function (url) {
    var deferred = $q.defer(),
      image = new Image();
    image.src = url;
    if (image.complete) {
      deferred.resolve();
    } else {
      image.addEventListener('load', function () {
        deferred.resolve();
      });
      image.addEventListener('error', function () {
        deferred.reject();
      });
    }
    return deferred.promise;
  }

  $scope.init();
}]);
