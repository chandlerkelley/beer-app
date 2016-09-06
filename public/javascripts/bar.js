angular.module("whatsOnTap")
.component("bar", {
	template: `
	<main>
		<div class="bar-nav">
			<a class="nav-arrow" ng-show="$ctrl.page > 0" ng-click="$ctrl.decPage()"><i class="material-icons">arrow_back</i></a>
			<div id="new-bar-button" class="new-bar-button btn" ng-click="$ctrl.animate($event)">
				<h3>New beer on tap</h3>
				<i id="plus" class="material-icons">add</i>
			</div>
			<div id="new-bar-button" class="new-bar-button btn" ng-click="$ctrl.animate($event)">
				<h3>Remove beer from list</h3>
				<i id="plus" class="material-icons">add</i>
			</div>
			<a class="nav-arrow" ng-show="$ctrl.page < $ctrl.bars.length - 6" ng-click="$ctrl.incPage()"><i class="material-icons">arrow_forward</i></a>
		</div>
		<div class="button-container">
			<div ng-repeat="beer in $ctrl.beers" class="main-button btn" ng-click="$ctrl.animate($event)"> 
				<!-- Make the "1" in the limitTo above a value that comes from the page number -->
				<i class="material-icons">local_drink</i>
				<div class="button-content">
					<h3>{{beer.brewery}} {{beer.name}}</h3>
				</div>
				<i class="material-icons">navigate_next</i>
			</div>
			
		</div>
	</main>
	`,
	controller: function () {
		this.animate = function(event) {
			$(event.currentTarget).addClass("anim");
			setTimeout(() => { $(event.currentTarget).removeClass("anim") }, 750);
		}
		this.beers = [
						{ name: "Beer 1", brewery: "Brewery" },
						{ name: "Beer 2", brewery: "Brewery" },
						{ name: "Beer 3", brewery: "Brewery" },
						{ name: "Beer 4", brewery: "Brewery" },
						{ name: "Beer 5", brewery: "Brewery" },
						{ name: "Beer 6", brewery: "Brewery" },
						{ name: "Beer 7", brewery: "Brewery" },
						{ name: "Beer 8", brewery: "Brewery" },
						{ name: "Beer 9", brewery: "Brewery" },
						{ name: "Beer 10", brewery: "Brewery" },
						{ name: "Beer 11", brewery: "Brewery" },
						{ name: "Beer 12", brewery: "Brewery" },
						{ name: "Beer 13", brewery: "Brewery" },
					]
	}
})