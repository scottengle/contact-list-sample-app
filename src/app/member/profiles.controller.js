(function() {

  'use strict';

  angular.module('aaae')

    .controller('ProfilesCtrl', ['$scope', '$stateParams', 'data', 'localStorage',
      function ($scope, $stateParams, data, localStorage) {

        var cachedMembers = localStorage.get();

        if(!cachedMembers.length) {

          data.get().then(function(members) {

            localStorage.put(members);

            $scope.member = members[$stateParams.memberId];

          });

        } else {

          $scope.member = cachedMembers[$stateParams.memberId];

        }

      }]);

})();