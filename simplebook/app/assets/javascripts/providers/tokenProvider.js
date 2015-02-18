(function() {
	var app = angular.module('simplebook');

	app.provider('token', function tokenProvider() {
		var token = '';

		this.getToken = function() {
			return token;
		};

		this.$get = function() {
			return {
				get: function() {
					return token;
				},
				set: function(value) {
					token = value;
				}
			};
		}
	});
})();