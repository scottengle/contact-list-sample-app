'use strict';

angular.module('aaae')

  .factory('pagination', function() {

    return {

      getNumPages: function(items, perPage) {

        perPage = perPage || 10; // Set a reasonable default. No division by zero.

        return (items.length === 0) ? 1 : Math.ceil(items.length/perPage);

      }

    };

  });