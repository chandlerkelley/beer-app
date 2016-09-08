angular.module("whatsOnTap")
.component("remove", {
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
			<div class="small-button btn" ng-click="$ctrl.animate($event); $ctrl.showBar()">
				<h3>Cancel</h3>
			</div>
		</div>
		<div class="button-container">
			<div ng-repeat="beer in $ctrl.beers track by $index" class="main-button btn remove" ng-click="$ctrl.animate($event); $ctrl.removeBeer($index)">
				<i class="material-icons">local_drink</i>
				<div class="button-content">
					<h3>{{beer.brewery}}</h3>
					<h3>{{beer.name}}</h3>
				</div>
				<i class="material-icons">clear</i>
			</div>

		</div>
	</main>
	`,
	controller: function (Auth, toastr, dataService, $stateParams, $state) {
		this.animate = function(event) {
			$(event.currentTarget).addClass("anim");
			setTimeout(() => { $(event.currentTarget).removeClass("anim") }, 750);
		}
		this.bar = null;
		this.beers = null;

		this.showBar = function() {
			$state.go("bar", {id: $stateParams.id});
		}

		this.showHome = function() {
			$state.go("home");
		}

		this.removeBeer = function(index) {
			if (Auth.isLoggedIn()) {
				var beerIndex = index
				dataService.removeBeerFromBar($stateParams.id, index)
				.then( res => {
					this.beers.splice(beerIndex, 1);
				})	
			} else {
				toastr.error("Must be logged in to remove a beer from the tap list");
			};
			
		}

		dataService.getOneBar($stateParams.id)
		.then( res => {
			console.log(res)
			this.bar = res.data;
			this.beers = res.data.beers;
		})
	}
})
