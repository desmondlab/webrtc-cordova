//routes.js
//This class will contain all the navigation view and its associated controller of your Ionic application.
//Each view of your application and its controller should be registered inside this file.
//To redirect/access a route/view simply call $state.go('<NAME_OF_ROUTE>') in your controller.
//Don't forget to import/include your controller's javascript file in your index.html.

angular.module('App').config(function($stateProvider, $urlRouterProvider) {
  //Define your routes here.
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'views/home/home.html',
    controller: 'homeController'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'views/login/login.html',
    controller: 'loginController'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'views/register/register.html',
    controller: 'registerController'
  })
  .state('forgotPassword', {
    url: '/forgotPassword',
    templateUrl: 'views/forgotPassword/forgotPassword.html',
    controller: 'forgotPasswordController'
  })
  .state('add', {
        url: '/add',
        templateUrl: 'views/add/add.html',
        controller: 'addController'
      })
  $urlRouterProvider.otherwise("/login");
});
