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

    // Save to json api
      

    // Extract website <title> from domain
      // Save to json api

    // Redirect to /results
    response.render('results', {
      domain: domain
    });
  });

      

};