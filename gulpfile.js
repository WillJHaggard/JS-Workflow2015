var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
// js plugins
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// image plugins
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
// live-reload/server
var browserSync = require('browser-sync');
    // postcss containers
var postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnext = require('cssnext'),
    precss = require('precss'),
    sourcemaps = require('gulp-sourcemaps'),
    lost = require('lost');
/*
    Gulp has 4 top level functions:
        gulp.task - defines your tasks; arguments are (name, deps, fn)
        gulp.src - points to the files we want to use; params are (globs, optional options object)
        gulp.dest - points to the output folder we want to write files to
        gulp.watch - two forms; return an EventEmitter that emits change events; (glob, optional options object, array of tasks)
*/

// What a gulp task looks like with gutil
gulp.task('default', function() {
    gutil.log('YO');
});






