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

router.get("/apisearch/:id", function (req, res, next) {
	brewdb.search.beers({ q: req.params.id }, function(err, beers) {
		res.json(beers);
	})
})

router.put("/addbeer/:bar/:beer", function (req, res, next) {
	brewdb.beer.getById( req.params.beer , { withBreweries: "Y" }, function(err, selectedBeer) {
		var barId = req.params.bar;
		console.log(barId)
;		var beerToAdd = {
			name: selectedBeer.name,
			brewery: selectedBeer.breweries[0].nameShortDisplay,
			abv: selectedBeer.abv,
			style: selectedBeer.style.shortName
		};
		Bar.findById( barId , function(err, bar) {
			console.log(bar);
			bar.beers.push(beerToAdd);
			bar.save()
			.then(function(bar) {
				res.json(bar);
			})
		})
	})
})

module.exports = router;