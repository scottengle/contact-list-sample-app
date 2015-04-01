'use strict';

describe('states service', function() {

  var states,
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

    inject(function (_states_) {

      states = _states_;

    });

  });

  it('correctly gets the array of states', function() {

    expect(states.getMemberStates(testMembers).length).toEqual(7);

  });

  it('correctly handles empty or missing input', function() {

    expect(states.getMemberStates([]).length).toEqual(0);

    expect(states.getMemberStates().length).toEqual(0);

  });

});