var express = require('express');
var fs = require('fs');
var obj;
var showResults = express();

fs.readFile('./results.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  console.log(obj);

  
});


