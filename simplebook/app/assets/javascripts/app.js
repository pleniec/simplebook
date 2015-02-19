(function() {
	var app = angular.module('simplebook', ['ngRoute', 'ngTable', 'ui.bootstrap']);

	app.config(function($httpProvider) {
		$httpProvider.interceptors.push(function($q, $location) {
			return {
				request: function(config) {
					return config;
				},
				response: function(response) {
					return response;
				},
				responseError: function(rejection) {
					if(rejection.status === 401) {
						$location.path('/pl/index');
					}
					return $q.reject(rejection);
				}
			};
		});
	});

	app.run(function($rootScope, $templateCache) {
		$rootScope.$on('$routeChangeStart', function() {
			$templateCache.removeAll();
		});
	});
})();
