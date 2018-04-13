var gulp = require('gulp');
var ejs = require("gulp-ejs");

gulp.task('ejs', function () {
    return gulp.src("./views/index.ejs")
        .pipe(ejs({}, {}, { ext: '.html' }))
        .pipe(gulp.dest("./static"));
});