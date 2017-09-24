// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
'Use Strict';
angular.module('App', ['ionic', 'ngStorage','ngCordova','ngCordovaOauth' ,'starter.controllers','ngSanitize', 'srfSocialSharing','ui.router','btford.socket-io' ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {


/*    setTimeout(function() {
         if (device.platform == "Android") {
            $cordovaSplashscreen.hide();
        }
        if (device.platform == "iPhone" || device.platform == "iOS") {
            navigator.splashscreen.hide();
        }
    }, 500); */

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

/* temp disable of connecting socket io, phonertc with AWS server
.run(function ($state, signaling) {
    signaling.on('messageReceived', function (name, message) {
      switch (message.type) {
        case 'call':
          if ($state.current.name === 'app.call') { return; }
          
          $state.go('app.call', { isCalling: false, contactName: name });
          break;
      }
    });
  })
*/

.constant('Popup', {
    delay: 3000, //How long the popup message should show before disappearing (in milliseconds -> 3000 = 3 seconds).
    successIcon: "ion-happy-outline",
    errorIcon: "ion-sad-outline",
    productAddSuccess: "已成功提交查詢，謝謝",
    bookingAddSuccess: "已成功提交預約，謝謝",
    reportAddSuccess: "已成功提交報料，謝謝",
    updateProfileSuccess: "已成功更新資料，謝謝",
    accountCreateSuccess: "Congratulations! Your account has been created. Logging you in.",
    emailAlreadyExists: "Sorry, but an account with that email address already exists. Please register with a different email and try again.",
    accountAlreadyExists: "Sorry, but an account with the same credential already exists. Please check your account and try again.",
    emailNotFound: "Sorry, but we couldn\'t find an account with that email address. Please check your email and try again.",
    userNotFound: "Sorry, but we couldn\'t find a user with that account. Please check your account and try again.",
    invalidEmail: "Sorry, but you entered an invalid email. Please check your email and try again.",
    notAllowed: "Sorry, but registration is currently disabled. Please contact support and try again.",
    serviceDisabled: "Sorry, but logging in with this service is current disabled. Please contact support and try again.",
    wrongPassword: "Sorry, but the password you entered is incorrect. Please check your password and try again.",
    accountDisabled: "Sorry, but your account has been disabled. Please contact support and try again.",
    weakPassword: "Sorry, but you entered a weak password. Please enter a stronger password and try again.",
    errorRegister: "Sorry, but we encountered an error registering your account. Please try again later.",
    passwordReset: "A password reset link has been sent to: ",
    errorPasswordReset: "Sorry, but we encountered an error sending your password reset email. Please try again later.",
    errorLogout: "Sorry, but we encountered an error logging you out. Please try again later.",
    sessionExpired: "Sorry, but the login session has expired. Please try logging in again.",
    errorLogin: "Sorry, but we encountered an error logging you in. Please try again later.",
    welcomeBack: "Welcome back! It seems like you should still be logged in. Logging you in now.",
    manyRequests: "Sorry, but we\'re still proccessing your previous login. Please try again later.",
    fullVersionOnly: "Sorry, but this feature is not available on the Lite version. Upgrade to Full version in order to use Social Login."
  })


/* end of js of welcome page */

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.welcome', {
    url: '/welcome',
    views: {
      'menuContent': {
        templateUrl: 'templates/welcome.html',
        controller: 'WelcomeCtrl'
      }
    }
  })
  
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })

    .state('app.homepage', {
      url: '/homepage',
      views: {
        'menuContent': {
          templateUrl: 'templates/homepage.html',
          controller: 'HomepageCtrl'
        }
      }
    })

    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.news', {
      url: '/newslists',
      views: {
        'menuContent': {
          templateUrl: 'templates/newslists.html',
          controller: 'newslistsCtrl'
        }
      }
    })

  .state('app.single2', {
    url: '/newslists/:newslistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/newslist.html',
        controller: 'newslistCtrl as linkShareCtrl'
      }
    }
  })
  
  .state('app.report', {
      url: '/report',
      views: {
        'menuContent': {
          templateUrl: 'templates/report.html',
          controller: 'reportController'
        }
      }
    })

    .state('app.booking', {
      url: '/booking',
      views: {
        'menuContent': {
          templateUrl: 'templates/booking.html',
          controller: 'BookingCtrl'
        }
      }
    })

    .state('app.bookingintro', {
      url: '/bookingintro',
      views: {
        'menuContent': {
          templateUrl: 'templates/bookingintro.html',
          controller: 'BookingintroCtrl'
        }
      }
    })


    .state('app.history', {
      url: '/history',
      views: {
        'menuContent': {
          templateUrl: 'templates/history.html',
          controller: 'historyCtrl'
        }
      }
    })

    .state('app.videochat', {
      url: '/videochat',
      views: {
        'menuContent': {
          templateUrl: 'templates/videochat.html'
        }
      }
    })

    .state('app.videochattemp', {
      url: '/videochattemp',
      views: {
        'menuContent': {
          templateUrl: 'videochattemp.html',
          controller: 'qbFaceCtrl'
        }
      }
    })

    .state('app.survey', {
      url: '/survey',
      views: {
        'menuContent': {
          templateUrl: 'templates/survey.html'
        }
      }
    })

    .state('app.urgent', {
      url: '/urgent',
      views: {
        'menuContent': {
          templateUrl: 'templates/urgent.html',
          controller: 'UrgentCtrl'
        }
      }
    })

    .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html'
        }
      }
    })
 
 .state('app.contactus', {
      url: '/contactus',
      views: {
        'menuContent': {
          templateUrl: 'templates/contactus.html',
          controller: 'contactUsController'
        }
      }
    })

    .state('app.setting', {
      url: '/setting',
      views: {
        'menuContent': {
          templateUrl: 'templates/setting.html',
          controller: 'settingController'
        }
      }
    })

    .state('app.manual', {
      url: '/manual',
      views: {
        'menuContent': {
          templateUrl: 'templates/manual.html',
          controller: 'ManualCtrl'
        }
      }
    })



