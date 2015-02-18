(function() {
	var app = angular.module('simplebook');

	app.service('ajaxService', function() {
		var csrfToken = $('meta[name=csrf-token]').attr('content');

		this.post = function(url, urlParams, requestBody, callback) {
			this.makeRequest('post', url, urlParams, requestBody, callback);
		};

		this.makeRequest = function(method, url, urlParams, requestBody, callback) {
			var xmlHttpRequest = new XMLHttpRequest();
			if(urlParams != null) {
				url += '?' + $.param(urlParams);
			}
			xmlHttpRequest.open(method, url);

			xmlHttpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			xmlHttpRequest.setRequestHeader('X-CSRF-Token', $('meta[name=csrf-token]').attr('content'));

			xmlHttpRequest.onreadystatechange = function() {
				if(xmlHttpRequest.readyState == 4) {
					callback(JSON.parse(xmlHttpRequest.response), xmlHttpRequest.status);
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
