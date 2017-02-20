
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
  .module('qappDataGeneratorApp', ['ngRoute','ngQuill','ngBootbox','cgBusy'])
  .config(function($routeProvider,$locationProvider) {
     $locationProvider.hashPrefix('');
  $routeProvider.when('/create', {
    templateUrl: 'views/create.html',
    controller: 'CreateCtrl',
    controllerAs: 'create'
  }).when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
  });
});
