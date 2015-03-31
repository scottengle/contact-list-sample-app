'use strict';

angular.module('aaae')

  .factory('states', function() {

    return {

      getMemberStates: function(members) {

        var states = [];

        angular.forEach(members, function(member) {

          if(states.indexOf(member.state) === -1) {

            states.push(member.state);

          }

        });

        states.sort();

        return states;

      }

    };

  });