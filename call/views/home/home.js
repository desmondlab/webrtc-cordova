//home.js

'Use Strict';
angular.module('App').controller('homeController', function($scope, $state, Watchers, Service, Utils, LoginService, $localStorage, Popup, $ionicPopup) {
  $scope.$on('$ionicView.enter', function() {
    if (firebase.auth().currentUser.isAnonymous) {
      console.log("Logged in as Guest.");
    }

    $scope.userId = firebase.auth().currentUser.uid;
    $localStorage.userId = firebase.auth().currentUser.uid;
    console.log("save userid to localstorage");

    $scope.$watch(function() {
      return LoginService.isGuest();
    }, function() {
      $scope.isGuest = LoginService.isGuest();
    });

//Check if user is authenticated, if not, redirect to Login Screen.
    if (!firebase.auth().currentUser) {
      $state.go('app.login');
    } else {
      Utils.show();
      console.log("Logged in.");
       console.log(firebase.auth().currentUser.uid);
      //Get user's productList from Firebase.
      //$scope.products = [];
      var userId = firebase.auth().currentUser.uid;
      $scope.userId 
      /* firebase.database().ref('accounts').orderByChild('userId').equalTo(userId).once('value').then(function(accounts) {
        if (accounts.exists()) {
          accounts.forEach(function(account) {
            $scope.accountId = account.key;
            $scope.productIds = account.val().products;
            if (!$scope.productIds) {
              //User has no products yet!
              Utils.hide();
            }
            //Fetch each products the user have given the productIds
            $scope.productIds.forEach(function(productId) {
              //Get the product.
              firebase.database().ref('products/' + productId).once('value', function(product) {
                var price;
                //Create price string.
                if (product.val().price == 0) {
                  price = "FREE";
                } else {
                  price = product.val().currency[0] + product.val().price;
                }
                //Create product object to be added to the productList.
                var product = {
                  id: productId,
                  name: product.val().name,
                  price: price,
                  imageUrl: product.val().imageUrl,
                  description: product.val().description,
                  url: product.val().url
                };
                //Add product to productList.
                $scope.products.push(product);
                $scope.$apply();
                Utils.hide();
              });
            });
          });
        }
      });*/
      Utils.hide();
    }
  })

//Adding product, go to add Screen.
  $scope.add = function() {
    $state.go('add');
  };

  //Editting product, set productId to edit, then go to add Screen.
  $scope.edit = function(id) {
    $localStorage.productId = id;
    $state.go('add');
  }

  //Deleting product.
  $scope.delete = function(id) {
    //Show confirmation popup.
    var popup = Utils.confirm('ion-trash-b', 'Are you sure you want to delete this product?');
    popup.then(function(isDelete) {
      if (isDelete) { //Confirm delete.
        var indexToRemove = $scope.productIds.indexOf(id);
        //Remove productId from productIds list of the account.
        $scope.productIds.splice(indexToRemove, 1);
        //Remove product from productsList.
        $scope.products.splice(indexToRemove, 1);
        //Update changes on Firebase, delete product and set the new productId list of the account.
        firebase.database().ref('products/' + id).remove();
        firebase.database().ref('accounts/' + $scope.accountId).update({
          products: $scope.productIds
        });
      }
    });
  }

  //View product url.
  $scope.info = function(url) {
    window.open(url, '_system', 'location=no');
  }

  //Logout.
  $scope.logout = function() {
    $localStorage.$reset();
    $localStorage.userId = '';
    $scope.userId = '';
    console.log("Logged out, clear localstorage and scope useid equal nil");
    $state.go('app.login');
  }


});
