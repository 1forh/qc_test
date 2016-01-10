/**
 * Website scraper
 */

 'use strict';

var cheerio = require('cheerio');

module.exports = {

  // Get the information we need from domain
  scrape: 
    function(err, res, html) {
      var $ = cheerio.load(html);

      var scraper = function() {
        console.log('Scraping...');
        
        $('title').filter(function() {
          var title = $(this).text();
          console.log(title);
        });

        $('meta[name=description]').filter(function() {
          var description = $(this).attr('content');
          console.log(description);
        });

      }();
    }
};