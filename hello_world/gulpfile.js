var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('compile-sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('move-js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/popper.min.js'])
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('move-html', function() {
    return gulp.src(['src/index.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('launch-server', ['compile-sass', 'move-js', 'move-html'], function() {
    browserSync.init({
        server: './dist'
    })
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['compile-sass'])
    gulp.watch('./src/*.html', ['move-html']);
    gulp.watch('./src/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['launch-server']);