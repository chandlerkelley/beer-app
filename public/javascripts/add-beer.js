angular.module("whatsOnTap")
.component("addBeer", {
  template: `
  <main>
    <form name="form" ng-submit="$ctrl.searchBeer(form)" novalidate>
      <div class="form-part">

        <input type="text" ng-model="$ctrl.beerName" placeholder="Search for a beer">
        <button class="btn" type="submit">Search</button>
      </div>
    </form>
    <div class="bar-nav">
      <a class="nav-arrow" ng-show="$ctrl.page > 0" ng-click="$ctrl.decPage()"><i class="material-icons">arrow_back</i></a>
      <h2>Click on beer to add<h2>
      <a class="nav-arrow" ng-show="$ctrl.page < $ctrl.foundBeers.length - 6" ng-click="$ctrl.incPage()"><i class="material-icons">arrow_forward</i></a>
    </div>
    <div class="button-container" ng-show="$ctrl.searched">
      <div class="btn main-button" ng-repeat="beer in $ctrl.foundBeers | limitTo:6:$ctrl.page" ng-click="$ctrl.addBeer(beer.id)">
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

