var express = require('express');
var router = express.Router();
var Bar = require("../models/bar");
var BreweryDb = require("brewerydb-node");
var brewdb = new BreweryDb ("eeeb5067eaacf4cde53e19a554420dd6");

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

router.get("/api/:id", function (req, res, next) {
	brewdb.search.beers({ q: req.params.id }, function(err, beers) {
		console.log(beers)
		res.json(beers);
	})
})

module.exports = router;