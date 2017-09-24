// add.js
// This is the controller that handles the view to add or edit products.
// It first checks if user is authenticated, if not, the user is redirected to login screen.
// The selected productId to edit is stored on localStorage but is cleared after editing or when going back to the list of products.
// If there is a productId found on localStorage, it mean the user wants to update the product, else the user wants to add a new product.
'Use Strict';
angular.module('App').controller('reportController', function($scope, $state, $localStorage, Popup, $cordovaCamera, Utils) {
  $scope.$on('$ionicView.enter', function() {

    $scope.product = {
          name: '',
          email:'',
          phone:'',
          description: '',
          url: ''
        }
     $scope.imageUrl = "img/placeholder.png";
     $scope.isAdding = true;
     $scope.mode = "提交查詢"

  })

$scope.add = function(product) {
    console.log('Step1');
    // if (angular.isDefined($scope.product)) { //Check if productForm is filled up.
      Utils.show();
      console.log('Step2');
 
      //uploadtest.forEach(function(account) {  
    
           console.log('step3');
            firebase.database().ref('productstest').push({
                name: $scope.product.name,
                email: $scope.product.email,
                phone: $scope.product.phone,
                // price: $scope.product.price,
                // currency: $scope.product.currency,
                imageUrl: $scope.product.imageUrl,
                description: $scope.product.description,
                url: $scope.product.url,
                dateCreated: Date()
              }).then(function(response) {
                  console.log('step4');
              
                //Show success message then redirect to home.
                Utils.message(Popup.successIcon, Popup.reportAddSuccess)
                  .then(function() {
                    $state.go('app.homepage');
                  })
                  .catch(function() {
                    //User closed the prompt, redirect immediately.
                      $state.go('app.homepage');
                  });             

              });

  };

  /*
  //Function to go back to home.
  $scope.back = function() {
    //Set productId to null, to reset it whether we're updating product or not.
    $localStorage.productId = null;
    //Go to home.
    $state.go('home');
  };
  */

  //Function to open photo library of user to select photo to upload to Firebase Storage.
  $scope.choosePhoto = function() {
    //Set Camera options here.
    //View https://github.com/apache/cordova-plugin-camera/blob/master/README.md#module_camera.CameraOptions for more information.
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.PNG,
      targetWidth: 128,
      targetHeight: 128,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
    //Show loading modal.
    Utils.show();
    $cordovaCamera.getPicture(options).then(function(imageData) {
      //Create imageURI.
      $scope.imgURI = "data:image/png;base64," + imageData;
      //Create Blob File from ImageURI.
      var file = $scope.dataURItoBlob($scope.imgURI);
      //Create and set Meta Type to Firebase Storage Ref.
      var storageRef = firebase.storage().ref();
      var metadata = {
          'contentType': file.type
        }
        //Refer to images folder of Firebase Storage.
      storageRef.child('images/' + $scope.generateFilename()).put(file, metadata).then(function(snapshot) {
        //File successfully uploaded to Firebase Storage.
        var url = snapshot.metadata.downloadURLs[0];
        //Settings var to reflect the changes.
        $scope.imageUrl = url;
        $scope.$apply();
        $scope.product.imageUrl = url;
        Utils.hide();
      }).catch(function(error) {
        //Show Error.
        Utils.message(Popup.errorIcon, Popup.uploadImageError);
      });
    }, function(err) {
      //User Cancelled.
      Utils.hide();
    });
  }

  //Function to generate random filename with length 100 for our imageFile's name to upload to Firebase.
  $scope.generateFilename = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 100; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text + ".png";
  };

  //Function to generate Blob File required by Firebase storage given the ImageURI.
  $scope.dataURItoBlob = function(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: mimeString
    });
  };
});
