(function() {
	var app = angular.module('simplebook');

	function toUnderscore(string) {
		return string.replace(/([A-Z])/g, function($1) { return "_" + $1.toLowerCase(); });
	}

	function toCamelCase(string) {
		return string.replace(/_([a-z])/g, function ($1) { return $1[1].toUpperCase(); });
	}

	function renameKeys(object, renameFunction) {
		if(typeof object == 'object') {
			if(object instanceof Array) {
				for(var i=0; i<object.length; i++) {
					renameKeys(object[i], renameFunction);
				}
			}
			else {
				for(var key in object) {
					var value = object[key];
					delete object[key];
					object[renameFunction(key)] = value;
					renameKeys(value, renameFunction);
				}
			}
		}
	}

	function toRubyNotation(options) {
		renameKeys(options.urlParams, toUnderscore);
		renameKeys(options.requestBody, toUnderscore);
	}

	function toJavascriptNotation(data) {
		renameKeys(data, toCamelCase);
	}

	function modifyOptions(options) {
		toRubyNotation(options);
		var callback = options.callback;
		options.callback = function(data, status) {
			toJavascriptNotation(data);
			callback(data, status);
		};
	}

	app.service('ajaxService', function(localizedAjaxService, locale) {
		this.post = function(options) {
			modifyOptions(options);
			localizedAjaxService.post(options);
		};

		this.get = function(options) {
			modifyOptions(options);
			localizedAjaxService.get(options);
		};
	});
})();
