var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');

gulp.task('release', function () {
    gulp.src(['./public/js/*.js', '!./public/js/*.min.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('less', function () {
    gulp.src(['./public/stylesheets/*.less'])
        .pipe(less({
            compress: true
        }))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('coding', function () {

});
