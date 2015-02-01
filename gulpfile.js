var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('release', function () {
    gulp.src(['./public/js/*.js', '!./public/js/*.min.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});
