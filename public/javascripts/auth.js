angular.module("whatsOnTap")
.service('Auth', function($http, $q) {

  var currentUser = null;

  this.getCurrentUser = function() {
    return $http.get('/me')
    .then(function(res) {
      currentUser = res.data;
    })
    .catch(function(err) {
      console.log('ERROR:', err);
      return $q.reject(err.data);
    });
  };

  this.getCurrentUserSync = function() {
    return currentUser;
  };

  this.isLoggedIn = function() {
    return currentUser ? currentUser.email !== '' : false;
  };

  this.login = function(credentials) {
    return $http.post('/login', credentials)
    .then(function(res) {
      currentUser = res.data;
    })
    .catch(function(err) {
      console.log('ERROR:', err);
      return $q.reject(err.data);
    });
  };

  this.logout = function() {
    return $http.get('/logout')
    .then(function(res) {
      currentUser = null;
    });
  };



  this.createUser = function(user) {
    return $http.post('/signup', user)
    .then(function(res) {
      currentUser = res.data;
    })
    .catch(function(err){
      console.log('ERROR:', err);
      return $q.reject(err.data);
    });
  };

  this.getCurrentUser();
});
