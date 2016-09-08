angular.module("whatsOnTap")
.component("addBar", {
  template: `
  <main>
    <form name="form" ng-submit="$ctrl.createBar(form)" novalidate>
      <div class="form-part">
        <label class="form-label">Bar Name</label>
        <input type="text" ng-model="$ctrl.name">
      </div>
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
      <button class="btn form-button" type="submit">Create Bar</button>
    </form>
  </main>
  `,
  controller: function($state, dataService) {
    this.createBar = function(form) {
      console.log("Hello")
      dataService.addBar({
        name: this.name,
        neighborhood: this.neighborhood,
        address: this.address,
        house: this.hours
      })
      .then(function( res ) {
        console.log(res);
        console.log(res.body);
        $state.go("bar", { id: res.data._id})
      })
    }
  }
})

