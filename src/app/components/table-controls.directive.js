/**
 * Table Controls Directive
 * @namespace Directives
 */
(function() {

  'use strict';

  angular
    .module('aaae')
    .directive('aaaeTableControls', aaaeTableControls);

  /**
   * @namespace TableControls
   * @desc Table Controls directive for filtering results and setting options
   * @memberOf Directives
   */
  function aaaeTableControls() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/tableControls.directive.html',
      replace: true,
      controller: 'MainCtrl'
    };

    return directive;
  }

})();