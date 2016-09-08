angular.module("whatsOnTap")
.component("addBeer", {
  template: `
  <main>
    <form name="form" ng-submit="$ctrl.searchBeer(form)" novalidate>
      <div class="form-part">

        <input type="text" ng-model="$ctrl.beerName" placeholder="Search for a beer">
        <button class="btn form-button" type="submit">Search</button>
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
  controller: function(dataService, $stateParams, $state) {
    this.page = 0
    this.incPage = function() {
      this.page+=6;
    }
    this.decPage = function() {
      this.page-=6;
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
      dataService.addBeerToBar($stateParams.id, beerId)
      .then ( res => {
        console.log("Back at add beer page");
        $state.go("bar", {id: $stateParams.id})
      })
    }
  }
});

