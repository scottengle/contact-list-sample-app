(function() {

  'use strict';

  angular.module('aaae', ['ui.router'])

    .config(function ($stateProvider, $urlRouterProvider) {

      $stateProvider

        .state('home', {

          url: '/',

          templateUrl: 'app/main/main.html',

          controller: 'MainCtrl'

        })

        .state('profiles', {

          url: '/members/:memberId',

          templateUrl: 'app/member/profiles.html',

          controller: 'ProfilesCtrl'

        });

      $urlRouterProvider.otherwise('/');

    });

})();