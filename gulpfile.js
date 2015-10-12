'use strict';
var gulp = require('gulp'),
		sass = require('gulp-sass'),
		plumber = require('gulp-plumber'),
		sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

var config = {
    local: "app/",
    dist: "dist/"
};

gulp.task('styles', function() {
	return gulp.src('app/scss/*.scss')
  // place code for your styles task here
  .pipe(plumber())
  .pipe(sourcemaps.init())
  	.pipe(sass.sync({
   	 outputStyle: 'expanded',
    	precision: 10,
    	includePaths: ['.']
  	}).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.stream());

});
// Static server
gulp.task('serve', ['styles'], function(){

  browserSync.init({
    port: 9000,
    server: {
      baseDir: ['app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch("app/scss/*.scss", ['sass']);
  gulp.watch("app/*.html").on('change', browserSync.reload);

});

gulp.task('default', ['serve']);