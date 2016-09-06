angular.module("whatsOnTap")
.component("signup", {
	template: `
	<main>
		<form name="form" ng-submit="$ctrl.signup(form)" novalidate>
			<div class="form-part">
				<label class="form-label">Email</label>
				<input type="email" name="email" ng-model="$ctrl.user.email">
			</div>
			<div class="form-part">
				<label class="form-label">Password</label>
				<input type="password" name="password" ng-model="$ctrl.user.password">
			</div>
			<div class="form-part">
				<label>Confirm Password</label>
				<input type="password" name="password" ng-model="$ctrl.passwordCheck">
			</div>
			<button class="btn" type="submit">Register</button>
		</form>
	</main>
	`,
	controller: function(Auth, $state) {
		this.signup = function(form) {
			console.log("Trying to sign up!")
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

