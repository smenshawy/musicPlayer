
angular.module('musicPlayer')
.controller('musicPlayerCtrl', function($scope) {
  $scope.selectSong = function(song){
    $scope.songSelected = true;
  }
});