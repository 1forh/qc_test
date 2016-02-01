/**
 * Website scraper
 */

'use strict';

var cheerio = require('cheerio');

module.exports = function(html) {
  var $ = cheerio.load(html);

  var scrape_text = function(el) {
    var result;

    $(el).filter(function() {
      result = $(this).text();
    });

    return result;
  };

  var scrape_attr = function(el, attr) {
    var result;

    $(el).filter(function(){
        result = $(this).attr(attr);
      });

    return result;
  };

  var scrape_images = function(attr) {
    var images = [];

    $('img').each(function(i, elem) {
      images[i] = $(this).attr(attr);
    });

    images.join(', ');
    return images;
  };

  var scrape_analytics = function() {
    var ga = 'script:contains("analytics.js")';
    var result;

    $(ga).filter(function() {
      result = $(this).text();
    });

    if(result !== undefined){
      return result;
    }
    else {
      result = 'You don\'t have analytics.';

      return result;
    }
  };

  var results = {
    title: scrape_text('title'),
    h1: scrape_text('h1'),
    description: scrape_attr('meta[name=description]', 'content'),
    favicon: scrape_attr('link[rel=icon]', 'href'),
    image_src: scrape_images('src'),
    image_alt: scrape_images('alt'),
    analytics: scrape_analytics()
  };

  return results;
};