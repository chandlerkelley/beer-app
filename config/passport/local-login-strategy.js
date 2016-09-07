var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../../models/user');

var strategy = new LocalStrategy({
    usernameField : 'email',                 // default is 'username'
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
    // Search for a user with this email
    User.findOne({ 'local.email' : email }, function(err, user) {
      if (err) return callback(err);

      // PROGRAM WHAT TO DO IF USER NOT FOUND
      if (!user) {
        console.log("user not found")
        return callback();
      }

      // Validate password
      if (!user.isValidPassword(password)) {
        console.log("Password wrong")
        return callback(); //PROGRAM WHAT TO DO IS PASSWORD IS WRONG
      }
      return callback(null, user);
    });
  });

module.exports = strategy;
