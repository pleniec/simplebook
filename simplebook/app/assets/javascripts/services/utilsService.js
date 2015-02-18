(function() {
	var app = angular.module('simplebook');

	app.service('utilsService', function() {
		this.convertToUnderscore = function(string) {
			return string.replace(/([A-Z])/g, function($1) { return "_" + $1.toLowerCase(); });
		}

		this.convertToRailsParams = function(params) {
			var railsParams = {};
			for(var key in params) {
				railsParams[this.convertToUnderscore(key)] = params[key];
			}
			return railsParams;
		};
	});
})();


/*
String.prototype.toUnderscore = function(){
	return this.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
};
*/