angular.module("whatsOnTap")
.component("bar", {
	template: `
	<main>
		<div class="bar-data">
			<h1 class="bar-name">{{$ctrl.bar.name}}</h1>
			<p>{{$ctrl.bar.neighborhood}}</p>
			<p>{{$ctrl.bar.hours}}</p>
			<p>{{$ctrl.bar.address}}</p>
		</div>
		<div class="add-remove-beer">
			<a class="nav-arrow" ng-show="$ctrl.page > 0" ng-click="$ctrl.decPage()"><i class="material-icons">arrow_back</i></a>
			<div class="beer-button btn" ng-click="$ctrl.animate($event)">
				<h3>Add beer to taplist</h3>
				<i class="material-icons">add</i>
			</div>
			<div class="beer-button btn" ng-click="$ctrl.animate($event)">
				<h3>Remove beer from taplist</h3>
				<i class="material-icons">remove</i>
			</div>
			<a class="nav-arrow" ng-show="$ctrl.page < $ctrl.bars.length - 6" ng-click="$ctrl.incPage()"><i class="material-icons">arrow_forward</i></a>
		</div>
		<div class="button-container">
			<div ng-repeat="beer in $ctrl.beers" class="main-button btn" ng-click="$ctrl.animate($event)">
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
	controller: function (dataService, $stateParams) {
		this.animate = function(event) {
			$(event.currentTarget).addClass("anim");
			setTimeout(() => { $(event.currentTarget).removeClass("anim") }, 750);
		}
		this.bar = null;
		this.beers = null;

		dataService.getOneBar($stateParams.id)
		.then( res => {
			console.log(res)
			this.bar = res.data;
			this.beers = res.data.beers;
		})
	}
})
