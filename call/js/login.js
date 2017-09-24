//login.js

angular.module('App')
  .service('LoginService', function(Utils, $state, $timeout, $localStorage) {
    //Set the following data depending on your social login app.
    var data = {
      facebookAppId: "1083634525068095",
      googleWebClientId: "321280612688-qjem4ksfp2m6v3efjnrvs6vliqbovrcb.apps.googleusercontent.com",
      twitterKey: "aJWByCgPhUgYZJMojyFeH2h8F",
      twitterSecret: "XxqKHi6Bq3MHWESBLm0an5ndLxPYQ2uzLtIDy6f9vgKKc9kemI",
      isGuest: false
    };
    //Set the following to your route names for loginPage and homePage.
    //This will call $state.go() function with the route name you provided.
    var routes = {
      loginRoute: 'app.login', //Page to route to for your login.
      homeRoute: 'app.setting' //Page to route to after successful login/authentication.
    };
    //Customize errorMessages.
    var errorMessage = {
      icon: "ion-alert-circled", //Visit http://ionicons.com for the complete list.
      accountExists: "Sorry, but an account with the same credential already exists. Please check your account and try again.",
      emailExists: "Sorry, but an account with that email already exists. Please check your email and try again.",
      weakPassword: "Sorry, but you provided a weak password. Please enter a stronger password and try again.",
      invalidEmail: "Sorry, but we are not able to find a user with that email. Please check your email and try again.",
      invalidCredential: "Sorry, but we are not able to log you in with that credential. Please check your account and try again.",
      notAllowed: "Sorry, but this operation is not allowed. Please contact support and try again.",
      userDisabled: "Sorry, but your account has been suspended. Please contact support and try again.",
      notFound: "Sorry, but we are not able to find a user with the following credential. Please check your account and try again.",
      wrongPassword: "Sorry, but the password you entered is incorrect. Please check your password and try again.",
      errorLogin: "Sorry, but we encountered an error logging you in. Please try again later.",
      errorLogout: "Sorry, but we encountered an error logging you out. Please try again later.",
      alreadyLinked: "Sorry, but this account was already linked. Please contact support and try again.",
      credentialUsed: "Sorry, but another user is already using this credential. Please login with a different credential."
    };
    //Customize successMessages.
    var successMessage = {
      icon: "ion-android-done", //Visit http://ionicons.com for the complete list.
      accountCreated: "Congratulations! Your account has been created. Logging in.",
      passwordReset: "Yay! A password reset link has been sent to: "
    };
    var showError = function(error) {
      switch (error) {
        case 'auth/account-exists-with-different-credential':
          Utils.message(errorMessage.icon, errorMessage.accountExists);
          break;
        case 'auth/invalid-email':
          Utils.message(errorMessage.icon, errorMessage.invalidEmail);
          break;
        case 'auth/invalid-credential':
          Utils.message(errorMessage.icon, errorMessage.invalidCredential);
          break;
        case 'auth/operation-not-allowed':
          Utils.message(errorMessage.icon, errorMessage.notAllowed);
          break;
        case 'auth/user-disabled':
          Utils.message(errorMessage.icon, errorMessage.userDisabled);
          break;
        case 'auth/user-not-found':
          Utils.message(errorMessage.icon, errorMessage.notFound);
          break;
        case 'auth/wrong-password':
          Utils.message(errorMessage.icon, errorMessage.wrongPassword);
          break;
        case 'auth/error-logout':
          Utils.message(errorMessage.icon, errorMessage.errorLogout);
          break;
        case 'auth/provider-already-linked':
          Utils.message(errorMessage.icon, errorMessage.alreadyLinked);
          break;
        case 'auth/credential-already-in-use':
          Utils.message(errorMessage.icon, errorMessage.credentialUsed);
          break;
        case 'auth/email-already-in-use':
          Utils.message(errorMessage.icon, errorMessage.emailExists);
          break;
        case 'auth/weak-password':
          Utils.message(errorMessage.icon, errorMessage.weakPassword);
          break;
        default:
          Utils.message(errorMessage.icon, errorMessage.errorLogin);
          break;
      }
    };
    this.relogin = function() {
      if ($localStorage.loginCredential) {
        Utils.show();
        var credential;
        switch ($localStorage.loginCredential.provider) {
          case 'password':
            console.log("Relogging in with Firebase");
            credential = firebase.auth.EmailAuthProvider.credential($localStorage.loginCredential.Db, $localStorage.loginCredential.Dc);
            break;
          case 'facebook.com':
            console.log("Relogging in with Facebook");
            credential = firebase.auth.FacebookAuthProvider.credential($localStorage.loginCredential.accessToken);
            break;
          case 'google.com':
            console.log("Relogging in with Google");
            credential = firebase.auth.GoogleAuthProvider.credential($localStorage.loginCredential.idToken, $localStorage.loginCredential.accessToken);
            break;
          case 'twitter.com':
            console.log("Relogging in with Twitter");
            credential = firebase.auth.TwitterAuthProvider.credential($localStorage.loginCredential.accessToken, $localStorage.loginCredential.secret);
            break;
          default:
            break;
        }
        firebase.auth().signInWithCredential(credential)
          .then(function(response) {
            Utils.hide();
            $state.go(routes.homeRoute);
          })
          .catch(function(error) {
            var error = error.code;
            showError(error);
          });
      }
    };
    this.isGuest = function() {
      return data.isGuest;
    };
    this.getFacebookAppId = function() {
      return data.facebookAppId;
    };
    this.getGoogleWebClientId = function() {
      return data.googleWebClientId;
    };
    this.getTwitterKey = function() {
      return data.twitterKey;
    };
    this.getTwitterSecret = function() {
      return data.twitterSecret;
    };
    this.createFirebaseUser = function(user) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(function() {
          var credential = firebase.auth.EmailAuthProvider.credential(user.email, user.password);
          $localStorage.loginCredential = credential;
          $timeout(function() {
            data.isGuest = false;
          });
          Utils.message(successMessage.icon, successMessage.accountCreated)
            .then(function() {
              $state.go(routes.homeRoute);
            })
            .catch(function() {
              $state.go(routes.homeRoute);
            });
        })
        .catch(function(error) {
          var error = error.code;
          showError(error);
        });
    };
    this.loginWithFirebase = function(user) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(function(response) {
          var credential = firebase.auth.EmailAuthProvider.credential(user.email, user.password);
          $localStorage.loginCredential = credential;
          $timeout(function() {
            data.isGuest = false;
          });
          Utils.hide();
          $state.go(routes.homeRoute);
        })
        .catch(function(error) {
          var error = error.code;
          showError(error);
        });
    };
    this.sendPasswordResetEmail = function(email) {
      firebase.auth().sendPasswordResetEmail(email)
        .then(function() {
          Utils.message(successMessage.icon, successMessage.passwordReset + email)
            .then(function() {
              $state.go(routes.loginRoute);
            })
            .catch(function() {
              $state.go(routes.loginRoute);
            });
        })
        .catch(function(error) {
          var error = error.code;
          showError(error);
        });
    };
    this.loginAsGuest = function() {
      firebase.auth().signInAnonymously()
        .then(function(response) {
          $timeout(function() {
            data.isGuest = true;
          });
          Utils.hide();
          $state.go(routes.homeRoute);
        })
        .catch(function(error) {
          var error = error.code;
          showError(error);
        });
    };
    this.logout = function() {
      if (firebase.auth()) {
        firebase.auth().signOut().then(function() {
          delete $localStorage.loginCredential;
          Utils.hide();
          $state.go(routes.loginRoute);
        }, function(error) {
          showError('auth/error-logout');
        });
      } else {
        Utils.hide();
        $state.go(routes.loginRoute);
      }
    };
    this.loginWithCredential = function(credential) {
      try {
        if (firebase.auth().currentUser.isAnonymous) {
          firebase.auth().currentUser.link(credential).then(function() {
            Utils.hide();
            $timeout(function() {
              data.isGuest = false;
            });
            $localStorage.loginCredential = credential;
          }, function(error) {
            var error = error.code;
            showError(error);
          });
        }
      } catch (error) {
        firebase.auth().signInWithCredential(credential)
          .then(function(response) {
            $localStorage.loginCredential = credential;
            Utils.hide();
            $timeout(function() {
              data.isGuest = false;
            });
            $state.go(routes.homeRoute);
          })
          .catch(function(error) {
            var error = error.code;
            showError(error);
          });
      }
    };
  })
  .directive('registerFirebase', function(LoginService, Utils) {
    return {
      restrict: 'A',
      scope: true,
      link: function($scope, $element, $attrs) {
        $element.bind('click', function() {
          console.log("Firebase Register");
          Utils.show();
          LoginService.createFirebaseUser($scope.user);
        });
      }
    }
  })
  .directive('firebaseLogin', function(LoginService, Utils) {
    return {
      restrict: 'A',
      scope: true,
      link: function($scope, $element, $attrs) {
        $element.bind('click', function() {
          console.log("Firebase Login");
          Utils.show();
          LoginService.loginWithFirebase($scope.user);
        });
      }
    }
  })
  .directive('resetPassword', function(LoginService, Utils) {
    return {
      restrict: 'A',
      scope: true,
      link: function($scope, $element, $attrs) {
        $element.bind('click', function() {
          console.log("Firebase Password Reset");
          Utils.show();
          LoginService.sendPasswordResetEmail($scope.user.email);
        });
      }
    }
  })
  .directive('guestLogin', function(LoginService, Utils) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        $element.bind('click', function() {
          console.log("Guest Login");
          Utils.show();
          LoginService.loginAsGuest();
        });
      }
    }
  })
  .directive('logout', function(LoginService, Utils) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        $element.bind('click', function() {
          console.log("Logout");
          Utils.show();
          LoginService.logout();
        });
      }
    }
  })
  .directive('facebookLogin', function(LoginService, Utils, $cordovaOauth) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        $element.bind('click', function() {
          console.log("Facebook Login");
          Utils.show();
          $cordovaOauth.facebook(LoginService.getFacebookAppId(), ["public_profile", "email"]).then(function(response) {
            var credential = firebase.auth.FacebookAuthProvider.credential(response.access_token);
            LoginService.loginWithCredential(credential);
          }, function(error) {
            Utils.hide();
          });
        });
      }
    }
  })
  .directive('googleLogin', function(LoginService, Utils, $cordovaOauth) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        $element.bind('click', function() {
          console.log("Google Login");
          Utils.show();
          $cordovaOauth.google(LoginService.getGoogleWebClientId(), ["https://www.googleapis.com/auth/userinfo.email"]).then(function(response) {
            var credential = firebase.auth.GoogleAuthProvider.credential(response.id_token,
              response.access_token);
            LoginService.loginWithCredential(credential);
          }, function(error) {
            Utils.hide();
          });
        });
      }
    }
  })
  .directive('twitterLogin', function(LoginService, Utils, $cordovaOauth) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        $element.bind('click', function() {
          console.log("Twitter Login");
          Utils.show();
          $cordovaOauth.twitter(LoginService.getTwitterKey(), LoginService.getTwitterSecret()).then(function(response) {
            var credential = firebase.auth.TwitterAuthProvider.credential(response.oauth_token,
              response.oauth_token_secret);
            LoginService.loginWithCredential(credential);
          }, function(error) {
            Utils.hide();
          });
        });
      }
    }
  });
