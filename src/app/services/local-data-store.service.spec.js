'use strict';

describe('localDataStore service', function() {

  var localDataStore;

  beforeEach(function() {

    module('aaae');

    inject(function (_localDataStore_) {

      localDataStore = _localDataStore_;

    });

  });

  it('correctly retrieves an empty cache', function() {

    expect(localDataStore.get()).toEqual({});

  });

  it('correctly stores an object', function() {

    var test = {'test': true};

    localDataStore.put(test);

    expect(localDataStore.get()).toEqual(test);

  });

  it('correctly removes an object', function() {

    var test = {'test': true};

    localDataStore.put(test);

    expect(localDataStore.get()).toEqual(test);

    localDataStore.remove();

    expect(localDataStore.get()).toEqual({});

  });

});