angular.module('qappDataGeneratorApp')
  .controller('NavbarCtrl', function ($scope,$location) {
    $scope.isActive = function (viewLocation) {
         return $location.path()===viewLocation;
     };
  });
