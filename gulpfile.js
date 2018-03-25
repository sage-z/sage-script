var gulp = require("gulp");

// var browserify = require("browserify")
// var source = require("vinyl-source-stream")
// var tsify = require("tsify")


var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
    // return browserify({
    //     basedir: '.',
    //     debug: true,
    //     entries: ['src/index.ts'],
    //     cache: {},
    //     packageCache: {}
    // })
    // .plugin(tsify)
    // .bundle()
    // .pipe(source('zegapaiz.min.js'))
    // .pipe(gulp.dest("lib"));
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("lib"));
});
