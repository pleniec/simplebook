(function() {
	var app = angular.module('simplebook');

	app.config(function($routeProvider, tokenProvider, localeProvider) {
		function templateUrlFor(path) {
			return function(params) {
				localeProvider.setLocale(params.locale);
				return '/' + params.locale + path + '?token=' + tokenProvider.getToken();
			};
		}

		$routeProvider.
		when('/:locale/index', {
			templateUrl: templateUrlFor('/index'),
			controller: 'IndexController'
		}).
		when('/:locale/home', {
			templateUrl: templateUrlFor('/home')
		}).
		when('/:locale/find_friends', {
			templateUrl: templateUrlFor('/find_friends'),
			controller: 'FindFriendsController'
		}).
		otherwise({
			redirectTo: '/404'
	    });
	});
})();
