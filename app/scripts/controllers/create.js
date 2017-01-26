'use strict';

/**
 * @ngdoc function
 * @name qappDataGeneratorApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the qappDataGeneratorApp
 */
angular.module('qappDataGeneratorApp')
  .controller('CreateCtrl', function ($scope,$http) {

    $scope.levels = [{
        id: 'basic',
        name: "Basic"
    }, {
        id: 'intermediate',
        name: "Intermediate"
    }, {
        id: 'advanced',
        name: "Advanced"
    }];
    $scope.qa = {
      id : '',
      question:'',
      answer : '',
      tags : '',
      versions : '',
      level : 'basic',
      learningStatus : 'false'
    }

    $scope.saveModel = function(){
    //   $http.get("https://api.github.com/repos/Balagangadhar/qappdata/contents/java.json")
    //   .then(function(response) {
    //   atob(response.data.content);
    //   });
    // }
    console.log('save ');
            var req = {
                 method: 'PUT',
                 url: 'https://api.github.com/repos/Balagangadhar/qappdata/contents/java.json',
                 headers: {
                   'Content-Type':'application/x-www-form-urlencoded',
                    'Authorization': 'token 0e6b730156441574a4260734ae1315e073db304b',
                 },
                 data: {
                           "message": "my commit message",
                           "committer": {
                             "name": "Bala Gangadhar",
                             "email": "balagangadhar85@gmail.com"
                           },
                           "content": "bXkgdXBkYXRlZCBmaWxlIGNvbnRlbnRz",
                           "sha": "b55e0b96ad026ef6f51f909e65a979b8ad5557d8"
                         }
                }

      $http(req)
      .then(function(response){
        console.log(response)
      });
    }
  });
