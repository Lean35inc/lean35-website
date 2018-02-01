
/**
 * Module dependencies.
 */

var db = require('./config/db');
db.initialize();

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api');

var app = module.exports = express();

// Configuration

app.configure(function(){
  // app.set('views', __dirname + '/views');
  // app.set('view engine', 'html');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API

app.get('/api/name', api.name);

app.get('/api/article/:name', api.article)
// redirect all others to the index (HTML5 history)
//app.get('*', routes.index);

// Start server

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
