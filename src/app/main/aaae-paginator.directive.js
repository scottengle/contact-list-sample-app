(function() {

  'use strict';

  angular.module('aaae')

    .directive('aaaePaginator', function() {

      return {
        restrict: 'E',
        templateUrl: 'app/main/paginator.directive.html',
        replace: true,
        controller: 'MainCtrl'
      };

    });

})();