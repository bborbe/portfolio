'use strict';

angular.module('portfolioControllers', []);

angular.module('portfolioControllers').controller('StartCtrl', ['$scope', '$q', '$log', '$interval', 'config', function ($scope, $q, $log, $interval, config) {
  // $log.debug("started");

  $scope.$on('keydown', function (onEvent, keypressEvent) {
    //$log.debug('keydown keyCode:' + keypressEvent.keyCode + ' charCode: ' + keypressEvent.charCode);
    if (keypressEvent.keyCode == 39 || keypressEvent.keyCode == 32 || keypressEvent.charCode == 32) {
      $scope.next();
      $scope.noop();
    }
    if (keypressEvent.keyCode == 37) {
      $scope.last();
      $scope.noop();
    }
  });

  $scope.init = function () {
    // $log.debug('init');
    angular.element(window.document)[0].title = config.title + ' - ' + config.subtitle + ' ' + config.subtext;
    $interval($scope.interfalFunc, 5000);
    // $log.debug('images to display: ' + config.images.length);
    $scope.current = Math.floor(Math.random() * (config.images.length));
    $scope.show($scope.current);
  };


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
    $scope.current = ($scope.current + 1) % config.images.length;
    $scope.show($scope.current);
  };

  $scope.last = function () {
    if ($scope.current == 0) {
      $scope.current = config.images.length - 1;
    } else {
      $scope.current = ($scope.current - 1);
    }
    $scope.show($scope.current);
  };

  $scope.show = function (pos) {
    // $log.debug('show image at pos: ' + pos);
    var url = config.images[pos];
    $scope.preload(url).then(function () {
      $scope.image = 'url("' + url + '")';
      // $log.debug("image = " + $scope.image);
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
