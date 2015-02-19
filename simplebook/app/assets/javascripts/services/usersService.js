(function() {
	var app = angular.module('simplebook');

	app.service('usersService', function(utilsService, ajaxService, token, locationService) {
		var that = this;

		this.register = function(params, invalidDataCallback) {
			var railsParams = utilsService.convertToRailsParams(params);
			ajaxService.post('/api/v1/users/register', {user: railsParams}, function(data, status) {
				if(status === 201) {
					that.login({email: params.email, password: params.password}, function(data, status) {
						if(status === 200) {
							token.set(data.token);
							locationService.path('/home');
						}
						else {
							alert('ERROR');
						}
					});
				}
				else if(status === 422) {
					invalidDataCallback(data);
				}
				else {
					alert('ERROR');
				}
			});
		};

		this.login = function(params, invalidCredentialsCallback) {
			var railsParams = utilsService.convertToRailsParams(params);
			ajaxService.post('/api/v1/users/login', railsParams, function(data, status) {
				if(status === 200) {
					token.set(data.token);
					locationService.path('/home');
				}
				else if(status === 422) {
					invalidCredentialsCallback(data.error);
				}
				else {
					alert('ERROR');
				}
			});
		};

		this.logout = function(params, callback) {
			var railsParams = utilsService.convertToRailsParams(params);
			ajaxService.post('/api/v1/users/logout', railsParams, function(data, status) {
				if(status === 200) {
					token.set('');
					locationService.path('/index');
				}
				else {
					alert('ERROR');
				}
			});
		};
	});
})();
