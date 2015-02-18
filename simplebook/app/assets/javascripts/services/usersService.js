(function() {
	var app = angular.module('simplebook');

	app.service('usersService', function(utilsService, ajaxService) {
		this.register = function(params, callback) {
			var railsParams = utilsService.convertToRailsParams(params);
			ajaxService.post('/api/v1/users/register', {locale: 'pl'}, {user: railsParams}, callback);
		};
		this.login = function(params, callback) {
			var railsParams = utilsService.convertToRailsParams(params);
			ajaxService.post('/api/v1/users/login', {locale: 'pl'}, railsParams, callback);
		};
	});
})();