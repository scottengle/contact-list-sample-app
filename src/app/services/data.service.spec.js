'use strict';

describe('data service', function() {

  var $scope,
      $rootScope,
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
      ];


  beforeEach(function() {

    module('aaae');

    inject(function (_$rootScope_, _data_, $httpBackend) {

      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();

      $httpBackend.expectGET('/data/sample-data.json').respond(200, testMembers);
      $rootScope.$digest();

      data = _data_;

    });

  });

  it('correctly fetches and transforms the data', function() {

    data.get().then(function(members) {

      expect(members.length).toEqual(12);
      expect(members[0].formattedPhone).toEqual('1 (800) 555-1212');
      expect(members[0].fullName).toEqual('Jim Doe');
      expect(members[0].id).toEqual(0);

    });

  });

});