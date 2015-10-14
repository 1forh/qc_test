// Dependencies
var express = require('express');
var path = require('path');
var fs = require('fs');
var handlebars = require('express-handlebars');  
var request = require('request');
var cheerio = require('cheerio');

// App.js Variables
var	app = express();
var viewsPath = path.join(__dirname, '/views');
	app.use(express.static(__dirname + '/public'));

// Custom Libraries - ./ signals to node not to look in the node_modules directory
// var fortune = require('./lib/fortune');
var data = require('./scraper');

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

app.get('/the_test', function(request, response) {
	response.render('the_test');
});

// Writes the domain entered in the form to app/data/domain.txt
app.post('/process', function(request, response){
	var domain = request.body.domain;
		
		fs.writeFile('data/domain.txt', domain, function (err) {
		  if (err) return console.log(err);
		  console.log('Your domain has been saved!');;
		});
	
	response.render('./results', {
		domain: domain
	});
});

// Routes require
var routes = require('./routes');
app.use('/', routes);
app.use('/results', routes);
// app.use('/scrape', routes);

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});


module.exports = app;