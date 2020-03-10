const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");

const tsProject = ts.createProject("tsconfig.json");

gulp.task("default", _ => {
  gulp.src([
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.css',
  ]).pipe(gulp.dest('build'));
  return tsProject.src()
    .pipe(tsProject())
    .js
      .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest("build"));
});
