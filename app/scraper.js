var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var data = express();

// Scrape the url that was posted
data.get('/data', function(req, res){
  // Assign value of domain.txt to url variable
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
    } 

      res.json(json);
  });
});

data.listen(4000, function(){
  console.log('View endpoint at 4000/data');
});


module.exports = data;