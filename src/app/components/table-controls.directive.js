(function() {

  'use strict';

  angular.module('aaae')

    .directive('aaaeTableControls', function() {

      return {
        restrict: 'E',
        templateUrl: 'app/components/tableControls.directive.html',
        replace: true,
        controller: 'MainCtrl'
      };

    });

})();