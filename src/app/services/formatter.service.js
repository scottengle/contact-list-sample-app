/**
 * Formatter Factory
 * @namespace Services
 */
(function() {

  'use strict';

  angular
    .module('aaae')
    .factory('formatter', formatter);

  /**
   * @namespace Formatter
   * @desc Application wide formatter factory
   * @memberOf Services
   */
  function formatter() {
    return {
      format: format,
      formatPhone: formatPhone,
      formatFullName: formatFullName
    };

    /* @name format
     * @desc Generic formatter that replaces placeholders in strings
     * @example
     * // returns 'Hello, John!'
     * formatter.format('{0}, {1}!', 'Hello', 'John');
     * @returns {String}
     * @memberOf Services.Formatter
     */
    function format() {
      var str = arguments[0];
      for (var i=1; i<arguments.length; i++) {
        var regEx = new RegExp('\\{' + (i-1) + '\\}', 'gm');
        str = str.replace(regEx, arguments[i]);
      }

      return str;
    }

    /* @name formatPhone
     * @desc Phone number formatter. Origin string must be in the form X-XXX-XXX-XXXX.
     * @example
     * // returns '1 (800) 555-1212'
     * formatter.formatPhone('1-800-555-1212');
     * @returns {String}
     * @memberOf Services.Formatter
     */
    function formatPhone(phone) {
      // Phone Numbers come in with fields separated by dashes
      var phoneArr = phone.split('-');
      return format('{0} ({1}) {2}-{3}',
                    phoneArr[0], phoneArr[1], phoneArr[2], phoneArr[3]);
    }

    /* @name formatFullName
     * @desc Formats a first and last name into a 'full name'
     * @example
     * // returns 'John Doe'
     * formatter.formatFullName('John', 'Doe');
     * @returns {String}
     * @memberOf Services.Formatter
     */
    function formatFullName(firstName, lastName) {
      return format('{0} {1}', firstName, lastName);
    }

  }



})();