'use strict';

angular.module('portfolioDirectives', []);

angular.module('portfolioDirectives').directive('keypressEvents', ['$document', '$rootScope', '$log', function ($document, $rootScope, $log) {
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

angular.module('portfolioDirectives').directive('trackClick', ['$log', '$window', function ($log, $window) {
  return {
    link: function (scope, element, attr) {
      var path = attr.trackClick || attr.href;
      var clickAction = attr.ngClick;
      element.off('click');
      element.bind('click', function () {

        $log.debug('track ' + path);
        if ($window.ga) {
          $log.debug('send pageview to google: ' + path);
          $window.ga('send', 'pageview', {page: path});
        }

        scope.$eval(clickAction);
      });
    }
  };
}]);
