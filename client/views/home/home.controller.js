'use strict';

angular.module('qodex')
  .controller('HomeCtrl', function ($scope, $location, list) {

    var vm = this;

    $scope.ui.topBar = true;
    $scope.ui.white = true;

    angular.extend(vm, {
      name: 'HomeCtrl',
      list: list,
      switchToQuizz: function (slug) {
        $location.path('/quizz/' + slug);
      },
      navigateTo: function (icon) {
        $location.path(icon);
      }
    });

  });
