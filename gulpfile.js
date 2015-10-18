var gulp = require('gulp'),
    gutil = require('gulp-util');

/*
    Gulp has 4 top level functions:
        gulp.task - defines your tasks; arguments are (name, deps, fn)
        gulp.src - points to the files we want to use; params are (globs, optional options object)
        gulp.dest - points to the output folder we want to write files to
        gulp.watch - two forms; return an EventEmitter that emits change events; (glob, optional options object, array of tasks)
*/

// What a gulp task looks like with gutil
gulp.task('default', function() {
   return gutil.log('This is the default task.');
});
