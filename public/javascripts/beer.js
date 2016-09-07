angular.module("whatsOnTap")
.component("beer", {
  template: `
  <main>
    <h1 class="info-name">{{$ctrl.beer.name}}</h1>
    <div class="info-header">
      <div ng-click="$ctrl.goBack()"><i class="material-icons">arrow_back</i></div>
      <div class="info-data">
        <p class="info-para">{{$ctrl.beer.brewery}}</p>
        <p class="info-para">{{$ctrl.beer.abv}}</p>
        <p class="info-para">{{$ctrl.beer.style}}</p>
      </div>
      <i class="material-icons hide">arrow_back</i>
    </div>
  </main>
  `,
  controller: function (dataService, $stateParams, $state) {
    this.animate = function(event) {
      $(event.currentTarget).addClass("anim");
      setTimeout(() => { $(event.currentTarget).removeClass("anim") }, 750);
    }

    this.goBack = function() {
      $state.go("bar", { id: $stateParams.bar })
    }

    this.beer = null;

    dataService.getOneBeer($stateParams.bar, $stateParams.beer)
    .then( res => {
      console.log(res)
      this.beer = res.data;
    })
  }
})
