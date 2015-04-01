/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MemberDetailsPage = function() {

  this.jumbEl = element(by.css('.jumbotron'));
  this.h1El = this.jumbEl.element(by.css('.banner'));
  this.imgEl = this.jumbEl.element(by.css('img'));

  this.fullName = element(by.binding('member.fullName'));
  this.address = element(by.binding('member.address'));
  this.formattedPhone = element(by.binding('member.formattedPhone'));
  this.email = element(by.binding('member.email'));
  this.joinDate = element(by.binding('member.join_date'));

  this.backBtn = element(by.tagName('button'));

  this.copywrite = element.all(by.css('.footer')).get(0).element(by.tagName('p'));

};

module.exports = new MemberDetailsPage();