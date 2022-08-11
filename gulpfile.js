/* constiables */
const { src, dest, watch, series, parallel } = require('gulp');
//related css
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const sassGlob = require('gulp-sass-glob-use-forward');
const cleanCSS = require('gulp-clean-css');

//related images
const changed = require('gulp-changed');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const imageminJpg = require('imagemin-jpeg-recompress');
const imageminPng = require('imagemin-pngquant');
const imageminGif = require('imagemin-gifsicle');
const svgmin = require('gulp-svgmin');

//related js
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

//related server
const browserSync = require('browser-sync');

const dir = {
	dest: 'dist',
	dev: 'src',
};

const paths = {
	html: dir.dest + '/*.html',
	styles: {
		dest: dir.dest + '/css',
		src: dir.dev + '/sass/**/*.scss',
	},
	scripts: {
		dest: dir.dest + '/js',
		src: dir.dev + '/js/**/*.js',
	},
	images: {
		dest: dir.dest + '/img',
		src: {
			default: dir.dev + '/img/*',
			bitmap: dir.dev + '/img/**.+(jpg|jpeg|png|gif)',
			svgmin: dir.dev + '/img/**.+(svg)',
		},
	},
};
/* Functions */
// Sass
sass.compiler = require('sass');
const compileSass = (done) => {
	src(paths.styles.src)
		.pipe(plumber())
		.pipe(sassGlob())
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'expanded',
			})
		)
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('./'))
		.pipe(dest(paths.styles.dest));
	done();
};

const compressCss = (done) => {
	src(paths.styles.dest + '/style.css')
		.pipe(plumber())
		.pipe(cleanCSS())
		.pipe(
			rename({
				extname: '.min.css',
			})
		)
		.pipe(dest(paths.styles.dest));
	done();
};

const imageOptimaze = (done) => {
	// jpeg,png,gif
	src(paths.images.src.bitmap)
		.pipe(changed(paths.images.dest))
		.pipe(
			imagemin([
				imageminPng(),
				imageminJpg(),
				imageminGif({
					interlaced: false,
					optimizationLevel: 3,
					colors: 180,
				}),
			])
		)
		.pipe(dest(paths.images.dest))
		.pipe(
			rename(function (path) {
				path.basename += path.extname;
			})
		)
		.pipe(webp())
		.pipe(dest(paths.images.dest));
	done();
	// svg
	src(paths.images.src.svgmin)
		.pipe(changed(paths.images.dest))
		.pipe(svgmin())
		.pipe(dest(paths.images.dest));
	done();
};

// concat js file(s)
const concatJs = (done) => {
	src(paths.scripts.src)
		.pipe(plumber())
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(concat('bundle.js'))
		.pipe(dest(paths.scripts.dest));
	done();
};

// compress js file(s)
const compressJs = (done) => {
	src(paths.scripts.dest + '/bundle.js')
		.pipe(plumber())
		.pipe(uglify())
		.pipe(rename('bundle.min.js'))
		.pipe(dest(paths.scripts.dest));
	done();
};

// Browser Sync
const browserSyncFunc = (done) => {
	browserSync.init({
		server: {
			baseDir: dir.dest,
			index: 'index.html',
		},
	});
	done();
};

// Reload Browser
const reloadBrowser = (done) => {
	browserSync.reload();
	done();
};

//
// Default task
//
const watchFiles = (done) => {
	watch(paths.html, reloadBrowser);
	watch(paths.styles.src, series(compileSass, compressCss, reloadBrowser));
	watch(paths.scripts.src, series(concatJs, compressJs, reloadBrowser));
	watch(paths.images.src.default, series(imageOptimaze, reloadBrowser));
	done();
};

exports.default = series(
	compileSass,
	concatJs,
	imageOptimaze,
	watchFiles,
	browserSyncFunc
);
