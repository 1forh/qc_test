/**
 * Main application routes
 */

'use strict';

module.exports = function(app){

  // Create regular page routes
  var route = function(path, page) {
    app.get(path, function(req, res){
      res.render(page);
    });
  };

  // Call route function for reach page in application
  route('/', 'home');
  route('/results', 'results');

  // Show 404 page and mark status as 404
  app.use(function(req, res){
    res.status(404);
    res.render('404');
  });

  // Show 500 page and mark status as 500
  app.use(function(req, res){
    res.status(500);
    res.render('500');
  });
  
};