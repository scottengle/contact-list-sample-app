'use strict';

angular.module('aaae')
  .factory('pagination', function() {

    return {
      paginate: function($scope, $timeout) {
        $timeout(function() {
          $scope.pager.numPages = ($scope.filterMembers.length === 0) ? 1 : Math.ceil($scope.filterMembers.length/$scope.pager.perPage);
          $scope.currentPage = 1;
        }, 10);
      },
      paginateAndFilterStates: function($scope, $timeout, states) {
        $timeout(function() {
          if($scope.select === 0 && $scope.search === '' && $scope.filterMembers.length) {
            $scope.memberStates = states.getMemberStates($scope.members);
            $scope.select = 0;
          } else if($scope.filterMembers.length) {
            $scope.memberStates = states.getMemberStates($scope.filterMembers);
          }

          $scope.paginate();
        }, 10);
      },
      pageUp: function($scope, newPage) {
        if($scope.currentPage < $scope.pager.numPages) {
          $scope.currentPage = newPage || $scope.currentPage + 1;
        }
      },
      pageDown: function($scope, newPage) {
        if($scope.currentPage > 1) {
          $scope.currentPage = newPage || $scope.currentPage - 1;
        }
      }
    };

  });