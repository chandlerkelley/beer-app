angular.module("whatsOnTap")
.service("dataService", function($http) {

	this.getBars = function() {
		return $http.get("/tap")
	};

	this.getOneBar = function(id) {
		return $http.get("/tap/bar/" + id)
	};

	this.searchApi = function (beer){
		var beerNoSpaces = beer.replace(/ /g, "%20")
		return $http.get("/tap/apisearch/" + beerNoSpaces)
	}

	this.addBeerToBar = function (bar, beer) {
		return $http.put("/tap/addbeer/" + bar + "/" + beer)
	}

		this.addBar = function (bar) {
		return $http.post("/tap/addbar/", bar);
	}

	this.removeBeerFromBar = function (bar, beer) {
		return $http.put("/tap/removebeer/" + bar + "/" + beer)
	}

	this.getOneBeer = function (bar, beer) {
		return $http.get("/tap/beer/" + bar + "/" + beer)
	}
})
