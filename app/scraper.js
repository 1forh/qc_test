var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var scraper = express();
// Scrape the url that was posted
scraper.get('/scrape', function(req, res){
  // Scrape this
  var url = fs.readFileSync('data/domain.txt', 'utf8');

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      var header;
      var json = { header : ""};

      $('.hero-message').filter(function(){
        var data = $(this);
        header = data.children().first().text();

        json.header = header;
        
      });
    } else {
      console.log(error);
    }

    fs.writeFile('data/results.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    });

    res.send('Check your console!')
  });
});

scraper.listen(4000);
console.log('Magic happens on port 4000');
exports = module.exports = scraper;