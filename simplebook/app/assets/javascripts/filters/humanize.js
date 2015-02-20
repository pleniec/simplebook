(function() {
	var app = angular.module('simplebook');

	app.filter('humanize', function() {
		return function(input) {
			return input.replace(/([A-Z])/g, function($1) { return " " + $1.toLowerCase(); });
		};
	});
})();