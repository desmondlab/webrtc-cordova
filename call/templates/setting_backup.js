// add.js
// This is the controller that handles the view to add or edit products.
// It first checks if user is authenticated, if not, the user is redirected to login screen.
// The selected productId to edit is stored on localStorage but is cleared after editing or when going back to the list of products.
// If there is a productId found on localStorage, it mean the user wants to update the product, else the user wants to add a new product.
'Use Strict';
angular.module('App').controller('settingController', function($scope, $state, $localStorage, Popup, $cordovaCamera, Utils) {
  
  $scope.$on('$ionicView.enter', function() {

    $scope.message = '您還沒有登入'

    if (firebase.auth().currentUser.uid){
    console.log(firebase.auth().currentUser.email);
    $localStorage.userId = firebase.auth().currentUser.uid;

    firebase.database().ref().child('userdetailtest3/'+$localStorage.userId).update({
                email: firebase.auth().currentUser.email
              }).then(function(response) {
                  console.log('save email to firebase database');
              });

  }
/*
    if (!firebase.auth().currentUser) {
       console.log('no login user id');
    } else {

   

     if (firebase.auth().currentUser.uid) {
      console.log("Logged in");
      $scope.userId = firebase.auth().currentUser.uid;
      console.log($scope.userId);
      var userId = firebase.auth().currentUser.uid;
    }
*/
 if (!$localStorage.userId) {
       console.log('no login user id');
       $scope.userId = 'no user login';
       $scope.message = '您還沒有登入'
       console.log($localStorage.userId);
        $scope.product = {
          name: '',
          email:'',
          phone:'',
          description: '',
        }
    } else {
    $scope.message = '您已經登入';

    
    console.log('has user id', $localStorage.userId);
    $scope.userId = $localStorage.userId;
    var userId = $localStorage.userId;
    
    console.log('varuser id is', $localStorage.userId);
    $scope.product = {
          name: '',
          email:'',
          phone:'',
          description: '',
        }

// get user info
firebase.database().ref('userdetailtest2').orderByChild('userId').equalTo(userId).once('value').then(function(userdetailtest) {
           console.log('user id info exist');
          if (userdetailtest.exists()) {
             console.log('user id info exist 2');
             // var userkey = '-KV0k2uCR2QFcrJZUe4H';
            // var userkey = userdetailtest.val();
             $scope.product.name = userdetailtest.child(userId).child('name').val();
             $scope.product.email = userdetailtest.child(userId).child('email').val();
             $scope.product.phone = userdetailtest.child(userId).child('phone').val();
             
          }
      });


     $scope.isAdding = true;
        $scope.mode = "提交查詢"

  

    }
  })



$scope.add = function(product) {
    console.log('Step1');
    // if (angular.isDefined($scope.product)) { //Check if productForm is filled up.
      Utils.show();
      console.log('Step2');
      var userId = firebase.auth().currentUser.uid;
      //uploadtest.forEach(function(account) {  
    if ($scope.isAdding) { 
           console.log('step3');

                firebase.database().ref().child('userdetailtest2/'+userId).update({
                name: $scope.product.name,
                email: $scope.product.email,
                phone: $scope.product.phone,
                userId: userId,
                dateCreated: Date()
              }).then(function(response) {
                  console.log('step4');
              
                //Show success message then redirect to home.
                Utils.message(Popup.successIcon, Popup.updateProfileSuccess)
                  .then(function() {
                    $state.go('app.homepage');
                  })
                  .catch(function() {
                    //User closed the prompt, redirect immediately.
                      $state.go('app.homepage');
                  });             

              });

    }
      else {

/*
        firebase.database().ref('userdetailtest').orderByChild('userID').equalTo(userId).once('value').then(function(userdetailtest) {
           console.log('user id info exist');
          if (userdetailtest.exists()) {
             console.log('user id info exist 2');
             // var userkey = '-KV0k2uCR2QFcrJZUe4H';
            // var userkey = userdetailtest.val();
            var userkey = userdetailtest.key;
             console.log(userkey);
             firebase.database().ref('userdetailtest/'+userkey).update({
               name: $scope.product.name,
                email: $scope.product.email,
                phone: $scope.product.phone,
                userID: userId,
                dateCreated: Date()
              }).then(function(response) {
              })
          }
      });
*/
      
      }


  };


  $scope.logout = function() {
    $localStorage.$reset();
    $localStorage.userId = '';
    $scope.userId = '';

    firebase.auth().signOut().then(function() {
  // Sign-out successful.
}, function(error) {
  // An error happened.
});
    console.log("Logged out, clear localstorage and scope useid equal nil");
    $state.go('app.login');
  }

 
});
