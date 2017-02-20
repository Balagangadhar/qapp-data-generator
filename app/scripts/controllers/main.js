'use strict';

/**
 * @ngdoc function
 * @name qappDataGeneratorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the qappDataGeneratorApp
 */
angular.module('qappDataGeneratorApp')
  .controller('MainCtrl', function ($scope,$http,$location) {

    $scope.technologies = [{
        id: 'java',
        name: "Java"
    }, {
        id: 'spring',
        name: "Spring"
    }, {
        id: 'extjs',
        name: "ExtJS"
    }];
    $scope.technology = 'java';

    $scope.onBtnClick  =function(evt){
      var btnId = evt.target.id;
      var params = {
        mode : evt.target.id,
        technology : $scope.technology
      }
      $location.url('/create/?'+$scope.convertToQueryString(params));
    }
//TODO Move following to utilitty
    $scope.convertToQueryString = function(obj) {
      var str = [];
      for(var p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      return str.join("&");
    }


  });
