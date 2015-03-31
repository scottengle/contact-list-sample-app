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
      pagination.paginate($scope, $timeout);
    };

    $scope.paginateAndFilterStates = function() {
      pagination.paginateAndFilterStates($scope, $timeout, states);
    };

    $scope.pageUp = function(newPage) {
      pagination.pageUp($scope, newPage);
    };

    $scope.pageDown = function(newPage) {
      pagination.pageDown ($scope, newPage);
    };

    $scope.clearFilters = function() {
      $scope.select = 0;
      $scope.search = '';
      pagination.paginateAndFilterStates($scope, $timeout, states);
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

  }])
;
