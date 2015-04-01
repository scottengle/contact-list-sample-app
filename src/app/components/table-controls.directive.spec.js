'use strict';

describe('table-controls directive', function() {

  var $scope,
      $compile,
      elem,
      compiled,
      testMembers = [
        {'first_name': 'Jim', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'AZ'}
      ];


  beforeEach(function() {

    module('aaae');

    inject(function($rootScope, _$compile_, $httpBackend, _$rootScope_) {

      $scope = $rootScope.$new();
      $scope.currentPage = 2;

      $compile = _$compile_;
      $rootScope = _$rootScope_;

      $httpBackend.expectGET('/data/sample-data.json').respond(200, testMembers);
      $rootScope.$digest();

    });

  });

  it('correctly sets the current page', function() {

    elem = angular.element('<aaae-table-controls><aaae-table-controls>');

    compiled = $compile(elem);

    compiled($scope);

    $scope.$digest();

    expect(elem.html()).toContain('<option value="">FILTER BY STATE</option>');

    expect(elem.html()).toContain('ng-model="search.fullName" placeholder="SEARCH BY NAME"');

    expect(elem.html()).toContain('ng-model="pager.perPage" ng-options="option for option in pager.pagerOptions"');

  });

});