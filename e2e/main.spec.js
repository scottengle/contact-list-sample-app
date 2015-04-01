'use strict';

describe('The main view', function () {

  var page;

  beforeEach(function () {

    browser.get('http://localhost:3000/#/');

    page = require('./main.po');

  });

  it('should include jumbotron with correct data', function() {

    expect(page.h1El.getText()).toBe('American Association of AngularJS Engineers');

    expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/angular.png$/);

    expect(page.imgEl.getAttribute('alt')).toBe('American Association of AngularJS Engineers');

  });

  it('should include the table controls', function() {

    expect(page.searchBox).toBeDefined();

    expect(page.searchBox.getText()).toEqual('');

    expect(page.stateFilter).toBeDefined();

    expect(page.stateFilterOptions.count()).toBeGreaterThan(0);

    expect(page.stateFilterOptions.first().getText()).toEqual('FILTER BY STATE');

    expect(page.clearFiltersBtn).toBeDefined();

    expect(page.perPageDD).toBeDefined();

    expect(page.perPageOptions.count()).toEqual(3);

    expect(page.perPageOptions.first().getText()).toEqual('10');

  });

  it('should include the paging controls', function() {

    expect(page.navBar).toBeDefined();

    expect(page.navBtns.count()).toEqual(3);

    expect(page.pageDownBtn).toBeDefined();

    expect(page.currentPage).toBeDefined();

    expect(page.currentPage.getText()).toEqual('1');

    expect(page.pageUpBtn).toBeDefined();

  });

  it('should include the copywrite notice', function() {

    expect(page.copywrite).toBeDefined();

    expect(page.copywrite.getText()).toEqual('Copyright © 2015 American Association of AngularJS Engineers. All rights reserved.');

  });

  it('should correctly show the filtered list of members', function() {

    page.perPageOptions.first().getText().then(function(value) {

      expect(page.members.count()).toEqual(parseInt(value));

    });

  });

  it('should correctly page when the paging buttons are clicked', function() {

    page.pageUpBtn.click()

    expect(page.currentPage.getText()).toEqual('2');

    page.pageDownBtn.click();

    expect(page.currentPage.getText()).toEqual('1');

  });

  it('should allow the user to select the number of members per page', function() {

    page.perPageOptions.get(1).click();

    page.perPageOptions.get(1).getText().then(function(value) {

      expect(page.members.count()).toEqual(parseInt(value));

    });

    page.perPageOptions.last().click();

    page.perPageOptions.last().getText().then(function(value) {

      expect(page.members.count()).toEqual(parseInt(value));

    });

  });

  it('should allow the user to search by name', function() {

    page.searchBox.sendKeys('ab');

    expect(page.members.count()).toEqual(4);

    expect(page.stateFilterOptions.count()).toEqual(5);

    page.stateFilterOptions.last().click();

    expect(page.members.count()).toEqual(1);

    expect(page.stateFilterOptions.count()).toEqual(2);

  });

  it('should allow the user to clear filters', function() {

    page.searchBox.sendKeys('ab');

    page.stateFilterOptions.last().click();

    expect(page.members.count()).toEqual(1);

    expect(page.stateFilterOptions.count()).toEqual(2);

    page.clearFiltersBtn.click();

    expect(page.members.count()).toEqual(10);

    expect(page.stateFilterOptions.count()).toEqual(37);

  });

  it('should disable paging buttons when you can no longer page', function() {

    // page down is disabled on first load
    expect(page.pageDownBtn.isEnabled()).toBe(false);

    // page up is enabled on first load
    expect(page.pageUpBtn.isEnabled()).toBe(true);

    // set per page to 50, rendering only 2 pages
    page.perPageOptions.last().click();

    page.pageUpBtn.click();

    expect(page.pageDownBtn.isEnabled()).toBe(true);

    expect(page.pageUpBtn.isEnabled()).toBe(false);

  });

  it('should let users click to see member details', function() {

    page.members.get(0).element(by.tagName('button')).click();

    expect(element(by.binding('member.fullName')).getText()).toEqual('Uriah Acevedo');

  });

});
