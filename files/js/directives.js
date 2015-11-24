'use strict';

angular.module('portfolioDirectives', []);


angular.module('portfolioDirectives', []).directive('keypressEvents', ['$document', '$rootScope', '$log', function ($document, $rootScope, $log) {
  return {
    restrict: 'A',
    link: function () {
      $document.bind('keyup', function (e) {
//        $log.debug('keyup');
        $rootScope.$broadcast('keyup', e);
      });
      $document.bind('keydown', function (e) {
//        $log.debug('keydown');
        $rootScope.$broadcast('keydown', e);
      });
      $document.bind('keypress', function (e) {
//        $log.debug('keypress');
        $rootScope.$broadcast('keypress', e);
      });
    }
  };
}]);
