(function() {
	var app = angular.module('simplebook');

	app.controller('FindFriendsController', function($scope, ngTableParams) {
        $scope.findFriendsTableFilter = {
            firstName: '',
            lastName: '',
            showFriends: true,
            showInvited: true
        };

		$scope.findFriendsTable = new ngTableParams({
			page: 1,
			count: 10,
		}, {
			counts: [],
			total: 0,
			getData: function($defer, params) {
				$defer.resolve([{a: 1}, {a: 1}, {a: 1}, {a: 1}])
			}
		});
	});
})();
