/**
 * controller
 * @name musicPlayer.controller:musicPlayerCtrl
 * 
 * @description
 * The main and only controller in the module, acting as a conduit between the 2 components used for searching for music 
 * and playing it respectively.
 * 
 * @dependencies
 * mediaService: responsible for supplying the different application parts with cosistent information about the currently 
 * selected and playing song(s)
 */
angular.module('musicPlayer')
.constant("smallScreenWidth", "768")
.controller('musicPlayerCtrl', function($scope, mediaService, smallScreenWidth, $rootScope) {

  /**
   * I wanted to avoid working with objects from the DOM directly but the other approach would be to have 2 audio controls, 
   * one for displaying and the other for playing in case a song was seleced to be displayed while the previous one was still
   * running. but that approach would be really complex because I would have to keep swaping them whenever a song is played and
   * another is displayed (the control for display will be used for playing and the other control will be used for display).
   * also I know i should keep UI away from services but the audio player is not visible so it just does some functionality needed
   * to be central and consistent for usage by more than one component of the application and the other cleaner approach would be 
   * really complex.
   */
    var audioPlayer = document.getElementById("audioPlayer");
  
    mediaService.setAudioPlayer(audioPlayer);


  /**
 * behavior
 * @name selectSong
 * 
 * @behaviorOf musicPlayerCtrl
 * 
 * @description
 * this behavior is called from the musicSearcher directive when the user taps on one of the search results songs.
 * it feeds the mediaService with the screen width, audio player object and selected song then it shows the media player components.
 * 
 * @param {object} song the song tapped by the user
 * 
 */
  $scope.selectSong = function(song){
    /**
     * screen size is reset just in case the user started with big screen then restored it down, it will act responsiviely 
     * for example if the user resored the screen down then tapped a song it will start playing automaically rather then just 
     * get displayed
     */
    mediaService.setSmallScreen(window.innerWidth <= parseInt(smallScreenWidth));
    audioPlayer.onended = function(){
      $scope.$apply('mediaService.toggleSong()');
    }
    mediaService.setSelectedSong(song);
    $scope.songSelected = true;
  }

/**
 * behavior
 * @name getPlayingSongId
 * 
 * @behaviorOf musicPlayerCtrl
 * 
 * @description
 * this behavior retreives the ID of the currently playing song and bind it to the playingSongId property on the musicSearcher 
 * directive so that it can indicate which song of the search results is playing
 * 
 * @param {object} song the song tapped by the user
 * 
 */
  $scope.getPlayingSongId = function(){
    return mediaService.getPlayingSongId();
  }


});