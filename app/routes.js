var express = require('express');
var router = express.Router();

// route - index
router.get('/', function(request, response){
	response.render('home');
});

// route - results
router.get('/results', function(request, response){
	response.render('results');
});

// // scraper
// router.get('/scrape', function(request, response){
// 	response.redirect(303, '/results');
// });

// // route - about
// app.get('/about', function(request, response){
// 	response.render('about', { 
// 		fortune: fortune.getFortune(), 
// 		pageTestScript: '/tests/about.js' 
// 	});
// });

// custom 404 page
router.use(function(request, response){
	response.status(404);
	response.render('404');
});
// custom 500 page
router.use(function(error, request, response, next){
	console.error(error.stack);
	response.status(500);
	response.render('500');
});


module.exports = router;