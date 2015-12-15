// 引入 gulp及组件
var    gulp    = require('gulp');                 //基础库
// var    less = require('gulp-less'); //less
// var    minifycss = require('gulp-minify-css');   //css压缩
// var    jshint = require('gulp-jshint');           //js检查
// var    uglify  = require('gulp-uglify');          //js压缩
// var    rename = require('gulp-rename');          //重命名
// var    concat  = require('gulp-concat');          //合并文件
// var    clean = require('gulp-clean');            //清空文件夹
// var    tinylr = require('tiny-lr');              //livereload
// var    minifyHtml = require('gulp-minify-html');               //livereload
// var     autoprefixer = require('gulp-autoprefixer'); //为CSS3 添加前缀
// var     browserify = require('gulp-browserify'); //browserify
var     browserSync = require('browser-sync'); //browser-sync 同步更新浏览器
//  var    server = tinylr(); //服务
// var    livereload = require('gulp-livereload');   //服务器控制客户端同步刷新
// var    connect  = require('gulp-connect');        //服务器
// var    port =process.env.port || 8000;


var $ = require('gulp-load-plugins')();

var scripts = [
'./src/core/event.js',
'./src/core/component.event.js',

'./src/filter/index.js',
'./src/filter/**/*.js',

'./src/service/index.js',
'./src/service/**/*.js',

'./src/components/index.js',
'./src/components/**/*.js',

'./src/template/index.js',
'./src/template/**/*.js',

'./src/admin.js'
],
libScripts = [
        './node_modules/requirejs/require.js',
        './node_modules/require-css/css.min.js',
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/js/bootstrap.min.js',
        './node_modules/angular/angular.min.js',
        './node_modules/js-cookie/src/js.cookie.js',
        './node_modules/underscore/underscore-min.js',
        './node_modules/lodash/index.js',
        './node_modules/chart.js/Chart.min.js',
        './node_modules/moment/min/moment-with-locale.min.js',
        './node_modules/spectrum-colorpicker/spectrum.js',
        './node_modules/select2/select2.min.js',
        './node_modules/angular-qrcode/angular-qrcode.js',
        './node_modules/datetime-picker/datepicker.js',
        './node_modules/daterangepicker/daterangepicker.min.js',
        './node_modules/bootstrap-validator/dist/validator.min.js',
        './node_modules/clockpicker/dist/bootstrap-clockpicker.min.js',
        './node_modules/jquery-caret/jquery.caret.js',
        './node_modules/webuploader.min.js',
        './node_modules/kindeditor/kindeditor-all.js',
        ];

// 样式处理
gulp.task('css', function () {
    gulp.src('./css/**/*.less')
    .pipe($.less())
    .pipe($.autoprefixer()) //自动加css前缀
    .pipe(gulp.dest('./dist/css'))
    .pipe($.rename({ suffix: '.min' })) //生成min名文件
    .pipe($.minifyCss()) //压缩
    .pipe(gulp.dest('./dist/css'))
});
// js处理
gulp.task('app', function () { 
    gulp.src(['./dist/js/require.js','./dist/js/angular.min.js','config.js','./scripts/**/*.js'])
    // .pipe($.jshint.reporter('default'))
    .pipe($.concat('main.js'))
    // .pipe($.browserify())
    // .pipe(gulp.dest('./dist/js'))
    // .pipe($.rename({ suffix: '.min' }))
    // .pipe($.uglify())
    .pipe(gulp.dest('./dist'))
});

// js处理
gulp.task('js', function () { 
    gulp.src(libScripts)
    .pipe($.jshint.reporter('default'))
    // .pipe($.concat('main.js'))
    // .pipe($.browserify())
    // .pipe(gulp.dest('./dist/js'))
    // .pipe($.rename({ suffix: '.min' }))
    // .pipe($.uglify())
    .pipe(gulp.dest('./dist/js'))
});


// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./dist/css', './dist/js'], {read: false}).pipe(clean())
});

// 默认任务样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
    gulp.start('css','js');
});

gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./**/*.css', ['css']).on('change', browserSync.reload);
    gulp.watch('./**/*.js', ['app']).on('change', browserSync.reload);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
});