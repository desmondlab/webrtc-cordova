//register.js

'Use Strict';
angular.module('App').controller('registerController', function($scope, $state, Watchers, Service, Utils) {
  $scope.$on('$ionicView.enter', function() {
    $scope.user = {
      email: '',
      password: ''
    };
  });

  $scope.back = function() {
    $state.go('app.login');
  };
});
