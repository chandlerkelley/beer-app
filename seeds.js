"use strict";

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var User = require('./models/user');
var Bar = require('./models/bar');

mongoose.connect('mongodb://localhost/beerApp');

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}
console.log('removing bars...');
Bar.remove({})
.then(function() {
  console.log('removing old bars...');
  return User.remove({});
})
.then(function() {
  console.log('creating new users');
  let joe = new User();
  joe.local = { email: 'joe@ga.co', password: joe.encrypt('test1234') };
  let sue = new User();
  sue.local = { email: 'sue@ga.co', password: sue.encrypt('test1234') };
  return [User.create(joe), User.create(sue)];
})
.spread(function(joe, sue) {
  console.log('creating some new bars...');
  var kimballHouse = new Bar({
     name: 'Kimball House',
     address: '303 E Howard Ave, Decatur, GA 30030',
     neighborhood: 'Decatur',
     hours: '5-10pm',
     beers: [
          {brewery: "Creature Comforts", name: "Athena"}
        ],
     user: joe._id });
  var theAlbert = new Bar({
     name: 'The Albert',
     address: '918 Austin Ave NE, Atlanta, GA 30307',
     neighborhood: 'Inman Park',
     hours: '3-12pm',
     beers: [
          {brewery: "Orpheus Brewing", name: "Atalanta"}
        ],
     user: joe._id });
  var thePorter = new Bar({
     name: 'The Porter',
     address: '1156 Euclid Ave NE, Atlanta, GA 30307',
     neighborhood: 'L5P',
     hours: '5-11pm',
     beers: [
          {brewery: "Wild Heaven", name: "White Blackbird"}
        ],
     user: joe._id });
  var octaneBar = new Bar({
     name: 'Octane Bar',
     address: '437 Memorial Drive A5, Atlanta, GA 30312',
     neighborhood: 'Grant Park',
     hours: '5-12pm',
     beers: [
          {brewery: "Terrapin", name: "Golden Ale"}
        ],
     user: joe._id });
  var litBar = new Bar({
     name: 'The Traphouse',
     address: '404 Northside Drive, Atlanta, GA 303030',
     neighborhood: 'Zone 6',
     hours: 'all day baby',
     beers: [
          {brewery: "home made", name: "that fire"}
        ],
     user: joe._id });
  var brickBar = new Bar({
     name: 'Brick Store',
     address: '123 Downtown St, Decatur, GA 303030',
     neighborhood: 'Decatur',
     hours: 'late',
     beers: [
          {brewery: "Terrapin", name: "Recreation Ale"},
          {brewery: "Guiness", name: "Extra Stout"},
          {brewery: "Cigar City", name: "Jai Alai"},
        ],
     user: joe._id });
  var midBar = new Bar({
     name: 'Midway Pub',
     address: '123 Flat Shoals Rd., Atlanta, GA 303030',
     neighborhood: 'EAV',
     hours: 'all day baby',
     beers: [
          {brewery: "Creature Comforts", name: "Athena"},
          {brewery: "Orpheus", name: "Atalanta"},
        ],
     user: joe._id });
  return Bar.create([kimballHouse, theAlbert, thePorter, octaneBar, litBar, brickBar, midBar]);
})
.then(function(savedBars) {
  console.log('Just saved', savedBars.length, 'todos.');
  return Bar.find({}).populate('user');
})
.then(function(allBars) {
  console.log('Printing all bars:');
  allBars.forEach(function(bar) {
    console.log(bar.toString());
  });
  quit();
}, function(err) {
  return handleError(err);
});
