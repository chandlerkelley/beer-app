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
			<div><i class="material-icons">edit</i></div>
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
	controller: function (dataService, $stateParams, $state) {
		this.animate = function(event) {
			$(event.currentTarget).addClass("anim");
			setTimeout(() => { $(event.currentTarget).removeClass("anim") }, 750);
		}
		this.bar = null;
		this.beers = null;

		this.showHome = function() {
			$state.go("home");
		};
		
		this.showBeer = function(beerIndex) {
			$state.go("beer", { bar: $stateParams.id, beer: beerIndex})
		};
		
		this.showNewBeer = function() {
			$state.go("addBeer", {id: $stateParams.id})
		}

		this.showRemoveBeer = function() {
			$state.go("removeBeer", {id: $stateParams.id})
		}

		dataService.getOneBar($stateParams.id)
		.then( res => {
			this.bar = res.data;
			this.beers = res.data.beers;
		})
	}
})
