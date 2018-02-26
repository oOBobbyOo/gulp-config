var gulp = require('gulp');
var jshint = require('gulp-jshint'); // 引入检测js文件模块
var uglify = require('gulp-uglify'); // 引入js压缩模块
var concat = require('gulp-concat'); // 引入合并文件模块
var sourcemaps = require('gulp-sourcemaps'); // 引入sourcemaps
var htmlmin = require('gulp-htmlmin'); // 引入html压缩模块
var cleanCSS = require('gulp-clean-css'); // 引入压缩css的模块
var imagemin = require('gulp-imagemin'); // 引入压缩图片插件
var postcss = require('gulp-postcss'); //JavaScript 代码来转换CSS 中的样式
var autoprefixer = require('autoprefixer'); //自动加上浏览器前缀
var browserSync = require('browser-sync'); //默认浏览器打开
var cache = require('gulp-cache'); //缓存
var opn = require('opn'); //静态服务器

// js  
gulp.task('js', function() {
    gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('dist/js'));
});

// css
gulp.task('css', function() {
    gulp.src('src/css/**/*.css')
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
})

// img
gulp.task('img', function() {
    gulp.src('src/images/*.{png,jpg,gif,ico,svg}')
        .pipe(cache(imagemin({
            progressive: true, //Boolean类型 默认:false 无损压缩图片
            optimizationLevel: 5, //number类型 默认:3 取值范围:0-7(优化等级)
            interlced: true, //Boolean类型 默认false 隔行扫描gif进行渲染
            multipass: true //Boolean类型 默认false 多次优化svg直到完全优化
        })))
        .pipe(gulp.dest('dist/images'))
})

// html
gulp.task('html', function() {
    gulp.src('src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// path
var path = {
    js: 'src/js/**/*.js',
    css: 'src/css/**/*.css',
    img: 'src/imgages/**/*',
    html: 'src/**/*.html',
    dist: './dist'
};

// default
gulp.task('default', function() {

    gulp.start('js', 'css', 'img', 'html');

    browserSync.init({
        server: {
            baseDir: path.dist
        },
        port: 3000,
        open: false
    }, function() {
        var homepage = 'http://localhost:3000';
        opn(homepage);
    });

    //监听文件的变化实时编译刷新
    gulp.watch([path.js, path.css, path.img, path.html]).on('change', function() {
        gulp.start('js', 'css', 'img', 'html');
        browserSync.reload();
    });
});