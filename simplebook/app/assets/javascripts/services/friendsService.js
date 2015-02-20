(function() {
	var app = angular.module('simplebook');

	app.service('friendsService', function(ajaxService) {
		this.potentialFriends = function(params, dataCallback) {
			ajaxService.get({
				url: '/api/v1/friends/potential_friends',
				urlParams: params,
				callback: function(data, status) {
					if(status === 200) {
						dataCallback(data);
					}
					else {
						alert('ERROR');
					}
				}
			});
		};
	});
})();
