(function() {
	var app = angular.module('simplebook');

	app.service('locationService', function(locale, $location, $rootScope) {
		this.currentPath = '/index';

		this.path = function(path) {
			this.currentPath = path;
			$rootScope.$apply(function() {
				$location.path('/' + locale.get() + path);
			});
		};

		this.reload = function() {
			this.path(this.currentPath);
		};
	});
})();