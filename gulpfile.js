const gulp = require('gulp');
const prefixer = require('gulp-autoprefixer');
const less = require('gulp-less');
const uglifycss = require("gulp-uglifycss");
const googleWebFonts = require("gulp-google-webfonts");
const buildConfig = require('./builder/build-config.js');


gulp.task('default', () => {
	gulp.start('build');

	buildConfig.css.forEach(entry => {
		gulp.watch(['**/*.less'], {cwd: entry.src}, () => { gulp.start('compile-less'); });
		gulp.watch([buildConfig.googlefonts.fontlist], {cwd: entry.src}, () => { gulp.start('fonts'); });
	});

	buildConfig.copy.forEach(entry => {
		if(entry.watch) gulp.watch(entry.pattern, {cwd: entry.src}, (event) => { gulp.start('copy-watched'); });
	});
});

gulp.task('build', () => {
	gulp.start('fonts');
	gulp.start('copy');
	gulp.start('compile-less');
	bumpVersion();
});

gulp.task('fonts', () => {
	buildConfig.css.forEach(entry => {
		gulp.src(entry.src + buildConfig.googlefonts.fontlist)
		    .pipe(googleWebFonts({
			    fontsDir     : buildConfig.googlefonts.path,
			    cssDir       : entry.dest,
			    cssFilename  : buildConfig.googlefonts.css,
			    outBaseDir   : '',
			    relativePaths: true
		    }))
		    .pipe(gulp.dest(''))
		;
		bumpVersion();
	});
});

gulp.task('copy', () => {
	buildConfig.copy.forEach(entry => {
		gulp.src(entry.src + entry.pattern)
		    .pipe(gulp.dest(entry.dest));
	});
});

gulp.task('copy-watched', () => {
	buildConfig.copy.forEach(entry => {
		if(entry.watch){
			gulp.src(entry.src + entry.pattern)
			    .pipe(gulp.dest(entry.dest));
		}
	});
	bumpVersion();
});

gulp.task('compile-less', () => {
	buildConfig.cssEntries.forEach(entry => {
		gulp.src(entry.src + entry.file)
		    .pipe(less({paths: ['./node_modules']}))
		    .pipe(uglifycss({"maxLineLen": 80, "uglyComments": true}))
		    .pipe(prefixer('last 2 versions', 'ie 9'))
		    .pipe(gulp.dest(entry.dest));
	});
	bumpVersion();
});

function bumpVersion(){
	const path = require("path");
	const VB = require("./builder/version-bump-plugin");
	(new VB({file: path.resolve(__dirname, buildConfig.buildVersionFile)})).bump();
}