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

// default run task for watching
gulp.task('default', ['browser-sync'], function() {
    gulp.watch('src/styles/**/*.css', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch("*.html", ['bs-reload']);
    gutil.log('YO');
});


// browser-sync
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    })
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});

// image tasks
gulp.task('images', function() {
    gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true  })))
        .pipe(gulp.dest('dist/images/'));
});

// styles with postcss
gulp.task('styles', function() {
    gulp.src(['src/styles/**/*.css'])
        .pipe(plumber({
            errorHandler: function (error) {
                 gutil.log(error.message);
                 this.emit('end');
            }}))
        //postcss stuff goes here
        .pipe(gulp.dest('dist/styles/'))
        .pipe(browserSync.reload({ stream: true }));
});

// scripts tasks
gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(plumber({
            errorHandler: function (error) {
                gutil.log(error.message);
                this.emit('end');
            }}))
        .pipe(jshint())
        .pipe(jshint.reporter('stylish'))
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(browserSync.reload({ stream: true  }));
});

















