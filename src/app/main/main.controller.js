'use strict';

function format() {
  var str = arguments[0];

  for (var i=1; i<arguments.length; i++) {
    var regEx = new RegExp('\\{' + (i-1) + '\\}', 'gm');
    str = str.replace(regEx, arguments[i]);
  }

  return str;
}

function formatPhone(phone) {
  // Phone Numbers come in with fields separated by dashes
  var phoneArr = phone.split('-');
  return format('{0} ({1}) {2}-{3}', phoneArr[0], phoneArr[1], phoneArr[2], phoneArr[3]);
}

function formatFullName(firstName, lastName) {
  return format('{0} {1}', firstName, lastName);
}

angular.module('aaae')
  .controller('MainCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

    $scope.pager = {};
    $scope.pager.pagerOptions = [10, 20, 50];
    $scope.currentPage = 1;
    $scope.memberStates = [];

    $http.get('/data/sample-data.json')
      .then(function(resp) {
        $scope.members = resp.data;
      })
      .then(function() {
        angular.forEach($scope.members, function(member) {
          member.formattedPhone = formatPhone(member.phone);
          member.fullName = formatFullName(member.first_name, member.last_name);
          if($scope.memberStates.indexOf(member.state) === -1) {
            $scope.memberStates.push(member.state);
          }
        });
        $scope.memberStates.sort();
      })
      .then(function() {
        $scope.pager.numPages = Math.ceil($scope.members.length/$scope.pager.perPage);        
      });

    $scope.paginate = function() {
      $timeout(function() {
        $scope.pager.numPages = Math.ceil($scope.filterMembers.length/$scope.pager.perPage);
        $scope.currentPage = 1;
      }, 10);
    };

    $scope.pageUp = function() {
      if($scope.currentPage < $scope.pager.numPages) {
        $scope.currentPage++;
      }
    }

    $scope.pageDown = function() {
      if($scope.currentPage > 1) {
        $scope.currentPage--;
      }
    }

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
      template: '<nav class="navbar"><ul><li><button class="button page-down" ng-click="pageDown()"> << </button></li><li><button class="button" disabled>{{currentPage}}</button></li><li><button class="button page-up" ng-click="pageUp()"> >> </button></li></ul></nav>',
      scope: true
    };
  });
