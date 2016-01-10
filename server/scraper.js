/**
 * Website scraper
 */

 'use strict';

var cheerio = require('cheerio');
var parser = require('body-parser');
var req = require('request');

var config = require('./config');

module.exports = function(app){

  // Parse application/x-www-form-urlencoded
  app.use(parser.urlencoded({ extended: false }))

  // Except Post Data from from
  app.post('/results', function(request, response){
    // Except domain from the form
    var domain = request.body.domain;
    console.log("Domain: " + domain);

    // Get the information we need from domain
    req(domain, function(err, res, html){
      var $ = cheerio.load(html);

      // Scrape elements with text attribute
      var scrape = function(x, y) {
        
        $(x).filter(function(){
          // Define how to scrape
          if (y == 'text'){
            var x = $(this).text();
          }
          else if (y == 'attr:content'){
            var x = $(this).attr('content');
          }
          else if (y == 'attr:href'){
            var x = $(this).attr('href');
          }
          else if (y == 'attr:src'){
            var x = $(this).attr('src');
          }
          else if (y == 'attr:alt'){
            var x = $(this).attr('alt');
          }

          // Do stuff with the scraped data
          console.log(x);

        });
      };
      
      // Elements to scrape
      scrape('title', 'text');
      scrape('h1', 'text');
      scrape('meta[name=description]', 'attr:content');
      scrape('link[rel=icon]', 'attr:href');
      scrape('img', 'attr:src');
      scrape('img', 'attr:alt');

    });

    // Redirect to /results
    response.render('results', {
      domain: domain
    });
  });
};