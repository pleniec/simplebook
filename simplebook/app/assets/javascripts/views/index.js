(function() {
	var app = angular.module('simplebook');

	app.controller('IndexController', function($scope, $location, usersService, token) {
		$scope.loginData = {
			email: '',
			password: ''
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
			usersService.register($scope.registrationData, function(data, status) {
				if(status == 422) {
					$scope.$apply(function() {
						$scope.validationErrors = data.errors;
					});
				}
				else if(status == 201) {
					usersService.login({email: $scope.registrationData.email,
						password: $scope.registrationData.password}, function(data, status) {
						if(status == 200) {
							token.set(data.token);
							$location.path('/pl/home');
						}
						else {
							alert('ERORR');
						}
					});	
				}
			});
		};

		$scope.login = function() {
			usersService.login($scope.loginData, function(data, status) {
				if(status == 422) {
					$scope.$apply(function() {
						$scope.loginError = data.error;
					});
				}
				else if(status == 200) {
					$scope.$apply(function() {
						token.set(data.token);
						$location.path('/pl/home');
					});
				}
			});
		};
	});
})();
