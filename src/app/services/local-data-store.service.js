/**
 * Local Data Store Factory
 * @namespace Services
 */
 (function() {

  'use strict';

  angular
    .module('aaae')
    .factory('localDataStore', localDataStore);

  /**
   * @namespace LocalDataStore
   * @desc Application wide Local Data Store factory
   * @memberOf Services
   */
  function localDataStore() {

    var storage = {};

    return {
      put: put,
      remove: remove,
      get: get
    };

    /* @name put
     * @desc Add an object into the data store
     * @memberOf Services.LocalDataStore
     */
    function put(obj) {
      storage = obj;
    }

    /* @name remove
     * @desc Remove a stored object from the data store. Safe to call when storage is empty.
     * @memberOf Services.LocalDataStore
     */
    function remove() {
      storage = {};
    }

    /* @name get
     * @desc Get the stored object from the data store.
     * @returns {Object}
     * @memberOf Services.LocalDataStore
     */
    function get() {
      return storage;
    }
  }

})();