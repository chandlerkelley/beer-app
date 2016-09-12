angular.module("whatsOnTap")
.component('navbar', {
  template: `
    <header>
      <div class="header-left">
        <img class="icon" src="/../beericon.png">
        <a class="app-name" ui-sref="home">What's On Tap?</a>
        <i class="material-icons nav-drop" ng-click="$ctrl.animate($event); $ctrl.showNav()">menu</i>
      </div>
      <div class="header-right" ng-class="{'nav-hide' : $ctrl.navHide}">
        <a ng-hide="$ctrl.Auth.isLoggedIn()" class="nav-link" ui-sref="login">Log In</a>
        <a ng-hide="$ctrl.Auth.isLoggedIn()" class="nav-link" ui-sref="signup">Sign Up</a>
        <a ng-show="$ctrl.Auth.isLoggedIn()" class="nav-link">Signed in as {{ $ctrl.Auth.getCurrentUserSync().email }}</a>
        <a ng-show="$ctrl.Auth.isLoggedIn()" class="nav-link" ng-click="$ctrl.logout()">Log Out</a>
      </div>
    </header>
  `,
  controller: function(Auth, $state) {
    this.Auth = Auth;
    this.navHide = true;
    
    this.logout = function() {
      Auth.logout()
      .then( function(res) {
        $state.go('home');
      });
    };
    
    this.showNav = function() {
      this.navHide = this.navHide === true ? false : true;
    }

    this.animate = function(event) {
      $(event.currentTarget).addClass("anim");
      setTimeout(function() { $(event.currentTarget).removeClass("anim") }, 750);
    }
  }
});
