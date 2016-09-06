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

router.get("/bar/:id", function(req, res, next) {
	Bar.findById( req.params.id )
	.then(function(bar) {
		res.json(bar);
	})
})

module.exports = router;