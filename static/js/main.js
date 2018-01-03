(function () {
  'use strict';

  angular.module('D3App', ['d3'])
  .controller('PlotController', ['$scope', '$log', '$http',
    function($scope, $log, $http) {
    $scope.cData = [10, 20, 30, 40, 60];
    $scope.myX = [1, 2, 3, 4, 5];
    $scope.myY = [5, 6, 7, 8, 9];
    $scope.getResults = function() {
      $log.log($scope.url);
      var userInput = $scope.url;

      $http.post('/start', {"url": userInput})
        .success(function(results) {
          $log.log(results);
        })
        .error(function(error) {
          $log.log(error);
        });
    };
  }

  ]);

}());
