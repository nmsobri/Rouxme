'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

/*we'd need a slight delay to reload browsers connected to browser-sync after restarting nodemon*/
var BROWSERSYNC_RELOAD_DELAY = 250;

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        script: 'app.js',
        ext: 'js json css html',
        ignore: ['.git','node_modules/**/*.*']
    })
        .on('start', function() {
            if (!called) { cb(); }
            called = true;
        })
        .on('restart', function() {
            setTimeout(function() {
                browserSync.reload({stream: false});
            }, BROWSERSYNC_RELOAD_DELAY);
        });
});

gulp.task('browser-sync', ['nodemon'], function () {

    /*for more browser-sync config options: http://www.browsersync.io/docs/options/*/
    browserSync.init({

        /*watch the following files; changes will be injected (css & images) or cause browser to refresh*/
        files: ['public/**/*.(js|css)', 'routes/**/*.js', 'views/**/*.html', './*.(js|json)'],

        /*original website at this address*/
        proxy: 'http://localhost',

        /*informs browser-sync to use the following port for the proxied app
         notice that the default port is 3000, which would clash with our expressjs*/
        port: 4000,

        /*open the proxied app in chrome*/
        browser: ['firefox']
    });
});


gulp.task('default', ['browser-sync']);
