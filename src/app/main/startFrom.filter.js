'use strict';

angular.module('aaae')

  .filter('startFrom', function() {

    return function(input, begin) {

      if(input) {

        begin = +begin; //convert to int

          return input.slice(begin);

        }

      return [];

    };

  });