/**
 * Data Factory
 * @namespace Services
 */
(function() {

  'use strict';

  angular
    .module('aaae')
    .factory('data', ['$http', '$q', 'formatter', data]);

  /**
   * @namespace Data
   * @desc Application wide data factory
   * @memberOf Services
   */
  function data($http, $q, formatter) {

    var deferred = $q.defer(),
        members,
        factory = {
          get: get
        };

    return factory;

    /* @name get
     * @desc Retrieves and processes member data asynchronously
     * @returns {Promise}
     * @memberOf Services.Data
     */
    function get() {
      $http
        .get('/data/sample-data.json')
        .then(function(resp) {
          members = resp.data;
        })
        .then(function() {
          angular.forEach(members, function(member, idx) {
            member.id = idx + 1;
            member.formattedPhone = formatter.formatPhone(member.phone);
            member.fullName = formatter.formatFullName(member.first_name,
                                                       member.last_name);
          });
        })
        .then(function() {
          deferred.resolve(members);
        });

      return deferred.promise;
    }
  }

})();
