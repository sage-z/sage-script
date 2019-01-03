var gulp = require("gulp");

var browserify = require("browserify")
var source = require("vinyl-source-stream")
var tsify = require("tsify"),
uglify = require('gulp-uglify')

var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json", { "declaration": true}),
    merge = require("merge2");

gulp.task("build-js", function () {
    const tsResult = tsProject.src()
        .pipe(tsProject())
    return merge([
        tsResult.dts.pipe(gulp.dest('types')),
        tsResult.js
            // .pipe(uglify(config.settings.uglify))
            // .pipe(debug({ title: " Distribution " }))
            // .pipe(sourcemaps.write(" . "))
            .pipe(gulp.dest("lib"))
    ]);
});

gulp.task("build-script", function () {
    const brow  = browserify({
        basedir: '.',
        debug: true,
        entries: ['src/index.ts'],
        cache: {},
        packageCache: {}
    })
    // console.log(brow)
    return brow
        .plugin(tsify)
        .bundle()
        .pipe(source('sage.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

gulp.task("build-md", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("lib"));
});
