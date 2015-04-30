/* global module, require */
var manifest = require('./build/rev-manifest');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'build/final/' + manifest['angular.min.js'],
            'build/final/' + manifest['angular-route.min.js'],
            'build/final/' + manifest['angular-animate.min.js'],
            'build/final/' + manifest['jquery.min.js'],
            'build/final/' + manifest['bundle.js'],
            'spec/**/*.js'
        ],
        exclude: [],
        preprocessors: {},
        reporters: ['dots'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    });
};
