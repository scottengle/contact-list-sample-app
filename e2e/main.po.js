/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {

  this.jumbEl = element(by.css('.jumbotron'));
  this.h1El = this.jumbEl.element(by.css('.banner'));
  this.imgEl = this.jumbEl.element(by.css('img'));

  this.tableCtrls = element(by.css('.table-controls'));
  this.searchBox = this.tableCtrls.element(by.model('search.fullName'));
  this.stateFilter = this.tableCtrls.element(by.model('select.state'));
  this.stateFilterOptions = this.stateFilter.all(by.tagName('option'));
  this.clearFiltersBtn = this.tableCtrls.element(by.css('.clear-filters'));
  this.perPageDD = this.tableCtrls.element(by.model('pager.perPage'));
  this.perPageOptions = this.perPageDD.all(by.tagName('option'));

  this.navBar = element(by.css('.navbar'));
  this.navBtns = this.navBar.all(by.tagName('button'));
  this.pageDownBtn = this.navBtns.get(0);
  this.currentPage = this.navBtns.get(1);
  this.pageUpBtn = this.navBtns.get(2);

  this.members = element.all(by.repeater('member in filterMembers'));

  this.copywrite = element.all(by.css('.footer')).get(1).element(by.tagName('p'));

};

module.exports = new MainPage();
