(function() {
	var app = angular.module('simplebook');

	app.service('ajaxService', function(locale, token) {
		var csrfToken = $('meta[name=csrf-token]').attr('content');

		this.post = function(url, requestBody, callback) {
			this.makeRequest('post', url, requestBody, callback);
		};

		this.makeRequest = function(method, url, requestBody, callback) {
			var xmlHttpRequest = new XMLHttpRequest();
			url += '?' + $.param({
				locale: locale.get(),
				token: token.get()
			});
			xmlHttpRequest.open(method, url);

			xmlHttpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			xmlHttpRequest.setRequestHeader('X-CSRF-Token', $('meta[name=csrf-token]').attr('content'));

			xmlHttpRequest.onreadystatechange = function() {
				if(xmlHttpRequest.readyState == 4) {
					var responseBody = null;
					try {
						responseBody = JSON.parse(xmlHttpRequest.response);
					}
					catch(e) {
						responseBody = null
					}
					callback(responseBody, xmlHttpRequest.status);
				}
			};

			if(requestBody != null) {
				xmlHttpRequest.send(JSON.stringify(requestBody));
			}
			else {
				xmlHttpRequest.send();
			}
		};
	});
})();
