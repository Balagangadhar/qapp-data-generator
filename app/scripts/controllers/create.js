'use strict';

/**
 * @ngdoc function
 * @name qappDataGeneratorApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the qappDataGeneratorApp
 */
angular.module('qappDataGeneratorApp')
  .controller('CreateCtrl', function ($scope,$http,$location,$ngBootbox) {
    $scope.params = $location.search();

    $scope.fullscreenAnswer = false;

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

    $scope.data = [];

    $scope.resetForm = function(){
      $scope.qa = {
        id : '',
        question:'',
        answer : '',
        tags : '',
        versions : '',
        level : 'basic',
        learningStatus : 'false'
      }
    }

    $scope.resetForm();
    $scope.onCancelBtnClick = function(){
      if($scope.data.length > 0){
        $ngBootbox.confirm('You have unsaved questions. Would you like to cancel?')
          .then(function() {
            $scope.navigateToHome();
          }, function() {
              console.log('Confirm dismissed!');
          });
      } else {
        $location.url('/');
      }
    }
    $scope.navigateToHome = function(){
      $scope.data = [];
      $location.url('/');
    }
    $scope.isNextVisible = function(){
      return $scope.params.mode==='batch';
    }
    $scope.isSubmitVisible = function(){
      return $scope.data.length>0;
    }
    $scope.addNext = function(){
      this.addModelToData();
      $scope.resetForm();
    }
    $scope.addModelToData = function(){
      $scope.data.push($scope.qa);
    }
    $scope.resetData = function(){
      $scope.data = [];
    }
    $scope.showMainForm = function(){
      return !$scope.fullscreenAnswer;
    }
    $scope.showFullscreenAnswer = function(fullscreenMode){
      return $scope.fullscreenAnswer;
    }
    $scope.toggleFullscreenMode = function(){
       $scope.fullscreenAnswer = ! $scope.fullscreenAnswer;
    }
    $scope.onKeyPress = function(event){
      if(event && event.which===115){
        this.toggleFullscreenMode();
      }
    }
    $scope.onAnswerLblClick = function(){
      console.log('ansewr');
    }
    $scope.onSaveBtnClick = function(){
      this.addModelToData();
      //var serverData =[] = $scope.getDataFromRemoteServer();
      var req = {
                 method: 'GET',
                 url: 'https://api.github.com/repos/Balagangadhar/qappdata/contents/'+$scope.params.technology+'.json?_rn='+Math.random()*100000000000000000,
                 headers: {
                   'Content-Type':'application/x-www-form-urlencoded',
                    'Authorization': 'token bdac66697a6a4e626437508289b6fd0c87cdceee',
                 }
                }

      $scope.getDataPromise = $http(req)//get("https://api.github.com/repos/Balagangadhar/qappdata/contents/java.json?_rn="+Math.random()*100000000000000000)
        .then(function(response) {
        var serverDataSha = response.data.sha;
        var serverDataContent =  JSON.parse(atob(response.data.content));
        var id = $scope.getMaxId(serverDataContent);
          for(var i=0;i<$scope.data.length;i++){
              var item = $scope.data[i];
               item.id = ++id;
              serverDataContent.push(item);
          }
          $scope.saveDataOnRemoteServer(btoa(JSON.stringify(serverDataContent)),serverDataSha);
        },function(failureResp){
          $ngBootbox.customDialog({
             message: failureResp.data.message,
             title : failureResp.statusText,
             className : 'error',
             size: 'small',
             buttons1: {
             warning: {
                 label: "OK"
             }
           }
       });

     }).finally(function() {
       console.log('final')
     });
    }
    $scope.saveDataOnRemoteServer = function(encodedDataTobeSaved,serverDataSha){
      var req = {
                 method: 'PUT',
                 url: 'https://api.github.com/repos/Balagangadhar/qappdata/contents/'+$scope.params.technology+'.json',
                 headers: {
                   'Content-Type':'application/x-www-form-urlencoded',
                    'Authorization': 'token bdac66697a6a4e626437508289b6fd0c87cdceee',
                 },
                 data: {
                           "message": "Commit From QAPP Generator",
                           "committer": {
                             "name": "Bala Gangadhar",
                             "email": "balagangadhar85@gmail.com"
                           },
                           "content": encodedDataTobeSaved,
                           "sha": serverDataSha
                         }
                }

      $scope.saveDataPromise = $http(req)
      .then(function(successResp){
        $ngBootbox.customDialog({
           message: 'Data has been saved on to remote server successfully.',
           title : 'Success',
           size: 'small',
           buttons: {
           success: {
               label: "OK",
               className: "btn-success"
           }
         }
       });
        $scope.resetData();
      },function(failureResp){
           $ngBootbox.customDialog({
              message: failureResp.data.message,
              title : failureResp.statusText,
              className : 'error',
              size: 'small',
              buttons1: {
              warning: {
                  label: "OK"
              }
            }
        });
      }).finally(function() {
        $scope.navigateToHome();
    });
    }
    $scope.getMaxId = function(dataArr){
      var maxId = 1;
      if(Array.isArray(dataArr) && dataArr.length>0){
        maxId = dataArr[dataArr.length-1].id
      }
      return maxId;
    }
  });
