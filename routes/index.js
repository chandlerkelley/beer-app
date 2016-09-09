var express = require('express');
var router = express.Router();
var passport = require("passport");

function makeError(res, message, status) {
  res.statusCode = status;
  // var error = new Error(message);
  var error = {
    status: status,
    message: message
  };
  return error;
}

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index");
});

// Sign up
router.post("/signup", function(req, res, next) {
	passport.authenticate('local-signup', function(err, user, info) {
		var error = err || info;
		if (error) {
			return res.status(401).json(error);
		}
		if (!user) {
			return res.status(500).json({message: "Something went wrong, please try again"});
		}
		req.login(user, function(err) {
			if (err) return res.status(500).json(error);
			res.json( { email: user.local.email });
		});
	})(req, res, next);
});

// Log in
router.post("/login", function(req, res, next) {
	passport.authenticate('local-login', function(err, user, info) {
		var error = err || info;
		if (error) {
			return res.status(401).json(error);
		}
		if (!user) {
		 	return res.status(404).json({message: 'Email or password is invalid'});
		}
		req.login(user, function(err) {
			if (err) return res.status(401).json(error);
			console.log(user.local.email);
			res.json( { email: user.local.email });
		});
	})(req, res, next);
})

// Log out
router.get("/logout", function(req, res, next) {
	req.logout();
	res.sendStatus(200);
})

// Get currentUser
router.get('/me', function(req, res, next) {
  res.json( { email: req.user ? req.user.local.email : '' } );
});

module.exports = router;
