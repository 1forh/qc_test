// Scrape the url that was posted
app.get('/scrape', function(req, res){
	// Let's scrape Anchorman 2
	url = 'http://zacharyminner.com';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			var header;
			var json = { header : ""};

			$('.hero-message').filter(function(){
        var data = $(this);
        header = data.children().first().text();

        json.header = header;
        
      })

      $('.star-box-giga-star').filter(function(){
      	var data = $(this);
      	rating = data.text();

      	json.rating = rating;
      })
		}

		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
    	console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
	})
});
