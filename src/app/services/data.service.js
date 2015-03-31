(function() {

  'use strict';

  angular.module('aaae')

    .factory('data', ['$http', '$q', 'formatter', function($http, $q, formatter) {

      var deferred = $q.defer();

      var members;

      $http.get('/data/sample-data.json')

        .then(function(resp) {

          members = resp.data;

        })

        .then(function() {

          angular.forEach(members, function(member, idx) {

            member.formattedPhone = formatter.formatPhone(member.phone);

            member.fullName = formatter.formatFullName(member.first_name,
                                                       member.last_name);

            member.id = idx;

          });

        })

        .then(function() {

          deferred.resolve(members);

        });

        return deferred.promise;

    }]);

})();
