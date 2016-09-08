angular.module("whatsOnTap")
.component("home", {
	template: `
	<main>
		<div class="search-container">
			<h2 class="search-title">search by beer or bar</h2>
			<div class="search-bar">
				<i id= "search-icon" class="material-icons">search</i>
				<input id="input" type="text" placeholder="Search by beer or bar" ng-model="$ctrl.search" ng-focus="$ctrl.growBar($event)" ng-blur="$ctrl.shrinkBar($event)">
			</div>
		</div>
		<div class="bar-nav">
			<div class="nav-arrow" ng-class="{hide : !($ctrl.page > 0)}" ng-click="$ctrl.decPage(); $ctrl.animate($event)"><i class="material-icons">arrow_back</i></div>
			<div class="small-button btn" ng-click="$ctrl.animate($event); $ctrl.showAddBar()">
				<h3>New bar page</h3>
				<i id="plus" class="material-icons">add</i>
			</div>		
			<div class="nav-arrow" ng-class="{hide : !($ctrl.page < $ctrl.bars.length - 8)}" ng-click="$ctrl.incPage(); $ctrl.animate($event)"><i class="material-icons">arrow_forward</i></div>
		</div>
		<div class="button-container">
			<div ng-repeat="bar in $ctrl.bars | filter: $ctrl.search | limitTo:8:$ctrl.page" class="main-button btn" ng-click="$ctrl.animate($event); $ctrl.showBar(bar)">
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
			this.page+=8;
		}
		this.decPage = function() {
			this.page-=8;
		};

		this.animate = function(event) {
			$(event.currentTarget).addClass("anim");
			setTimeout(() => { $(event.currentTarget).removeClass("anim") }, 750);
		}

		this.growBar = function(event) {
			$(event.currentTarget).parent().css("width", "60%")
		};

		this.shrinkBar = function(event) {
			$(event.currentTarget).parent().css("width", "55%")
		};

		this.showBar = function(bar) {
			$state.go("bar", { id: bar._id})
		};

		this.showAddBar = function() {
			$state.go("addBar");
		}

		this.bars = null;

		dataService.getBars()
		.then( res => {
			this.bars = res.data;
		})
	}
})
