const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

// Server
gulp.task('server', function() {
  browserSync.init({
    server: {
      port: 9000,
      baseDir: "build"
    }
  });

  gulp.watch('build/**/*').on('change', browserSync.reload);
});

/* ------------ Pug compile --------------- */
gulp.task('templates:compile', function buildHTML() {
  return gulp.src('src/templates/index.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('build'));
});

/* ----------- Sass compile ----------- */
gulp.task('styles:compile', function () {
  return gulp.src('src/styles/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('build/css'));
});

/* --------  js -------- */
gulp.task('js', function() {
  return gulp.src([
        'src/js/navigation.js',
        'src/js/form.js',
        'src/js/main.js'
      ])
      .pipe(sourcemaps.init())
        .pipe(babel({
          presets: ['@babel/env']
        }))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('build/js'));
});

/* ----------- Spritesmith for imgs ------------ */
gulp.task('sprite', function (cb) {
  const spriteData = gulp.src('src/images/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../images/sprite.png',
    cssName: 'sprite.scss'
  }));

  spriteData.img.pipe(gulp.dest('build/images/'));
  spriteData.css.pipe(gulp.dest('src/styles/global/'));
  cb();
});

/* ----------- Cleaner ------------- */
gulp.task('clean', function del(cb) {
  return rimraf('build', cb)
});

/* ------------ Copy fonts ------------- */
gulp.task('copy:fonts', function() {
  return gulp.src('./src/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts'));
});

/* ------------ Copy images ------------- */
gulp.task('copy:images', function() {
  return gulp.src('./src/images/**/*.*')
    .pipe(gulp.dest('build/images'));
});

/* ------------ Copy ------------- */
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));

/* ------------ Watchers ------------- */
gulp.task('watch', function() {
  gulp.watch('src/templates/**/*.pug', gulp.series('templates:compile'));
  gulp.watch('src/styles/**/*.scss', gulp.series('styles:compile'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('templates:compile', 'styles:compile', 'js', 'sprite', 'copy'),
  gulp.parallel('watch', 'server')
  )
);