/* global require, console, process, __dirname */

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var reactify = require('reactify');
var sass = require('gulp-sass');
var smaps = require('gulp-sourcemaps');
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

// this is substack's fault:
b.exclude('jquery');
b.exclude('underscore');
// ...all aboard the substack-hate-train

function bundle() {
    return b.bundle()
        .on('error', function(err) {
            gutil.log('Browserify: ', err.toString());
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist/build/scripts'));
}

gulp.task('bundle', bundle);

gulp.task('watch', function() {
    b = watchify(b);

    return gulp.run('startwatch');
});

gulp.task('startwatch', ['default'], function() {
    b.on('log', gutil.log);
    b.on('update', function() {
        gulp.run('bundle');
    });

    gulp.watch('styles/**/*', ['styles']);
    gulp.watch('public/**/*', ['migrate']);
});

gulp.task('migrate', function() {
    return gulp.src('public/**/*')
        .pipe(gulp.dest('dist/build'));
});

gulp.task('styles', function() {
    return gulp.src('styles/main.scss')
        .pipe(smaps.init())
        .pipe(sass().on('error', gutil.log.bind(gutil, 'Sass Error')))
        .pipe(smaps.write())
        .pipe(gulp.dest('dist/build/styles'));
});
