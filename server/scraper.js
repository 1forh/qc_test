/**
 * Website scraper
 */

 'use strict';

var cheerio = require('cheerio');
var parser = require('body-parser');

module.exports = {

  // Get the information we need from domain
  scrape: function(err, res, html){
    var $ = cheerio.load(html);

    // Scrape elements
    var scrape_filter = function() {
      console.log('Scraping...');

      $('title').filter(function(){
        var title = $(this).text();
        console.log(title);
      });

    }();
  }
};