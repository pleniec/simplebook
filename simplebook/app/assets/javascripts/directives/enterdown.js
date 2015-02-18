(function() {
	var app = angular.module('simplebook');

	app.directive('enterdown', function($parse) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.on('keydown', function(e) {
					if(e.keyCode == 13) {
						scope.$eval(attrs.enterdown);
					}
				});
			}
		};
	});
})();