angular.module("whatsOnTap")
.component("addBeer", {
  template: `
  <main>
    <form name="form" ng-submit="$ctrl.searchBeer(form)" novalidate>
      <div class="search-container">
        <h2 class="search-title">search by a beer</h2>
        <div id="small-search" class="search-bar">
          <input class="small-search" type="text" ng-model="$ctrl.beerName" placeholder="Search for a beer" ng-focus="$ctrl.growBar($event)" ng-blur="$ctrl.shrinkBar($event)">
          <button class="btn form-button" type="submit">Search</button>
        </div>
      </div>
    </form>
    <div class="bar-nav">
      <div class="nav-arrow" ng-class="{hide : !($ctrl.page > 0)}" ng-click="$ctrl.decPage(); $ctrl.animate($event)"><i class="material-icons">arrow_back</i></div>
      <h2 class="instructions">Click on beer to add<h2>
      <div class="nav-arrow" ng-class="{hide : !($ctrl.page < $ctrl.foundBeers.length - 8)}" ng-click="$ctrl.incPage(); $ctrl.animate($event)"><i class="material-icons">arrow_forward</i></div>
    </div>
    <div class="button-container" ng-show="$ctrl.searched">
      <div class="btn main-button" ng-repeat="beer in $ctrl.foundBeers | limitTo:8:$ctrl.page" ng-click="$ctrl.addBeer(beer.id)">
        <i class="material-icons">local_drink</i>
        <h3>{{beer.name}}</h3>
        <i id="plus" class="material-icons">add</i>
      </div>
    </div>
  </main>
  `,
  controller: function(Auth, dataService, $stateParams, $state, toastr) {
    this.page = 0;

    this.incPage = function() {
      this.page+=6;
    };

    this.decPage = function() {
      this.page-=6;
    };

    this.growBar = function(event) {
      $(event.currentTarget).parent().css("width", "80%")
    };

    this.shrinkBar = function(event) {
      $(event.currentTarget).parent().css("width", "75%")
    };

    this.searched = false;

    this.foundBeers = null;

    this.searchBeer = function(form) {
      dataService.searchApi(this.beerName)
      .then( res => {
        console.log(res.data);
        this.foundBeers = res.data;
      })
      this.searched=true;
    };

    this.addBeer = function(beerId) {
      if(Auth.isLoggedIn()) {
        dataService.addBeerToBar($stateParams.id, beerId)
        .then ( res => {
          //response will be different if beer was a duplicate or not; code must recognize which response it gets
          $state.go("bar", {id: $stateParams.id});
        })
      } else {
        toastr.error("Must be logged in to add a beer to the tap list")
      }

    }
  }
});

