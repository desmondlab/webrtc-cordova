angular.module('starter.controllers', ['ionic','ui.router'])


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  /*
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/loginold.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  */

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chilla', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

/*
.controller('newslistsCtrl', function($scope) {
  $scope.newslists = [
    { title: 'news1', id: 1 },
    { title: 'news2', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('newslistCtrl', function($scope, $stateParams) {
});
*/


/* js of welcome page */

.controller('WelcomeCtrl', function($scope, $timeout, $ionicPopup, $location) {

//$ionicSideMenuDelegate.canDragContent(false);

$scope.options = {
  loop: false,
  // effect: 'fade',
  speed: 500,
}

$scope.go = function ( path ) {
    $location.path( path );
     //console.log('going to the path');
  };

$scope.$on("$ionicSlides.sliderInitialized", function(event, data){
  // data.slider is the instance of Swiper
  $scope.slider = data.slider;
});

$scope.$on("$ionicSlides.slideChangeStart", function(event, data){
  console.log('Slide change is beginning');
});

$scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
  // note: the indexes are 0-based
  $scope.activeIndex = data.activeIndex;
  $scope.previousIndex = data.previousIndex;
});

})

.controller('ManualCtrl', function($scope, $timeout, $ionicPopup, $location) {

//$ionicSideMenuDelegate.canDragContent(false);

$scope.options = {
  loop: false,
  // effect: 'fade',
  speed: 500,
}

$scope.go = function ( path ) {
    $location.path( path );
     //console.log('going to the path');
  };

$scope.$on("$ionicSlides.sliderInitialized", function(event, data){
  // data.slider is the instance of Swiper
  $scope.slider = data.slider;
});

$scope.$on("$ionicSlides.slideChangeStart", function(event, data){
  console.log('Slide change is beginning');
});

$scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
  // note: the indexes are 0-based
  $scope.activeIndex = data.activeIndex;
  $scope.previousIndex = data.previousIndex;
});

})

.controller('HomepageCtrl', function($scope, $timeout, $ionicPopup, $location, $ionicHistory) {

$ionicHistory.nextViewOptions({
  disableBack: true
});

$scope.go = function ( path ) {
    $location.path( path );
    //console.log('going to the path');
  };

})


.controller('BookingintroCtrl', function($scope, $location, $localStorage) {

if (!$localStorage.userId) {
$scope.message = '您還沒有登入';}
else{
 $scope.message = '您已經登入';
}

$scope.go = function ( path ) {
    $location.path( path );
    //console.log('going to the path');
  };

})

.controller('UrgentCtrl', function($scope) {
 

$scope.networkstatus = 'detecting network status'
  console.log('going to use network plugin');
  

    
     setTimeout(function () {
        $scope.$apply(function () {

          // var networkState = navigator.connection.type;
           var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

            $scope.networkstatus = states[networkState];
        });
    }, 2000);

    
    /*
    $scope.$apply(function () {
    var networkState = navigator.connection.type;
    $scope.networkstatus = states[networkState];
    });
    */

    /*
    if ($scope.networkstatus == 'WiFi connection') {
      $scope.reminder = 'Your are using wifi, good to connect'
    };
    if ($scope.networkstatus == 'Cell 4G connection') {
      $scope.reminder = 'Your are using 4G, good to connect'
    };
    });
    */

    // alert('Connection type: ' + states[networkState]);

 $scope.checkconnection = function () {
};

  $scope.name = 'Sally';
    $scope.data = [{
        name: 'foo name',
        value: 'foo value',
        spots: ['s1', 's2', 's3']
    }, {
        name: 'foo name 2',
        value: 'foo value 2',
        spots: ['s5', 's6', 's7', 's8']
    }]
    
})