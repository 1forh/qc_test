var express = require('express');
var path = require('path');
var handlebars = require('express-handlebars');  

var	app = express();
var viewsPath = path.join(__dirname, '/app/views');
	
	app.use(express.static(__dirname + '/app/public'));

	// Set up handlbars view engine
	app.set('views', viewsPath);
	var hbs = handlebars.create({  
	  defaultLayout: 'main',  
	  layoutsDir: viewsPath + '/layouts',  
	  partialsDir: viewsPath + '/partials'
	});
	app.engine('handlebars', hbs.engine);  
	app.set('view engine', 'handlebars'); 

	// set the port - 3000
	app.set('port', process.env.PORT || 3000);

	// route - index
	app.get('/', function(request, response){
		response.render('home');
	});

	// custom 404 page
	app.use(function(request, response){
		response.status(404);
		response.render('404');
	});
	// custom 500 page
	app.use(function(error, request, response, next){
		console.error(error.stack);
		response.status(500);
		response.render('500');
	});

	app.listen(app.get('port'), function(){
		console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
	});