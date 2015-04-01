'use strict';

describe('main controller', function(){

  var $scope,
      $timeout,
      $state,
      mainCtrl,
      localStorage,
      data,

      testMembers = [
        {'first_name': 'Jim', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'AZ'},
        {'first_name': 'John', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'UT'},
        {'first_name': 'Jane', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'FL'},
        {'first_name': 'Jerry', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'CA'},
        {'first_name': 'Jean', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'CA'},
        {'first_name': 'Jack', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'SD'},
        {'first_name': 'Josh', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'AK'},
        {'first_name': 'Janice', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'AZ'},
        {'first_name': 'Jerri', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'AZ'},
        {'first_name': 'Jake', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'FL'},
        {'first_name': 'Jill', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'AZ'},
        {'first_name': 'Bob', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'GA'}
      ],

      testFilterMembers = [
        {'first_name': 'Jim', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'AZ'},
        {'first_name': 'John', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'UT'},
        {'first_name': 'Jane', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'FL'},
        {'first_name': 'Jerry', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'CA'},
        {'first_name': 'Jean', 'last_name': 'Doe', 'phone': '1-800-555-1212', 'state': 'CA'}
      ];


  beforeEach(function() {

    module('aaae');

    inject(function($controller, $rootScope, $httpBackend, _$timeout_, _$state_,
                    states, pagination, _localStorage_, _data_) {

      $scope = $rootScope.$new();

      $timeout = _$timeout_;

      $state = _$state_;
      spyOn( $state, 'go' );
      spyOn( $state, 'transitionTo' );

      localStorage = _localStorage_;
      spyOn(localStorage, 'get').and.callThrough();

      data = _data_;
      spyOn(data, 'get').and.callThrough();

      mainCtrl = $controller('MainCtrl', {
        $scope: $scope,
        $timeout: _$timeout_,
        $state: _$state_,
        states: states,
        pagination: pagination,
        localStorage: _localStorage_,
        data: _data_
      });

      $httpBackend.expectGET('/data/sample-data.json').respond(200, testMembers);
      $httpBackend.flush();
      $rootScope.$digest();

    });

  });

  it('should initialize properly', function() {

    expect($scope.pager).toBeDefined();
    expect($scope.pager.pagerOptions.length).toEqual(3);
    expect($scope.pager.perPage).toEqual(10);
    expect($scope.pager.numPages).toEqual(2);
    expect($scope.currentPage).toEqual(1);
    expect($scope.paginate).toBeDefined();
    expect($scope.members.length).toEqual(12);
    expect($scope.memberStates.length).toEqual(7);
    expect($scope.paginateAndFilterStates).toBeDefined();
    expect($scope.pageUp).toBeDefined();
    expect($scope.pageDown).toBeDefined();
    expect($scope.clearFilters).toBeDefined();
    expect($scope.displayMemberProfile).toBeDefined();

  });

  it('should paginate properly based on number of pages', function() {

    $scope.pager.perPage = 2;
    $scope.filterMembers = $scope.members;

    $scope.paginate();
    $timeout.flush();

    expect($scope.currentPage).toEqual(1);
    expect($scope.pager.numPages).toEqual(6);

  });

  it('should filter states based on the list of filtered members', function() {

    $scope.select = 0;
    $scope.search = '';
    $scope.members = testMembers;

    $scope.filterStates();
    $timeout.flush();

    expect($scope.memberStates.length).toEqual(7);

    $scope.select = 1;
    $scope.search = '';
    $scope.filterMembers = testFilterMembers;

    $scope.filterStates();
    $timeout.flush();

    expect($scope.memberStates.length).toEqual(4);

    $scope.select = 0;
    $scope.search = 'ab';
    $scope.filterMembers = testFilterMembers;

    $scope.filterStates();
    $timeout.flush();

    expect($scope.memberStates.length).toEqual(4);

    $scope.filterMembers = [];
    $scope.filterStates();
    $timeout.flush();

    expect($scope.memberStates.length).toEqual(7);

  });

  it('should properly handle paging up through results', function() {

    $scope.currentPage = 1;
    $scope.pager.numPages = 3;

    $scope.pageUp(2);
    expect($scope.currentPage).toEqual(2);

    $scope.pageUp(3);
    expect($scope.currentPage).toEqual(3);

    $scope.pageUp(4);
    expect($scope.currentPage).toEqual(3);

    $scope.currentPage = 1;

    $scope.pageUp();
    expect($scope.currentPage).toEqual(2);

    $scope.pageUp();
    expect($scope.currentPage).toEqual(3);

    $scope.pageUp();
    expect($scope.currentPage).toEqual(3);

  });

  it('should properly handle paging down through results', function() {

    $scope.currentPage = 3;
    $scope.pager.numPages = 3;

    $scope.pageDown(2);
    expect($scope.currentPage).toEqual(2);

    $scope.pageDown(1);
    expect($scope.currentPage).toEqual(1);

    $scope.pageDown(0);
    expect($scope.currentPage).toEqual(1);

    $scope.currentPage = 3;

    $scope.pageDown();
    expect($scope.currentPage).toEqual(2);

    $scope.pageDown();
    expect($scope.currentPage).toEqual(1);

    $scope.pageDown();
    expect($scope.currentPage).toEqual(1);

  });

  it('should properly clear filters', function() {

    $scope.select = 1;
    $scope.search = 'ab';
    $scope.pager.perPage = 2;
    $scope.filterMembers = testMembers;

    $scope.clearFilters();
    $timeout.flush();

    expect($scope.select).toEqual(0);
    expect($scope.search).toEqual('');
    expect($scope.pager.numPages).toEqual(6);
    expect($scope.memberStates.length).toEqual(7);

  });

  it('should properly display the member profile', function() {

    $scope.displayMemberProfile(3);

    expect($state.go).toHaveBeenCalledWith('profiles', {'memberId': 3});

  });

});
