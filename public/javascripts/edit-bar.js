angular.module("whatsOnTap")
.component("editBar", {
  template: `
  <main>
        <h1 class="info-name"> {{$ctrl.name}}</h1>
    <form name="form" ng-submit="$ctrl.editBar(form)" novalidate>
      <div class="form-part">
        <label class="form-label">Neighborhood</label>
        <input type="text"  ng-model="$ctrl.neighborhood">
      </div>
       <div class="form-part">
        <label class="form-label">Address</label>
        <input type="text"  ng-model="$ctrl.address">
      </div>
       <div class="form-part">
        <label class="form-label">Hours</label>
        <input type="text"  ng-model="$ctrl.hours">
      </div>
      <button class="btn" type="submit">Edit Bar</button>
    </form>
  </main>
  `,
  controller: function($state, dataService, $stateParams) {
    this.editBar = function(form) {
      dataService.editBar({
        id: $stateParams.id,
        name: this.name,
        neighborhood: this.neighborhood,
        address: this.address,
        hours: this.hours,
      })
      .then(function(res){
        $state.go("bar", {id: $stateParams.id})
      })
    };

    dataService.getOneBar($stateParams.id)
    .then(res => {
      this.name = res.data.name;
      this.neighborhood = res.data.neighborhood;
      this.address = res.data.address;
      this.hours = res.data.hours;
  })

  }
})
