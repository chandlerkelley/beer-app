var express = require('express');
var router = express.Router();
var Bar = require("../models/bar");

// Add error functionality here

router.get("/", function(req, res, next) {
	Bar.find({})
	.then(function(bars) {
		res.json(bars);
	})
})

module.exports = router;