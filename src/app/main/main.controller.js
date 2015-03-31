(function() {

  'use strict';

  angular.module('aaae')

    .controller('MainCtrl', ['$scope', '$http', '$timeout', '$state', 'formatter', 'states', 'pagination', 'localStorage', 'data',
      function ($scope, $http, $timeout, $state, formatter, states, pagination, localStorage, data) {

        $scope.pager = {};

        $scope.pager.pagerOptions = [10, 20, 50];

        $scope.pager.perPage = $scope.pager.pagerOptions[0];

        $scope.currentPage = 1;

        $scope.memberStates = [];

        $scope.paginate = function() {

          // Wait for the digest cycle to complete before proceeding
          $timeout(function() {

            $scope.currentPage = 1;

            $scope.pager.numPages = pagination.getNumPages($scope.filterMembers,
                                                           $scope.pager.perPage);
          }, 10);

        };

        $scope.filterStates = function() {

          // Wait for the digest cycle to complete before proceeding
          $timeout(function() {

            var memberList = ($scope.select === 0 &&
                              $scope.search === '' &&
                              $scope.filterMembers.length) ?
                              $scope.members : $scope.filterMembers;

            $scope.memberStates = states.getMemberStates(memberList);

          }, 10);

        };

        $scope.paginateAndFilterStates = function() {

          $scope.paginate();

          $scope.filterStates();

        };

        $scope.pageUp = function(newPage) {

          if($scope.currentPage < $scope.pager.numPages) {

            $scope.currentPage = newPage || $scope.currentPage + 1;

          }

        };

        $scope.pageDown = function(newPage) {

          if($scope.currentPage > 1) {

            $scope.currentPage = newPage || $scope.currentPage - 1;

          }

        };

        $scope.clearFilters = function() {

          $scope.select = 0;

          $scope.search = '';

          $scope.paginateAndFilterStates();

        };

        $scope.displayMemberProfile = function(id) {

          if(id) {

            $state.go('profiles', {'memberId': id})

          }

        };

        var cachedMembers = localStorage.get();

        if(!cachedMembers.length) {

          data.then(function(members) {

            localStorage.put(members);

            $scope.members = members;

          })

          .then(function() {

            $scope.memberStates = states.getMemberStates($scope.members);

          })

          .then(function() {

            $scope.pager.numPages = Math.ceil($scope.members.length/$scope.pager.perPage);

          });

        } else {

          $scope.members = cachedMembers;

          $scope.memberStates = states.getMemberStates($scope.members);

          $scope.pager.numPages = Math.ceil($scope.members.length/$scope.pager.perPage);

        }

      }]);

})();
