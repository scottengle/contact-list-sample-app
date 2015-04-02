/**
 * Profiles Controller
 * @namespace Controllers
 */
(function() {

  'use strict';

  angular
    .module('aaae')
    .controller('ProfilesCtrl', ProfilesCtrl);

  ProfilesCtrl.$inject = ['$scope', '$stateParams', 'data', 'localDataStore'];

  /**
   * @namespace ProfilesController
   * @desc Application controller for the member profile page
   * @memberOf Controllers
   */
  function ProfilesCtrl($scope, $stateParams, data, localDataStore) {

    activate();

    /* @name activate
     * @desc Initializes the data-specific settings for the profiles page
     * @memberOf Controllers.MainController
     */
    function activate() {
      var cachedMembers = localDataStore.get();

      if(!cachedMembers.length) {
        data.get().then(function(members) {
          localDataStore.put(members);
          $scope.member = members[$stateParams.memberId - 1];
        });
      } else {
        $scope.member = cachedMembers[$stateParams.memberId - 1];
      }
    }
  }

})();