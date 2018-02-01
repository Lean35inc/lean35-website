var db = require('./config/db');
db.initialize();

var express = require("express"),
  routes = require('./routes'),
  api = require('./routes/api');

var app = express();
app.use(express.logger());

// Configuration

app.configure(function(){

  app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
  app.use(express.favicon(__dirname + '/public/img/favicon.ico')); 
  app.use(function(req, res){
    res.render('layout.html')
  });

  app.engine('html', require('ejs').renderFile);
});

app.get('/', function(request, response) {
  //response.send('<html><body><h1>http://www.lean35.com is under construction!!!</h1></body></html>');
  response.render('layout.html')
});

// app.get('/:name', function(request, response) {
//   var name = request.params.name;
//   //response.render(name+'.html');
//   response.render(name);
// });

app.get('/templates/:name', function(request, response) {
  var name = request.params.name;
  response.render('templates/' + name + '.html');
});

app.get('/partials/:name', function(request, response) {
  var name = request.params.name;
  response.render('partials/' + name + '.html');
});

// JSON API

app.post('/api/ticket', api.ticket);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
