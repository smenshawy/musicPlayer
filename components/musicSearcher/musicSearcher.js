angular.module('musicSearcher', ['customFilters', 'customServices'])
.constant("activeClass", "active")
.constant("pageSize", 5)
/**
 * directive
 * @name musicSearcher.directive:musicSearcher
 * @restrict E
 * @scope
 * @param {string} playingSongId input so that the directive can mark the playing song
 * @param {expression} selectSongFn expression evaluated at the controller's scope when the user taps a song
 * 
 * @description
 * this directive is resposible for letting the user search iTune songs by artist and display paginated list of search results.
 * 
 * @dependencies
 * depends on music resource service to do the search operation on iTunes API
 */
.directive("musicSearcher", function(musicResource, activeClass, pageSize){
    return{
        restrict: "E",
        templateUrl: "components/musicSearcher/musicSearcher.html",
        scope: {
            playingSongId: "=playingSongId",
            selectSongFn: "&selectSong"
        },
        link: function($scope){
            $scope.selectedPage = 1;
            $scope.pageSize = pageSize;
            $scope.selectPage = function (newPage) {
                $scope.selectedPage = newPage;
            }
            $scope.getPageClass = function (page) {
                return $scope.selectedPage == page ? activeClass : "";
            }
            $scope.query = '';
            /**
             * registers a hanlder that will be notified whenever the user changes the search keywords.
             * The registered function will use musicResource service to search for songs.
             */
            $scope.$watchCollection('query', function() {
                if ($scope.query.length > 0) {
                    musicResource.query({ queryType: 'search', queryCriterion: 'term', query: $scope.query, media: 'music', entity: 'song', attribute: 'artistTerm'}, function(data) {
                        $scope.artistSongs = data.results;
                        $scope.selectedPage = 1;
                    });
                } else {
                    $scope.artistSongs = [];
                }
            });
        }
    };
});