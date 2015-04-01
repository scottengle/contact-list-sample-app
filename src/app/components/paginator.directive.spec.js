'use strict';

describe('paginator directive', function() {

  var $scope,
      $compile,
      $rootScope,
      elem,
      compiled,
      testMembers = [
        {'first_name': 'Jim', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'AZ'}
      ];


  beforeEach(function() {

    module('aaae');

    inject(function(_$compile_, $httpBackend, _$rootScope_) {

      $compile = _$compile_;
      $rootScope = _$rootScope_;

      $scope = $rootScope.$new();
      $scope.currentPage = 2;

      $httpBackend.expectGET('/data/sample-data.json').respond(200, testMembers);
      $rootScope.$digest();

    });

  });

  it('correctly sets the current page', function() {

    elem = angular.element('<aaae-paginator><aaae-paginator>');
    compiled = $compile(elem);
    compiled($scope);
    $scope.$digest();

    expect(elem.html()).toContain('<button class="button ng-binding" disabled="">1</button>');
  });

});