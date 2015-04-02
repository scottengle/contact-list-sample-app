'use strict';

describe('profiles controller', function(){

  var $scope,
      profilesCtrl,
      testMembers;

  beforeEach(function() {

    module('aaae');

    testMembers = [
     {
          'first_name': 'Maryam',
          'last_name': 'Graham',
          'phone': '1-872-750-1127',
          'state': 'CA'
      },
      {
          'first_name': 'Paloma',
          'last_name': 'Weeks',
          'phone': '1-746-482-4391',
          'state': 'VT'
      },
      {
          'first_name': 'Stacy',
          'last_name': 'Guerrero',
          'phone': '1-455-159-1000',
          'state': 'CA'
      }
    ];

  });

  it('should initialize properly if data is not cached', function() {

    inject(function($controller, $rootScope, $httpBackend, data, localDataStore) {

      $scope = $rootScope.$new();

      profilesCtrl = $controller('ProfilesCtrl', {
        $scope: $scope,
        $stateParams: {'memberId': 1},
        data: data,
        localDataStore: localDataStore
      });

      $httpBackend.expectGET('/data/sample-data.json').respond(200, testMembers);
      $httpBackend.flush();

      $rootScope.$digest();

    });

    expect($scope.member.first_name).toEqual('Maryam');

  });

  it('should not load data if it is already cached', function() {

    var data;

    inject(function($controller, $rootScope, $httpBackend, _data_, localDataStore) {

      localDataStore.put(testMembers);

      $scope = $rootScope.$new();

      data = _data_;
      spyOn(data, 'get');

      profilesCtrl = $controller('ProfilesCtrl', {
        $scope: $scope,
        $stateParams: {'memberId': 1},
        data: _data_,
        localDataStore: localDataStore
      });

    });

    expect($scope.member.first_name).toEqual('Maryam');

    expect(data.get).not.toHaveBeenCalled();

  });

});
