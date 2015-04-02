/**
 * Main Controller
 * @namespace Controllers
 */
 (function() {

  'use strict';

  angular
    .module('aaae')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$timeout', '$state', 'states', 'pagination', 'localDataStore', 'data'];

  /**
   * @namespace MainController
   * @desc Application controller for the main page
   * @memberOf Controllers
   */
  function MainCtrl($scope, $timeout, $state, states, pagination, localDataStore, data) {

    $scope.clearFilters = clearFilters;
    $scope.currentPage = 1;
    $scope.displayMemberProfile = displayMemberProfile;
    $scope.filterStates = filterStates;
    $scope.memberStates = [];
    $scope.pageDown = pageDown;
    $scope.pager = {};
    $scope.pager.pagerOptions = [10, 20, 50];
    $scope.pager.perPage = $scope.pager.pagerOptions[0];
    $scope.pageUp = pageUp;
    $scope.paginate = paginate;
    $scope.paginateAndFilterStates = paginateAndFilterStates;

    activate();

    /* @name activate
     * @desc Initializes the data-specific settings for the main page
     * @memberOf Controllers.MainController
     */
    function activate() {
      // Get the data, if it isn't already cached
      var cachedMembers = localDataStore.get();
      if(!cachedMembers.length) {

        data.get().then(function(members) {
          localDataStore.put(members);
          $scope.members = members;
        })
        .then(function() {
          $scope.memberStates = states.getMemberStates($scope.members);
          $scope.pager.numPages = Math.ceil($scope.members.length/$scope.pager.perPage);
        });

      } else {
        $scope.members = cachedMembers;
        $scope.memberStates = states.getMemberStates($scope.members);
        $scope.pager.numPages = Math.ceil($scope.members.length/$scope.pager.perPage);
      }
    }

    /* @name clearFilters
     * @desc Clears the search box, resets state select dropdown and resets pagination controls
     * @memberOf Controllers.MainController
     */
    function clearFilters() {
      $scope.select = 0;
      $scope.search = '';
      $scope.paginateAndFilterStates();
    }

    /* @name displayMemberProfile
     * @desc Navigates to the member profile page
     * @param {Number} id The ID of the member
     * @memberOf Controllers.MainController
     */
    function displayMemberProfile(id) {
      if(id) {
        $state.go('profiles', {'memberId': id});
      }
    }

    /* @name filterStates
     * @desc Filters the set of states based on the filtered members
     * @memberOf Controllers.MainController
     */
    function filterStates() {
      // Wait for the digest cycle to complete before proceeding
      $timeout(function() {
        var memberList = (($scope.select === 0 && $scope.search === '') ||
                           !$scope.filterMembers.length) ?
                           $scope.members : $scope.filterMembers;

        $scope.memberStates = states.getMemberStates(memberList);
      }, 10);
    }

    /* @name pageUp
     * @desc Pages up through the filtered members
     * @param {Number} newPage The page to navigate to
     * @memberOf Controllers.MainController
     */
    function pageUp(newPage) {
      newPage = newPage || $scope.currentPage + 1;
      if($scope.currentPage < $scope.pager.numPages && newPage <= $scope.pager.numPages) {
        $scope.currentPage = newPage || $scope.currentPage + 1;
      }
    }

    /* @name pageDown
     * @desc Pages down through the filtered members
     * @param {Number} newPage The page to navigate to
     * @memberOf Controllers.MainController
     */
    function pageDown(newPage) {
      newPage = newPage || $scope.currentPage - 1;
      if($scope.currentPage > 1 && newPage >= 1) {
        $scope.currentPage = newPage || $scope.currentPage - 1;
      }
    }

    /* @name paginate
     * @desc Resets the pagination controls
     * @memberOf Controllers.MainController
     */
    function paginate() {
      // Wait for the digest cycle to complete before proceeding
      $timeout(function() {
        $scope.currentPage = 1;
        $scope.pager.numPages = pagination.getNumPages($scope.filterMembers,
                                                       $scope.pager.perPage);
      }, 10);
    }

    /* @name paginateAndFilterStates
     * @desc Convenience method to reset pagination controls and filters the state dropdown
     * @returns {}
     * @memberOf Controllers.MainController
     */
    function paginateAndFilterStates() {
      $scope.paginate();
      $scope.filterStates();
    }
  }

})();
