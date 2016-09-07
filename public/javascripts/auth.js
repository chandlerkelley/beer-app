angular.module("whatsOnTap")
.service('Auth', function($http, $q) {

  var currentUser = null;

  this.getCurrentUser = function() {
    return $http.get('/me')
    .then(res => {
      currentUser = res.data;
    })
    .catch(err => {
      console.log('ERROR:', err);
      return $q.reject(err.data);
    });
  };

  this.getCurrentUserSync = function() {
    return currentUser;
  };

  this.isLoggedIn = function() {
   if(currentUser) {
    console.log(currentUser.email)
  }
    return currentUser ? currentUser.email !== '' : false;
  };

  this.login = function(credentials) {
    return $http.post('/login', credentials)
    .then( res => {
      console.log( "About to set current user to " + res.data.email );
      currentUser = res.data;
      console.log( "Current user is" + currentUser)
    })
    .catch(err => {
      console.log('ERROR:', err);
      return $q.reject(err.data);
    });
  };

  this.logout = function() {
    return $http.get('/logout')
    .then( res => {
      currentUser = null;
    });
  };



  this.createUser = function(user) {
    return $http.post('/signup', user)
    .then(res => {
      currentUser = res.data;
    })
    .catch(err => {
      console.log('ERROR:', err);
      return $q.reject(err.data);
    });
  };

  this.getCurrentUser();
});
