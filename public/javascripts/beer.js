angular.module("whatsOnTap")
.component("beer", {
  template: `
  <main>
    <h1 class="info-name">{{$ctrl.beer.name}}</h1>
    <div class="info-header">
      <div ng-click="$ctrl.goBack()"><i class="material-icons">arrow_back</i></div>
      <div class="info-data">
        <p class="info-para">Brewery: {{$ctrl.beer.brewery}}</p>
        <p class="info-para">ABV: {{$ctrl.beer.abv}}</p>
        <p class="info-para">Style: {{$ctrl.beer.style}}</p>
      </div>
      <i class="material-icons hide">arrow_back</i>
    </div>
  </main>
  `,
  controller: function (dataService, $stateParams, $state) {
    var that = this;
    this.animate = function(event) {
      $(event.currentTarget).addClass("anim");
      setTimeout(function() { $(event.currentTarget).removeClass("anim") }, 750);
    }

    this.goBack = function() {
      $state.go("bar", { id: $stateParams.bar })
    }

    this.beer = {name: "Beer not Found"};

    dataService.getOneBeer($stateParams.bar, $stateParams.beer)
    .then( function(res) {
      console.log(res)
      if (res.data) {
        that.beer = res.data;
      }
    })
  }
})
