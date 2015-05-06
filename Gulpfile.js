/* global require, console, process, __dirname */

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var reactify = require('reactify');
var sass = require('gulp-sass');
// var smaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('default', ['bundle', 'styles', 'migrate']);

var b = browserify({
    cache: {},
    packageCache: {},
    entries: './scripts/main.js',
    debug: true,
    transform: [reactify]
});

gulp.task('bundle', bundle);

function bundle() {
    return b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist/build/scripts'));
}

gulp.task('watch', ['default'], function() {
    b = watchify(b);
    b.on('log', gutil.log);

    gulp.watch('scripts/**/*', ['bundle']);
    gulp.watch('styles/**/*', ['styles']);
    gulp.watch('public/**/*', ['migrate']);
});

gulp.task('migrate', function() {
    return gulp.src('public/**/*')
        .pipe(gulp.dest('dist/build'));
});

gulp.task('styles', function() {
    return gulp.src('styles/main.scss')
        .pipe(sass().on('error', gutil.log.bind(gutil, 'Sass Error')))
        .pipe(gulp.dest('dist/build/styles'));
});
