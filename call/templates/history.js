//home.js

'Use Strict';
angular.module('App')


.controller('historyCtrl', function($scope, $state, Watchers, Service, Utils, LoginService, $localStorage, Popup, $ionicPopup) {
  

  $scope.$on('$ionicView.enter', function() {
  
      if (firebase.auth().currentUser.uid){
      Utils.show();
      //Get user's productList from Firebase.
      $scope.booked = false;
      $scope.products = [];
      
      var useruid = firebase.auth().currentUser.uid;

      // var userId = firebase.auth().currentUser.uid;
      // console.log(userId,'current user id') ;

      firebase.database().ref('bookingApplication').orderByChild('uid').equalTo(useruid).once('value').then(function(news) {
        if (news.exists()) {
             console.log('Step1');
             console.log(useruid);
             $scope.booked = true;

            news.forEach(function(account) {        
            
            var getnews = {
                  bookdate: account.val().bookdate,
                  bookingAcceptionStatus: account.val().bookingAcceptionStatus,
                  booktimeslot:account.val().booktimeslot,
                  uid: account.val().uid
                };
               console.log('Step2');
            // console.log(getnews) ;
               console.log(getnews);
            $scope.products.push(getnews);
            $scope.$apply();
            Utils.hide();

          });
        }
      });
  }

    });
    

    
      

})


