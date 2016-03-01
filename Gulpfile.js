/* global require, console, process, __dirname */

var Rev = require('gulp-rev-all');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var cssmin = require('gulp-minify-css');
var ejs = require('gulp-ejs');
var envify = require('envify');
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
    transform: [reactify, envify]
});

b.require('./node_modules/lodash', {expose: 'underscore'});

function bundle() {
    return b.bundle()
        .on('error', function(err) {
            err = new gutil.PluginError('browserify', err);
            gutil.log(err.toString());
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist/build'));
}

gulp.task('bundle', ['landing'], bundle);

gulp.task('landing', function() {
    return browserify({entries: './scripts/landing.js'}).bundle()
        .on('error', function(err) {
            err = new gutil.PluginError('browserify', err);
            gutil.log(err.toString());
        })
        .pipe(source('landing.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist/build'));
});

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
    var onlyHtml = gfilter('**/*.html');

    return gulp.src('public/**/*')
        .pipe(onlyHtml)
            // so our HTML files can access environment variables
            .pipe(ejs({env: process.env}))
        .pipe(onlyHtml.restore())
        .pipe(gulp.dest('dist/build'));
});

gulp.task('styles', function() {
    return gulp.src('styles/*.scss')
        .pipe(smaps.init())
        .pipe(sass().on('error', function(err) {
            gutil.log(err.toString());
        }))
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

        // This is a whitelist of files to not be renamed.
        // It needs to be updated anytime we add a new HTML
        // page.
        //
        // TODO: robots.txt
        dontRenameFile: [
            /^\/favicon.ico$/g,
            /\/index.html/g,
            /\/app.html/g,
            /^\/login.html/g,
            /^\/signup-twitter/g
        ]
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
