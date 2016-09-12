angular.module("whatsOnTap")
.component("bar", {
	template: `
	<main>
		<h1 class="info-name">{{$ctrl.bar.name}}</h1>
		<div class="info-header">
			<div ng-click="$ctrl.showHome()"><i class="material-icons">arrow_back</i></div>
			<div class="info-data">
				<p class="info-para">{{$ctrl.bar.neighborhood}}</p>
				<p class="info-para">{{$ctrl.bar.hours}}</p>
				<p class="info-para">{{$ctrl.bar.address}}</p>
			</div>
			<div ng-click="$ctrl.editBar()"><i class="material-icons">edit</i></div>
		</div>
		<div class="add-remove-beer">
			<div class="small-button btn" ng-click="$ctrl.animate($event); $ctrl.showNewBeer()">
				<h3>Add beer</h3>
				<i class="material-icons">add</i>
			</div>
			<div class="small-button btn" ng-click="$ctrl.animate($event); $ctrl.showRemoveBeer()">
				<h3>Remove beer</h3>
				<i class="material-icons">remove</i>
			</div>
		</div>
		<div class="button-container">
			<div ng-repeat="beer in $ctrl.beers track by $index" class="main-button btn" ng-click="$ctrl.animate($event); $ctrl.showBeer($index)">
				<!-- Make the "1" in the limitTo above a value that comes from the page number -->
				<i class="material-icons">local_drink</i>
				<div class="button-content">
					<h3>{{beer.brewery}}</h3>
					<h3>{{beer.name}}</h3>
				</div>
				<i class="material-icons">navigate_next</i>
			</div>

		</div>
	</main>
	`,
	controller: function (Auth, dataService, $stateParams, $state, toastr) {
		var that = this;
		this.animate = function(event) {
			$(event.currentTarget).addClass("anim");
			setTimeout(function(){ $(event.currentTarget).removeClass("anim") }, 750);
		}
		this.bar = {name: "Bar not found"};
		this.beers = null;

		this.showHome = function() {
			$state.go("home");
		};

		this.showBeer = function(beerIndex) {
			$state.go("beer", { bar: $stateParams.id, beer: beerIndex})
		};

		this.editBar = function() {
			if (Auth.isLoggedIn()) {
				$state.go("edit", {id: $stateParams.id})
			} else {
				toastr.error("Must be logged in to edit a bar page")
			}
		}

		this.showNewBeer = function() {
			if (Auth.isLoggedIn()) {
				$state.go("addBeer", {id: $stateParams.id})
			} else {
				toastr.error("Must be logged in to add a beer to the tap list")
			}
		}

		this.showRemoveBeer = function() {
			if (Auth.isLoggedIn()) {
				$state.go("removeBeer", {id: $stateParams.id})	
			} else {
				toastr.error("Must be logged in to remove a beer from the tap list")
			}
		}

		dataService.getOneBar($stateParams.id)
		.then(function(res) {
			console.log(res)
			if (res.data) {
				that.bar = res.data;
				that.beers = res.data.beers;
			}	
		})
	}
})
