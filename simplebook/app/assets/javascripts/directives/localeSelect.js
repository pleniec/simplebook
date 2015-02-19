(function() {
	var app = angular.module('simplebook');

	app.directive('localeSelect', function(locale, locationService) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.on('click', function(e) {
					e.preventDefault();
					locale.set(attrs.localeSelect);
					locationService.reload();
				});
			}
		}
	});
})();