/*
  .state('loginold', {
    url: '/loginold',
    templateUrl: 'views/login/loginold.html',
    controller: 'loginoldController'
  })
  */

  /* login plugin */

 .state('app.home', {
    url: '/home',
    views: {
        'menuContent': {
    templateUrl: 'views/home/home.html',
    controller: 'homeController'
        }
    }
  })

  .state('app.login', {
        url: '/login',
        views: {
        'menuContent': {
        templateUrl: 'views/login/login.html',
        controller: 'loginController'
        }
        }
      })

  .state('app.register', {
    url: '/register',
    views: {
        'menuContent': {
    templateUrl: 'views/register/register.html',
    controller: 'registerController'
        }
    }
  })

  .state('app.forgotPassword', {
    url: '/forgotPassword',
    views: {
        'menuContent': {
    templateUrl: 'views/forgotPassword/forgotPassword.html',
    controller: 'forgotPasswordController'
        }
    }
  })

  .state('app.linkShare', {
				url: '/linkShare',
				views: {
					'menuContent': {
						templateUrl: 'templates/linkShare.html',
						//controller: 'LinkShareController as linkShareCtrl'
            controller: 'LinkShareController as linkShareCtrl'
					}
				}
				
			})

  .state('add', {
        url: '/add',
        templateUrl: 'views/add/add.html',
        controller: 'addController'
  })

// video chatting
/*
.state('app.loginchat', {
      url: '/loginchat',
      views: {
        'menuContent': {
          controller: 'LoginCtrl',
          templateUrl: 'templates/loginchat.html'
        }
      }
    })

 
 .state('app.contacts', {
      url: '/contacts',
      views: {
        'menuContent': {
          controller: 'ContactsCtrl',
        templateUrl: 'templates/contacts.html'
        }
      }
    })

    .state('app.call', {
      url: '/call/:contactName?isCalling',
      views: {
        'menuContent': {
          controller: 'CallCtrl',
          templateUrl: 'templates/call.html'
        }
      }
    })
*/
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/homepage');
});
