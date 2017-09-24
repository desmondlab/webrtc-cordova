// add.js
// This is the controller that handles the view to add or edit products.
// It first checks if user is authenticated, if not, the user is redirected to login screen.
// The selected productId to edit is stored on localStorage but is cleared after editing or when going back to the list of products.
// If there is a productId found on localStorage, it mean the user wants to update the product, else the user wants to add a new product.
'Use Strict';
angular.module('App').controller('BookingCtrl', function($scope, $state, $localStorage, Popup, $cordovaCamera, Utils) {
   
  $scope.$on('$ionicView.enter', function() {

    
   $scope.timeslot1 = [];

firebase.database().ref('slots').once('value').then(function(news) {
        if (news.exists()) {
            
            news.forEach(function(account) {        
            
            var getnews = {
                  slot_date: account.val().slot_date,
                  status: account.val().status,
                  time_slot:account.val().time_slot,
                };
              
            console.log(getnews) ;
            
            if (account.val().status=="Open"){
            $scope.timeslot1.push(getnews);
            $scope.$apply();
            }

        });
        }
        });
  
  console.log($scope.timeslot1);

// get the timeslot from firebase, and only display the status is enable to book
  

console.log($scope.bookingdates);


$scope.bookingdates2 = [];
  
 $scope.isAdding = true;
 $scope.mode = "提交預約申請"

  })


$scope.changedate = function(selectedDate){
  console.log(selectedDate);
  $scope.bookingdates2 = [{
    date: '5-Oct',
    time: '3pm'
  }, {
    date: '5-Oct',
    time: '5pm'
  }, {
     date: '5-Oct',
    time: '10pm'
  }, {
    date: '3-Oct',
    time: '5pm'
  }];
}


$scope.add = function(product) {
    console.log('Step1');
    // if (angular.isDefined($scope.product)) { //Check if productForm is filled up.
      Utils.show();
      console.log('Step2');
 
     $scope.product = {
          name: '',
        }
      
           console.log('step3');
            firebase.database().ref('bookingApplication').push({
                // other: $scope.product.name,
                other: product.name,
                c1:product.c1,
                c2:product.c2,
                c3:product.c3,
                c4:product.c4,
                c5:product.c5,
                bookdate:product.selectedItem2.slot_date,
                booktimeslot:product.selectedItem2.time_slot,
                uid:$localStorage.userId,
                // url: $scope.product.url,
                applicationtime: Date(),
                bookingAcceptionStatus:'pending'
              }).then(function(response) {
                  console.log('step4');
              
                //Show success message then redirect to home.
                Utils.message(Popup.successIcon, Popup.bookingAddSuccess)
                  .then(function() {
                    $state.go('app.homepage');
                  })
                  .catch(function() {
                    //User closed the prompt, redirect immediately.
                      $state.go('app.homepage');
                  });             

              });

  };

  
  
});


angular.module('App').filter('unique', function () {

    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});


angular.module('App').filter('unique2', function () {

    return function (value) {
        console.log(value);
        var return1 = value;
        return value;
    };
});


/*
angular.module('App').filter('selectedDatefilter', function () {

  });
  */