/* global require, console, process, __dirname */

var Rev = require('gulp-rev-all');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var cssmin = require('gulp-minify-css');
var gfilter = require('gulp-filter');
var gulp = require('gulp');
var gutil = require('gulp-util');
var htmlmin = require('gulp-htmlmin');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var path = require('path');
var reactify = require('reactify');
var sass = require('gulp-sass');
var smaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

gulp.task('default', ['bundle', 'styles', 'migrate']);

var b = browserify({
    cache: {},
    packageCache: {},
    entries: './scripts/main.js',
    debug: true,
    transform: [reactify]
});

b.require('./node_modules/browserify-zepto', {expose: 'jquery'});
b.require('./node_modules/lodash', {expose: 'underscore'});

function bundle() {
    return b.bundle()
        .on('error', function(err) {
            gutil.log('Browserify: ', err.toString());
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist/build'));
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
        .pipe(gulp.dest('dist/build'));
});

gulp.task('final', ['default'], function() {
    var onlyJavaScript = gfilter('**/*.js');
    var onlyHtml = gfilter('**/*.html');
    var onlyCss = gfilter('**/*.css');

    var rev = new Rev({
        transformFilename: function(file, hash) {
            return 'assets/' + hash + path.extname(file.path);
        },

        dontRenameFile: [/^\/favicon.ico$/g, /^\/index.html/g]
    });

    return gulp.src('dist/build/**')
        .pipe(onlyJavaScript)
            .pipe(uglify())
        .pipe(onlyJavaScript.restore())
        .pipe(onlyHtml)
            .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(onlyHtml.restore())
        .pipe(onlyCss)
            .pipe(cssmin())
        .pipe(onlyCss.restore())
        .pipe(rev.revision())
        .pipe(gulp.dest('dist/final'));
});
