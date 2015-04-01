'use strict';

describe('formatter service', function() {

  var formatter;

  beforeEach(function() {

    module('aaae');

    inject(function (_formatter_) {

      formatter = _formatter_;

    });

  });

  it('correctly provides a generic format function', function() {

    expect(formatter.format('{0} to {1}', 'A', 'B')).toEqual('A to B');

  });

  it('correctly reformats a phone number in the form of 1-800-555-1212', function() {

    expect(formatter.formatPhone('1-800-555-1212')).toEqual('1 (800) 555-1212');

  });

  it('correctly formats a members full name', function() {

    expect(formatter.formatFullName('John', 'Doe')).toEqual('John Doe');

  });

});