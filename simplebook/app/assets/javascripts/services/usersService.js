(function() {
	var app = angular.module('simplebook');

	app.service('usersService', function(ajaxService, token, locationService) {
		var that = this;

		this.register = function(params, invalidDataCallback) {
			ajaxService.post({
				url: '/api/v1/users/register',
				requestBody: {user: params},
				callback: function(data, status) {
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
				}
			});
		};

		this.login = function(params, invalidCredentialsCallback) {
			ajaxService.post({
				url: '/api/v1/users/login',
				requestBody: params,
				callback: function(data, status) {
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
				}
			});
		};

		this.logout = function(params, callback) {
			ajaxService.post({
				url: '/api/v1/users/logout',
				requestBody: params,
				callback: function(data, status) {
					if(status === 200) {
						token.set('');
						locationService.path('/index');
					}
					else {
						alert('ERROR');
					}
				}
			});
		};
	});
})();
