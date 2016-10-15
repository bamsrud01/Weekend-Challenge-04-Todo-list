//  Import node modules
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//  Router for tasks
var tasks = require('./routes/tasks');

//  Middleware functions
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//  Use router
app.use('/tasks', tasks);

//  Serve index page at '/'
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

//  Set port variable in preparation for deployment
var port = process.env.PORT || 3000;
var server = app.listen(port, function(){
  console.log('Listening on port', server.address().port);
});
