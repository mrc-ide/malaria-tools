var gulp = require('gulp'),
    ejs = require('gulp-ejs');

gulp.task('ejs', function () {
    return gulp.src("./views/index.ejs")
        .pipe(ejs({}, {}, {ext: '.html'}))
        .pipe(gulp.dest("./static"));
});

gulp.task('watch-ejs', function () {
    return gulp.watch("./+(views|static)/**/*",['ejs'])
});