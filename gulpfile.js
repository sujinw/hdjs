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
        //'./output/assets/js/handlebars.js',
        './output/assets/js/underscore.min.js',
        './output/assets/js/jquery-1.10.2.min.js',
        './output/assets/js/jquery-validation/dist/jquery.validate.min.js',
        './output/assets/js/jquery.validate.extends.js',
        './output/assets/js/bootstrap/js/bootstrap.min.js',
        './output/assets/js/bootbox/bootbox.min.js',
        './output/assets/js/angular.1.3.8.min.js',
        './output/assets/js/angular-ui-router.min.js',
        './output/assets/js/bootstrap-select/bootstrap-select.min.js',
        './output/assets/js/bootstrap-datetimepicker/js/moment.js',
        './output/assets/js/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
        './output/assets/js/bootstrap-daterangepicker/js/daterangepicker.js',
        './output/assets/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
        './output/assets/plugins/uniform/jquery.uniform.min.js',
        './output/assets/plugins/fuelux/js/spinner.min.js',
        './output/assets/js/select2/select2.min.js',
        './output/assets/js/jquery.blockui.min.js',
        './output/assets/js/metronic.js',
        //'./output/assets/js/jquery.dataTables.min.js',
        './output/assets/js/bootstrap-toastr/toastr.min.js',
        './output/assets/js/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js',
        './output/assets/js/bootstrap-modal/js/bootstrap-modal.js',
        './output/assets/js/bootstrap-modal/js/bootstrap-modalmanager.js',
        './output/assets/js/bootstrap-editable/bootstrap-editable/js/bootstrap-editable.js',
        './output/assets/js/bootstrap-maxlength.min.js'
        //'./output/assets/js/highcharts/js/highcharts.js',
        //'./output/assets/js/zTree_v3/js/jquery.ztree.all-3.5.min.js'
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
gulp.task('js', function () {
    gulp.src('scripts/**/*.js')
    .pipe($.jshint.reporter('default'))
    .pipe($.concat('main.js'))
    .pipe($.browserify())
    .pipe(gulp.dest('./dist/js'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify())
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
    gulp.watch('./scripts/*.js', ['js']).on('change', browserSync.reload);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
});