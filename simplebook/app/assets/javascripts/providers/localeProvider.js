(function() {
	var app = angular.module('simplebook');

	app.provider('locale', function localeProvider() {
		var locale = 'en';

		this.getLocale = function() {
			return locale;
		};

		this.setLocale = function(value) {
			locale = value;
		};

		this.$get = function() {
			return {
				get: function() {
					return locale;
				},
				set: function(value) {
					locale = value;
				}
			};
		};
	});
})();
