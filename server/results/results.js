/**
 * Form handler
 */

 'use strict';

var parser = require('body-parser');
var req = require('request');

module.exports = function(app) {

  // Parse application/x-www-form-urlencoded
  app.use(parser.urlencoded({ extended: false }));

  // Except Post Data from from
  app.post('/results', function(request, response) {

     // Except domain from the form
    var domain = request.body.domain;
    console.log("Domain: " + domain);

    // Scrape the domain with scraper.js and return results object
    req(domain, function(error, res, html) {
      console.log('Scraping now...');
      
      // List the results dependencies
      var results =  require('./scraper')(html);
      
      console.log('Check the browser.');

      // Redirect to /results
      response.render('results', {
        domain: domain,
        title: results.title,
        description: results.description,
        h1: results.h1,
        favicon: results.favicon,
        imageSrc: results.image_src,
        imageAlt: results.image_alt,
        analytics: results.analytics
      });
    });
  });

};