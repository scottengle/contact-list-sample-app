'use strict';

describe('localStorage service', function() {

  var localStorage;

  beforeEach(function() {

    module('aaae');

    inject(function (_localStorage_) {

      localStorage = _localStorage_;

    });

  });

  it('correctly retrieves an empty cache', function() {

    expect(localStorage.get()).toEqual({});

  });

  it('correctly stores an object', function() {

    var test = {'test': true};

    localStorage.put(test);

    expect(localStorage.get()).toEqual(test);

  });

  it('correctly removes an object', function() {

    var test = {'test': true};

    localStorage.put(test);

    expect(localStorage.get()).toEqual(test);

    localStorage.remove();

    expect(localStorage.get()).toEqual({});

  });

});