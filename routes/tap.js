var express = require('express');
var router = express.Router();
var Bar = require("../models/bar");
var BreweryDb = require("brewerydb-node");
var brewdb = new BreweryDb ("eeeb5067eaacf4cde53e19a554420dd6");

function authenticate(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401).json( { message: 'Please signup or login.'} );
  }
  else {
    next();
  }
}

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

router.get("/beer/:bar/:beer", function (req, res, next) {
	var beerIndex = req.params.beer;
	Bar.findById( req.params.bar )
	.then(function(bar) {
		res.json(bar.beers[ beerIndex ]);
	})
})

router.post("/addbar", authenticate, function(req,res,next){
	var newBar = new Bar();
	newBar.name = req.body.name;
	newBar.neighborhood = req.body.neighborhood;
	newBar.address = req.body.address;
	newBar.hours = req.body.hours;
	newBar.user = req.user.id;     //added to see who added new bar
		console.log(req.user.local.email);
	newBar.save()
	.then(function(savedBar) {
		res.json(savedBar);
	})
})

router.put("/addbeer/:bar/:beer", authenticate, function (req, res, next) {
	var barId = req.params.bar;
	brewdb.beer.getById( req.params.beer , { withBreweries: "Y" }, function(err, selectedBeer) {
;		var beerToAdd = {
			name: selectedBeer.name,
			brewery: selectedBeer.breweries[0].nameShortDisplay,
			abv: selectedBeer.abv,
			style: selectedBeer.style.shortName
		};
		Bar.findById( barId , function(err, bar) {
			var oldLength = bar.beers.length;
			console.log(bar);
			bar.beers.addToSet(beerToAdd)
			bar.save()
			var newLength = bar.beers.length;
      var changed;
			if (oldLength === newLength){
            changed = false;
          } else {changed = true;}

		})
			.then(function(bar) {
				res.json(bar)
				});

		})
	})


router.put("/edit", authenticate, function(req, res, next){
	Bar.findById(req.body.id)
	.then(function(bar) {
		bar.name = req.body.name;
		bar.neighborhood = req.body.neighborhood;
		bar.address = req.body.address;
		bar.hours = req.body.hours;
		bar.user = req.user.id;       //added to see who updated last
		console.log(req.user.local.email);
		bar.save()
		.then (function(savedBar){
			res.sendStatus(200);
		})
	})
})

router.put("/removebeer/:bar/:beer", authenticate, function (req, res, next) {
	var beerIndex = req.params.beer;
	Bar.findById( req.params.bar )
	.then(function(bar) {
		bar.beers.splice(beerIndex, 1)
		bar.save()
		.then( function(savedBar) {
			res.sendStatus(200);
		})
	})
})

module.exports = router;
