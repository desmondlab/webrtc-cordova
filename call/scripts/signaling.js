angular.module('App')
  .factory('signaling', function (socketFactory) {
    var socket = io.connect('https://52.36.115.79:3000/');
    
    var socketFactory = socketFactory({
      ioSocket: socket
    });

    return socketFactory;
  });	