angular.module("whatsOnTap")
.component("login", {
	template: `
	<main>
		<form name="form" ng-submit="$ctrl.login(form)" novalidate>
			<label>Email</label>
			<input type="email" name="email" ng-model="$ctrl.user.email">
			<label>Password</label>
			<input type="password" name="password" ng-model="$ctrl.user.password">
			<button class="btn" type="submit">Log In</button>
		</form>
	</main>
	`,
	controller: function(Auth, $state) {
		this.login = function(form) {
			this.Auth.login({
				email: this.user.email,
				password: this.user.password
			})
			.then(() => {
				this.$state.go("home");
			})
		}
	}
})

