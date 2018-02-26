// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jslint = require('gulp-jslint'),
    sass = require('gulp-ruby-sass'),
    less = require('gulp-less'),
    changed = require('gulp-changed'),
    htmlmin = require('gulp-htmlmin'),
    minifyHTML = require('gulp-minify-html'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    base64 = require('gulp-base64'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    cache = require('gulp-cache'),
    del = require('del'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

function errLog(error) {
    console.error.bind(console);
    this.emit('end');
}

// jslint
gulp.task('jslint', function() {
    gulp.src('src/js/**/*.js')
        .pipe(jslint())
        .pipe(jslint.reporter('default'))
        .pipe(notify({ message: 'Jslint task complete' }));
});

// autoprefixer
gulp.task('autoprefixer', function() {
    gulp.src('src/css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true,
            remove: true
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({ message: 'Autoprefixer task complete' }));
});

// html
gulp.task('html', function() {
    gulp.src('src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
        .pipe(notify({ message: 'HTML task complete' }));
});

// js  
gulp.task('js', function() {
    gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'))
        .pipe(notify({ message: 'Js task complete' }));
});

// css
gulp.task('css', function() {
    gulp.src('src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true,
            remove: true
        }))
        .pipe(base64())
        .pipe(minifycss())
        .pipe(rev())
        .on('error', errLog)
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

// rev
gulp.task('rev', function() {
    return gulp.src(['rev/**/*.json', 'src/**/*.html'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': 'css',
                'js': 'js',
                'cdn/': function(manifest_value) {
                    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/images/' + manifest_value;
                }
            }
        }))
        .pipe(minifyHTML({
            empty: true,
            pare: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(notify({ message: 'Rev task complete' }));
});

// sass
gulp.task('sass', () =>
    sass('src/scss/*.scss', { style: 'compressed' })
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: true,
        remove: true
    }))
    .pipe(base64())
    .pipe(minifycss())
    .on('error', errLog)
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Sass task complete' }))
);

// less
gulp.task('less', function() {
    return gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true,
            remove: true
        }))
        .pipe(base64())
        .pipe(minifycss())
        .on('error', errLog)
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({ message: 'Less task complete' }));
});

// images
gulp.task('images', function() {
    gulp.src('src/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

// clean  
gulp.task('clean', function() {
    del(['./dist', './rev']);
});

// default  
gulp.task('default', function() {
    gulp.start('html', 'css', 'sass', 'less', 'js', 'images');
});

// watch
gulp.task('watch', function() {
    // browserSync
    browserSync.init({
        server: {
            baseDir: './dist',
            index: 'index.html'
        },
        open: 'external',
        injectChanges: true
    });

    gulp.watch('src/css/**/*.css', ['css']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/**/*.html', ['rev']);
    gulp.watch(['dist/**']).on('change', browserSync.reload);
});