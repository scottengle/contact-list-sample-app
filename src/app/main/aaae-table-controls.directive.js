(function() {

  'use strict';

  angular.module('aaae')

    .directive('aaaeTableControls', function() {

      return {
        restrict: 'E',
        templateUrl: 'app/main/tableControls.directive.html',
        replace: true,
        controller: 'MainCtrl'
      };

    });

})();