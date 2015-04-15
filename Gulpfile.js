/* global require, console, process, __dirname */

var Rev = require('gulp-rev-all');
var concat = require('gulp-concat');
var del = require('del');
var filter = require('gulp-filter');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var path = require('path');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var smaps = require('gulp-sourcemaps');
var tcache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap');

gulp.task('default', ['final']);

gulp.task('wiredep', function() {});

gulp.task('docs', shell.task([[
   'node_modules/jsdoc/jsdoc.js',
   '-d build/docs',
   './README.md',
   '-r src'
].join(' ')]));

gulp.task('clean', function(cb) {
    del('build', cb);
});

gulp.task('watch', ['default'], function() {
    gulp.watch(['src/**', 'public/**'], ['default', 'docs']);
    process.on('uncaughtException', function(err) {
        console.error(err);
    });
});

gulp.task('compile', ['templates'], function() {
    var sources = [
        'src/**/*.js',
        'build/templates.js',
        'build/components/foundation/js/foundation/foundation.js',
        'build/components/foundation/js/foundation/foundation.topbar.js'
    ];

    return gulp.src(sources)
        .pipe(smaps.init())
        .pipe(wrap('(function() { "use strict"; <%= contents %> })();'))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(smaps.write())
        .pipe(gulp.dest('build/inter'));
});

gulp.task('vet', function() {
    return gulp.src(['*.js', 'src/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jscs());
});

gulp.task('styles', function() {
    return gulp.src(['src/stylesheets/main.scss'])
        .pipe(smaps.init())
            .pipe(sass({
                outputStyle: 'compressed',
                includePaths: ['build/components/foundation/scss']
            }))
        .pipe(smaps.write())
        .pipe(gulp.dest('build/inter'));
});

gulp.task('templates', function() {
    return gulp.src('src/templates/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(tcache({module: 'gotr'}))
        .pipe(gulp.dest('build'));
});

gulp.task('migration', function() {
    var sources = [
        'public/**',
        'build/components/angular/angular.min.js',
        'build/components/angular-route/angular-route.min.js',
        'build/components/jquery/dist/jquery.min.js'
    ];

    return gulp.src(sources)
        .pipe(gulp.dest('build/inter'));
});

gulp.task('merge', ['migration', 'templates']);

gulp.task('final', ['vet', 'styles', 'compile', 'merge'], function() {
    var onlyHtml = filter(['*.html']);

    var rev = new Rev({
        transformFilename: function(file, hash) {
            return 'assets/' + hash + path.extname(file.path);
        },

        dontRenameFile: [/^\/favicon.ico$/g, /^\/index.html/g]
    });

    return gulp.src(['build/inter/*'])
        .pipe(onlyHtml)
            .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(onlyHtml.restore())
        .pipe(rev.revision())
        .pipe(gulp.dest('build/final'))
        .pipe(rev.manifestFile())
        .pipe(gulp.dest('build'));
});

gulp.task('test', ['final'], function(done) {
    var karma = require('karma').server;

    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    });
});
