(function() {
	var app = angular.module('simplebook');

	app.service('localizedAjaxService', function(authenticatedAjaxService, locale) {
		function setLocale(options) {
			if(typeof options.urlParams === 'undefined') {
				options.urlParams = {};
			}
			options.urlParams.locale = locale.get();
		}

		this.post = function(options) {
			setLocale(options);
			authenticatedAjaxService.post(options);
		};

		this.get = function(options) {
			setLocale(options);
			authenticatedAjaxService.get(options);
		};
	});
})();