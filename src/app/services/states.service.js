/**
 * States Factory
 * @namespace Services
 */
 (function() {

  'use strict';

  angular
    .module('aaae')
    .factory('states', states);

  /**
   * @namespace States
   * @desc Application wide States factory
   * @memberOf Services
   */
  function states() {

    return {
      getMemberStates: getMemberStates
    };

    /* @name getMemberStates
     * @desc Get the sorted set of states associated with the provided members.
     * Each object defined in the members parameter must have a 'state' property.
     * @param {Array} members An array of member objects
     * @returns {Array}
     * @memberOf Services.States
     */
    function getMemberStates(members) {
      members = members || [];
      var states = [];
      angular.forEach(members, function(member) {
        if(member.state && states.indexOf(member.state) === -1) {
          states.push(member.state);
        }
      });

      states.sort();

      return states;
    }
  }

})();