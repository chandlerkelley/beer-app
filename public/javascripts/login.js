angular.module("whatsOnTap")
.component("login", {
	template: `
	<main>
		<form name="form" ng-submit="$ctrl.login(form)" novalidate>
			<div class="form-part">
				<label class="form-label">Email</label>
				<input type="email" name="email" ng-model="$ctrl.user.email" required>
			</div>
			<p class="error-message" ng-show="(form.email.$error.email || form.email.$error.required) && ($ctrl.emailBlur || $ctrl.submitted)">Must enter a valid email</p>
			<div class="form-part">
				<label class="form-label">Password</label>
				<input type="password" name="password" ng-model="$ctrl.user.password" required>
			</div>
			<p class="error-message" ng-show="form.password.$error.required && $ctrl.submitted">Must enter your password</p>
			<button class="btn form-button" type="submit">Log In</button>
		</form>
	</main>
	`,
	controller: function(Auth, $state, toastr) {
		this.login = function(form) {
			this.submitted = true;
			Auth.login({
				email: this.user.email,
				password: this.user.password
			})
			.then(function() {
				$state.go("home");
			})
			.catch(function(err){
				toastr.error(err.message);
			})
		}
	}
})

