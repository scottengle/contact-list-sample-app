'use strict';

angular.module('sampleAssignment')
  .controller('MainCtrl', function ($scope, $http) {

    $http.get('/data/sample-data.json')
         .then(function(resp) {
          $scope.members = resp.data;
         })
         .then(function() {
          angular.forEach($scope.members, function(member) {
            var phoneArr = member.phone.split('-');
            member.formatted_phone = ''.format('{0} ({1}) {2}-{3}', phoneArr[0], phoneArr[1], phoneArr[2], phoneArr[3]);
            member.full_name = ''.format('{0} {1}', member.first_name, member.last_name);
          });
         });

  });

String.prototype.format = function() {
  var str = arguments[0];

  for (var i=1; i<arguments.length; i++) {
    var regEx = new RegExp("\\{" + (i-1) + "\\}", "gm");
    str = str.replace(regEx, arguments[i]);
  }

  return str;
}