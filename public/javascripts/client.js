angular.module("whatsOnTap", ["ui.router"])

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/home");

	$stateProvider
	.state("home", {
		url: "/home",
		template: "<home></home>"
	})
	.state("signup", {
		url: "/signup",
		template: "<signup></signup>"
	})
	.state("login", {
		url: "/login",
		template: "<login></login>"
	})
	.state("bar", {
		url: "/bar/:id",
		template: "<bar></bar>"
	})

	.state("beer", {      //added for beer page
		url: "/beer/:bar/:beer",
		template: "<beer></beer>"
	})
	.state("addBeer", {
		url: "/addbeer/:id",
		template: "<add-beer></add-beer>"
	})
	.state("removeBeer", {
		url: "/remove/:id",
		template: "<remove></remove>"
	})
	.state("addBar", {
		url: "/addbar",
		template: "<add-bar></add-bar>"
	})

	// .state("remove-beer" {
	// 	url: "/remove-beer/:id",
	// 	template: "<remove-beer></remove-beer>"
	// })
})
