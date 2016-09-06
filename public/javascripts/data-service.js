angular.module("whatsOnTap")
.service("dataService", function($http) {

	this.getBars = function() {
		return $http.get("/tap")
	};

	this.getOneBar = function(id) {
		return $http.get("/tap/bar/" + id)
	};

	this.searchApi = function (beer){
		var beerNoSpaces = beer.replace(" ", "%20")
		return $http.get("/tap/api/" + beerNoSpaces)
	}
	
	// this.searchApi = function (beer){
	// 	return $http.get("http://api.brewerydb.com/v2/beers?key=eeeb5067eaacf4cde53e19a554420dd6&&withBreweries=y&name=" + beer,
	// 		{
	// 			headers: 
	// 		})
	// }

})
