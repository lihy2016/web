var gulp = require('gulp'),
	less = require('gulp-less'),
	rename = require('gulp-rename'),
	path = require('path'),
	minifyCSS = require('gulp-minify-css'),
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector'),
	requirejsOptimize = require('gulp-requirejs-optimize'),
	amdOptimize = require("amd-optimize"),
	concat = require('gulp-concat');

/*
 * 编译各页面less文件到css文件
 * 将pagescript中每个页面的less文件生成css文件，
 * 放置到原less文件夹的平级文件夹内.即如下结构。
 * .
 * ├── css
 * │   └── main.css
 * └── less
 *     └── main.less
 */ 

//cssmin
gulp.task('cssmin',function(obj){
	return gulp.src(['**/pagescript/**/less/main.less']).pipe(less({
		globalVars: {
			static: '"' + path.join(__dirname, 'static') + '"'
		}
	}))
	.pipe(minifyCSS())
	.pipe(rename(function(path){
		path.dirname = path.dirname.replace('less','css');
		path.extname = '.css';
	}))
	.pipe(gulp.dest(''));
});


//js concat use r.js in build.js


//md5
gulp.task('rev',function(obj){
	return gulp.src(['**/pagescript/**/css/main.css','**/pagescript/**/js/main-build.js'])
	.pipe(rev())  //文件名加MD5后缀
	.pipe(gulp.dest(''))
	.pipe(rev.manifest({
		base:'',
		merge:true
	}))  //生成一个rev-manifest.json
	.pipe(gulp.dest('./rev'));   //将 rev-manifest.json 保存到 rev 目录内
});


//replace the css and js in .ftl
gulp.task('collector',function(){
	 return gulp.src(['./rev/*.json','./ftl/**/index.ftl'])
	.pipe(revCollector({
		replaceReved:true
	}))
	.pipe(gulp.dest('./ftl'))
});

gulp.task('default', ['cssmin','rev','collector']);

