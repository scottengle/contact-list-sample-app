'use strict';

describe('startFrom filter', function() {

  var $filter,
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

    inject(function (_$filter_) {

      $filter = _$filter_;

    });

  });

  it('correctly handles missing input', function() {

    var result = $filter('startFrom')(null, 10);

    expect(result.length).toEqual(0);

  });

  it('correctly handles normal input', function() {

    var result = $filter('startFrom')(testMembers, 10);

    expect(result.length).toEqual(2);

  });

  it('correctly handles out-of-bounds begin index', function() {

    var result = $filter('startFrom')(testMembers, 20);

    expect(result.length).toEqual(0);

  });

  it('correctly handles negative begin index', function() {

    var result = $filter('startFrom')(testMembers, -1);

    expect(result.length).toEqual(1);
  });

});