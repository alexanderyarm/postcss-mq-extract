var postcss = require('gulp-postcss');
var gulp = require('gulp');
var mqExtract = require('./index');

gulp.task('default', function () {
    var processors = [
        mqExtract({
            dest: 'css/generated',
            match: '(min-width: 768px)', 
            postfix: '-tablet',
        })
    ];
    return gulp.src('./css/source/test.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./css/generated'));
});