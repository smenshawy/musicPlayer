var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic("E://BCG//mediaplayer"));
app.listen(5000);