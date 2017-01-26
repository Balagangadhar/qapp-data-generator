
'use strict';

/**
 * @ngdoc overview
 * @name qappDataGeneratorApp
 * @description
 * # qappDataGeneratorApp
 *
 * Main module of the application.
 */
angular
  .module('qappDataGeneratorApp', ['ngRoute','ngQuill'])
  .config(function($routeProvider,$locationProvider) {
     $locationProvider.hashPrefix('');
  $routeProvider.when('/', {
    templateUrl: 'views/create.html',
    controller: 'CreateCtrl',
    controllerAs: 'create'
  });
});
