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
  <div class="add-beer-list" ng-show="$ctrl.searched">
    <h2>Click on beer to add<h2>
    <div class="btn" ng-repeat="beer in $ctrl.foundBeers">
    <h3>{{beer.name}}</h3>
    </div>
  </div>
  </main>
  `,
  controller: function(dataService, $stateParams, $state) {
    this.searched = false;
    this.foundBeers = null;

    this.searchBeer = function(form) {
      dataService.searchApi(this.beerName)
      .then( res => {
        console.log(res.data);
        this.foundBeers = res.data;
      })
      this.searched=true;
    }
  }
});

