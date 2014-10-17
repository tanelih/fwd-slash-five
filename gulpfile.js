'use strict';

var gulp       = require('gulp');
var less       = require('gulp-less');
var source     = require('vinyl-source-stream');
var reactify   = require('reactify');
var browserify = require('browserify');

gulp.task('html', function() {
	return gulp.src('./index.html')
		.pipe(gulp.dest('./app/public/'));
});

gulp.task('vendor', function() {
	return gulp.src('./bower_components/bootstrap/fonts/**/*')
		.pipe(gulp.dest('./app/public/fonts'));
});

gulp.task('static', ['vendor', 'html']);

gulp.task('less', function() {
	return gulp.src('./src/less/styles.less')
		.pipe(less({
			'paths': ['./bower_components/'],
		}))
		.pipe(gulp.dest('./app/public/css/'));
});

gulp.task('browserify', function() {
	return browserify('./src/jsx/main.jsx')
		.transform(reactify).bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./app/public/js/'));
});

gulp.task('build', ['static', 'less', 'browserify']);

gulp.task('default', ['build'], function() {
	gulp.watch('./src/jsx/**/*.jsx',   ['browserify']);
	gulp.watch('./src/less/**/*.less', ['less']);
});
