'use strict';

angular.module('aaae')

  .factory('formatter', function() {

    return {

      format: function() {

        var str = arguments[0];

        for (var i=1; i<arguments.length; i++) {

          var regEx = new RegExp('\\{' + (i-1) + '\\}', 'gm');

          str = str.replace(regEx, arguments[i]);

        }

        return str;
      },

      formatPhone: function(phone) {

        // Phone Numbers come in with fields separated by dashes
        var phoneArr = phone.split('-');

        return this.format('{0} ({1}) {2}-{3}', phoneArr[0], phoneArr[1], phoneArr[2], phoneArr[3]);

      },

      formatFullName: function(firstName, lastName) {

        return this.format('{0} {1}', firstName, lastName);

      }

    };

  });