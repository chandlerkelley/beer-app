angular.module("whatsOnTap")
.component("login", {
	template: `
	<main>
		<form name="form" ng-submit="$ctrl.login(form)" novalidate>
			<div class="form-part">
				<label class="form-label">Email</label>
				<input type="email" name="email" ng-model="$ctrl.user.email">
			</div>
			<div class="form-part">
				<label class="form-label">Password</label>
				<input type="password" name="password" ng-model="$ctrl.user.password">
			</div>
			<button class="btn form-button" type="submit">Log In</button>
		</form>
	</main>
	`,
	controller: function(Auth, $state) {
		this.login = function(form) {
			Auth.login({
				email: this.user.email,
				password: this.user.password
			})
			.then(() => {
				$state.go("home");
			})
		}
	}
})

