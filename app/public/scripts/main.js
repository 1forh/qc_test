+'use strict'

var qc_test = function(){

		// Check html document for title tag and prints the contents
		var check_title_tag = function(){
	  	var titleTag = document.title;
	  	console.log("Title tag: " + titleTag);
	  }();

	  // Check HTML document Meta for description and keywords and prints the contents
	  var check_meta = function(){
	  	var description = undefined;
	  	var keywords = undefined;
	  	var nodeList = document.getElementsByTagName("meta");

	  	for ( var i = 0; i < nodeList.length; i++ ){
	  		var name = nodeList[i].getAttribute("name");

	  		if( ( name == "description") ) {
	  			description = nodeList[i].getAttribute("content");
	  			console.log("Description: " + description);

	  		}
	  		if( ( name == "keywords") ) {
	  			keywords = nodeList[i].getAttribute("content");
	  			console.log("Keywords: " + keywords);

	  		}
	  	}
	  }();

	  // Check HTML document for favicon and prints the path
	  var check_favicon = function(){
	    var favicon = undefined;
	    var nodeList = document.getElementsByTagName("link");

	    for ( var i = 0; i < nodeList.length; i++ ) {
        if( ( nodeList[i].getAttribute("rel") == "icon" ) || ( nodeList[i].getAttribute("rel") == "shortcut icon" ) ) {
          favicon = nodeList[i].getAttribute("href");
          console.log("Favicon path: " + favicon);

          if ( favicon == undefined ){
	        	console.log("Please add a favicon.");

	        }
        } 
		  }
	  }();

		// Check HTML document for H1 tags and prints the contents
	  var check_header = function(){
	  	var header = document.querySelector("h1").innerHTML;
	  	console.log("H1 Tag: " + header);
	  }();
	 
	  // Prints all image src tags and alt tags
	  var check_images = function(){
	  	var images = document.getElementsByTagName("img");
	  	
	  	for ( var i = 0; i < images.length; i++ ){
	  		var alt = images[i].getAttribute("alt"),
	  				src = images[i].getAttribute("src");

	  		console.log("Alt tags: " + alt);
				console.log("Src tags: " + src);
	  	}
	  }();
}();
