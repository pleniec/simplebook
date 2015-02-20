(function() {
	var app = angular.module('simplebook');

	app.controller('FindFriendsController', function($scope, ngTableParams, friendsService) {
		function cleanUrlParams(urlParams) {
			var cleanedUrlParams = {};
			for(var key in urlParams) {
				var cleanedKey = key.replace(/filter\[([a-zA-Z]+)\]/g,
					function($1, $2) { return $2; });
				cleanedUrlParams[cleanedKey] = urlParams[key];
			}
			return cleanedUrlParams;
		}

        $scope.findFriendsTableFilter = {
            firstName: '',
            lastName: '',
            showFriends: true,
            showInvited: true
        };

		$scope.findFriendsTable = new ngTableParams({
			page: 1,
			count: 10,
            filter: $scope.findFriendsTableFilter
		}, {
			counts: [],
			total: 103,
			getData: function($defer, params) {
				var cleanedParams = cleanUrlParams(params.url());
				friendsService.potentialFriends(cleanedParams, function(data) {
					params.total(data.total);
					$defer.resolve(data.result);
				});
			}
		});
	});
})();
