angular.module("whatsOnTap")
.service("dataService", function($http) {

	this.getBars = function() {
		return $http.get("/tap")
	};

	// this.getOneBar = function(id) {
	// 	return $http.get("/tap/bar/" + id)
	// };

})