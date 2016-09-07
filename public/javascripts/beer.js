angular.module("whatsOnTap")
.component("beer", {
  template: `
  <main>
    <div class="bar-data">
      <h1 class="bar-name">{{$ctrl.beer.name}}</h1>
      <p>{{$ctrl.beer.brewery}}</p>
      <p>{{$ctrl.beer.abv}}</p>
      <p>{{$ctrl.beer.style}}</p>
    </div>
  </main>
  `,
  controller: function (dataService, $stateParams, $state) {
    this.animate = function(event) {
      $(event.currentTarget).addClass("anim");
      setTimeout(() => { $(event.currentTarget).removeClass("anim") }, 750);
    }
    this.beer = null;

    dataService.getOneBeer($stateParams.bar, $stateParams.beer)
    .then( res => {
      console.log(res)
      this.beer = res.data;
    })
  }
})
