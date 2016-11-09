/*include modules*/
var gulp 				 = require('gulp')
		sass 				 = require('gulp-sass'),
		browserSynk  = require('browser-sync'),
		concat			 = require('gulp-concat'),
		// uglify			 = require('gulp-uglifyjs'),
		cssnano			 = require('gulp-cssnano'),
		rename			 = require('gulp-rename'),
		del					 = require('del'),
		imagemin		 = require('gulp-imagemin'),
		pngquant		 = require('imagemin-pngquant'),
		cache				 = require('gulp-cache'),
		autoprefixer = require('gulp-autoprefixer'),
		spritesmith  = require('gulp.spritesmith'),
		uglify 			 = require('gulp-uglify'),
		plumber 		 = require('gulp-plumber');

/*convert sass to css*/
gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions','ie 8'], { cascade: true }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSynk.reload({stream: true}))
});
/*concat js*/
gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/jquery.min.js',
		'app/libs/masonry/masonry.pkgd.3.3.2.min.js',
		'app/libs/**/*.js'
	])
	.pipe(concat('libs.min.js'))
	// .pipe(uglify())
	.pipe(gulp.dest('app/js'));
});
/*concat css*/
gulp.task('css-libs',['sass'], function() {
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});
/*browser synchronization*/
gulp.task('browser-sync', function() {
	browserSynk({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});
/*clear dist*/
gulp.task('clean', function() {
	return del.sync('dist');
});
/*clear cache*/
gulp.task('clear', function() {
	return cache.clearAll();
});
/*optimize img*/
gulp.task('img', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
		.pipe(gulp.dest('dist/img'));
});
/*gulp sprite*/
gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('app/sprites/src/*.*') //src path
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css',
                imgPath: '../sprites/sprite.png',
            }));

    spriteData.img.pipe(gulp.dest('app/sprites/')); // ready img path
    spriteData.css.pipe(gulp.dest('app/sprites/')); // ready css path
});
/*watch*/
gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSynk.reload);
	gulp.watch('app/js/**/*.js', browserSynk.reload);
});
/*gulp build*/
gulp.task('build',['clean', 'img', 'sass', 'scripts'], function() {
	var buildCss = gulp.src([
			'app/css/main.css',
			'app/css/libs.min.css',
		])
		.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

	var buildSprite = gulp.src('app/sprites/*.png')
		.pipe(gulp.dest('dist/sprites'));
});

/*default task*/
gulp.task('default', ['watch']);