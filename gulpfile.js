const gulp = require('gulp');
const rev = require('gulp-rev');
const revFormat = require('gulp-rev-format');
const revDel = require('rev-del');
const del = require('del');
const fs = require('fs');
const replace = require('gulp-replace');

//打包 assets/images/icons/*.png 生成雪碧图 src/icons.png、src/icons.scss
gulp.task('sprite', () => {
  const spritesmith = require('gulp.spritesmith');

  return gulp
    .src('assets/images/icons/*.png')
    .pipe(
      spritesmith({
        imgName: 'icons.png',
        cssName: 'icons.scss',
        padding: 10,
        algorithm: 'binary-tree',
        cssTemplate: data => {
          return (
            data.sprites
              .map(sprite => {
                /* return `
            .icon-${sprite.name}{
              background-image: url("${sprite.escaped_image}");
              background-position: ${sprite.px.offset_x} ${sprite.px.offset_y};
              background-size: ${sprite.total_width / sprite.width * 100}% ${sprite.total_height / sprite.height * 100}%;
              background-repeat: no-repeat;
              width: ${sprite.px.width};
              height: ${sprite.px.height};
            }
          ` */
                return `
            .icon-${sprite.name}{
              position: absolute;
              width: ${((100 * sprite.total_width) / sprite.width).toFixed(6)}%;
              top: ${((100 * sprite.offset_y) / sprite.height).toFixed(6)}%;
              bottom: ${(
                (-100 * sprite.total_height - sprite.y - sprite.height) /
                sprite.width
              ).toFixed(6)}%;
              left: ${((-100 * sprite.x) / sprite.width).toFixed(6)}%;
            }
            .iconbox-${sprite.name}{
              padding-bottom: ${(100 * sprite.height) / sprite.width}%;
            }
          `;
              })
              .join('') +
            `
          .responsive-sprites{
            display: block;
            height: auto;
            overflow: hidden;
            position: relative;
          }
          .responsive-sprites > img{
            display: block;
          }
        `
          );
        }
      })
    )
    .pipe(gulp.dest('dist/images'));
});

//编译 src/styles/index.scss 为 dist/css/index.min.css，并添加hash标注
gulp.task('scss', () => {
  const nodeSass = require('node-sass');
  const sass = require('gulp-sass')(nodeSass);
  const rename = require('gulp-rename');
  const postcss = require('gulp-postcss');
  const autoprefixer = require('autoprefixer');

  return gulp
    .src('src/styles/index.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(rev())
    .pipe(
      revFormat({
        lastExt: true
      })
    )
    .pipe(gulp.dest('temp/css'))
    .pipe(rev.manifest('css-rev-manifest.json'))
    .pipe(
      revDel({
        dest: 'temp/css'
      })
    )
    .pipe(gulp.dest('temp/css'));
});

//将CSS资源添加到 index.html 中
gulp.task('revReplaceCSS', () => {
  const data = fs.readFileSync('temp/css/css-rev-manifest.json');
  const manfiest = JSON.parse(data);

  return gulp
    .src('temp/index.html')
    .pipe(
      replace(/<!-- inject:(.+) -->/, (match, filename) => {
        if (manfiest[filename]) {
          return `<link rel="stylesheet" href="${process.env.PUBLIC_PATH}css/${manfiest[filename]}">`;
        } else {
          return match;
        }
      })
    )
    .pipe(gulp.dest('temp'));
});

gulp.task('clean', () => {
  return del('dist');
});

gulp.task('copy', () => {
  return gulp.src('temp/**/*').pipe(gulp.dest('dist'));
});

gulp.task('cleanTemp', () => {
  return del('temp');
});

gulp.task(
  'build',
  gulp.series('scss', 'revReplaceCSS', 'clean', 'copy', 'cleanTemp')
);
