(function() {

  'use strict';

  angular.module('aaae')

    .controller('ProfilesCtrl', ['$scope', '$stateParams', 'formatter', 'data', 'localStorage',
      function ($scope, $stateParams, formatter, data, localStorage) {

        var cachedMembers = localStorage.get();

        if(!cachedMembers.length) {

          data.then(function(members) {

            localStorage.put(members);

            $scope.member = members[$stateParams.memberId];

          });

        } else {

          $scope.member = cachedMembers[$stateParams.memberId];

        }

      }]);

})();