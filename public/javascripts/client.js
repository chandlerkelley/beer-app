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

	.state("addBeer", {
		url: "/addbeer/:id",
		template: "<add-beer></add-beer>"
	})
	// .state("remove-beer" {
	// 	url: "/remove-beer/:id",
	// 	template: "<remove-beer></remove-beer>"
	// })
})
