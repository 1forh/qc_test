/**
 * Main application file
 */

'use strict';

var handlebars = require('express-handlebars');  
var path = require('path');
var express = require('express');

var app = express();
var views = path.join('./client/views');

// Require applications folders and files
require('./form')(app);
require('./routes')(app);

// Require static files
app.use(express.static(__dirname + '/assets'));

// Set up handlbars view engine
var hbs = handlebars.create({  
  defaultLayout: 'main',  
  layoutsDir: views + '/layouts',  
  partialsDir: views + '/partials'
});

app.set('views', views);
app.engine('handlebars', hbs.engine);  
app.set('view engine', 'handlebars'); 

app.set('port', process.env.PORT || 3000);

// Set up the server
var server = app.listen(app.get('port'), function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Express started on http://localhost:' + port + '; press Ctrl-C to terminate.');
});

// Expose app
exports = module.exports = app;