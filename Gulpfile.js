var Rev = require('gulp-rev-all');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var tcache = require('gulp-angular-templatecache');
var jshint = require('gulp-jshint');
var path = require('path');
var smaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap');

gulp.task('default', ['compile', 'merge']);

gulp.task('clean', function(cb) {
    del('build', cb);
});

gulp.task('watch', ['default'], function() {
    gulp.watch(['src/**', 'public/**'], ['default']);
});

gulp.task('compile', ['templates'], function() {
    return gulp.src(['app.js', 'src/**/*.js', 'build/templates.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jscs())
        .pipe(smaps.init())
        .pipe(wrap('(function() { "use strict"; <%= contents %> })();'))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(smaps.write())
        .pipe(gulp.dest('build/inter'));
});

gulp.task('templates', function() {
    return gulp.src('src/templates/*.html')
        .pipe(tcache({module: 'gotr'}))
        .pipe(gulp.dest('build'));
});

gulp.task('migration', function() {
    return gulp.src(['public/**'])
        .pipe(gulp.dest('build/inter'));
});

gulp.task('merge', ['migration', 'templates']);

gulp.task('final', ['compile', 'merge'], function() {
    var rev = new Rev({
        transformFilename: function(file, hash) {
            return hash + path.extname(file.path);
        },

        dontRenameFile: [/^\/favicon.ico$/g, /^\/index.html/g]
    });

    return gulp.src(['build/inter/*'])
        .pipe(rev.revision())
        .pipe(gulp.dest('build/final'));
});
