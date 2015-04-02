/**
 * Start From Filter
 * @namespace Filters
 */
(function() {

  'use strict';

  angular
    .module('aaae')
    .filter('startFrom', startFrom);

  /**
   * @namespace StartFrom
   * @desc StartFrom filter used for limiting displayed member results
   * @memberOf Filters
   */
  function startFrom() {

    return filter;

    /* @name filter
     * @desc Returns a subset of the specified array, based on position
     * @param {Array} input Input to filter
     * @param {Number} begin Index to begin the new array at
     * @returns {Array}
     * @memberOf Filters.StartFrom
     */
    function filter(input, begin) {
      if(input) {
        begin = +begin; //convert to int
        return input.slice(begin);
      }

      return [];
    }
  }

})();