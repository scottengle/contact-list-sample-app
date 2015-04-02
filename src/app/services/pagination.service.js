/**
 * Pagination Factory
 * @namespace Services
 */
 (function() {

  'use strict';

  angular
    .module('aaae')
    .factory('pagination', pagination);

  /**
   * @namespace Pagination
   * @desc Application wide Pagination factory
   * @memberOf Services
   */
  function pagination() {

    return {
      getNumPages: getNumPages
    };

    /* @name getNumPages
     * @desc Get the number of 'pages' required to display the given item set
     * @param {Array} items An array of items
     * @param {Number} perPage The number of items per 'page'
     * @returns {Number}
     * @memberOf Services.Pagination
     */
    function getNumPages(items, perPage) {
      perPage = perPage || 10; // Set a reasonable default. No division by zero.
      items = items || [];

      return (items.length === 0) ? 1 : Math.ceil(items.length / perPage);
    }
  }

})();