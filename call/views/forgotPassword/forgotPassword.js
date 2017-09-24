//forgotPassword.js

'Use Strict';
angular.module('App').controller('forgotPasswordController', function($scope, $state, Watchers, Service, Utils) {
  $scope.$on('$ionicView.enter', function() {
    $scope.user = {
      email: ''
    };
  });

  $scope.back = function() {
    $state.go('app.login');
  };
});
