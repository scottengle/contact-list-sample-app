(function() {

  'use strict';

  angular.module('aaae')

    .factory('localStorage', function() {

      var storage = {};

      return {

        put: function(obj) {

          storage = obj;

        },

        remove: function() {

          storage = {};

        },

        get: function() {

          return storage;

        }

      };

    });

})();