(function() {
	var app = angular.module('simplebook');

	app.service('utilsService', function() {
		this.convertToUnderscore = function(string) {
			return string.replace(/([A-Z])/g, function($1) { return "_" + $1.toLowerCase(); });
		};

		this.convertToCamelCase = function(string) {
			return string.replace(/\W+(.)/g, function (x, chr) { return chr.toUpperCase(); });
		};

		this.convertToRailsParams = function(params) {
			var railsParams = {};
			for(var key in params) {
				railsParams[this.convertToUnderscore(key)] = params[key];
			}
			return railsParams;
		};

		this.convertToAngularParams = function(params) {
			var angularParams = {};
			for(var key in params) {
				angularParams[this.convertToCamelCase(key)] = params[key];
			}
			return angularParams;
		}
	});
})();
