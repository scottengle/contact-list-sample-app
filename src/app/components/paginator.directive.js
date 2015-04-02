/**
 * Paginator Directive
 * @namespace Directives
 */
(function() {

  'use strict';

  angular
    .module('aaae')
    .directive('aaaePaginator', aaaePaginator);

  /**
   * @namespace Paginator
   * @desc Pagination directive for navigating between pages
   * @memberOf Directives
   */
  function aaaePaginator() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/paginator.directive.html',
      replace: true,
      controller: 'MainCtrl'
    };

    return directive;
  }

})();