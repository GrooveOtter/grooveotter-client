var Rev = require('gulp-rev-all');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var path = require('path');
var smaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap');

gulp.task('default', ['compile', 'merge']);

gulp.task('clean', function(cb) {
    del('build', cb);
});

gulp.task('compile', function() {
    return gulp.src(['src/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jscs())
        .pipe(smaps.init())
        .pipe(wrap('(function() { <%= contents %> })();'))
        .pipe(concat('build.js'))
        .pipe(uglify())
        .pipe(smaps.write())
        .pipe(gulp.dest('build'));
});

gulp.task('merge', function() {
    return gulp.src(['public/**'])
        .pipe(gulp.dest('build'));
});

gulp.task('revise', ['compile', 'merge'], function() {
    var rev = new Rev({
        transformFilename: function(file, hash) {
            return hash + path.extname(file.path);
        },

        dontRenameFile: [/^\/favicon.ico$/g, /^\/index.html/g]
    });

    return gulp.src(['build/**'])
        .pipe(rev.revision())
        .pipe(gulp.dest('build'))
        .pipe(rev.versionFile())
        .pipe(gulp.dest('build'));
});
