angular.module('mediaPlayer', ['customServices'])
/**
 * factory
 * @name mediaPlayer.factory:mediaService
 * 
 * @description
 * this factory provides consistent information about the selected/playing song to the search component (through the main controller), 
 * the mediaDisplayer directive (that dislplays the selected song in the desktop view) and the two instances of the mediaPlayer
 * directive (one instance used for the desktop view and the other instance used for the mobile view)
 * this factory keeps all the application parts in sync
 * 
 * @dependencies
 * depends on music resource service to do the lookup operation on iTunes API
 */
.factory("mediaService", function(musicResource){
    
    var selectedSong = {};
    var albumSongs = [];
    var playingSongId = "";
    var audioPlayer = null;
    var smallScreen = false;
    return{
        setAudioPlayer: function(player){
            audioPlayer = player;
        },
        setSmallScreen: function(isSmallScreen){
            smallScreen = isSmallScreen;
        },
        /**
         * method
         * @name setSelectedSong
         * 
         * @methodOf mediaService
         * 
         * @description
         * this method handles user tapping on a song to display or play it for desktop and mobile screens respectively.
         * it gets the other songs in the album just in case and in case of small screen plays the song.
         * 
         */
        setSelectedSong: function(song){
            selectedSong = song;
            musicResource.query({queryType: 'lookup', queryCriterion: 'id', query: selectedSong.collectionId, entity: 'song'}, function(data){
                albumSongs = data.results;
            });
            if(smallScreen){
                this.toggleSong();
            }
        },
        /**
         * method
         * @name toggleSong
         * 
         * @methodOf mediaService
         * 
         * @description
         * this method handles user clicks on the toggle button.
         * it is responsible for feeding the audio player with its source, playing/pausing the song and keeping mediaService
         * aware of whether there is a playing song.
         * 
         */
        toggleSong: function(){
            if(playingSongId === "" || playingSongId !== selectedSong.trackId){
                if(audioPlayer.src !== selectedSong.previewUrl){
                    audioPlayer.src = selectedSong.previewUrl;
                }
                audioPlayer.play();
                playingSongId = selectedSong.trackId;
            }else{
                audioPlayer.pause();
                playingSongId = "";
            }
        },
        /**
         * method
         * @name toggleSongButtonSaysPlay
         * 
         * @methodOf mediaService
         * 
         * @description
         * this method returns true when the media player toggle button text should say Play.
         * the toggle button should say play when a new song has just been displayed or when the user pauses a playing song.
         * the toggle button should say pause if a song is playing but only if the playing song is the selected song too.
         * 
         */
        toggleSongButtonSaysPlay: function(){
            if(playingSongId == "" || playingSongId != selectedSong.trackId){
                return true;
            }else{
                return false;
            }
        },
        getAlbumSongs: function(){
            return albumSongs;
        },
        getSelectedSongId: function(){
            return selectedSong.trackId;
        },
        getAlbumPictureUrl: function(){
            return selectedSong.artworkUrl100;
        },
        getSongPreviewUrl: function(){
            return selectedSong.previewUrl;
        },
        setPlayingSongId: function(songId){
            playingSongId = songId;
        },
        getPlayingSongId: function(){
            return playingSongId;
        }
    }
})
/**
 * directive
 * @name mediaPlayer.directive:mediaPlayer
 * @restrict E
 * 
 * @description
 * this directive is resposible for letting the user play/pause music and maintaining the playing song even if another was 
 * selected and displayed.
 * 
 * @dependencies
 * depends on mediaService which supplies the directive with information about the selected and playing song(s).
 */
.directive("mediaPlayer", function(mediaService, $window){
    return{
        restrict: "E",
        templateUrl: "components/mediaPlayer/mediaPlayer.html",
        link: function($scope, $element, $attrs){
            /**
             * behavior
             * @name toggleButtonSaysPlay
             * 
             * @behaviorOf mediaPlayer
             * 
             * @description
             * this behavior uses mediaService to specify if the toggle button title should say Play
             * 
             */
            $scope.toggleButtonSaysPlay = function(){
                return mediaService.toggleSongButtonSaysPlay();
            }

            /**
             * behavior
             * @name toggle
             * 
             * @behaviorOf mediaPlayer
             * 
             * @description
             * this behavior uses mediaService to handle user clicks on the toggle button
             * 
             */
            $scope.toggle = function(){
                mediaService.toggleSong()
            }
        }
    };
})
/**
 * directive
 * @name mediaPlayer.directive:mediaDisplayer
 * @restrict E
 * 
 * @description
 * this directive is resposible for displaying the selected song in case of desktop screen
 * 
 * @dependencies
 * depends on mediaService which supplies the directive with information about the selected song.
 */
.directive("mediaDisplayer", function(mediaService){
    return{
        restrict: "E",
        templateUrl: "components/mediaPlayer/mediaDisplayer.html",
        link: function($scope, $element){
            
            
            /**
             * behavior
             * @name getAlbumSongs
             * 
             * @behaviorOf mediaDisplayer
             * 
             * @description
             * this behavior uses the mediaService to get the album songs for the selected song for the desktop view.
             * 
             */
            $scope.getAlbumSongs = function(){
                return mediaService.getAlbumSongs();
            }
            /**
             * behavior
             * @name getAlbumPictureUrl
             * 
             * @behaviorOf mediaDisplayer
             * 
             * @description
             * this behavior uses the mediaService to get the album picture for the selected song for the desktop view.
             * 
             */
            $scope.getAlbumPictureUrl = function(){
                return mediaService.getAlbumPictureUrl();
            }
        }
    };
});;