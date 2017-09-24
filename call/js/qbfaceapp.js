'Use Strict';
angular.module('App')

.controller('qbFaceCtrl',  function($scope, $timeout,$localStorage, $state,$ionicHistory){

    $scope.isChatting = false;
    $scope.qbUser = null;
    $scope.isShowingNav = true;
    if ($localStorage.userId) {
        console.log($localStorage.userId)
    }
    else{
        console.log('no user login')
    }

    angular.element(document).ready(function () {
      // qb service init
      QB.init(QBApp.appId, QBApp.authKey, QBApp.authSecret, CONFIG);

      // checking wether mobile version or browser version
      if(window.device.platform == 'iOS' || window.device.platform == 'Android') {

          loginQBChat();
      } else {
        loadData();
      }

    });

    // function signup qb if user would be new.
    function signupQBChat() {
      if($localStorage.userId == null) {
        alert('please login in side menu');
        return;
      }
//      QB.createSession(function(err,result){
        var params = { login: $localStorage.userId, password: "happyboy", tag_list: ["dev"], full_name: $localStorage.userId };
        
        console.log('userID is',$localStorage.userId);

        QB.users.create(params, function(err, user){
          if (user) {
            // success
            $scope.qbUser = user;
            loadData();
          } else  {
            alert('failed to register qbchat');
          }
        });
//      });
    }


    // log in qb as his userid
    function loginQBChat () {
      if($localStorage.userId == null) {
        alert('please login in side menu');
        return;
      }
      QB.createSession(function(err,result){
        var params = { login: $localStorage.userId, password: "happyboy" };

        QB.login(params, function(err, user){
          if (user) {
            // success
            $scope.qbUser = user;
            loadData();
          } else  {
            // error
            if(err.code == 401) {
              signupQBChat();
            } else {
              alert('failed to login qbchat');
            }
          }
        });
      });
    }

    // ui processing

    function loadData() {
      var ui = {
                  $usersTitle: $('.j-users__title'),
                  $usersList: $('.j-users__list'),

                  $panel: $('.j-pl'),
                  $callees: $('.j-callees'),

                  $btnCall: $('.j-call'),
                  $btnHangup: $('.j-hangup'),

                  $usersSection: $('.users_section'),
                  $headerBar: $('.header_section'),
                  $mainVideo: $('.j_main_video'),
                  $callerSection: $('.j_caller_div'),

                  $ctrlBtn: $('.j-caller__ctrl'),
                  $descriptionView: $('.j-description'),
                  $previewCamera: $('.j-preview-camera'),
                  $ctrNavBar: $('.nav-bar-container'),
                  $hasHeader: $('.has-header'),


                  $pane: $('.pane'),
                  $item: $('.item'),
                  $menu: $('.menu'),
                  $menuHeaderBar: $('.my-menu-header'),
                  $menuList: $('.my-ion-menu-list'),

                  filterClassName: '.j-filter',

                  modal: {
                      'income_call': '#income_call'
                  },

                  sounds: {
                      'call': 'callingSignal',
                      'end': 'endCallSignal',
                      'rington': 'ringtoneSignal'
                  },
                  setPositionFooter: function() {
                      var $footer = $('.j-footer'),
                          invisibleClassName = 'invisible',
                          footerFixedClassName = 'footer-fixed';

                      if( $(window).outerHeight() > $('.j-wrapper').outerHeight() ) {
                          $footer.addClass(footerFixedClassName);
                      } else {
                          $footer.removeClass(footerFixedClassName);
                      }

                      $footer.removeClass(invisibleClassName);
                  },
                  togglePreloadMain: function(action) {
                      var $main = $('.j-main'),
                          preloadClassName = 'main-preload';

                      if(action === 'show') {
                          $main.addClass( preloadClassName );
                      } else {
                          $main.removeClass( preloadClassName );
                      }
                  },
                  createUsers: function(users, $node) {
                      var tpl = _.template( $('#user_tpl').html() ),
                          usersHTML = '';

                      $node.empty();

                      _.each(users, function(user, i, list) {
                          usersHTML += tpl(user);
                      });

                      $node.append(usersHTML);
                  },
                  showCallBtn: function() {
                      this.$btnHangup.addClass('hidden');
                  },
                  hideCallBtn: function() {
                      this.$btnHangup.removeClass('hidden');
                  },

                  // start rijy
                  hideUserSection: function() {
                    ui.hideNavBar();
                    this.$usersSection.addClass('hidden');
                    this.$headerBar.addClass('hidden');
                    this.$mainVideo.removeClass('hidden');
                    this.$callerSection.removeClass('hidden');

                  },
                  showUserSection: function() {
                    ui.showNavBar();
                    this.$usersSection.removeClass('hidden');
                    this.$headerBar.removeClass('hidden');
                    this.$mainVideo.addClass('hidden');
                    this.$callerSection.addClass('hidden');
                  },

                  hideNavBar: function() {
                    this.$ctrNavBar.addClass('hidden');
                    if(this.$hasHeader.hasClass('content_top_show')) {
                      this.$hasHeader.removeClass('content_top_show');
                    }
                    this.$hasHeader.addClass('content_top_hidden');

                    // side menu setting
                    if(window.device.platform == 'iOS') {
                      this.$pane.addClass('my-transparent-background');
                      this.$item.addClass('my-transparent-background');
                      this.$menu.addClass('my-transparent-background');
                      this.$menuHeaderBar.addClass('hidden');
                      this.$menuList.addClass('hidden');
                    }
                    
                  },
                  showNavBar: function() {
                    this.$ctrNavBar.removeClass('hidden');
                    if(this.$hasHeader.hasClass('content_top_hidden')) {
                      this.$hasHeader.removeClass('content_top_hidden');
                    }
                    this.$hasHeader.addClass('content_top_show');

                    //side menu setting
                    if(window.device.platform == 'iOS') {
                      this.$pane.removeClass('my-transparent-background');
                      this.$item.removeClass('my-transparent-background');
                      this.$menu.removeClass('my-transparent-background');
                      this.$menuHeaderBar.removeClass('hidden');
                      this.$menuList.removeClass('hidden');
                    }
                  },

                  // end rijy

                  toggleRemoteVideoView: function(userID, action) {
                      var $video = $('#remote_video_' + userID);

                      if(!_.isEmpty(app.currentSession) && $video.length){
                          if(action === 'show') {
                              $video.parents('.j-callee').removeClass('callees__callee-wait');
                          } else if(action === 'hide') {
                              $video.parents('.j-callee').addClass('callees__callee-wait');
                          } else if(action === 'clear') {
                              /** detachMediaStream take videoElementId */
                              app.currentSession.detachMediaStream('remote_video_' + userID);
                              $video.removeClass('fw-video-wait');
                          }
                      }
                  },
                  classesNameFilter: 'no aden reyes perpetua inkwell toaster walden hudson gingham mayfair lofi xpro2 _1977 brooklyn',
                  changeFilter: function(selector, filterName) {
                      $(selector)
                          .removeClass(this.classesNameFilter)
                          .addClass( filterName );
                  },
                  callTime: 0,
                  updTimer: function() {
                      this.callTime += 1000;

                      $('#timer').removeClass('hidden')
                          .text( new Date(this.callTime).toUTCString().split(/ /)[4] );
                  }
                },
                app = {
                    caller: {},
                    callees: {},
                    currentSession: {},
                    mainVideo: 0
                },
                isDeviceAccess = true,
                takedCallCallee = [],
                remoteStreamCounter = 0,
                authorizationing = false,
                callTimer,
                network = {
                  users: {}
                },
                is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

                window.app = app;

            function initializeUI(arg) {

                // get hieght of screen( fix size issue on all platform )
                document.getElementById('main_video').style.height=  (screen.height + 100)+ 'px';

                document.getElementById('description_view').style.width=  screen.width + 'px';
                document.getElementById('description_view').style.height=  (screen.height - 44)+ 'px';

                document.getElementById('camera_show').style.width=  screen.width + 'px';

                document.getElementById('camera_show').style.height=  (screen.height + 100) + 'px';  
                document.getElementById('camera_preview').style.height=  screen.height + 'px';  


                document.getElementById('calling_ctrl_index').style.height=  screen.height + 'px';

                // document.getElementById('rect_img').style.height=  screen.height * 0.8 + 'px';

                console.log('testing---------------->' + screen.height + 'px');

                if(window.device.platform == 'Android' || window.device.platform == 'iOS') {
                  ui.$descriptionView.removeClass('hidden');
                }
                
                getAllUsers(arg);
                // initTutor(arg);
            }

            // get all users from qb service
            function getAllUsers (arg) {
              QB.createSession(function(err,result){
               
               QBUsers = new Array();
               for(var loop_i = 1; loop_i < 3 ; loop_i++){ //total page to show users
               
                  //var params = {filter: { field: 'id', param: 'in', value: [21727708,31748873,33376475] }};
                  var params = {page: loop_i, per_page: "100", tags: ["dev"], order:{ sort: 'desc', field: 'full_name' }};
                  
                  ui.togglePreloadMain('show');
                  QB.users.listUsers(params, function(err, users){
                    ui.togglePreloadMain('hide');
                    if (users) {
                      // success
                      userItem = users.items[0].user;
                      for(var $i = 0; $i < users.items.length; $i ++) {
    
                        qbUserItem = users.items[$i].user;
                        if(qbUserItem.email == "nikolaitomov514@outlook.com")
                          continue;
                        item = new Array();
                        item.id = qbUserItem.id;
                        item.login = qbUserItem.login;
                        item.password = "happyboy";
                        item.full_name = qbUserItem.full_name;
                        item.colour = '0890ff';
    
                        QBUsers.push(item);
                      }
                      
                      if(window.device.platform == 'iOS' || window.device.platform == 'Android') {
                          initStudent();
                      } else {
                          initTutor(arg);
                      }
                    } else {
                      // error
                      alert('error to get all users');
                    }
                  });
              
              }
              
              });
            }
            
            // processing ,if tutore
            function initTutor(arg) {
                var params = arg || {};

                ui.createUsers(QBUsers, ui.$usersList);
                ui.$usersTitle.text(MESSAGES.title_login);

                if(!params.withoutUpdMsg || params.msg) {
                    qbApp.MsgBoard.update(params.msg);
                }
            }
            
            // processing ,if student
            function initStudent() {
                var $el = $(this),
                usersWithoutCaller = [],
                user = {},
                classNameCheckedUser = 'users__user-active';


                ui.$usersSection.addClass('hidden');
                /** if app.caller is not exist create caller, if no - add callees */
                if(!window.navigator.onLine) {
                    qbApp.MsgBoard.update('no_internet');
                } else {
                    app.caller = {};
                    if(_.isEmpty(app.caller)) {

                        console.log("user login action ------>");
                        authorizationing = true;
                        ui.togglePreloadMain('show');
                        /**
                         * id: + for convert to number type
                         */
                        app.caller = {
                            id: +$.trim( $scope.qbUser.id ),
                            login: $.trim( $scope.qbUser.login ),
                            password: $.trim( "happyboy" ),
                            full_name: $.trim( $scope.qbUser.full_name )
                        };

                        usersWithoutCaller = _.filter(QBUsers, function(i) { return i.id !== app.caller.id; });

                        ui.$usersList.empty();

                        qbApp.MsgBoard.update('connect');

                        QB.chat.connect({
                            jid: QB.chat.helpers.getUserJid( app.caller.id, QBApp.appId ),
                            password: app.caller.password
                        }, function(err, res) {
                            if(err !== null) {
                                app.caller = {};

                                //ui.setPositionFooter();
                                ui.togglePreloadMain('hide');
                                QB.chat.disconnect();
                            } else {
                                ui.createUsers(usersWithoutCaller, ui.$usersList);

                                ui.$usersTitle.text(MESSAGES.title_callee);
                                qbApp.MsgBoard.update('login_tpl', {name: app.caller.full_name});

                                ui.$panel.removeClass('hidden');
                                //ui.setPositionFooter();
                                ui.togglePreloadMain('hide');

                                // show description
                                // ui.$descriptionView.addClass('hidden');
                            }

                            authorizationing = false;
                        });
                    }
                }
            }

            function showErrorAccessPermission(error) {
              var errorTitle = 'Error: ',
                errorMsg = 'Failed to get access to your camera or microphone. Please check your hardware configuration.';

              if(error && error.message) {
                alert(errorTitle + error.message);
              } else {
                alert(errorTitle + errorMsg);
              }
            }

            function isBytesReceivedChanges(userId, inboundrtp) {
              var res = true,
                inbBytesRec = inboundrtp.bytesReceived;

              if(network[userId] === undefined) {
                network[userId] = {
                  'bytesReceived': inbBytesRec
                };
              } else {
                if(network[userId].bytesReceived === inbBytesRec) {
                  res = false;
                } else {
                  network[userId] = {
                    'bytesReceived': inbBytesRec
                  };
                }
              }

              return res;
            }

            function notifyIfUserLeaveCall(session, userId, reason, title) {
              /** It's for p2p call */
              var userInfo = _.findWhere(QBUsers, {id: +userId}),
                  currentUserInfo = _.findWhere(QBUsers, {id: session.currentUserID});

              /** It's for p2p call */
              if(session.opponentsIDs.length === 1) {
                  qbApp.MsgBoard.update(
                    'p2p_call_stop',
                    {
                      name: userInfo.full_name,
                      currentName: currentUserInfo.full_name,
                      reason: reason
                    }
                  );
              }

              /** It's for groups call */
              $('.j-callee_status_' + userId).text(title);
            }

            function previewCamera() {
              // rijy start
              var videoElems = '',
                mediaParams = {
                    audio: true,
                    video: true,
                    options: {
                        muted: true,
                        mirror: true
                    },
                    elemId: 'camera_show'
                };

              ui.hideNavBar();
              if(!window.navigator.onLine) {
                qbApp.MsgBoard.update('no_internet');
              } else {
                  // qbApp.MsgBoard.update('create_session');
                  app.callees = [];

                  app.currentSession = QB.webrtc.createNewSession(Object.keys(app.callees), QB.webrtc.CallType.VIDEO);

                  app.currentSession.getUserMedia(mediaParams, function(err, stream) {
                    if (err || !stream.getAudioTracks().length || !stream.getVideoTracks().length) {
                      // var errorMsg = '';

                      // if(err && err.message) {
                      //   errorMsg += 'Error: ' + err.message;
                      // } else {
                      //   errorMsg += 'device_not_found';
                      // }
                      // app.currentSession.stop({});

                      // showErrorAccessPermission(err);
                      // qbApp.MsgBoard.update(errorMsg, {name: app.caller.full_name}, true);
                    } else {
                    }
                  });
              }
              // rijy end
            }

            /**
             * INITIALIZE
             */
            //ui.setPositionFooter();
            // QB.init(QBApp.appId, QBApp.authKey, QBApp.authSecret, CONFIG);

            /** Before use WebRTC checking WebRTC is avaible */
            if (!QB.webrtc) {
              qbApp.MsgBoard.update('webrtc_not_avaible');
              alert('Error: ' + window.MESSAGES.webrtc_not_avaible);
              return;
            }

            initializeUI({withoutUpdMsg: false, msg: 'login'});

            /**
             * EVENTS
             */
            /** Choose caller or callees */
            $(document).off('click', '.j-user');
            $(document).on('click', '.j-user', function(e) {
                var $el = $(this),
                    usersWithoutCaller = [],
                    user = {},
                    classNameCheckedUser = 'users__user-active';

                /** if app.caller is not exist create caller, if no - add callees */
                if(!window.navigator.onLine) {
                    qbApp.MsgBoard.update('no_internet');
                } else {
                    if(_.isEmpty(app.caller)) {
                        authorizationing = true;
                        ui.togglePreloadMain('show');
                        /**
                         * id: + for convert to number type
                         */
                        app.caller = {
                            id: +$.trim( $el.data('id') ),
                            login: $.trim( $el.data('login') ),
                            password: $.trim( $el.data('password') ),
                            full_name: $.trim( $el.data('name') )
                        };

                        console.log('browser login id ==========>' + app.caller.id);
                        console.log('browser login login==========>' + app.caller.login);
                        console.log('browser login password ==========>' + app.caller.password);
                        console.log('browser login name==========>' + app.caller.full_name);

                        usersWithoutCaller = _.filter(QBUsers, function(i) { return i.id !== app.caller.id; });

                        ui.$usersList.empty();

                        qbApp.MsgBoard.update('connect');

                        QB.chat.connect({
                            jid: QB.chat.helpers.getUserJid( app.caller.id, QBApp.appId ),
                            password: app.caller.password
                        }, function(err, res) {

                            if(err !== null) {
                                app.caller = {};

                                //ui.setPositionFooter();
                                ui.togglePreloadMain('hide');
                                QB.chat.disconnect();
                            } else {
                                ui.createUsers(usersWithoutCaller, ui.$usersList);

                                ui.$usersTitle.text(MESSAGES.title_callee);
                                qbApp.MsgBoard.update('login_tpl', {name: app.caller.full_name});

                                ui.$panel.removeClass('hidden');
                                //ui.setPositionFooter();
                                ui.togglePreloadMain('hide');
                            }

                            authorizationing = false;
                        });
                    } else {
                        user.id = +$.trim( $el.data('id') );
                        user.name = $.trim( $el.data('name') );
                        app.callees = [];

                        // if ($el.hasClass(classNameCheckedUser)) {
                            // delete app.callees[user.id];
                            // $el.removeClass(classNameCheckedUser);
                        // } else {
                            app.callees[user.id] = user.name;
                            // $el.addClass(classNameCheckedUser);
                        // }

                        // rijy start
                        var videoElems = '',
                          mediaParams = {
                              audio: true,
                              video: true,
                              options: {
                                  muted: true,
                                  mirror: true
                              },
                              elemId: 'localVideo'
                          };

                        if(!window.navigator.onLine) {
                          qbApp.MsgBoard.update('no_internet');
                        } else {
                          if ( _.isEmpty(app.callees) ) {
                            $('#error_no_calles').modal();
                          } else {
                            qbApp.MsgBoard.update('create_session');

                            app.currentSession = QB.webrtc.createNewSession(Object.keys(app.callees), QB.webrtc.CallType.VIDEO);

                            app.currentSession.getUserMedia(mediaParams, function(err, stream) {
                              if (err || !stream.getAudioTracks().length || !stream.getVideoTracks().length) {
                                var errorMsg = '';

                                if(err && err.message) {
                                  errorMsg += 'Error: ' + err.message;
                                } else {
                                  errorMsg += 'device_not_found';
                                }
                                app.currentSession.stop({});

                                showErrorAccessPermission(err);
                                qbApp.MsgBoard.update(errorMsg, {name: app.caller.full_name}, true);
                              } else {
                                app.currentSession.call({}, function(error) {
                                  if(error) {
                                      console.warn(error.detail);
                                  } else {
                                    var compiled = _.template( $('#callee_video').html() );

                                    qbApp.MsgBoard.update('calling');
                                    document.getElementById(ui.sounds.call).play();

                                    /** create video elements for callees */
                                    Object.keys(app.callees).forEach(function(userID, i, arr) {
                                        videoElems += compiled({userID: userID, name: app.callees[userID] });
                                    });

                                    ui.$callees.append(videoElems);

                                    ui.hideCallBtn();
                                    //ui.setPositionFooter();

                                    // rijy start
                                    ui.hideUserSection();
                                    // rijy end
                                  }
                                });

                                if (window.device.platform === 'iOS') {
                                    cordova.plugins.iosrtc.selectAudioOutput('speaker');
                                }
                              }
                            });
                          
                          }
                        }
                        // rijy end

                    }

                }

                return false;
            });

            /** Logout */
            $(document).off('click', '.j-logout');
            $(document).on('click', '.j-logout', function() {
                QB.chat.disconnect();
                /** see others in onDisconnectedListener */
            });

            /** Call */
            $(document).off('click', '.j-call');
            $(document).on('click', '.j-call', function(e) {
              var videoElems = '',
                  mediaParams = {
                      audio: true,
                      video: true,
                      options: {
                          muted: true,
                          mirror: true
                      },
                      elemId: 'localVideo'
                  };

              if(!window.navigator.onLine) {
                qbApp.MsgBoard.update('no_internet');
              } else {
                if ( _.isEmpty(app.callees) ) {
                  $('#error_no_calles').modal();
                } else {
                  qbApp.MsgBoard.update('create_session');

                  app.currentSession = QB.webrtc.createNewSession(Object.keys(app.callees), QB.webrtc.CallType.VIDEO);

                  app.currentSession.getUserMedia(mediaParams, function(err, stream) {
                    if (err || !stream.getAudioTracks().length || !stream.getVideoTracks().length) {
                      var errorMsg = '';

                      if(err && err.message) {
                        errorMsg += 'Error: ' + err.message;
                      } else {
                        errorMsg += 'device_not_found';
                      }
                      app.currentSession.stop({});

                      showErrorAccessPermission(err);
                      qbApp.MsgBoard.update(errorMsg, {name: app.caller.full_name}, true);
                    } else {
                      app.currentSession.call({}, function(error) {
                        if(error) {
                            console.warn(error.detail);
                        } else {
                          var compiled = _.template( $('#callee_video').html() );

                          qbApp.MsgBoard.update('calling');
                          document.getElementById(ui.sounds.call).play();

                          /** create video elements for callees */
                          Object.keys(app.callees).forEach(function(userID, i, arr) {
                              videoElems += compiled({userID: userID, name: app.callees[userID] });
                          });

                          ui.$callees.append(videoElems);

                          ui.hideCallBtn();
                          //ui.setPositionFooter();

                          // rijy start
                          ui.hideUserSection();
                          // rijy end
                        }
                      });
                    }
                  });
                }
              }
            });

            /* preview camera */
            $(document).off('click', '.j-next-btn');
            $(document).on('click', '.j-next-btn', function() {
                previewCamera();
                ui.$descriptionView.addClass('hidden');
                ui.$previewCamera.removeClass('hidden');
            });

            /* start video chat button action */
            $(document).off('click', '.bnt_start_chat');
            $(document).on('click', '.bnt_start_chat', function() {

                if (!_.isEmpty(app.currentSession)) {
                      // app.currentSession.reject({});
                    app.currentSession.stop({});
                    app.currentSession = {};
                }

                ui.$previewCamera.addClass('hidden');
                ui.showNavBar();
            });

            /** Hangup */
            $(document).off('click', '.j-hangup');
            $(document).on('click', '.j-hangup', function() {
                if(!_.isEmpty(app.currentSession)) {
                    //rijy start
                    ui.showUserSection();
                    // rijy end
                    
                    app.currentSession.stop({});
                    app.currentSession = {};

                    qbApp.MsgBoard.update('login_tpl', {name: app.caller.full_name});

                   
                    if(window.device.platform == 'iOS' || window.device.platform == 'Android'){
                      $ionicHistory.nextViewOptions({
                        disableBack: true
                      });
                       



                      /*$state.go('app.homepage');*/
                    } 

                }
            });

            /** Accept */
            $(document).off('click', '.j-accept');
            $(document).on('click', '.j-accept', function() {
                var mediaParams = {
                        audio: true,
                        video: true,
                        elemId: 'localVideo',
                        options: {
                            muted: true,
                            mirror: true
                        }
                    },
                    videoElems = '';

                $(ui.modal.income_call).modal('hide');

                document.getElementById(ui.sounds.rington).pause();

                app.currentSession.getUserMedia(mediaParams, function(err, stream) {
                    if (err || !stream.getAudioTracks().length || !stream.getVideoTracks().length) {
                      var errorMsg = '';

                      if(err && err.message) {
                        errorMsg += 'Error: ' + err.message;
                      } else {
                        errorMsg += 'device_not_found';
                      }

                      showErrorAccessPermission(err);

                      qbApp.MsgBoard.update(errorMsg, {name: app.caller.full_name}, true);
                      isDeviceAccess = false;
                      app.currentSession.stop({});
                    } else {
                        var opponents = [app.currentSession.initiatorID],
                            compiled = _.template( $('#callee_video').html() );

                        ui.hideCallBtn();

                        /** get all opponents */
                        app.currentSession.opponentsIDs.forEach( function(userID, i, arr) {
                            if(userID != app.currentSession.currentUserID){
                                opponents.push(userID);
                            }
                        });

                        /** create callees (video elemets) */
                        opponents.forEach(function(userID, i, arr) {
                            var peerState = app.currentSession.connectionStateForUser(userID),
                                userInfo = _.findWhere(QBUsers, {id: userID});

                            if( (document.getElementById('remote_video_' + userID) === null) ) {
                                videoElems += compiled({userID: userID, name: userInfo.full_name});

                                if(peerState === QB.webrtc.PeerConnectionState.CLOSED){
                                  ui.toggleRemoteVideoView(userID, 'clear');
                                }
                            }
                        });

                        ui.$callees.append(videoElems);
                        qbApp.MsgBoard.update('during_call', {name: app.caller.full_name});
                        //ui.setPositionFooter();

                        app.currentSession.accept({});

                        // rijy start
                        ui.hideUserSection();
                        // rijy end
                    }
                });
            });

            /** Reject */
            $(document).off('click', '.j-decline');
            $(document).on('click', '.j-decline', function() {
                if (!_.isEmpty(app.currentSession)) {
                    app.currentSession.reject({});

                    $(ui.modal.income_call).modal('hide');
                    document.getElementById(ui.sounds.rington).pause();
                }
            });

            /** Mute / Unmute cam / mic */
            $(document).off('click', '.j-caller__ctrl');
            $(document).on('click', '.j-caller__ctrl', function() {
                var $btn = $(this),
                    isActive = $btn.hasClass('active');

                if( _.isEmpty( app.currentSession)) {
                    return false;
                } else {
                    if(isActive) {
                        $btn.removeClass('active');
                        app.currentSession.unmute( $btn.data('target') );
                    } else {
                        $btn.addClass('active');
                        app.currentSession.mute( $btn.data('target') );
                    }
                }
            });

            /** set main video */
            $(document).off('click', '.j-callees__callee_video');
            $(document).on('click', '.j-callees__callee_video', function() {
                var $that = $(this),
                    userID = +($(this).data('user')),
                    classesName = [],
                    activeClass = [];

                if( app.currentSession.peerConnections[userID].stream && !_.isEmpty( $that.attr('src')) ) {
                    if( $that.hasClass('active') ) {
                        $that.removeClass('active');

                        app.currentSession.detachMediaStream('main_video');
                        ui.changeFilter('#main_video', 'no');
                        app.mainVideo = 0;
                    } else {
                        $('.j-callees__callee_video').removeClass('active');
                        $that.addClass('active');

                        ui.changeFilter('#main_video', 'no');

                        activeClass = _.intersection($that.attr('class').split(/\s+/), ui.classesNameFilter.split(/\s+/) );

                        /** set filter to main video if exist */
                        if(activeClass.length) {
                            ui.changeFilter('#main_video', activeClass[0]);
                        }
                        app.currentSession.attachMediaStream('main_video', app.currentSession.peerConnections[userID].stream);
                        app.mainVideo = userID;
                    }
                }
            });

            /** Change filter for filter */
            $(document).off('change', ui.filterClassName);
            $(document).on('change', ui.filterClassName, function() {
                var val = $.trim( $(this).val() );

                ui.changeFilter('#localVideo', val);

                if(!_.isEmpty( app.currentSession)) {
                    app.currentSession.update({filter: val});
                }
            });

            $(window).on('resize', function() {
                //ui.setPositionFooter();
            });

            /**
             * QB Event listener.
             *
             * [Recommendation]
             * We recomend use Function Declaration
             * that SDK could identify what function(listener) has error
             *
             * Chat:
             * - onDisconnectedListener
             * WebRTC:
             * - onCallStatsReport
             * - onSessionCloseListener
             * - onUserNotAnswerListener
             * - onUpdateCallListener
             * - onCallListener
             * - onAcceptCallListener
             * - onRejectCallListener
             * - onStopCallListener
             * - onRemoteStreamListener
             * - onSessionConnectionStateChangedListener
             */
            QB.chat.onDisconnectedListener = function() {
              console.log('onDisconnectedListener.');
              var initUIParams = authorizationing ? {withoutUpdMsg: false, msg: 'no_internet'} : {withoutUpdMsg: false, msg: 'login'};

              app.caller = {};
              app.callees = [];
              app.mainVideo = 0;
              remoteStreamCounter = 0;

              ui.togglePreloadMain('hide');
              initializeUI(initUIParams);
              ui.$panel.addClass('hidden');

              /** delete callee video elements */
              $('.j-callee').remove();

              //ui.setPositionFooter();
              authorizationing = false;

              // rijy start
              ui.showUserSection();
              // rijy end
            };

            QB.webrtc.onCallStatsReport = function onCallStatsReport(session, userId, stats) {
              console.group('onCallStatsReport');
                console.log('userId: ' + userId);
                // console.log('Stats: ', stats);
              console.groupEnd();

              /**
               * Hack for Firefox
               * (https://bugzilla.mozilla.org/show_bug.cgi?id=852665)
               */
              if(is_firefox) {
                var inboundrtp = _.findWhere(stats, {type: 'inboundrtp'});

                if(!inboundrtp || !isBytesReceivedChanges(userId, inboundrtp)) {

                  console.warn("This is Firefox and user " + userId + " has lost his connection.");

                  if(!_.isEmpty(app.currentSession)) {
                    app.currentSession.closeConnection(userId);

                    notifyIfUserLeaveCall(session, userId, 'disconnected', 'Disconnected');
                  }
                }
              }
            };

            QB.webrtc.onSessionCloseListener = function onSessionCloseListener(session){
              console.log('onSessionCloseListener: ' + session);

              /** pause play call sound */
              document.getElementById(ui.sounds.call).pause();
              document.getElementById(ui.sounds.end).play();

              ui.showCallBtn();

               if(!isDeviceAccess) {
                  isDeviceAccess = true;
              } else {
                  if(session.opponentsIDs.length > 1) {
                      qbApp.MsgBoard.update('call_stop', {name: app.caller.full_name});
                  }
              }


                /** delete blob from myself video */
                document.getElementById('localVideo').src = '';

                /** disable controls (mute cam/min) */
                ui.$ctrlBtn.removeClass('active');

                /** delete callee video elements */
                $('.j-callee').remove();
                /** clear main video */
                app.currentSession.detachMediaStream('main_video');
                app.mainVideo = 0;
                remoteStreamCounter = 0;

                // rijy start
                ui.showUserSection();
                // rijy end
            };

            QB.webrtc.onUserNotAnswerListener = function onUserNotAnswerListener(session, userId) {
              console.group('onUserNotAnswerListener.');
                  console.log('UserId: ' + userId);
                  console.log('Session: ' + session);
              console.groupEnd();

              var userInfo = _.findWhere(QBUsers, {id: +userId}),
                  currentUserInfo = _.findWhere(QBUsers, {id: app.currentSession.currentUserID});

                /** It's for p2p call */
              if(session.opponentsIDs.length === 1) {
                  qbApp.MsgBoard.update(
                    'p2p_call_stop',
                    {
                      name: userInfo.full_name,
                      currentName: currentUserInfo.full_name,
                      reason: 'not answered'
                    }
                  );
              }

              $('.j-callee_status_' + userId).text('No Answer');
            };

            QB.webrtc.onUpdateCallListener = function onUpdateCallListener(session, userId, extension) {
              console.group('onUpdateCallListener.');
                  console.log('UserId: ' + userId);
                  console.log('Session: ' + session);
                  console.log('Extension: ' + JSON.stringify(extension));
              console.groupEnd();

              ui.changeFilter('#remote_video_' + userId, extension.filter);
              if (+(app.mainVideo) === userId) {
                  ui.changeFilter('#main_video', extension.filter);
              }
            };

            QB.webrtc.onCallListener = function onCallListener(session, extension) {
              console.group('onCallListener.');
                  console.log('Session: ' + session);
                  console.log('Extension: ' + JSON.stringify(extension));
              console.groupEnd();

              /** close previous modal if his is exist */
              $(ui.modal.income_call).modal('hide');

              var userInfo = _.findWhere(QBUsers, {id: session.initiatorID});

              app.currentSession = session;

              /** set name of caller */
              $('.j-ic_initiator').text( userInfo.full_name );

              $(ui.modal.income_call).modal('show');

              document.getElementById(ui.sounds.rington).play();
            };

            QB.webrtc.onAcceptCallListener = function onAcceptCallListener(session, userId, extension) {
              console.group('onAcceptCallListener.');
                  console.log('UserId: ' + userId);
                  console.log('Session: ' + session);
                  console.log('Extension: ' + JSON.stringify(extension));
              console.groupEnd();

              var userInfo = _.findWhere(QBUsers, {id: userId}),
                  filterName = $.trim( $(ui.filterClassName).val() );

              document.getElementById(ui.sounds.call).pause();

              app.currentSession.update({filter: filterName});

              /** update list of callee who take call */
              takedCallCallee.push(userInfo);

              if(app.currentSession.currentUserID === app.currentSession.initiatorID) {
                  qbApp.MsgBoard.update('accept_call', {users: takedCallCallee});
              }
            };

            QB.webrtc.onRejectCallListener = function onRejectCallListener(session, userId, extension) {
              console.group('onRejectCallListener.');
                  console.log('UserId: ' + userId);
                  console.log('Session: ' + session);
                  console.log('Extension: ' + JSON.stringify(extension));
              console.groupEnd();

              var userInfo = _.findWhere(QBUsers, {id: userId}),
                  currentUserInfo = _.findWhere(QBUsers, {id: app.currentSession.currentUserID});

              /** It's for p2p call */
              if(session.opponentsIDs.length === 1) {
                  qbApp.MsgBoard.update(
                    'p2p_call_stop',
                    {
                      name: userInfo.full_name,
                      currentName: currentUserInfo.full_name,
                      reason: 'rejected the call'
                    }
                  );
              }

              /** It's for groups call */
              $('.j-callee_status_' + userId).text('Rejected');
            };

            QB.webrtc.onStopCallListener = function onStopCallListener(session, userId, extension) {
              console.group('onStopCallListener.');
                  console.log('UserId: ' + userId);
                  console.log('Session: ' + session);
                  console.log('Extension: ' + JSON.stringify(extension));
              console.groupEnd();

              notifyIfUserLeaveCall(session, userId, 'hung up the call', 'Hung Up');
            };

            QB.webrtc.onRemoteStreamListener = function onRemoteStreamListener(session, userID, stream) {
              console.group('onRemoteStreamListener.');
                  console.log('userID: ' + userID);
                  console.log('Session: ' + session);
              console.groupEnd();
              app.currentSession.peerConnections[userID].stream = stream;

              app.currentSession.attachMediaStream('remote_video_' + userID, stream);

              if( remoteStreamCounter === 0) {
                  $('#remote_video_' + userID).click();

                  app.mainVideo = userID;
                  ++remoteStreamCounter;
              }

              if(!callTimer) {
                  callTimer = setInterval( function(){ ui.updTimer.call(ui); }, 1000);
              }
            };

            QB.webrtc.onSessionConnectionStateChangedListener = function onSessionConnectionStateChangedListener(session, userID, connectionState) {
              if (window.device.platform === 'iOS') {
                cordova.plugins.iosrtc.selectAudioOutput('speaker');
              }
              console.group('onSessionConnectionStateChangedListener.');
                  console.log('UserID: ' + userID);
                  console.log('Session: ' + session);
                  console.log('Сonnection state: ' + connectionState);
              console.groupEnd();

              var connectionStateName = _.invert(QB.webrtc.SessionConnectionState)[connectionState],
                  $calleeStatus = $('.j-callee_status_' + userID),
                  isCallEnded = false;

              if(connectionState === QB.webrtc.SessionConnectionState.CONNECTING) {
                  $calleeStatus.text(connectionStateName);
              }

              if(connectionState === QB.webrtc.SessionConnectionState.CONNECTED) {
                  ui.toggleRemoteVideoView(userID, 'show');
                  $calleeStatus.text(connectionStateName);

                  // rijy start
                  ui.hideUserSection();
                  // rijy end
                  $scope.isChatting = true;
              }

              if(connectionState === QB.webrtc.SessionConnectionState.COMPLETED) {
                  ui.toggleRemoteVideoView(userID, 'show');
                  $calleeStatus.text('connected');
              }

              if(connectionState === QB.webrtc.SessionConnectionState.DISCONNECTED){
                  ui.toggleRemoteVideoView(userID, 'hide');
                  $calleeStatus.text('disconnected');
              }

              if(connectionState === QB.webrtc.SessionConnectionState.CLOSED){

                  if($scope.isChatting == true){
                    $ionicHistory.nextViewOptions({
                      disableBack: true
                    });
                    ui.showUserSection();
                    /*$state.go('app.homepage');*/
                 } 

                  $scope.isChatting = false;

                  ui.toggleRemoteVideoView(userID, 'clear');
                  document.getElementById(ui.sounds.rington).pause();

                  if(app.mainVideo === userID) {
                      $('#remote_video_' + userID).removeClass('active');

                      ui.changeFilter('#main_video', 'no');
                      app.currentSession.detachMediaStream('main_video');
                      app.mainVideo = 0;
                  }

                  if( !_.isEmpty(app.currentSession) ) {
                      if ( Object.keys(app.currentSession.peerConnections).length === 1 || userID === app.currentSession.initiatorID) {
                          $(ui.modal.income_call).modal('hide');
                      }
                  }

                  isCallEnded = _.every(app.currentSession.peerConnections, function(i) {
                      return i.iceConnectionState === 'closed';
                  });

                  /** remove filters */
                  if( isCallEnded ) {
                      ui.changeFilter('#localVideo', 'no');
                      ui.changeFilter('#main_video', 'no');
                      $(ui.filterClassName).val('no');

                      takedCallCallee = [];
                  }

                  if (app.currentSession.currentUserID === app.currentSession.initiatorID && !isCallEnded) {
                      /** get array if users without user who ends call */
                      takedCallCallee = _.reject(takedCallCallee, function(num){ return num.id === +userID; });

                      qbApp.MsgBoard.update('accept_call', {users: takedCallCallee});
                  }

                  if( _.isEmpty(app.currentSession) || isCallEnded ) {
                      if(callTimer) {
                          $('#timer').addClass('hidden');
                          clearInterval(callTimer);
                          callTimer = null;
                          ui.callTime = 0;

                          network = {};
                      }
                  }
              }
            };
    }
});

