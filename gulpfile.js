var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var connect = require('gulp-connect');



gulp.task('styles', function() {
    gulp.src('./src/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css/'))
        .pipe(connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src('./node_modules/d3/build/d3.min.js')
    .pipe(concat('.src/js/app.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(connect.reload());
});

gulp.task('watch', function(){
  gulp.watch('./src/scss/**/*.scss',['styles'])
  .watch('.src/js/*.js', ['scripts']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('default', ['stles', 'scripts', 'connect', 'watch']);
