'use strict';

angular.module('portfolioControllers', []);

angular.module('portfolioControllers').controller('StartCtrl', ['$scope', '$q', '$log', '$interval', 'ConfigService', function ($scope, $q, $log, $interval, ConfigService) {
  $log.debug("started");

  $scope.$on('keypress', function (onEvent, keypressEvent) {
    if (keypressEvent.keyCode == 39 || keypressEvent.charCode == 32) {
      $scope.next();
      $scope.noop();
    }
    if (keypressEvent.keyCode == 37) {
      $scope.last();
      $scope.noop();
    }
  });

  $scope.init = function () {
    $log.debug('init');
    ConfigService.get().then(function successCallback(config) {
      $scope.config = config;
      angular.element(window.document)[0].title = config.title + ' - ' + config.subtitle + ' ' + config.subtext;
      $interval($scope.interfalFunc, 5000);
      $scope.show(0);
    }, function errorCallback(response) {
      $log.error('log config failed: ' + response);
    });
  };

  var current = 0;


  $scope.interfalFunc = function () {
    $scope.next();
  };

  $scope.noop = function () {
    $scope.interfalFunc = function () {
      $scope.interfalFunc = function () {
        $scope.next();
      };
    };
  };

  $scope.next = function () {
    current = (current + 1) % $scope.config.images.length;
    $scope.show(current);
  };

  $scope.last = function () {
    if (current == 0) {
      current = $scope.config.images.length - 1;
    } else {
      current = (current - 1);
    }
    $scope.show(current);
  };

  $scope.show = function (pos) {
    var url = $scope.config.images[pos];
    $scope.preload(url).then(function () {
      $scope.image = 'url("' + url + '")';
      $log.debug("image = " + $scope.image);
    });
  };

  $scope.preload = function (url) {
    var deferred = $q.defer();
    var image = new Image();
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
  };

  $scope.init();
}]);
