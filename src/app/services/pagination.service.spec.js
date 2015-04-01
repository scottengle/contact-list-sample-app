'use strict';

describe('pagination service', function() {

  var pagination,
      testItems = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

  beforeEach(function() {

    module('aaae');

    inject(function (_pagination_) {

      pagination = _pagination_;

    });

  });

  it('correctly calculates the number of pages when arguments are valid', function() {

    expect(pagination.getNumPages(testItems, 10)).toEqual(1);

    expect(pagination.getNumPages(testItems, 1)).toEqual(10);

    expect(pagination.getNumPages(testItems, 3)).toEqual(4);

  });

  it('correctly handles missing arguments', function() {

    expect(pagination.getNumPages(testItems)).toEqual(1);

    expect(pagination.getNumPages([], 3)).toEqual(1);

    expect(pagination.getNumPages()).toEqual(1);

  });

});