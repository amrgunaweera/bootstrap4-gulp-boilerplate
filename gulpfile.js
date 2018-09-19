const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

/*
 -- Top Level Functions --
 gulp.task - Define tasks
 gulp.src - Point to files to use
 gulp.dest - Points to folder to output
 gulp.watch - Watch files and folders for changes
 */

// Logs Message
gulp.task('message', function(){
    return console.log('Gulp is running..')
});

// Copy all html files
gulp.task('copyHtml', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// Minify JS
/*gulp.task('minifyJs', function(){
    gulp.src('src/js/!*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});*/

// Optimize Images
gulp.task('imageMin', () =>
gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
);

// Compile Sass
gulp.task('sass', function(){
   gulp.src([
       //'node_modules/bootstrap/scss/bootstrap.scss',
       'src/sass/*.scss'
    ])
       .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
       .pipe(gulp.dest('dist/css'))
       .pipe(browserSync.stream());
});

// Scripts
gulp.task('scripts', function(){
    gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
        'src/js/*.js'
    ])
        .pipe(concat('main.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

// Run All command
//gulp.task('default',['message','copyHtml', 'imageMin', 'sass', 'scripts']);
gulp.task('default', ['browser-sync']);

// Watch for file changes
/* gulp.task('watch', function(){
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']);
}); */

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']);
});