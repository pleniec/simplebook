(function() {
	var app = angular.module('simplebook');

	app.service('authenticatedAjaxService', function(baseAjaxService, token) {
		function setToken(options) {
			if(typeof options.urlParams === 'undefined') {
				options.urlParams = {};
			}
			options.urlParams.token = token.get();
		}

		this.post = function(options) {
			setToken(options);
			baseAjaxService.post(options);
		};

		this.get = function(options) {
			setToken(options);
			baseAjaxService.get(options);
		};
	});
})();