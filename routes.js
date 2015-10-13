// Dependencies
var express = require('express');
var path = require('path');
var handlebars = require('express-handlebars');  

// Custom Libraries - ./ signals to node not to look in the node_modules directory
var fortune = require('./app/lib/fortune.js');

// App.js Variables
var	app = express();
var viewsPath = path.join(__dirname, '/app/views');
module.exports = {
	app.get('/', function(request, response){
		response.render('home');
	});

	// thank-you
	app.get('/results', function(requestion, response){
		response.render('results');
	});
	// // route - about
	// app.get('/about', function(request, response){
	// 	response.render('about', { 
	// 		fortune: fortune.getFortune(), 
	// 		pageTestScript: '/tests/about.js' 
	// 	});
	// });

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
};