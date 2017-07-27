// For development => gulp
// For production  => gulp -p

// Call Plugins
var env                 = require('minimist')(process.argv.slice(2)),
    gulp                = require('gulp'),
    gutil               = require('gulp-util'),
    plumber             = require('gulp-plumber'),
    nunjucks            = require('gulp-nunjucks-html'),
    htmlmin             = require('gulp-htmlmin'),
    browserSync         = require('browser-sync'),
    uglify              = require('gulp-uglify'),
    concat              = require('gulp-concat'),
    gulpif              = require('gulp-if'),
    cache               = require('gulp-cache'),
    imagemin            = require('gulp-imagemin'),
    sass 		            = require('gulp-sass'),
    cssnano 	          = require('gulp-cssnano'),
    sourcemaps 	        = require('gulp-sourcemaps'),
    autoprefixer        = require('gulp-autoprefixer'),
    customizeBootstrap  = require('gulp-customize-bootstrap'),
    stylus              = require('gulp-stylus'),
    inject              = require('gulp-inject'),
    wiredep             = require('wiredep').stream,
    gulpIgnore          = require('gulp-ignore'),
    upmodul             = require("gulp-update-modul");
// Var
var supported = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 10',
    'ff >= 20',
    'ios 6',
    'android 4'
];

var condition = './includes/*.html';

var paths = {
    html: ['./templates/**/*.html', '!./templates/bower_components/**'],
    scripts: 'web/js/*.js',
    styles: 'web/css/*.css',
    out: 'templates/'
};

// Call Nunjucks for compile Templates
gulp.task('nunjucks', function(){
    return gulp.src([
      '_src/templates/!(_)*/*.html',
      '_src/templates/*.html'
    ])
    .pipe(plumber())
    .pipe(nunjucks({
      searchPaths: ['_src/templates']
    }))
    .pipe(wiredep({
      ignorePath: ['../../web/']
    }))

    .pipe(gulp.dest('templates/'));
});


// Call inject links to html
gulp.task('inject-links',['nunjucks'], function () {
    gulp.src(paths.html)
    .pipe(inject(gulp.src([paths.styles, paths.scripts], {read: false}),
        // Options
        {
            ignorePath: ['web'],
            addRootSlash: false
        }
    ))
    .pipe(gulp.dest(paths.out));
});

// Call Sass
gulp.task('sass', function(){
    gulp.src(['_src/scss/**/*.scss'])
    .pipe(plumber())
    .pipe(sass({
        outputStyle: 'compressed',
		    includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(cssnano({
        autoprefixer: {browsers: supported, add: true}
    }))
    .pipe(gulp.dest('web/css'));
});

// Call inject to sass
gulp.task('inject-sass', function(){
  var injectAppFiles   = gulp.src('_src/scss/includes/**/*.scss', {read: false});

  var injectAppOptions = {
    transform: transformFilepath,
    starttag: '// inject:app',
    endtag: '// endinject',
    addRootSlash: false
  };

  var injectVendorFiles = gulp.src('_src/scss/vendor/**/*.scss', {read: false});

  var injectVendorOptions = {
    transform: transformFilepath,
    starttag: '// inject:vendor',
    endtag: '// endinject',
    addRootSlash: false
  };

  function transformFilepath(filepath) {
   return '@import "' + filepath + '";';
  }

  return gulp.src('_src/scss/main.scss')
    .pipe(wiredep())
    .pipe(inject(injectVendorFiles,injectVendorOptions))
    .pipe(inject(injectAppFiles, injectAppOptions))
    .pipe(gulp.dest('./_src/scss'));
});

// Call Uglify and Concat JS
gulp.task('js', function(){
    return gulp.src('_src/js/**/*.js')
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(gulpif(env.p, uglify()))
    .pipe(gulp.dest('web/js'));
});

// Call Imagemin
gulp.task('imagemin', function() {
    return gulp.src('_src/img/**/*')
    .pipe(plumber())
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({plugins: [{removeViewBox: true}]})
    ]))
    .pipe(gulp.dest('web/img'));
});

// Browser Sync
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './templates',
      index: "index.html"
    },
    notify: false
  });
  gulp.watch('_src/templates/**/*.html', ['nunjucks', 'inject-links']).on('change', browserSync.reload);
  gulp.watch('_src/scss/**/*.scss', ['sass']);
  gulp.watch('_src/js/**/*.js', ['js']);
  gulp.watch('_src/img/**/*.{jpg,png,gif}', ['imagemin']);
});


gulp.task('update-modul', function () {
    gulp.src('package.json')
    .pipe(upmodul('latest', 'false')); //update all modules latest version.
});

// Default task
gulp.task('default', ['nunjucks', 'inject-sass', 'sass', 'js', 'imagemin', 'inject-links', 'serve'], function(){
});
