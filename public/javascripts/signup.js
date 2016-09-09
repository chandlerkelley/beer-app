angular.module("whatsOnTap")
.component("signup", {
	template: `
	<main>
		<form name="form" ng-submit="$ctrl.signup(form)" novalidate>
			<div class="form-part">
				<label class="form-label">Email</label>
				<input type="email"
					name="email"
					ng-model="$ctrl.user.email"
					ng-blur="$ctrl.emailBlur = true"
					required>
			</div>
			<p class="error-message" ng-show="form.email.$error.required && ($ctrl.emailBlur || $ctrl.submitted)">What's your email?</p>
			<p class="error-message" ng-show="form.email.$error.email && ($ctrl.emailBlur || $ctrl.submitted)">That doesn't look like a valid email</p>
			
			<div class="form-part">
				<label class="form-label">Password</label>
				<input type="password"
					name="password"
					ng-model="$ctrl.user.password"
					ng-blur="$ctrl.passwordBlur = true"
					ng-minlength="6"
					required>
			</div>
			<p class="error-message" ng-show="(form.password.$error.required || form.password.$error.minlength) && ($ctrl.passwordBlur || $ctrl.submitted)">Password must contain at least 6 characters</p>
			
			<div class="form-part">
				<label>Confirm Password</label>
				<input type="password"
					name="passwordCheck"
					ng-model="$ctrl.user.passwordCheck"
					ng-blur="$ctrl.passwordCheckBlur = true"
					ng-keyup="$ctrl.match = ($ctrl.user.password === $ctrl.user.passwordCheck)"
					required>
			</div>
			<p class="error-message" ng-show="!$ctrl.match && ($ctrl.passwordCheckBlur || $ctrl.submitted)">Passwords must match</p>

			<button class="btn form-button" type="submit">Register</button>
		</form>
	</main>
	`,
	controller: function(Auth, $state, toastr) {

		this.signup = function(form) {
			this.submitted = true;

			if(form.$valid && this.match) {
				return Auth.createUser({
				email: this.user.email,
				password: this.user.password
				})
				.then(() => {
					$state.go("home");
				})
				.catch( err => {
					console.log(err);
					toastr.error(err.message);
				})
			}
		}
	}
})

