var gulp = require('gulp');
var less = require('gulp-less');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var babelify = require("babelify");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

/*gulp.task('scripts', () => {
    console.log('wtf')
    browserify(['./public/javascripts/snapshoot.js'])
    .transform(babelify.configure({
        presets: [
            ["env", {
              "targets": {
                // The % refers to the global coverage of users from browserslist
                "browsers": [ ">0.25%", "not ie 11", "not op_mini all"]
              }
            }]
          ]
      }))
    .bundle()
    .pipe(source('bundle.js')
    .pipe(gulp.dest('./public/dist/scripts')));
    //.pipe(buffer())     // You need this if you want to continue using the stream with other plugins
  });
*/

gulp.task('browserify', function () {
    return browserify('./src/js/app.js')
        .transform(babelify.configure({
            presets: ["@babel/preset-env"],
            plugins: ["@babel/transform-runtime"]
        }))
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('public/build/'));
});

gulp.task('watch', function () {
  gulp.watch('./src/js/app.js', gulp.series('browserify'));
});