/**
 * Form handler
 */

 'use strict';

var parser = require('body-parser');
var req = require('request');

var scraper = require('./scraper');

module.exports = function(app){

  // Parse application/x-www-form-urlencoded
  app.use(parser.urlencoded({ extended: false }));

  // Except Post Data from from
  app.post('/results', function(request, response) {

     // Except domain from the form
    var domain = request.body.domain;
    console.log("Domain: " + domain);

    // Scrape the domain with scraper.js
    req(domain, scraper.scrape);

    // Redirect to /results
    response.render('results');
  });
};