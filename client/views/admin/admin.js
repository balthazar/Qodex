'use strict';

angular.module('qodex')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/create', {
        templateUrl: 'views/admin/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'vm',
        authenticate: true
      });
  });
