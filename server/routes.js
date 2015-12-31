/**
 * Main application routes
 */

'use strict';

module.exports = function(app){

  app.get('/', function(request, response){
    response.render('home');
  });

  app.get('/the_test', function(request, response) {
    response.render('the_test');
  });

  app.use(function(request, response){
    response.status(404);
    response.render('404');
  });

  app.use(function(request, response){
    response.status(500);
    response.render('500');
  });
  
};