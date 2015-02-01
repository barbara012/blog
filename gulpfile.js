var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('release', function () {
    gulp.src('./public/javascripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/dest'));
});
