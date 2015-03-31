'use strict';

angular.module('aaae')
  .controller('MainCtrl', ['$scope', '$http', '$timeout', 'Formatter', 'States', 'Pagination', function ($scope, $http, $timeout, Formatter, States, Pagination) {

    $scope.pager = {};
    $scope.pager.pagerOptions = [10, 20, 50];
    $scope.pager.perPage = $scope.pager.pagerOptions[0];
    $scope.currentPage = 1;
    $scope.memberStates = [];

    $http.get('/data/sample-data.json')
      .then(function(resp) {

        $scope.members = resp.data;

      })
      .then(function() {

        angular.forEach($scope.members, function(member, idx) {

          member.formattedPhone = Formatter.formatPhone(member.phone);

          member.fullName = Formatter.formatFullName(member.first_name, member.last_name);

          member.id = idx;

        });

        $scope.memberStates = States.getMemberStates($scope.members);

      })
      .then(function() {

        $scope.pager.numPages = Math.ceil($scope.members.length/$scope.pager.perPage);

      });

    $scope.paginate = function() {
      Pagination.paginate($scope, $timeout);
    };

    $scope.paginateAndFilterStates = function() {
      Pagination.paginateAndFilterStates($scope, $timeout, States);
    };

    $scope.pageUp = function(newPage) {
      Pagination.pageUp($scope, newPage);
    };

    $scope.pageDown = function(newPage) {
      Pagination.pageDown($scope, newPage);
    };

    $scope.clearFilters = function() {
      $scope.select = 0;
      $scope.search = '';
      Pagination.paginateAndFilterStates($scope, $timeout, States);
    };

    // Temp function. Will be replaced with page to display data.
    $scope.displayMemberData = function(id) {
      if(id) {
        alert(JSON.stringify($scope.members[id], 2));
      }
    };

  }])
  .filter('aaaeStartFrom', function() {
    return function(input, begin) {
      if(input) {
        begin = +begin; //convert to int
          return input.slice(begin);
        }
      return [];
    };
  })
  .directive('aaaePaginator', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/main/paginator.directive.html',
      replace: true,
      controller: 'MainCtrl'
    };
  })
  .directive('aaaeTableControls', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/main/tableControls.directive.html',
      replace: true,
      controller: 'MainCtrl'
    };
  })
  .factory('Formatter', function() {
    return {
      format: function() {
        var str = arguments[0];

        for (var i=1; i<arguments.length; i++) {
          var regEx = new RegExp('\\{' + (i-1) + '\\}', 'gm');
          str = str.replace(regEx, arguments[i]);
        }

        return str;
      },
      formatPhone: function(phone) {
        // Phone Numbers come in with fields separated by dashes
        var phoneArr = phone.split('-');
        return this.format('{0} ({1}) {2}-{3}', phoneArr[0], phoneArr[1], phoneArr[2], phoneArr[3]);
      },
      formatFullName: function(firstName, lastName) {
        return this.format('{0} {1}', firstName, lastName);
      }
    }
  })
  .factory('States', function() {
    return {
      getMemberStates: function(members) {
        var states = [];
        angular.forEach(members, function(member) {
          if(states.indexOf(member.state) === -1) {
            states.push(member.state);
          }
        });
        states.sort();
        return states;
      }
    }
  })
  .factory('Pagination', function() {

    return {
      paginate: function($scope, $timeout) {
        $timeout(function() {
          $scope.pager.numPages = ($scope.filterMembers.length === 0) ? 1 : Math.ceil($scope.filterMembers.length/$scope.pager.perPage);
          $scope.currentPage = 1;
        }, 10);
      },
      paginateAndFilterStates: function($scope, $timeout, States) {
        $timeout(function() {
          if($scope.select === 0 && $scope.search === '' && $scope.filterMembers.length) {
            $scope.memberStates = States.getMemberStates($scope.members);
            $scope.select = 0;
          } else if($scope.filterMembers.length) {
            $scope.memberStates = States.getMemberStates($scope.filterMembers);
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

  })
  ;
