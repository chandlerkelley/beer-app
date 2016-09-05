angular.module('myApp')
.component('navbar', {
  template: `

  <header>
    <a class="app-name" ui-sref="home">What's On Tap?</a>
    <a ng-hide="$ctrl.Auth.isLoggedIn()" class="nav-link" ui-sref="login">Log In</a>
    <a ng-hide="$ctrl.Auth.isLoggedIn()" class="nav-link" ui-sref="signup">Sign Up</a>
    <a ng-show="$ctrl.Auth.isLoggedIn()" class="nav-link">Signed in as {{ $ctrl.Auth.getCurrentUserSync().email }}</a>
    <a ng-show="$ctrl.Auth.isLoggedIn()" class="nav-link" ng-click="$ctrl.logout()">Log Out</a>
  </header>





  `,

    controller: function(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;

    this.logout = function() {
      this.Auth.logout()
      .then( res => {
        this.$state.go('Home');
      });
    };
  }
});
