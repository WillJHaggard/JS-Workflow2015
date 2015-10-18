var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnext = require('cssnext'),
    precss = require('precss'),
    sourcemaps = require('gulp-sourcemaps'),
    lost = require('lost'),
    browserSync = require('browser-sync');

/*
    Gulp has 4 top level functions:
        gulp.task - defines your tasks; arguments are (name, deps, fn)
        gulp.src - points to the files we want to use; params are (globs, optional options object)
        gulp.dest - points to the output folder we want to write files to
        gulp.watch - two forms; return an EventEmitter that emits change events; (glob, optional options object, array of tasks)
*/

// What a gulp task looks like with gutil
gulp.task('default', ['watch']); // this means "gulp" will now run watch

gulp.task('lint', function() {
    return gulp.src('src/javascript/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', ['browserSync', 'css', 'lint'], function() {
    gulp.watch('src/javascript/**/*.js', ['lint']);
    gulp.watch('src/stylesheets/**/*.css', ['css']);
});

// live-reload with browser-sync
gulp.task('browserSync', function(){
    browserSync({
        server: {
            baseDir: './'
        },
        port: 8080,
        open: true,
        notify: false
    })
});


// postcss task
gulp.task('css', function() {
    var processors = [
        autoprefixer,
        cssnext,
        precss,
        lost
    ];

    return gulp.src('src/stylesheets/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('././public/assets/stylesheets'))
        .pipe(gulp.dest('././public/assets/stylesheets'))
        .pipe(browserSync.reload({
            stream: true
        }))
});