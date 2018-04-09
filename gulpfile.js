var gulp = require('gulp'),
	scss = require('gulp-sass'),
	browserSync = require('browser-sync'),
	// del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(scss())
		.pipe(autoprefixer())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

// gulp.task('clean', function() {
// 	return del.sync('dist');
// });

gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			une: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'scss'], function() {
	gulp.watch('app/scss/**/*.scss', ['scss']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

// gulp.task('build', ['clean', 'img', 'scss'], function() {
	gulp.task('build', ['img', 'scss'], function() {
	
	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

	var buildCss = gulp.src('app/css/main.css')
		.pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));
});