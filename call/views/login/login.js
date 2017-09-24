//login.js

'Use Strict';
angular.module('App').controller('loginController', function($scope, $state, Watchers, Service, Utils, $localStorage, LoginService) {
  $scope.$on('$ionicView.enter', function() {
    
    LoginService.relogin();

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.forgotPassword = function() {
      $state.go('app.forgotPassword');
    };

    $scope.register = function() {
      $state.go('app.register');
    };
  });
});
