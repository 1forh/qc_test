// Dependencies
var express = require('express');
var path = require('path');
var fs = require('fs');
var handlebars = require('express-handlebars');  
var requestNPM = require('request');
var cheerio = require('cheerio');

// App.js Variables
var	app = express();
var viewsPath = path.join(__dirname, '/views');
	app.use(express.static(__dirname + '/public'));

// Custom Libraries - ./ signals to node not to look in the node_modules directory
// var fortune = require('./lib/fortune');


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

	console.log("Domain: " + domain);
		
	requestNPM(domain, function(err, res, html){
    if(!err){
      $ = cheerio.load(html);
      var json = { title: "", description: "", keywords: "", favicon: "", header: "", srcTag: "", altTag: ""};
			// Grab title tag
			$('title').filter(function(){
				var data = $(this);
				var title = data.text();
				json.title = title;
			});
			// Grab meta description
			$('meta[name=description]').filter(function(){
				var data = $(this);
				var description = data.attr("content");
				json.description = description;
			});
			// Grab meta keywords
			$('meta[name=keywords]').filter(function(){
				var data = $(this);
				var keywords = data.attr("content");
				json.keywords = keywords;
			});
			// Grab favicon path
			$('link[rel=icon]').filter(function(){
				var data = $(this);
				var favicon = data.attr('href');
				json.favicon = favicon;
			});
			// Grab header - h1 tag
      $('h1').filter(function(){
        var data = $(this);
        var header = data.text();
        json.header = header;
        
      });
      $('img').filter(function(){
      	var data = $(this);
      	var srcTag = data.attr('src');
      	json.srcTag = srcTag;
      });
      $('img').filter(function(){
      	var data = $(this);
      	var altTag = data.attr('alt');
      	json.altTag = altTag;
      });
      

    } 
    response.render('./results', {
			domain: domain,
			title: json.title,
			description: json.description,
			keywords: json.keywords,
			favicon: json.favicon,
			header: json.header,
			srcTag: json.srcTag,
			altTag: json.altTag
		});
    console.log(json);
    console.log("Check for results in a browser");
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