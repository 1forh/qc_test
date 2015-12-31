/**
 * Website scraper
 */

 'use strict';

var cheerio = require('cheerio');
var parser = require('body-parser');
var req = require('request');

var config = require('./config');

module.exports = function(app){

  // Form handling
  app.use(parser.urlencoded({ extended:true } ) );

  app.post('/process', function(request, response){

    var domain = request.body.domain; // Get domain from form name="domain"

    console.log("Domain: " + domain); // Test for correct domain in console

    req(domain, function(error, res, html){
      var $ = cheerio.load(html);
      var title = 'title';

      $(title).filter(function(){
        var data = $(this);
        var title = data.text();
        config.element.title = title;
      });
      console.log(config.element);
    });

  });
};