(function() {
	var app = angular.module('simplebook');

	app.controller('IndexController', function($scope, $location, usersService, token, locale) {
		$scope.loginData = {
			email: 'troll@zal.pl',
			password: 'password'
		};
		$scope.registrationData = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			passwordConfirmation: ''
		};
		$scope.validationErrors = {};
		$scope.loginError = null;

		$scope.checkPasswords = function() {
			if($scope.registrationData.password != undefined) {
				$scope.registrationForm.passwordConfirmation.$setValidity('equal',
					$scope.registrationData.password == $scope.registrationData.passwordConfirmation);
			}
		};

		$scope.registerUser = function() {
			usersService.register($scope.registrationData, function(errors) {
					$scope.$apply(function() {
						$scope.validationErrors = errors;
					});
			});
		};

		$scope.login = function() {
			usersService.login($scope.loginData, function(error) {
				$scope.$apply(function() {
					$scope.loginError = error;
				});
			})
		};
	});
})();
