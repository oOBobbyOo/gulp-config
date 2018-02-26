# gulp-config

## gulp常用插件

``` bash
var gulp = require('gulp'); //gulp
var jshint = require('gulp-jshint'); // 引入检测js文件模块
var uglify = require('gulp-uglify'); // 引入js压缩模块
var concat = require('gulp-concat'); // 引入合并文件模块
var sourcemaps = require('gulp-sourcemaps'); // 引入sourcemaps
var htmlmin = require('gulp-htmlmin'); // 引入html压缩模块
var cleanCSS = require('gulp-clean-css'); // 引入压缩css的模块
var imagemin = require('gulp-imagemin'); // 引入压缩图片插件
var postcss = require('gulp-postcss'); //JavaScript 代码来转换CSS 中的样式
var autoprefixer = require('autoprefixer'); //自动加上浏览器前缀
var postcsswritesvg = require('postcss-write-svg'); // 解决1px方案
var browserSync = require('browser-sync'); //默认浏览器打开
var cache = require('gulp-cache'); //缓存
var opn = require('opn'); //静态服务器
var autoprefixer = require('gulp-autoprefixer'); //根据设置浏览器版本自动处理浏览器前缀
var concat = require('gulp-concat'); //合并javascript文件，减少网络请求
var base64 = require('gulp-base64'); //图片转换成Base64编码
var sass = require('gulp-ruby-sass'); //sass
var less = require('gulp-less'); //less
var rename = require('gulp-rename'); //重命名
var notify = require('gulp-notify'); //提示
var livereload = require('gulp-livereload'); //监听文件发生变化时,浏览器自动刷新页面
var rev = require('gulp-rev'); 根据静态资源内容，生成md5签名，打包出来的文件名会加上md5签名，同时生成一个json用来保存文件名路径对应关系
var revCollector = require('gulp-rev-collector'); 
var changed = require('gulp-changed'); //用来过滤未被修改过的文件，只有修改后的文件才能通过管道。这样做的好处时，只处理修改后的文件，减少后续程序的执行时间。
var clean = require('gulp-clean'); //删除文件及文件夹，在执行打包的时候，一般都需要先清理目标文件夹，以保证每次打包时，都是最新的文件
```
