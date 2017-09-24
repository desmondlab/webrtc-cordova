angular.module('App')

  .controller('ContactsCtrl', function ($scope, ContactsService) {
    $scope.contacts = ContactsService.onlineUsers;
  });