//home.js

'Use Strict';
angular.module('App')

.service('detailService', function() {
    this.itemName;
})

.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://srv*.assets.example.com/**',
    'http://*.youtube.com/**',
    '//*.youtube.com/**',
    'https://*.youtube.com/**',
    'https://youtu.be/**',

  ]);

  // The blacklist overrides the whitelist so the open redirect here is blocked.
  $sceDelegateProvider.resourceUrlBlacklist([
    'http://myapp.example.com/clickThru**'
  ]);
})

.controller('newslistsCtrl', function($scope, $state, Watchers, Service, Utils, LoginService, $localStorage, Popup, $ionicPopup ,detailService) {
  

  $scope.$on('$ionicView.enter', function() {
  

      Utils.show();
      //Get user's productList from Firebase.

      $scope.products = [];

      // var userId = firebase.auth().currentUser.uid;
      // console.log(userId,'current user id') ;

      firebase.database().ref('news').limitToLast(100).once('value').then(function(news) {
        if (news.exists()) {
            
            news.forEach(function(account) {        
            
            var getnews = {
                  brief: account.val().brief,
                  details: account.val().details,
                  news_date:account.val().news_date,
                  thumbnail_url:account.val().thumbnail_url,
                  id: account.val().news_id
                };
              
            // console.log(getnews) ;

            $scope.products.push(getnews);
            $scope.$apply();
            Utils.hide();

          });
        }
      });
    
    });
    
    $scope.getDetail=function(ObjectData){
	   // detailService.itemName=ObjectData.brief;
     detailService.itemName=ObjectData;
     
  }

    
      

})



.controller('newslistCtrl', function($scope, $stateParams,detailService, $sce) {
 
  $scope.detailService=detailService;  
  $scope.snippet = $sce.trustAsHtml($scope.detailService.itemName.details);
  console.log($scope.detailService.itemName.brief);
  /*
  $scope.deliberatelyTrustDangerousSnippet = function() {
               return $sce.trustAsHtml($scope.snippet);
             }; */
  // console.log($scope.snippet) ;
  // console.log($scope.detailService.itemName.details);

  // social share plugin
      var vm = this;
      vm.testBrief = $scope.detailService.itemName.brief;

			vm.share = {
				// 'networks':	['facebook', 'twitter', 'whatsapp', 'anywhere', 'sms', 'email'],
				'networks':	['anywhere'],
				'message':	vm.testBrief,
				'subject':	'請下載龍耳手譯寶',
				'file':		'',
				'link':		'http://eheading.com',
				'toArr':	['cs@eheading.com'],
				'bccArr':	[],
				'ccArr':	[], 
				'phone':	'98481662'
			}
      
});

