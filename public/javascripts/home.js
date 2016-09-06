angular.module("whatsOnTap")
.component("home", {
	template: `
	<main>
		<div class="search-container">
			<h2 class="search-title">search by beer or bar</h2>
			<div id="search-bar">
				<i id= "search-icon" class="material-icons">search</i>
				<input id="input" type="text" placeholder="Search by beer or bar" ng-model="$ctrl.search">
			</div>
		</div>
		<div class="bar-nav">
			<a class="nav-arrow" ng-show="$ctrl.page > 0" ng-click="$ctrl.decPage()"><i class="material-icons">arrow_back</i></a>
			<div id="new-bar-button" class="new-bar-button btn" ng-click="$ctrl.animate($event)">
				<h3>New bar page</h3>
				<i id="plus" class="material-icons">add</i>
			</div>
			<a class="nav-arrow" ng-show="$ctrl.page < $ctrl.bars.length - 6" ng-click="$ctrl.incPage()"><i class="material-icons">arrow_forward</i></a>
		</div>
		<div class="button-container">
			<div ng-repeat="bar in $ctrl.bars | filter: $ctrl.search | limitTo:6:$ctrl.page" class="main-button btn" ng-click="$ctrl.animate($event); $ctrl.showBar(bar)">
				<!-- Make the "1" in the limitTo above a value that comes from the page number -->
				<i class="material-icons">store_mall_directory</i>
				<div class="button-content">
					<h3>{{bar.name}}</h3>
					<p>{{bar.neighborhood}}</p>
				</div>
				<i class="material-icons">navigate_next</i>
			</div>

		</div>
	</main>
	`,
	controller: function (dataService, $state) {
		this.page = 0;
		this.incPage = function() {
			this.page+=6;
		}
		this.decPage = function() {
			this.page-=6;
		};

		this.animate = function(event) {
			$(event.currentTarget).addClass("anim");
			setTimeout(() => { $(event.currentTarget).removeClass("anim") }, 750);
		}

		this.showBar = function(bar) {
			$state.go("bar", { id: bar._id})
		};

		this.bars = null;

		dataService.getBars()
		.then( res => {
			this.bars = res.data;
		})
	}
})
