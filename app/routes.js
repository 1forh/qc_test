var express = require('express');
var router = express.Router();
var fs = require("fs");

// route - index
router.get('/', function(request, response){
  var article = [
      {
        url: "http://www.picturecorrect.com/tips/two-photographers-illegally-climb-the-new-tallest-building-in-china/",
        imgSrc: "images/nah.jpg",
        imgAlt: "nah",
        title: "Two photographers illegally climb the new tallest building in China",
        description: "Two Russian climbers, Vadim Makhorov and Vitaliy Raskalov, who have gained a reputation as fearless photog..."
      }
    ];
	response.render('home',{
    article: article,
    url: article.url,
    imgSrc: article.imgSrc,
    imgAlt: article.imgAlt,
    title: article.title,
    description: article.description

  });
});


// // scraper
// router.get('/scrape', function(request, response){
	
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