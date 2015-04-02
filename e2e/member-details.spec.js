'use strict';

describe('The member details view', function () {

  var page;

  beforeEach(function () {

    browser.get('http://localhost:3000/#/members/9');

    page = require('./member-details.po');

  });

  it('should display the correct member details', function() {

    expect(page.fullName.getText()).toEqual('Iola Duke');

    expect(page.address.getText()).toEqual('P.O. Box 583, 7122 Eu Rd.\nAugusta, ME 61170');

    expect(page.formattedPhone.getText()).toEqual('1 (577) 130-7072');

    expect(page.email.getText()).toEqual('dolor.dolor.tempus@Nam.org');

    expect(page.joinDate.getText()).toEqual('07/15/2014');

  });

  it('should allow users click to go back to the member directory', function() {

    page.backBtn.click().then(function() {

      expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/');

    });

  });

  it('should include jumbotron with correct data', function() {

    expect(page.h1El.getText()).toBe('American Association of AngularJS Engineers');

    expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/angular.png$/);

    expect(page.imgEl.getAttribute('alt')).toBe('American Association of AngularJS Engineers');

  });

  it('should include the copywrite notice', function() {

    expect(page.copywrite).toBeDefined();

    expect(page.copywrite.getText()).toEqual('Copyright © 2015 American Association of AngularJS Engineers. All rights reserved.');

  });


});
