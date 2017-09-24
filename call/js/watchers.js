//watchers.js
//Firebase data is retrieved by attaching an asynchronous listener which I commonly refer to as "Watchers".
//These listeners are triggered once for the initial state of the data and again anytime the data being watched, changes.
//Watchers are helpful when making applications that syncs real-time with your Firebase database.
//Because watchers are able to do appropriate changes to your data (through Service) whenever your database's data is changed, added, removed, and etc.
//For big and complex applications, you should plan your watchers accordingly. Attaching multiple watchers can be expensive and this will add up in large and complex apps.
//Not to mention, watchers when not handled properly is highly prone to errors. It is imperative that watchers should only be attached once per application/user and cleared when logging out.
//It is ideal to attach all your watchers on the first route your app navigates to. If you have login and logout pages, it is ideal to attach watchers to the first page after logging in.
//It is important to note that watchers should only be attached once per application. If you have login and logout mechanism placed it is important to clear watchers when the user logged out.
//Similarly when the new user logged in, watchers should be attached for the logged in user.
//Watchers populates our Service class with real time data using a $timeout depending on the Firebase database event watched.
//For more information on Watchers visit: https://firebase.google.com/docs/database/web/retrieve-data.

angular.module('App').factory('Watchers', function(Service, $timeout) {
  return {
    //Define your watchers here.
  };
});
