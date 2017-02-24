'use strict';

/**
 * @ngdoc overview
 * @name qappDataGeneratorApp
 * @description # qappDataGeneratorApp
 * 
 * Main module of the application.
 */
angular.module('qappDataGeneratorApp',
		[ 'ngRoute', 'ngQuill', 'ngBootbox', 'cgBusy' ]).config(
		function($routeProvider, $locationProvider) {
			$locationProvider.hashPrefix('');
			$routeProvider.when('/create', {
				templateUrl : 'views/create.html',
				controller : 'CreateCtrl',
				controllerAs : 'create'
			}).when('/', {
				templateUrl : 'views/main.html',
				controller : 'MainCtrl',
				controllerAs : 'main'
			}).when('/about', {
				templateUrl : 'views/about.html'
			}).when('/contactus', {
				templateUrl : 'views/contactus.html'
			}).otherwise('/');
		}).directive('showErrors', function() {
	return {
		restrict : 'A',
		require : '^form',
		link : function(scope, el, attrs, formCtrl) {
			// find the text box element, which has the 'name' attribute
			var inputEl = el[0].querySelector("[name]");
			// convert the native text box element to an angular element
			var inputNgEl = angular.element(inputEl);
			// get the name on the text box so we know the property to check
			// on the form controller
			var inputName = inputNgEl.attr('name');

			scope.$on('show-errors-check-validity', function() {
				if (formCtrl[inputName]) {
					el.toggleClass('has-error', formCtrl[inputName].$invalid);
				}
			});
			inputNgEl.bind('blur', function() {
				if (formCtrl[inputName]) {
					el.toggleClass('has-error', formCtrl[inputName].$invalid);
				}
			})
		}
	}
});
