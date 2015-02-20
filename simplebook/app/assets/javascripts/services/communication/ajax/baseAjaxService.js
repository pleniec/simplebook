(function() {
	var app = angular.module('simplebook');

	app.service('baseAjaxService', function() {
		var csrfToken = $('meta[name=csrf-token]').attr('content');

		this.post = function(options) {
			options.method = 'post';
			this.request(options);
		};

		this.get = function(options) {
			options.method = 'get';
			this.request(options);
		};

		this.request = function(options) {
			var xmlHttpRequest = new XMLHttpRequest();

			if(typeof options.urlParams !== 'undefined') {
				options.url += '?' + $.param(options.urlParams);
			}

			xmlHttpRequest.open(options.method, options.url);
			xmlHttpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			xmlHttpRequest.setRequestHeader('X-CSRF-Token', csrfToken);

			xmlHttpRequest.onreadystatechange = function() {
				if(xmlHttpRequest.readyState === 4) {
					var responseBody = null;
					try {
						responseBody = JSON.parse(xmlHttpRequest.response);
					}
					catch(e) { }
					options.callback(responseBody, xmlHttpRequest.status);
				}
			};

			if(typeof options.requestBody !== 'undefined') {
				xmlHttpRequest.send(JSON.stringify(options.requestBody));
			}
			else {
				xmlHttpRequest.send();
			}
		};
	});
})();
