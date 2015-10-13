// Dependencies
var express = require('express');
var path = require('path');
var handlebars = require('express-handlebars');  

// Custom Libraries - ./ signals to node not to look in the node_modules directory
var fortune = require('./app/lib/fortune');

// App.js Variables
var	app = express();
var viewsPath = path.join(__dirname, '/app/views');
	app.use(express.static(__dirname + '/app/public'));
var domain;


// set the port - 3000
app.set('port', process.env.PORT || 3000);

// Set up handlbars view engine
app.set('views', viewsPath);
var hbs = handlebars.create({  
  defaultLayout: 'main',  
  layoutsDir: viewsPath + '/layouts',  
  partialsDir: viewsPath + '/partials'
});
app.engine('handlebars', hbs.engine);  
app.set('view engine', 'handlebars'); 

// Form handling
app.use(require('body-parser').urlencoded({
	extended:true }));
app.get('/the_test', function(request, response){
	// dummy value for CSRF
	response.render('the_test', {
		csrf: 'CSRF token goes here'
	});
});
app.post('/process', function(request, response){
	domain = request.body.domain;
	console.log('Form (from querystring): ' + request.query.form);
	console.log('CSRF token (from hidden form field): ' + request.body._csrf);
	console.log('Domain: ' + domain);
	response.redirect(303, '/results');
});

// Routes require
var routes = require('./routes');
app.use('/', routes);
app.use('/results', routes);


app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

