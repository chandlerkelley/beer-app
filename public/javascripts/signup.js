angular.module("whatsOnTap")
.component("signup", {
	template: `
	<main>
		<form name="form" ng-submit="$ctrl.signup(form)" novalidate>
			<label>Email</label>
			<input type="email" name="email" ng-model="$ctrl.user.email">
			<label>Password</label>
			<input type="password" name="password" ng-model="$ctrl.user.password">
			<label>Confirm Password</label>
			<input type="password" name="password" ng-model="$ctrl.passwordCheck">
			<button class="btn" type="submit">Register</button>
		</form>
	</main>
	`,
	controller: function(Auth, $state) {
		this.signup = function(form) {
			return this.Auth.createUser({
				email: this.user.email,
				password: this.user.password
			})
			.then(() => {
				this.$state.go("home");
			})
		}
	}
})