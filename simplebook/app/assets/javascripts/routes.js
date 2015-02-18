(function() {
	var app = angular.module('simplebook');

	app.config(function($routeProvider, tokenProvider) {
		function templateUrlFor(path) {
			return function(params) {
				return '/' + params.locale + path + '?token=' + tokenProvider.getToken();
			};
		}

		$routeProvider.
		when('/:locale/index', {
			templateUrl: function(params) { return '/' + params.locale + '/index' },
			controller: 'IndexController'
		}).
		when('/:locale/home', {
			templateUrl: templateUrlFor('/home'),
		}).
		otherwise({
			redirectTo: '/pl/index'
	    });
	});
})();
