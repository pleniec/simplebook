(function() {
	var app = angular.module('simplebook');

	app.controller('TopBarController', function($scope, usersService, locale, locationService) {
		$scope.logout = function() {
			usersService.logout();
		};

		$scope.changeLocale = function(value) {
			locale.set(value);
			locationService.reload();
		};
	});
})();
