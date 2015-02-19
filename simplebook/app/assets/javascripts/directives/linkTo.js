(function() {
	var app = angular.module('simplebook');

	app.directive('linkTo', function(locale) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.prop('href', '#/' + locale.get() + attrs.linkTo);
			}
		};
	});
})();