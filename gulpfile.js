'use strict'

var gulp = require('gulp'),
		sass = require('gulp-sass'),
		plumber = require('gulp-plumber'),
		sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

var config = {
    local: "app/",
    dist: "dist/"
};

gulp.task('styles', function() {
	return gulp.src('app/scss/*.scss')
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

  gulp.watch("app/scss/*.scss", ['styles']);
  gulp.watch("app/*.html").on('change', browserSync.reload);

});

// Default task
gulp.task('default', ['serve']);