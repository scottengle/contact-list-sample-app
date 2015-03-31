'use strict';

angular.module('aaae')

  .controller('MainCtrl',
    [ '$scope',
      '$http',
      '$timeout',
      'formatter',
      'states',
      'pagination',
      function ($scope, $http, $timeout, formatter, states, pagination) {

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

          var memberList = ($scope.select === 0 &&
                            $scope.search === '' &&
                            $scope.filterMembers.length) ?
                            $scope.members : $scope.filterMembers;

          $scope.memberStates = states.getMemberStates(memberList);

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

        // Temp function. Will be replaced with page to display data.
        $scope.displayMemberData = function(id) {

          if(id) {

            alert(JSON.stringify($scope.members[id], 2));

          }

        };

        $http.get('/data/sample-data.json')

          .then(function(resp) {

            $scope.members = resp.data;

          })

          .then(function() {

            angular.forEach($scope.members, function(member, idx) {

              member.formattedPhone = formatter.formatPhone(member.phone);

              member.fullName = formatter.formatFullName(member.first_name,
                                                         member.last_name);

              member.id = idx;

            });

            $scope.memberStates = states.getMemberStates($scope.members);

          })

          .then(function() {

            $scope.pager.numPages = Math.ceil($scope.members.length/$scope.pager.perPage);

          });

      }
    ]
  );
