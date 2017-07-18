# musicPlayer
## supported browsers: Google Chrome 59.
## supported features:
### mobile:
#### search by artist and displays the search results on screen. CHECK
#### Each song’s title, artist, album and album art should be displayed. CHECK
#### When we tap a song, a media player should show up at the bottom of the screen and start to play the preview for that song. The media player may be something as simple as a toggling play or pause button, however, it should pop-up at the bottom of the screen and on top of the list as shown. CHECK
#### The media player should only show once a song is clicked and should stay on the screen from that point onwards and should be reused for any subsequent song played. CHECK
#### When a song is being played, you must provide some indicator in the list item that the song is being played. CHECK
#### If a new search is performed, the previous song keeps playing. CHECK
### desktop:
#### Each song’s title, artist, album and album art should be displayed. CHECK
#### When a song is selected on desktop, the screen should split and on the right hand side we should see the album art (large image) and music controls. CHECK
#### The selected song’s preview should not play automatically, it should simply display the details and let to user play the song preview if they wish. CHECK
#### Below the music controls, all the songs in the album should be listed. CHECK
#### The music control only needs to have play and pause however the music should keep playing even if a different song is selected on the left hand side. CHECK
#### If a song is playing and a different song is selected from the left hand side, the song should keep playing, however the right hand side should display details for the song selected. CHECK
#### There should be some visual indication on the song playing.
#### If a new search is performed, the previous song keeps playing. CHECK
### Extra features: 
#### Simple pagination with 5 songs per page just for demonstration. 
#### I wanted to paginate my requests to the web service too but it is not supported.
###  Requirements to build the app. you just might need node.js to create server.
###  Instructions to build and deploy the app: just create a server to serve up the files in the musicPlayer repository. 
#### A simple web server will suffice, and I create one using a Node.js module called Connect. Run the following commands:
##### npm install connect
##### npm install serve-static
#### included a server.js file, This simple file creates a basic web server that will respond to requests on port 5000 and serve up files contained in its parent folder.
#### To start the web server, run the following command from the Node.js installation directory: node server.js

